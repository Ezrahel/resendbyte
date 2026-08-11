import { Reveal } from "./Reveal";

const testimonials = [
  {
    quote:
      "We moved 2M emails a month to ResendByte in an afternoon. Deliverability went up and our ops team stopped paging about mail.",
    name: "Priya Sharma",
    role: "Co-founder & CTO, Lumen",
    initials: "PS",
  },
  {
    quote:
      "The failover is invisible until you need it — then it's the best thing you've ever used. One provider went down and we never noticed.",
    name: "Daniel Okafor",
    role: "Head of Platform, Northwind",
    initials: "DO",
  },
  {
    quote:
      "Finally an email API that respects developers. The SDK, the docs, the event model — everything just makes sense.",
    name: "Elena Petrova",
    role: "Staff Engineer, Vertex",
    initials: "EP",
  },
];

export function Testimonials() {
  return (
    <section className="border-y border-black/[0.05] bg-white/50 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="text-center">
          <p className="text-[13px] font-medium uppercase tracking-[0.14em] text-brand-600">Loved by builders</p>
          <h2 className="mx-auto mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
            Teams ship email on ResendByte
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 80}>
              <figure className="glass flex h-full flex-col rounded-2xl p-6">
                <blockquote className="flex-1 text-[15px] leading-relaxed text-text-primary">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3 border-t border-black/[0.05] pt-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-[13px] font-semibold text-white">
                    {t.initials}
                  </span>
                  <div>
                    <div className="text-[14px] font-semibold text-text-primary">{t.name}</div>
                    <div className="text-[13px] text-text-tertiary">{t.role}</div>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}