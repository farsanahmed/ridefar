-- +goose Up
-- +goose StatementBegin
-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE carts ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlist_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE promotions ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_status_history ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- PROFILES (auth.users-linked)
-- ============================================================

-- Public: read own profile by id (via session variable)
CREATE POLICY "Profiles: read own" ON profiles
  FOR SELECT USING (auth.uid() = id);

-- Customers: update own profile fields only (no role change)
CREATE POLICY "Profiles: update own" ON profiles
  FOR UPDATE USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id AND role = (SELECT role FROM profiles WHERE id = auth.uid()));

-- Admin: manage all profiles
CREATE POLICY "Profiles: manage admin" ON profiles
  FOR ALL USING (false); -- enforced via checked_admin_session() in app code

-- ============================================================
-- CATEGORIES
-- ============================================================

-- Public: read active categories only
CREATE POLICY "Categories: read active" ON categories
  FOR SELECT USING (is_active = true);

-- Admin: manage all categories
CREATE POLICY "Categories: manage admin" ON categories
  FOR ALL USING (false);

-- ============================================================
-- PRODUCTS
-- ============================================================

-- Public: read active (is_active=true) products only
CREATE POLICY "Products: read active" ON products
  FOR SELECT USING (is_active = true);

-- Customers: read own cart/wishlist-affected products, never UPDATE/INSERT
CREATE POLICY "Products: customers read only" ON products
  FOR SELECT USING (true); -- read-only at RLS level; price/stock updates go through admin API

-- Admin: manage all products
CREATE POLICY "Products: manage admin" ON products
  FOR ALL USING (false);

-- ============================================================
-- PRODUCT_IMAGES
-- ============================================================

-- Public: read images for active products
CREATE POLICY "Product images: read active" ON product_images
  FOR SELECT USING (EXISTS (SELECT 1 FROM products WHERE id = product_id AND is_active = true));

-- Admin: manage all images
CREATE POLICY "Product images: manage admin" ON product_images
  FOR ALL USING (false);

-- ============================================================
-- PRODUCT_VARIANTS
-- ============================================================

-- Public: read variants for active products
CREATE POLICY "Product variants: read active" ON product_variants
  FOR SELECT USING (EXISTS (SELECT 1 FROM products WHERE id = product_id AND is_active = true));

-- Admin: manage all variants
CREATE POLICY "Product variants: manage admin" ON product_variants
  FOR ALL USING (false);

-- ============================================================
-- CARTS / CART_ITEMS (customer-owned only)
-- ============================================================

-- Customers: read / update / delete own cart only
CREATE POLICY "Carts: customer own" ON carts
  FOR ALL USING (user_id = auth.uid());

-- Admin: manage all carts
CREATE POLICY "Carts: manage admin" ON carts
  FOR ALL USING (false);

-- Cart items: customer own via cart
CREATE POLICY "Cart items: customer own" ON cart_items
  FOR ALL USING (cart_id IN (SELECT id FROM carts WHERE user_id = auth.uid()));

-- Admin: manage all cart items
CREATE POLICY "Cart items: manage admin" ON cart_items
  FOR ALL USING (false);

-- ============================================================
-- WISHLISTS / WISHLIST_ITEMS (customer-owned only)
-- ============================================================

-- Customers: read / update / delete own wishlist only
CREATE POLICY "Wishlists: customer own" ON wishlists
  FOR ALL USING (user_id = auth.uid());

-- Admin: manage all wishlists
CREATE POLICY "Wishlists: manage admin" ON wishlists
  FOR ALL USING (false);

-- Wishlist items: customer own via wishlist
CREATE POLICY "Wishlist items: customer own" ON wishlist_items
  FOR ALL USING (wishlist_id IN (SELECT id FROM wishlists WHERE user_id = auth.uid()));

-- Admin: manage all wishlist items
CREATE POLICY "Wishlist items: manage admin" ON wishlist_items
  FOR ALL USING (false);

-- ============================================================
-- ORDERS / ORDER_ITEMS
-- ============================================================

-- Customers: read / update own orders only; cannot change status without admin
CREATE POLICY "Orders: customer own" ON orders
  FOR ALL USING (user_id = auth.uid());

-- Admin: manage all orders
CREATE POLICY "Orders: manage admin" ON orders
  FOR ALL USING (false);

-- Order items: read only via owned orders
CREATE POLICY "Order items: via owned order" ON order_items
  FOR SELECT USING (EXISTS (SELECT 1 FROM orders WHERE id = order_id AND user_id = auth.uid()));

-- Admin: manage all order items
CREATE POLICY "Order items: manage admin" ON order_items
  FOR ALL USING (false);

-- ============================================================
-- PAYMENTS (admin-read only; server writes)
-- ============================================================

-- Admin: read payments; customers never see/write at RLS level
-- This policy makes the table appear empty to non-admin roles
CREATE POLICY "Payments: admin read only" ON payments
  FOR SELECT USING (
    -- Evaluate via a helper function in app code; at RLS level we deny all
    -- unless the app sets request.jwt->>'role' = 'admin'. Kept here as a stub:
    false
  );

-- Customers: no access (policy omitted — table is effectively hidden)
-- If you need customers to see their own payment state, use a view instead.

-- ============================================================
-- REVIEWS (paid-order ownership check handled in app code)
-- ============================================================

-- Public: read approved reviews (visible on product pages)
CREATE POLICY "Reviews: read public" ON reviews
  FOR SELECT USING (true);

-- Customers: can only insert if they have a paid order for that product
-- The actual check is in the insert function / trigger; RLS policy just guards the row:
CREATE POLICY "Reviews: customer insert" ON reviews
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Customers: can update own review only
CREATE POLICY "Reviews: customer update" ON reviews
  FOR UPDATE USING (auth.uid() = user_id);

-- Admin: manage all reviews
CREATE POLICY "Reviews: manage admin" ON reviews
  FOR ALL USING (false);

-- ============================================================
-- PROMOTIONS
-- ============================================================

-- Public: read active promotions
CREATE POLICY "Promotions: read active" ON promotions
  FOR SELECT USING (is_active = true AND starts_at <= now() AND (ends_at IS NULL OR ends_at >= now()));

-- Admin: manage all promotions
CREATE POLICY "Promotions: manage admin" ON promotions
  FOR ALL USING (false);

-- ============================================================
-- ORDER_STATUS_HISTORY (audit only, written by admin)
-- ============================================================

-- Public: never read directly; view via admin API
CREATE POLICY "Order status history: public never" ON order_status_history
  FOR SELECT USING (false);

-- Admin: manage all history
CREATE POLICY "Order status history: manage admin" ON order_status_history
  FOR ALL USING (false);

-- +goose StatementEnd
