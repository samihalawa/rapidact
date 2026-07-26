import { SPECIALIST, HAS_NAMED_SPECIALIST } from "@/data/company";
import { REPORT } from "@/config";

/**
 * Who performs the assessment.
 *
 * Renders nothing at all until a real person is named in src/data/company.ts.
 * An anonymous "trusted by experts" block would be worse than no block: it is
 * precisely the unfalsifiable claim that makes a page read as machine-made.
 */
export default function Specialist() {
  if (!HAS_NAMED_SPECIALIST) return null;

  return (
    <section id="who" className="paper hairline border-b py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="eyebrow">Who performs the assessment</p>

        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_1.6fr] lg:gap-14">
          <div className="flex items-start gap-4">
            {SPECIALIST.photo && (
              <img
                src={SPECIALIST.photo}
                alt={SPECIALIST.name}
                className="hairline h-20 w-20 shrink-0 border object-cover grayscale"
              />
            )}
            <div>
              <p className="ink text-lg font-semibold">{SPECIALIST.name}</p>
              {SPECIALIST.role && <p className="ink-soft text-sm">{SPECIALIST.role}</p>}
              {SPECIALIST.linkedin && (
                <a
                  href={SPECIALIST.linkedin}
                  target="_blank"
                  rel="noopener"
                  className="accent mt-1.5 inline-block text-sm underline underline-offset-2"
                >
                  Verify this profile
                </a>
              )}
            </div>
          </div>

          <div>
            {SPECIALIST.bio && (
              <p className="ink-soft text-[15px] leading-relaxed">{SPECIALIST.bio}</p>
            )}
            <p className="ink-soft mt-4 text-[15px] leading-relaxed">
              Your assessment is read and written by a person, not generated and sent unread. The
              report arrives from an address that a human monitors, and you can reply to it with
              follow-up questions about your own case at no extra cost.
            </p>
            {SPECIALIST.email && (
              <p className="ink-soft mt-4 text-[15px] leading-relaxed">
                Questions before you buy:{" "}
                <a
                  href={`mailto:${SPECIALIST.email}`}
                  className="accent font-medium underline underline-offset-2"
                >
                  {SPECIALIST.email}
                </a>
                . Replies normally come the same working day, and always inside the{" "}
                {REPORT.delivery} window we hold ourselves to for reports.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
