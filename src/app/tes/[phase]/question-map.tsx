"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export type QuestionMapEntry = {
  id: string;
  answered: boolean;
};

function QuestionGrid({
  entries,
  activeIndex,
  onJump,
  id,
}: {
  entries: QuestionMapEntry[];
  activeIndex: number;
  onJump: (index: number) => void;
  id: string;
}) {
  return (
    <ul
      id={id}
      className="grid grid-cols-6 gap-2 sm:grid-cols-8 lg:grid-cols-4"
    >
      {entries.map((entry, index) => {
        const isActive = index === activeIndex;

        return (
          <li key={entry.id}>
            <button
              type="button"
              onClick={() => onJump(index)}
              aria-current={isActive ? "true" : undefined}
              aria-label={`Soal ${index + 1}${
                entry.answered ? ", sudah dijawab" : ", belum dijawab"
              }`}
              className={`grid h-11 w-full place-items-center content-center rounded-xl border text-sm font-semibold leading-none transition focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-100 ${
                isActive
                  ? "border-brand bg-brand text-white"
                  : entry.answered
                    ? "border-emerald-300 bg-emerald-50 text-emerald-700"
                    : "border-slate-200 bg-white text-slate-500"
              }`}
            >
              {index + 1}
              {/* Terjawab ditandai dua kali: hijau versus abu-abu justru pasangan
                  warna yang paling sering tertukar pada buta warna merah-hijau,
                  jadi titik ini yang membedakannya tanpa bergantung pada warna. */}
              <span
                aria-hidden="true"
                className={`mt-1 h-1 w-1 rounded-full ${
                  entry.answered
                    ? isActive
                      ? "bg-white"
                      : "bg-emerald-600"
                    : "bg-transparent"
                }`}
              />
            </button>
          </li>
        );
      })}
    </ul>
  );
}

/**
 * Collapsible map under the sticky header.
 *
 * It pushes the content down instead of covering it, which is why it is a
 * height animation and not a dialog: fifteen numbers do not justify a third
 * dialog implementation, and without an overlay there is nothing to trap focus
 * in or to lock scrolling for. `aria-expanded` on the trigger and
 * `aria-controls` pointing here carry the relationship instead.
 */
export function CollapsibleQuestionMap({
  open,
  entries,
  activeIndex,
  onJump,
  id,
}: {
  open: boolean;
  entries: QuestionMapEntry[];
  activeIndex: number;
  onJump: (index: number) => void;
  id: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <AnimatePresence initial={false}>
      {open ? (
        <motion.div
          key="question-map"
          initial={shouldReduceMotion ? false : { height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.22 }}
          className="overflow-hidden"
        >
          <div className="pb-3 pt-3">
            <QuestionGrid
              id={id}
              entries={entries}
              activeIndex={activeIndex}
              onJump={onJump}
            />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

/** Always-visible variant for the wide layout, where there is room beside the question. */
export function StaticQuestionMap({
  entries,
  activeIndex,
  onJump,
  id,
}: {
  entries: QuestionMapEntry[];
  activeIndex: number;
  onJump: (index: number) => void;
  id: string;
}) {
  return (
    <nav aria-label="Peta soal" className="w-44 shrink-0">
      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-500">
        Peta soal
      </p>
      <QuestionGrid
        id={id}
        entries={entries}
        activeIndex={activeIndex}
        onJump={onJump}
      />
    </nav>
  );
}
