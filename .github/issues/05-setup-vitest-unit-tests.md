### Problem

Repositori saat ini belum memiliki test runner atau unit test suite otomatis. Kontributor yang ingin mengubah fungsi logika compiler atau validator tidak dapat menguji apakah perubahan mereka menyebabkan regresi.

### Why

Automated testing adalah jaring pengaman paling krusial dalam open-source agar maintainer dapat me-merge PR dengan aman dan cepat.

### Current Behavior

Tidak ada skrip `npm test` di `package.json`.

### Expected Behavior

Terdapat test runner ringan (**Vitest**) dengan skrip `npm test` yang dapat dijalankan secara lokal maupun di CI GitHub Actions.

### Possible Approach

1. Pasang `vitest` sebagai dev dependency: `npm install -D vitest`.
2. Tambahkan skrip `"test": "vitest run"` dan `"test:watch": "vitest"` di `package.json`.
3. Buat file pengujian di `src/lib/__tests__/markdown.test.ts`:
   - Uji output `generateMarkdown` dengan kombinasi section yang di-disable/enable.
   - Uji `validateHeadingStructure` (deteksi tidak ada H1, deteksi level skip).
   - Uji `getDefaultChecklist`.
4. Tambahkan step `run: npm test` pada workflow `.github/workflows/ci.yml`.

### Acceptance Criteria

- [ ] Skrip `npm test` berjalan sukses dan melewati semua unit test.
- [ ] Test mencakup skenario sukses dan skenario edge cases.
- [ ] Workflow CI GitHub Actions otomatis menjalankan `npm test`.
