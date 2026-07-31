# Mini Project Canvas PDF Download Specification

## Tujuan

Pada halaman:

`/ai-co-creation-lab-makassar/progress/mini-project-canvas`

harus tersedia tombol:

**Unduh Mini Project Canvas (PDF)**

File berbentuk PDF landscape bergaya presentasi, bukan file PowerPoint.

## File siap pakai

Paket telah menyediakan:

`AI-Co-Creation-Lab-Mini-Project-Canvas.pdf`

Salin ke:

`public/downloads/AI-Co-Creation-Lab-Mini-Project-Canvas.pdf`

Button harus menggunakan anchor/link download biasa agar stabil:

```tsx
<a
  href="/downloads/AI-Co-Creation-Lab-Mini-Project-Canvas.pdf"
  download
>
  Unduh Mini Project Canvas (PDF)
</a>
```

## Isi PDF

1. Cover
2. Problem
3. Solution
4. Stakeholder & Partnership
5. Output
6. Outcome
7. Timeline

## Ketentuan UI button

- gunakan icon download existing;
- letakkan pada action group header atau setelah ringkasan canvas;
- responsive;
- visible focus;
- tidak memakai client JavaScript jika anchor cukup;
- berikan ukuran file jika mudah dihitung;
- gunakan `aria-label` yang jelas;
- tracking event opsional: `download_mini_project_canvas_pdf`;
- link tidak boleh membuka 404.
