### Problem

Di `renderHeader()` pada `src/lib/markdown.ts`, URL badge Shields.io dibuat langsung menggunakan string template:

```ts
header += `![Version](https://img.shields.io/badge/version-${project.version}-blue) `;
header += `![License](https://img.shields.io/badge/license-${project.license}-green) `;
```

Jika pengguna memasukkan nama lisensi seperti `Apache 2.0` (ada spasi) atau versi seperti `v1.0.0-beta/1` (ada tanda slash), URL gambar Shields.io menjadi rusak (_broken image link_).

### Why

Shields.io mewajibkan karakter khusus seperti spasi atau tanda hubung di-encode (misal spasi diubah menjadi `%20` atau `_`).

### Current Behavior

Spasi dan karakter khusus menyebabkan gambar badge gagal di-render di preview markdown.

### Expected Behavior

Badge Shields.io tetap tampil valid meskipun input pengguna mengandung spasi atau karakter khusus.

### Possible Approach

Gunakan helper encode URL seperti `encodeURIComponent()` atau format penggantian Shields.io (mengganti `-` menjadi `--` dan spasi menjadi `_` sesuai spesifikasi Shields.io).

### Acceptance Criteria

- [ ] Lisensi dengan spasi seperti `Apache 2.0` atau `GPL v3` menghasilkan badge yang valid.
- [ ] Versi dengan tag semver kompleks tetap ter-render dengan sempurna.
