-- =====================================================================
-- Seed instrumen AI Co-Creation Lab Makassar — 21 soal
--
-- Ini ISI, bukan skema. Dijalankan terpisah dari migrasi, dan boleh
-- dijalankan ulang setelah reset. Memasukkan ~100 baris opsi lewat panel
-- admin satu per satu tidak masuk akal; panel tetap dipakai untuk koreksi.
--
-- PRASYARAT: bank soal harus kosong. Kalau masih ada soal, jalankan reset
-- data pengerjaan dari /admin/assessment lebih dulu (dialognya mewajibkan
-- ekspor CSV kalau sudah ada nilai), lalu hapus soal lama dari panel.
--
-- Susunan urutan:
--   0-11  Likert, kedua phase   (12 pernyataan inti)
--   12-15 Pilihan berskor, kedua phase (4 soal pengetahuan)
--   16-19 Likert, khusus post-test
--   20    Pilihan tanpa skor, khusus post-test (minat technical steward)
-- =====================================================================

do $$
declare
  v_event_id uuid;
begin
  select e.id into v_event_id
  from public.events e
  where e.slug = 'ai-co-creation-lab-makassar';

  if v_event_id is null then
    raise exception 'Event tidak ditemukan. Sesuaikan slug di skrip ini.';
  end if;

  if exists (
    select 1 from public.assessment_questions q where q.event_id = v_event_id
  ) then
    raise exception
      'Bank soal belum kosong. Hapus soal lama dulu supaya urutan tidak bentrok.';
  end if;

  -- -------------------------------------------------------------------
  -- Soal
  -- -------------------------------------------------------------------
  insert into public.assessment_questions
    (event_id, prompt, order_index, points, question_type, phase_scope, category)
  select
    v_event_id, s.prompt, s.ord, 1,
    s.qtype::public.assessment_question_type, s.scope, s.category
  from (values
    ('Saya mampu mengidentifikasi masalah utama yang benar-benar dialami oleh pengguna sebelum menentukan solusi teknologi.', 0, 'likert', 'both', 'Problem Understanding'),
    ('Saya mampu membedakan antara masalah pengguna dan sekadar permintaan fitur.', 1, 'likert', 'both', 'Problem vs Feature'),
    ('Saya terbiasa mempertimbangkan kebutuhan dan kebiasaan pengguna sebelum mulai membangun sebuah sistem.', 2, 'likert', 'both', 'User-Centered Thinking'),
    ('Saya mampu menggali kebutuhan pengguna melalui diskusi, observasi, dan pertanyaan yang relevan.', 3, 'likert', 'both', 'Problem Validation'),
    ('Saya mampu menentukan fitur paling penting yang harus dibuat terlebih dahulu sebagai Minimum Viable Product (MVP).', 4, 'likert', 'both', 'MVP Thinking'),
    ('Saya mampu menggunakan AI bukan hanya untuk tugas atau brainstorming, tetapi untuk membantu menyelesaikan masalah nyata.', 5, 'likert', 'both', 'AI for Real Problem Solving'),
    ('Saya percaya diri menggunakan AI untuk membantu mengubah ide menjadi prototype atau solusi digital yang dapat digunakan.', 6, 'likert', 'both', 'AI-Assisted Building'),
    ('Saya mampu mengevaluasi hasil dari AI dan tidak langsung menerima output AI tanpa melakukan pengecekan atau penyesuaian.', 7, 'likert', 'both', 'Critical Use of AI'),
    ('Saya memahami cara menguji prototype bersama pengguna nyata dan menggunakan feedback mereka untuk melakukan perbaikan.', 8, 'likert', 'both', 'Real-User Testing'),
    ('Saya percaya diri berdiskusi dan bekerja bersama pengguna atau pelaku UMKM yang memiliki latar belakang berbeda dengan saya.', 9, 'likert', 'both', 'Collaboration'),
    ('Saya mampu menjelaskan solusi teknologi kepada pengguna non-teknis dengan bahasa yang sederhana dan mudah dipahami.', 10, 'likert', 'both', 'Communicating Technology'),
    ('Saya percaya diri dapat menggunakan teknologi dan AI untuk membantu menyelesaikan permasalahan nyata di masyarakat.', 11, 'likert', 'both', 'Overall Confidence'),

    ('Ketika pertama kali menerima permasalahan dari UMKM, langkah yang paling tepat adalah…', 12, 'scored_choice', 'both', 'Knowledge'),
    ('Dalam co-creation, MVP paling tepat diartikan sebagai…', 13, 'scored_choice', 'both', 'Knowledge'),
    ('UMKM meminta 10 fitur, tetapi waktu pengembangan sangat terbatas. Apa langkah terbaik?', 14, 'scored_choice', 'both', 'Knowledge'),
    ('Prototype berhasil secara teknis, tetapi UMKM kesulitan menggunakannya. Apa tindakan yang paling tepat?', 15, 'scored_choice', 'both', 'Knowledge'),

    ('Setelah mengikuti AI Co-Creation Lab, saya merasa lebih memahami bagaimana teknologi dapat digunakan untuk menyelesaikan masalah nyata, bukan hanya untuk tugas akademik.', 16, 'likert', 'post_test', 'Real Problem Experience'),
    ('Interaksi langsung dengan UMKM membantu saya memahami bahwa solusi yang baik harus dimulai dari kebutuhan pengguna.', 17, 'likert', 'post_test', 'UMKM Interaction'),
    ('Pengalaman membangun prototype langsung bersama UMKM meningkatkan kepercayaan diri saya untuk mengerjakan real project berikutnya.', 18, 'likert', 'post_test', 'Building Experience'),
    ('Setelah kegiatan ini, saya tertarik menggunakan skill teknologi/AI saya untuk membantu menyelesaikan masalah nyata lainnya.', 19, 'likert', 'post_test', 'Future Application'),

    ('Jika diberikan kesempatan, saya bersedia melanjutkan keterlibatan sebagai technical steward/developer untuk membantu maintenance dan improvement sistem UMKM setelah kegiatan.', 20, 'unscored_choice', 'post_test', 'Technical Steward Interest')
  ) as s(prompt, ord, qtype, scope, category);

  -- -------------------------------------------------------------------
  -- Opsi Likert — sama untuk seluruh pernyataan skala
  -- -------------------------------------------------------------------
  insert into public.assessment_options (question_id, body, order_index, is_correct, value)
  select q.id, l.body, l.ord, false, l.val
  from public.assessment_questions q
  cross join (values
    ('Sangat Tidak Setuju', 0, 1),
    ('Tidak Setuju',        1, 2),
    ('Netral',              2, 3),
    ('Setuju',              3, 4),
    ('Sangat Setuju',       4, 5)
  ) as l(body, ord, val)
  where q.event_id = v_event_id
    and q.question_type = 'likert';

  -- -------------------------------------------------------------------
  -- Opsi soal pengetahuan dan pilihan tanpa skor
  -- -------------------------------------------------------------------
  insert into public.assessment_options (question_id, body, order_index, is_correct)
  select q.id, o.body, o.ord, o.correct
  from public.assessment_questions q
  join (values
    (12, 'Langsung menentukan framework teknologi', 0, false),
    (12, 'Membuat sebanyak mungkin fitur', 1, false),
    (12, 'Memahami masalah, workflow, dan kebutuhan pengguna terlebih dahulu', 2, true),
    (12, 'Meminta AI membuat aplikasi lengkap', 3, false),

    (13, 'Sistem dengan seluruh fitur yang diminta pengguna', 0, false),
    (13, 'Versi paling sederhana yang sudah dapat menguji dan menyelesaikan kebutuhan utama pengguna', 1, true),
    (13, 'Prototype dengan desain terbaik', 2, false),
    (13, 'Sistem yang menggunakan teknologi paling canggih', 3, false),

    (14, 'Membuat semua fitur dengan AI', 0, false),
    (14, 'Memilih fitur yang paling mudah dibuat', 1, false),
    (14, 'Mengidentifikasi masalah utama bersama UMKM dan memprioritaskan core flow yang paling penting', 2, true),
    (14, 'Menghapus kebutuhan UMKM yang sulit', 3, false),

    (15, 'Menjelaskan bahwa pengguna harus belajar menggunakan sistem', 0, false),
    (15, 'Menambah lebih banyak fitur', 1, false),
    (15, 'Mengganti teknologi yang digunakan', 2, false),
    (15, 'Melakukan user testing, memahami bagian yang membingungkan, kemudian menyederhanakan flow', 3, true),

    (20, 'Sangat bersedia', 0, false),
    (20, 'Bersedia', 1, false),
    (20, 'Mungkin', 2, false),
    (20, 'Tidak bersedia', 3, false)
  ) as o(q_ord, body, ord, correct) on o.q_ord = q.order_index
  where q.event_id = v_event_id;

  raise notice 'Seed selesai: % soal.',
    (select count(*) from public.assessment_questions where event_id = v_event_id);
end $$;
