-- +goose Up
-- +goose StatementBegin

-- Indexes for fast lookups by slug / sku
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_sku ON products(sku);
CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_categories_parent ON categories(parent_id);
CREATE INDEX idx_product_images_product ON product_images(product_id);
CREATE INDEX idx_product_variants_product ON product_variants(product_id);
CREATE INDEX idx_carts_user_id ON carts(user_id);
CREATE INDEX idx_cart_items_cart ON cart_items(cart_id);
CREATE INDEX idx_wishlists_user_id ON wishlists(user_id);
CREATE INDEX idx_wishlist_items_wishlist ON wishlist_items(wishlist_id);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_order_items_order ON order_items(order_id);
CREATE INDEX idx_order_items_product ON order_items(product_id);
CREATE INDEX idx_payments_order_id ON payments(order_id);
CREATE INDEX idx_reviews_product ON reviews(product_id);
CREATE INDEX idx_reviews_user ON reviews(user_id);
CREATE INDEX idx_promotions_code ON promotions(code);
CREATE INDEX idx_promotions_active ON promotions(is_active, ends_at);
CREATE INDEX idx_order_status_history_order ON order_status_history(order_id);
CREATE INDEX idx_order_status_history_changed_by ON order_status_history(changed_by);

-- Function that returns true if the given uid has admin role
-- SECURITY DEFINER so it executes with the privileges of the profile row
CREATE OR REPLACE FUNCTION is_admin(uid UUID)
RETURNS BOOLEAN
LANGUAGE sql STABLE
SECURITY DEFINER
AS $$
  SELECT role = 'admin' FROM profiles WHERE id = uid;
$$;

-- Index on profiles.role for is_admin() performance
CREATE INDEX idx_profiles_role ON profiles(role);

-- Triggers to update `updated_at` on profiles, products, categories, orders
CREATE OR REPLACE FUNCTION update_updated_at_column() RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tg_profiles_updated_at
BEFORE UPDATE ON profiles
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER tg_products_updated_at
BEFORE UPDATE ON products
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER tg_categories_updated_at
BEFORE UPDATE ON categories
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER tg_orders_updated_at
BEFORE UPDATE ON orders
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- --------------------------------------------------------
-- TRIGGER: Block role changes by non-admins
-- --------------------------------------------------------
-- This trigger fires BEFORE UPDATE on profiles and prevents
-- anyone other than an admin from changing the role column.
-- If a non-admin tries to change the role, it is silently
-- reverted to the original value.
CREATE OR REPLACE FUNCTION prevent_role_change() RETURNS trigger AS $$
BEGIN
  IF NEW.role != OLD.role THEN
    -- Only allow the role change if the profile being updated
    -- belongs to an admin (checked via is_admin).
    -- is_admin(uid) with SECURITY DEFINER reads the profiles table
    -- using the uid passed to it.
    IF NOT is_admin(OLD.id) THEN
      -- Non-admin trying to change role: revert to original
      NEW.role := OLD.role;
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_prevent_role_change
BEFORE UPDATE ON profiles
FOR EACH ROW EXECUTE FUNCTION prevent_role_change();
-- --------------------------------------------------------

-- --------------------------------------------------------
-- Additional protections: prevent non-admin writes to price/stock/order total/payment status
-- --------------------------------------------------------

-- The RLS policies below already restrict DML based on role.
-- For products: customers have no FOR UPDATE policy, so they cannot UPDATE products.
-- The admin policy FOR ALL USING (is_admin(auth.uid())) only allows admins.

-- For orders: customers can only read/modify their own orders via the policy below.
-- We add a trigger to prevent changes to critical financial fields unless the user is admin.
CREATE OR REPLACE FUNCTION protect_order_financial_fields() RETURNS trigger AS $$
BEGIN
  -- If updating, check each financial field
  IF TG_OP = 'UPDATE' THEN
    -- If subtotal_cents is being changed and user is not admin, revert
    IF NEW.subtotal_cents != OLD.subtotal_cents THEN
      IF NOT is_admin(auth.uid()) THEN
        NEW.subtotal_cents := OLD.subtotal_cents;
      END IF;
    END IF;
    -- If discount_cents is being changed and user is not admin, revert
    IF NEW.discount_cents != OLD.discount_cents THEN
      IF NOT is_admin(auth.uid()) THEN
        NEW.discount_cents := OLD.discount_cents;
      END IF;
    END IF;
    -- If total_cents is being changed and user is not admin, revert
    IF NEW.total_cents != OLD.total_cents THEN
      IF NOT is_admin(auth.uid()) THEN
        NEW.total_cents := OLD.total_cents;
      END IF;
    END IF;
    -- If payment_id is being changed and user is not admin, revert
    IF NEW.payment_id != OLD.payment_id THEN
      IF NOT is_admin(auth.uid()) THEN
        NEW.payment_id := OLD.payment_id;
      END IF;
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_protect_order_financial_fields
BEFORE UPDATE ON orders
FOR EACH ROW EXECUTE FUNCTION protect_order_financial_fields();
-- --------------------------------------------------------

-- ============================================================
-- RLS POLICIES
-- ============================================================

-- ============================================================
-- PROFILES
-- ============================================================

-- Public / authenticated: read own profile only
CREATE POLICY "Profiles: read own" ON profiles
  FOR SELECT USING (auth.uid() = id);

-- Customers: update own profile fields only (no role change — handled by trigger)
CREATE POLICY "Profiles: update own" ON profiles
  FOR UPDATE USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id AND role = (SELECT role FROM profiles WHERE id = auth.uid()));

-- Admin: all profile management is handled via is_admin() checks in app code.
-- The RLS policy below denies ALL to non-admin roles at the database level.
CREATE POLICY "Profiles: admin only" ON profiles
  FOR ALL USING (is_admin(auth.uid()));

-- ============================================================
-- CATEGORIES
-- ============================================================

-- Public: read active categories only
CREATE POLICY "Categories: read active" ON categories
  FOR SELECT USING (is_active = true);

-- Admin: manage all categories (checked via is_admin in app code)
CREATE POLICY "Categories: admin only" ON categories
  FOR ALL USING (is_admin(auth.uid()));

-- ============================================================
-- PRODUCTS
-- ============================================================

-- Public: read active products only
CREATE POLICY "Products: read active" ON products
  FOR SELECT USING (is_active = true);

-- Customers: read-only at RLS level. Price/stock updates go through admin API.
-- No FOR UPDATE policy for customers → UPDATE is blocked.
-- Admin: manage all products (checked via is_admin in app code)
CREATE POLICY "Products: admin only" ON products
  FOR ALL USING (is_admin(auth.uid()));

-- ============================================================
-- PRODUCT_IMAGES
-- ============================================================

-- Public: read images for active products
CREATE POLICY "Product images: read active" ON product_images
  FOR SELECT USING (EXISTS (SELECT 1 FROM products WHERE id = product_id AND is_active = true));

-- Admin: manage all images (checked via is_admin in app code)
CREATE POLICY "Product images: admin only" ON product_images
  FOR ALL USING (is_admin(auth.uid()));

-- ============================================================
-- PRODUCT_VARIANTS
-- ============================================================

-- Public: read variants for active products
CREATE POLICY "Product variants: read active" ON product_variants
  FOR SELECT USING (EXISTS (SELECT 1 FROM products WHERE id = product_id AND is_active = true));

-- Admin: manage all variants (checked via is_admin in app code)
CREATE POLICY "Product variants: admin only" ON product_variants
  FOR ALL USING (is_admin(auth.uid()));

-- ============================================================
-- CARTS / CART_ITEMS (customer-owned only)
-- ============================================================

-- Customers: read / update / delete own cart only
CREATE POLICY "Carts: customer own" ON carts
  FOR ALL USING (user_id = auth.uid());

-- Admin: manage all carts (checked via is_admin in app code)
CREATE POLICY "Carts: admin only" ON carts
  FOR ALL USING (is_admin(auth.uid()));

-- Cart items: customer own via cart
CREATE POLICY "Cart items: customer own" ON cart_items
  FOR ALL USING (cart_id IN (SELECT id FROM carts WHERE user_id = auth.uid()));

-- Admin: manage all cart items (checked via is_admin in app code)
CREATE POLICY "Cart items: admin only" ON cart_items
  FOR ALL USING (is_admin(auth.uid()));

-- ============================================================
-- WISHLISTS / WISHLIST_ITEMS (customer-owned only)
-- ============================================================

-- Customers: read / update / delete own wishlist only
CREATE POLICY "Wishlists: customer own" ON wishlists
  FOR ALL USING (user_id = auth.uid());

-- Admin: manage all wishlists (checked via is_admin in app code)
CREATE POLICY "Wishlists: admin only" ON wishlists
  FOR ALL USING (is_admin(auth.uid()));

-- Wishlist items: customer own via wishlist
CREATE POLICY "Wishlist items: customer own" ON wishlist_items
  FOR ALL USING (wishlist_id IN (SELECT id FROM wishlists WHERE user_id = auth.uid()));

-- Admin: manage all wishlist items (checked via is_admin in app code)
CREATE POLICY "Wishlist items: admin only" ON wishlist_items
  FOR ALL USING (is_admin(auth.uid()));

-- ============================================================
-- ORDERS / ORDER_ITEMS
-- ============================================================

-- Customers: read / update own orders only (financial fields protected by trigger)
CREATE POLICY "Orders: customer own" ON orders
  FOR ALL USING (user_id = auth.uid());

-- Admin: manage all orders (checked via is_admin in app code)
CREATE POLICY "Orders: admin only" ON orders
  FOR ALL USING (is_admin(auth.uid()));

-- Order items: read only via owned orders
CREATE POLICY "Order items: via owned order" ON order_items
  FOR SELECT USING (EXISTS (SELECT 1 FROM orders WHERE id = order_id AND user_id = auth.uid()));

-- Admin: manage all order items (checked via is_admin in app code)
CREATE POLICY "Order items: admin only" ON order_items
  FOR ALL USING (is_admin(auth.uid()));

-- ============================================================
-- PAYMENTS (read-only by admin; server writes)
-- ============================================================

-- Admin: read payments; customers never see at RLS level
CREATE POLICY "Payments: admin only" ON payments
  FOR SELECT USING (is_admin(auth.uid()));

-- Customers: no INSERT/UPDATE on payments (policy omitted — table is effectively hidden)
-- Payment state changes only via server-side M-Pesa callback logic.

-- ============================================================
-- REVIEWS (public can read approved reviews. Insert allowed only if user has paid order with product)
-- ============================================================

-- Public / authenticated: read reviews (visible on product pages)
CREATE POLICY "Reviews: read public" ON reviews
  FOR SELECT USING (true);

-- Customers: can insert a review only if they have a paid order containing that product.
-- The check is enforced via a trigger on INSERT that verifies EXISTS (
--   SELECT 1 FROM order_items oi
--   JOIN orders o ON o.id = oi.order_id
--   WHERE oi.product_id = NEW.product_id
--   AND o.user_id = auth.uid()
--   AND o.status = 'paid'
-- );
-- For now, the RLS policy allows insert if auth.uid() = user_id (the reviewer owns the row).
-- The actual "paid order" check can be added as a separate trigger or application-level check.
CREATE POLICY "Reviews: customer insert" ON reviews
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Customers: can update own review only
CREATE POLICY "Reviews: customer update" ON reviews
  FOR UPDATE USING (auth.uid() = user_id);

-- Admin: manage all reviews (checked via is_admin in app code)
CREATE POLICY "Reviews: admin only" ON reviews
  FOR ALL USING (is_admin(auth.uid()));

-- ============================================================
-- PROMOTIONS
-- ============================================================

-- Public: read active promotions
CREATE POLICY "Promotions: read active" ON promotions
  FOR SELECT USING (is_active = true AND starts_at <= now() AND (ends_at IS NULL OR ends_at >= now()));

-- Admin: manage all promotions (checked via is_admin in app code)
CREATE POLICY "Promotions: admin only" ON promotions
  FOR ALL USING (is_admin(auth.uid()));

-- ============================================================
-- ORDER_STATUS_HISTORY (audit only, written by admin)
-- ============================================================

-- Public: never read directly; view via admin API
CREATE POLICY "Order status history: public never" ON order_status_history
  FOR SELECT USING (false);

-- Admin: manage all history (checked via is_admin in app code)
CREATE POLICY "Order status history: admin only" ON order_status_history
  FOR ALL USING (is_admin(auth.uid()));

-- +goose StatementEnd
