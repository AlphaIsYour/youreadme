### Problem

Beberapa tombol aksi di antarmuka editor hanya menggunakan ikon visual (misal tombol drag handle, tombol hapus section, tombol collapse/expand, dan tombol toggle sidebar) tanpa atribut `aria-label` yang ramah pembaca layar (_screen reader_).

### Why

Aplikasi open-source yang baik harus dapat diakses oleh semua developer, termasuk yang mengandalkan navigasi keyboard dan teknologi asistif (a11y).

### Current Behavior

Elemen `<button>` icon-only tidak memiliki nama aksesibel yang dibacakan oleh screen reader.

### Expected Behavior

Setiap tombol aksi memiliki `aria-label` yang jelas (contoh: `aria-label="Delete section"`, `aria-label="Drag to reorder"`), serta outline focus yang jelas saat dinavigasi menggunakan tombol `Tab`.

### Acceptance Criteria

- [ ] Semua tombol tanpa teks di `SectionEditor.tsx` dan `SortableSection.tsx` memiliki `aria-label` deskriptif.
- [ ] Pengguna dapat menavigasi dan mengaktifkan tombol dengan keyboard (`Tab`, `Space`, `Enter`).
