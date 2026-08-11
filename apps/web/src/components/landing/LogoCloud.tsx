import { Reveal } from "./Reveal";

const logos = ["Acme", "Lumen", "Northwind", "Vertex", "Nimbus", "Harbor", "Fathom", "Sable"];

export function LogoCloud() {
  return (
    <section className="border-y border-black/[0.05] bg-white/50 py-12">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <p className="text-center text-[13px] font-medium uppercase tracking-[0.14em] text-text-tertiary">
            Trusted by the teams shipping to billions of inboxes
          </p>
        </Reveal>
        <Reveal delay={100}>
          <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4 lg:grid-cols-8">
            {logos.map((name) => (
              <div
                key={name}
                className="flex items-center justify-center text-[15px] font-semibold tracking-tight text-text-tertiary opacity-60 transition-opacity hover:opacity-100 select-none"
              >
                {name}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}