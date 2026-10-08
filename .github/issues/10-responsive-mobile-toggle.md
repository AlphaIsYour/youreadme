### Problem

Pada layar smartphone / tablet (layar < 1024px), antarmuka editor dan preview terasa sempit atau memerlukan scrolling horizontal/vertikal bertumpuk.

### Why

Banyak kontributor menginspeksi atau mengedit dokumentasi melalui perangkat portabel atau layar laptop berukuran kecil.

### Current Behavior

Tampilan responsif saat ini menyembunyikan sebagian panel atau membuat tampilan bertumpuk panjang.

### Expected Behavior

Pada viewport layar kecil (`< lg`), sediakan bottom navigation bar atau floating segment switch (`[Edit] | [Preview]`) yang membuat pengguna dapat beralih tampilan secara penuh dan nyaman dengan satu sentuhan.

### Acceptance Criteria

- [ ] Tampilan editor dan preview memiliki pengalaman mulus tanpa scroll horizontal di layar mobile (resolusi 375px - 768px).
- [ ] Transisi antar tab terasa instan dan tidak merusak layout.
