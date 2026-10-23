import { site } from "@/lib/site";
import { ButtonExternal, ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { ProductArt } from "@/components/product/ProductArt";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line bg-canvas">
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-80" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -right-24 size-80 rounded-pill bg-brand/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-24 size-72 rounded-pill bg-brand/10 blur-3xl"
      />

      <div className="shell relative py-9 md:py-14">
        <div className="grid items-center gap-8 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-7">
            <p className="label flex items-center gap-2 text-brand-ink">
              <span aria-hidden="true" className="inline-block h-2.5 w-2.5 bg-brand" />
              Bicycle parts &amp; cycling gear · Kenya
            </p>

            <h1 className="mt-4 font-display text-display uppercase text-ink">
              Ride further.
              <br />
              <span className="text-brand-ink">Ride better.</span>
            </h1>

            <p className="mt-4 max-w-md text-body text-ink-2">
              Genuine drivetrain, brake, MTB and safety-gear stock for Kenyan
              riders. Priced in {site.currency}, paid by M-Pesa, delivered from
              Kilifi to your door.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <ButtonLink href="/shop" size="lg">
                Shop parts
                <Icon name="arrowRight" className="size-4" />
              </ButtonLink>
              <ButtonExternal href={site.phoneHref} size="lg">
                <Icon name="phone" className="size-4" />
                Call the shop
              </ButtonExternal>
            </div>

            <ul className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] uppercase tracking-[0.12em] text-ink-3">
              <li className="flex items-center gap-1.5">
                <Icon name="wallet" className="size-3.5 text-brand-ink" /> M-Pesa
              </li>
              <li className="flex items-center gap-1.5">
                <Icon name="truck" className="size-3.5 text-brand-ink" /> Nationwide
                delivery
              </li>
              <li className="flex items-center gap-1.5">
                <Icon name="pin" className="size-3.5 text-brand-ink" /> Mavueni,
                Kilifi
              </li>
            </ul>
          </div>

          <div className="hidden md:col-span-5 md:block">
            <div className="relative overflow-hidden rounded-md border border-line bg-surface">
              <div className="grid-lines absolute inset-0" />
              <ProductArt
                kind="chainring"
                className="relative m-auto mt-8 h-52 w-full max-w-64 text-ink-3"
              />
              <div className="relative border-t border-line bg-surface-2/70 p-4">
                <p className="label text-brand-ink">In stock now</p>
                <p className="mt-1 text-small text-ink-2">
                  Brakes, drivetrain, tyres, helmets and workshop tools ready for
                  same-day dispatch from Kilifi.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
