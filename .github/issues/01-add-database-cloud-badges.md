### Problem

Katalog badge di `src/data/badges.ts` saat ini baru mencakup kategori dasar (_Frameworks_, _Languages_, _Tools_, _License_, _Status_). Kategori penting seperti **Database** (PostgreSQL, MySQL, MongoDB, Redis, Supabase) dan **DevOps / Cloud** (Docker, Kubernetes, AWS, Cloudflare, Vercel) belum tersedia.

### Why

Banyak project open-source menggunakan database dan layanan cloud yang ingin mereka pamerkan di barisan status badge README.

### Current Behavior

Hanya ada 5 kategori badge bawaan di `BadgePicker.tsx`.

### Expected Behavior

Badge Picker memiliki kategori baru seperti `Database` dan `Cloud & DevOps` dengan logo dan warna resmi Shields.io.

### Possible Approach

1. Buka `src/data/badges.ts`.
2. Tambahkan objek badge baru mengikuti tipe `Badge`:
   ```ts
   {
     id: 'badge-postgresql',
     label: 'PostgreSQL',
     message: 'PostgreSQL',
     color: '4169e1',
     logo: 'postgresql',
     logoColor: 'white',
     category: 'Database',
   }
   ```
3. Tambahkan minimal 8–10 badge populer (PostgreSQL, MySQL, Redis, MongoDB, Supabase, Docker, Kubernetes, AWS, Cloudflare).

### Acceptance Criteria

- [ ] Badge baru muncul di modal `BadgePicker` pada kategori yang sesuai.
- [ ] Preview badge Shields.io dapat dimuat dengan benar.
- [ ] `npm run lint` dan `npm run build` berhasil tanpa error.
