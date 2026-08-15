import { Lock } from "iconoir-react";
import type { Metadata } from "next";

import { Card, PageHeader } from "@/components/admin/ui";
import { EmptyState } from "@/components/ui/empty-state";
import { requireAdmin } from "@/lib/admin/auth";
import { listQuestions } from "@/lib/assessment/questions";

import { AssessmentTabs } from "../assessment-tabs";

import { AddQuestionForm, QuestionCard } from "./question-editor";

export const metadata: Metadata = {
  title: "Kelola Soal",
  robots: { index: false, follow: false },
};

export default async function AssessmentQuestionsPage() {
  // Re-checked per page rather than relying only on the layout: client-side
  // navigation can render a page without re-executing an unchanged layout.
  await requireAdmin();

  const result = await listQuestions();

  return (
    <>
      <PageHeader
        title="Pre-test & Post-test"
        description="Satu bank soal dipakai bersama oleh pre-test dan post-test. Urutannya diacak per peserta saat mereka mulai."
      />

      <AssessmentTabs active="/admin/assessment/soal" />

      {!result.ok ? (
        <EmptyState title="Gagal memuat soal" description={result.message} />
      ) : (
        <div className="space-y-6">
          {result.frozen ? (
            <div className="flex items-start gap-2.5 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-900">
              <Lock className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <p>
                Soal terkunci karena sudah ada peserta yang mengerjakan tes.
                Mengubah soal sekarang akan membuat nilai yang sudah tersimpan
                tidak lagi sebanding. Untuk membukanya kembali, reset data
                pengerjaan dari halaman Ringkasan — dan itu menghapus seluruh
                nilai peserta.
              </p>
            </div>
          ) : null}

          {result.questions.length === 0 ? (
            <EmptyState
              title="Belum ada soal"
              description="Tambahkan soal pertama di bawah. Tes belum bisa dibuka sampai setiap soal punya minimal dua opsi dan tepat satu kunci jawaban."
            />
          ) : (
            <div className="space-y-3">
              {result.questions.map((question, index) => (
                <QuestionCard
                  key={question.id}
                  question={question}
                  number={index + 1}
                  frozen={result.frozen}
                  isFirst={index === 0}
                  isLast={index === result.questions.length - 1}
                />
              ))}
            </div>
          )}

          <Card
            title="Tambah soal"
            description="Soal baru masuk ke urutan paling akhir."
          >
            <AddQuestionForm
              frozen={result.frozen}
              dimensions={[
                ...new Set(
                  result.questions
                    .map((question) => question.dimension)
                    .filter((dimension): dimension is string =>
                      Boolean(dimension),
                    ),
                ),
              ]}
            />
          </Card>
        </div>
      )}
    </>
  );
}
