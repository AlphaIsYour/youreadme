### Problem

Saat ini, jika pengguna me-refresh browser atau tab tertutup tidak sengaja saat menyusun README, seluruh perubahan hilang dan kembali ke template default.

### Why

Kehilangan progres ketikan dokumentasi yang sudah panjang adalah pengalaman pengguna yang sangat membuat frustrasi.

### Current Behavior

State aplikasi hanya disimpan di memori React sementara.

### Expected Behavior

- Form input dan section tersimpan otomatis ke `localStorage` (dengan debounce 500ms agar performa tetap ringan).
- Saat halaman editor dibuka kembali, aplikasi otomatis memuat draft tersimpan jika ada.
- Tombol "Reset to Default" menampilkan dialog konfirmasi agar pengguna tidak sengaja menghapus draft.

### Acceptance Criteria

- [ ] Refresh halaman editor tidak menghilangkan data yang sudah diketik.
- [ ] Ada indikator status kecil ("Saved" / "Saving...").
- [ ] Tombol Reset meminta konfirmasi sebelum mengosongkan `localStorage`.
