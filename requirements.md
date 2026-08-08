Buatkan saya sebuah **web app checklist untuk menonton Marvel Cinematic Universe (MCU)** menggunakan **Next.js + Tailwind CSS + Zustand**.

## Tujuan Aplikasi

Aplikasi ini berfungsi sebagai **MCU Watchlist / Checklist**. User dapat melihat daftar film dan series MCU secara berurutan, melihat tanggal tayang dan sinopsis, lalu mencentang judul yang sudah ditonton.

Status checklist harus **tersimpan di browser menggunakan localStorage melalui Zustand**, sehingga ketika user menutup atau me-refresh halaman, progress menonton tetap tersimpan.

Buat aplikasi dengan UI modern, clean, responsive, dan terasa seperti aplikasi streaming/movie tracker.

---

# Tech Stack

Gunakan:

* Next.js versi terbaru dengan App Router
* TypeScript
* Tailwind CSS
* Zustand
* localStorage melalui Zustand persist middleware
* Lucide React untuk icon jika diperlukan

Jangan gunakan database atau backend untuk menyimpan progress user.

Gunakan Server Components secara default dan Client Components hanya ketika memang diperlukan, terutama untuk Zustand/localStorage dan interaksi checklist.

---

# Fitur Utama

## 1. MCU Watchlist

Tampilkan daftar MCU dalam urutan timeline menonton yang jelas.

Setiap item memiliki:

* Nomor urutan
* Judul
* Tahun tayang
* Tanggal tayang/perilisan
* Jenis: `Movie` atau `Series`
* Fase MCU
* Sinopsis
* Durasi/episode jika datanya tersedia
* Poster/thumbnail
* Status watched / belum ditonton
* Tombol checklist

Contoh tampilan:

[ ] 01. Iron Man
Movie • Phase One
2 May 2008

```
Tony Stark...

[ Tandai sudah ditonton ]
```

Ketika sudah ditonton:

[x] 01. Iron Man

Card memiliki visual berbeda, misalnya opacity sedikit berkurang atau muncul badge "Watched".

---

# 2. Data MCU

Buat data MCU dalam file terpisah, misalnya:

`src/data/mcu.ts`

Gunakan TypeScript type/interface.

Contoh struktur:

```ts
export type MCUItemType = "movie" | "series";

export interface MCUItem {
  id: string;
  title: string;
  releaseDate: string;
  year: number;
  type: MCUItemType;
  phase: string;
  synopsis: string;
  poster?: string;
  duration?: string;
  episodes?: number;
}
```

Isi data dengan MCU yang relevan untuk watchlist.

Prioritaskan **urutan timeline/cerita yang digunakan aplikasi**, bukan sekadar urutan tanggal rilis.

Namun berikan pilihan kepada user untuk mengganti mode:

* `Timeline Order`
* `Release Order`

Minimal data harus mencakup konten penting MCU dari awal sampai era terbaru yang relevan dengan Avengers: Doomsday.

Jika terdapat data yang belum pasti atau belum tersedia, jangan mengarang detail faktual. Gunakan placeholder yang jelas atau tandai datanya untuk dilengkapi kemudian.

---

# 3. Fokus pada Avengers: Doomsday

Tambahkan bagian khusus:

## "Road to Avengers: Doomsday"

Tampilkan progress user menuju:

**Avengers: Doomsday**

Contoh:

```text
ROAD TO AVENGERS: DOOMSDAY

12 / 25 watched

████████████░░░░░░░░ 48%

24 titles remaining
```

Buat daftar "essential watch" yang terpisah dari daftar MCU lengkap.

Misalnya data dapat memiliki:

```ts
essentialForDoomsday: boolean;
```

Kemudian user dapat memilih:

* All MCU
* Essential for Doomsday

Jangan menganggap semua konten MCU wajib untuk memahami Doomsday.

---

# 4. Progress Tracking

Gunakan Zustand.

Buat store:

`src/store/watchlist-store.ts`

Gunakan:

```ts
persist(...)
```

dengan localStorage.

Contoh state:

```ts
interface WatchlistState {
  watchedIds: string[];
  toggleWatched: (id: string) => void;
  markAsWatched: (id: string) => void;
  markAsUnwatched: (id: string) => void;
  resetProgress: () => void;
}
```

Storage key:

```text
mcu-watchlist
```

Pastikan hydration dari localStorage ditangani dengan baik sehingga tidak terjadi hydration mismatch pada Next.js.

---

# 5. Progress Dashboard

Di bagian atas halaman tampilkan summary:

```text
MCU WATCHLIST

23 / 87 watched

26% completed
```

Tambahkan:

* Progress bar
* Jumlah watched
* Jumlah remaining
* Persentase completion

Jika filter "Essential" aktif, progress juga harus dihitung berdasarkan item yang sedang ditampilkan.

---

# 6. Search

Tambahkan search bar.

User dapat mencari berdasarkan:

* Judul
* Sinopsis

Contoh:

```text
Search MCU...
```

Search harus bekerja secara client-side.

---

# 7. Filter

Tambahkan filter:

### Status

* All
* Watched
* Unwatched

### Type

* All
* Movies
* Series

### Phase

* All
* Phase One
* Phase Two
* Phase Three
* Phase Four
* Phase Five
* Phase Six

### Importance

* All
* Essential for Doomsday

---

# 8. Sorting / Order

Berikan toggle:

```text
Timeline Order | Release Order
```

Default:

`Timeline Order`

Jangan mengubah data asli; gunakan sorting/filtering di layer UI.

---

# 9. MCU Item Card

Buat komponen reusable:

`src/components/mcu-item-card.tsx`

Card harus memiliki:

* Poster
* Number
* Title
* Release date
* Type badge
* Phase badge
* Synopsis
* Watched checkbox/button

Desain:

* Dark theme
* Background hitam/abu gelap
* Border subtle
* Rounded corners
* Hover effect
* Accent warna merah Marvel
* Responsive
* Mobile friendly

Contoh:

```text
┌───────────────────────────────────────┐
│ [POSTER]  01                         │
│           Iron Man                    │
│           Movie • Phase One           │
│           2 May 2008                  │
│                                      │
│           Tony Stark, billionaire... │
│                                      │
│           ☑ Watched                   │
└───────────────────────────────────────┘
```

Jangan membuat desain terlalu ramai.

---

# 10. Detail View

Ketika user mengklik sebuah item, tampilkan detail.

Bisa menggunakan modal atau expandable card.

Detail berisi:

* Poster
* Judul
* Tanggal tayang
* Tahun
* Type
* Phase
* Sinopsis
* Durasi
* Jumlah episode jika series
* Status watched
* Tombol Mark as Watched

Gunakan URL query atau modal sesuai pendekatan Next.js yang paling sederhana dan maintainable.

---

# 11. Header

Buat header:

```text
MCU WATCHLIST
```

Navigation:

* Watchlist
* Essential
* Progress

Di kanan:

```text
23 / 87 watched
```

Pada mobile, gunakan menu yang sederhana.

---

# 12. Hero Section

Buat hero section di halaman utama:

```text
THE ULTIMATE MCU WATCHLIST

Track your journey through the Marvel Cinematic Universe.

From Iron Man to Avengers: Doomsday.

[ Start Watching ]
```

Tambahkan progress user.

Jangan menggunakan gambar copyrighted dari internet secara otomatis jika tidak tersedia.

Gunakan placeholder poster atau gradient background jika asset poster belum disediakan.

Buat sistem asset yang mudah diganti nanti:

```text
public/
  posters/
    iron-man.jpg
    incredible-hulk.jpg
    ...
```

Jika poster belum tersedia, card harus tetap terlihat bagus menggunakan fallback gradient dan inisial/judul film.

---

# 13. Responsive Design

Pastikan aplikasi optimal untuk:

* Desktop
* Tablet
* Mobile

Desktop:

* Grid 3 atau 4 card

Tablet:

* Grid 2 card

Mobile:

* 1 card per row

Gunakan Tailwind responsive utilities.

---

# 14. Accessibility

Pastikan:

* Checkbox memiliki label
* Button memiliki accessible name
* Keyboard navigation bekerja
* Kontras warna cukup baik
* Jangan hanya menggunakan warna untuk menunjukkan watched/unwatched
* Gunakan semantic HTML

---

# 15. Empty State

Jika search/filter tidak menghasilkan data, tampilkan:

```text
No MCU titles found.

Try another search or change your filters.
```

Tambahkan tombol:

`Clear Filters`

---

# 16. Reset Progress

Tambahkan tombol:

`Reset Progress`

Ketika ditekan, tampilkan confirmation dialog:

```text
Reset your MCU progress?

This will mark all titles as unwatched.

[Cancel] [Reset Progress]
```

Jangan langsung menghapus progress tanpa konfirmasi.

---

# 17. Architecture

Gunakan struktur folder yang clean:

```text
src/
  app/
    layout.tsx
    page.tsx
    globals.css

  components/
    header.tsx
    hero.tsx
    progress-bar.tsx
    filter-bar.tsx
    search-bar.tsx
    mcu-list.tsx
    mcu-item-card.tsx
    mcu-detail.tsx
    empty-state.tsx
    reset-progress-dialog.tsx

  data/
    mcu.ts

  store/
    watchlist-store.ts

  types/
    mcu.ts

  lib/
    utils.ts
```

Sesuaikan struktur jika ada pendekatan Next.js yang lebih baik.

Jaga component boundaries tetap masuk akal. Jangan membuat semua kode berada dalam `page.tsx`.

---

# 18. State Management

Jangan menggunakan React Context untuk watchlist.

Gunakan Zustand.

Contoh:

```ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useWatchlistStore = create<WatchlistState>()(
  persist(
    (set) => ({
      watchedIds: [],

      toggleWatched: (id) =>
        set((state) => ({
          watchedIds: state.watchedIds.includes(id)
            ? state.watchedIds.filter((item) => item !== id)
            : [...state.watchedIds, id],
        })),

      markAsWatched: (id) =>
        set((state) => ({
          watchedIds: state.watchedIds.includes(id)
            ? state.watchedIds
            : [...state.watchedIds, id],
        })),

      markAsUnwatched: (id) =>
        set((state) => ({
          watchedIds: state.watchedIds.filter((item) => item !== id),
        })),

      resetProgress: () => set({ watchedIds: [] }),
    }),
    {
      name: "mcu-watchlist",
    }
  )
);
```

Perhatikan bahwa contoh di atas hanya referensi. Implementasikan dengan TypeScript yang proper.

---

# 19. Performance

Perhatikan performance:

* Gunakan Server Components jika memungkinkan.
* Client-side state hanya untuk interactive components.
* Jangan membuat seluruh app menjadi `"use client"` tanpa alasan.
* Gunakan `useMemo` hanya jika memang diperlukan.
* Jangan melakukan filtering/sorting berulang yang tidak perlu.
* Gunakan stable keys.
* Jika daftar MCU menjadi sangat panjang, pertimbangkan apakah virtualized list diperlukan, tetapi jangan menambah dependency jika belum diperlukan.

---

# 20. SEO

Tambahkan metadata Next.js:

Title:

`MCU Watchlist — Marvel Cinematic Universe Checklist`

Description:

`Track your Marvel Cinematic Universe watchlist, mark movies and series as watched, and follow your journey toward Avengers: Doomsday.`

Gunakan metadata API Next.js.

---

# 21. Visual Design

Gunakan dark cinematic UI.

Inspirasi visual:

* Movie streaming platform
* IMDb-style information density
* Modern dashboard
* Marvel-inspired red accent

Gunakan:

* Dark background
* White text
* Gray secondary text
* Red accent
* Subtle borders
* Rounded cards
* Smooth hover/transition
* Progress bar
* Badge

Hindari:

* Excessive gradients
* Glassmorphism berlebihan
* Animasi berlebihan
* Layout yang terlalu padat
* Font yang sulit dibaca

---

# 22. Initial Setup

Jika project belum ada:

1. Buat project Next.js dengan TypeScript.
2. Install Tailwind CSS.
3. Install Zustand.
4. Install lucide-react.
5. Setup seluruh konfigurasi yang diperlukan.
6. Jalankan project.
7. Pastikan `npm run build` berhasil.

Jika project sudah ada, jangan menghapus konfigurasi existing yang masih relevan.

---

# 23. Data Accuracy

Ini penting.

Jangan mengarang tanggal rilis atau sinopsis.

Untuk data yang digunakan:

* Gunakan tanggal rilis resmi.
* Gunakan sinopsis ringkas/parafrase, bukan copy-paste panjang dari sumber.
* Bedakan tanggal rilis film dan series dengan benar.
* Untuk series, tanggal yang ditampilkan dapat berupa tanggal premiere.
* Pastikan phase dan urutan MCU masuk akal.
* Jika informasi sebuah proyek belum pasti, tandai dengan jelas daripada mengarang.

Untuk `Avengers: Doomsday`, perlakukan sebagai target/endpoint watchlist dan jangan mengarang plot cerita.

---

# 24. Testing

Setelah implementasi:

* Jalankan lint
* Jalankan TypeScript check
* Jalankan production build

Perbaiki semua error.

Pastikan:

1. Checklist dapat dicentang.
2. Checklist dapat di-uncheck.
3. Refresh browser tidak menghilangkan progress.
4. Search bekerja.
5. Filter bekerja.
6. Progress bar berubah.
7. Reset progress bekerja.
8. Responsive layout bekerja.
9. Tidak ada hydration mismatch.
10. `npm run build` berhasil.

---

# 25. Deliverables

Saya ingin hasil akhirnya berupa aplikasi yang benar-benar runnable, bukan sekadar contoh kode.

Setelah selesai:

1. Jelaskan file apa saja yang dibuat/diubah.
2. Jelaskan cara menjalankan project.
3. Jelaskan cara kerja Zustand + localStorage.
4. Jelaskan bagaimana menambahkan film/series MCU baru ke data.
5. Berikan ringkasan fitur yang sudah selesai.
6. Pastikan project dapat dijalankan dengan:

```bash
npm install
npm run dev
```

dan production build dengan:

```bash
npm run build
npm start
```

Mulai dengan memeriksa kondisi project saat ini. Jika project kosong, setup dari awal. Jika sudah memiliki kode, pertahankan kode yang baik dan integrasikan fitur di atas.

Jangan berhenti pada planning. **Implementasikan seluruh web app sampai runnable.**

