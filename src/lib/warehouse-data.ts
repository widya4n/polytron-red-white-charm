export type Kondisi = "Good" | "Rusak" | "Karantina";

export type StockRow = {
  tipe: string;
  kondisi: Kondisi;
  jumlah: number;
  unit: string;
};

export const CAPACITY = 21800;

export const stock: StockRow[] = [
  { tipe: "BOX CORRUGATED", kondisi: "Good", jumlah: 878, unit: "box" },
  { tipe: "BOX MODULE", kondisi: "Good", jumlah: 191, unit: "box" },
  { tipe: "COLLY", kondisi: "Good", jumlah: 81, unit: "pcs" },
  { tipe: "KARTON", kondisi: "Good", jumlah: 11810, unit: "box" },
  { tipe: "KERANJANG PLASTIK", kondisi: "Good", jumlah: 80, unit: "pcs" },
  { tipe: "PALLET", kondisi: "Good", jumlah: 94, unit: "pallet" },
  { tipe: "PETI", kondisi: "Good", jumlah: 13, unit: "pcs" },
  { tipe: "POLYFOAM", kondisi: "Good", jumlah: 192, unit: "pcs" },
  { tipe: "SHRINK WRAP", kondisi: "Karantina", jumlah: 18, unit: "roll" },
];

export const totalStock = stock.reduce((sum, row) => sum + row.jumlah, 0);
export const usedPercent = (totalStock / CAPACITY) * 100;

export type Trx = {
  tanggal: string;
  barcode: string;
  tipe: string;
  pihak: string;
  kondisi: Kondisi;
  petugas: string;
  qty: number;
};

export const incoming: Trx[] = [
  {
    tanggal: "21 Aug 2026 · 08:14",
    barcode: "PLT-KRT-0093214",
    tipe: "KARTON",
    pihak: "PT Sinar Kemas Nusantara",
    kondisi: "Good",
    petugas: "Admin Utama",
    qty: 420,
  },
  {
    tanggal: "21 Aug 2026 · 07:02",
    barcode: "PLT-PLT-0011876",
    tipe: "PALLET",
    pihak: "CV Kayu Jaya Abadi",
    kondisi: "Good",
    petugas: "Rizky H.",
    qty: 24,
  },
  {
    tanggal: "20 Aug 2026 · 16:38",
    barcode: "PLT-PLF-0045512",
    tipe: "POLYFOAM",
    pihak: "PT Foamindo Prima",
    kondisi: "Karantina",
    petugas: "Dewi S.",
    qty: 60,
  },
  {
    tanggal: "20 Aug 2026 · 11:20",
    barcode: "PLT-BXC-0077310",
    tipe: "BOX CORRUGATED",
    pihak: "PT Sinar Kemas Nusantara",
    kondisi: "Good",
    petugas: "Admin Utama",
    qty: 150,
  },
];

export const outgoing: Trx[] = [
  {
    tanggal: "21 Aug 2026 · 09:41",
    barcode: "PLT-KRT-0093180",
    tipe: "KARTON",
    pihak: "Line Assembly TV — Blok C",
    kondisi: "Good",
    petugas: "Rizky H.",
    qty: 380,
  },
  {
    tanggal: "21 Aug 2026 · 06:55",
    barcode: "PLT-KPL-0002214",
    tipe: "KERANJANG PLASTIK",
    pihak: "Line Kulkas — Blok A",
    kondisi: "Good",
    petugas: "Admin Utama",
    qty: 40,
  },
  {
    tanggal: "20 Aug 2026 · 15:12",
    barcode: "PLT-PTI-0000431",
    tipe: "PETI",
    pihak: "Ekspedisi Semarang",
    kondisi: "Good",
    petugas: "Dewi S.",
    qty: 6,
  },
];

export type Supplier = {
  kode: string;
  nama: string;
  kota: string;
  kontak: string;
  tipe: string;
  status: "Aktif" | "Nonaktif";
};

export const suppliers: Supplier[] = [
  { kode: "SUP-001", nama: "PT Sinar Kemas Nusantara", kota: "Semarang", kontak: "0812-1100-2211", tipe: "Karton, Box", status: "Aktif" },
  { kode: "SUP-002", nama: "CV Kayu Jaya Abadi", kota: "Kudus", kontak: "0813-4455-9087", tipe: "Pallet, Peti", status: "Aktif" },
  { kode: "SUP-003", nama: "PT Foamindo Prima", kota: "Bekasi", kontak: "0821-7788-1234", tipe: "Polyfoam", status: "Aktif" },
  { kode: "SUP-004", nama: "PT Plastik Mandiri", kota: "Surabaya", kontak: "0857-2233-4411", tipe: "Keranjang Plastik", status: "Aktif" },
  { kode: "SUP-005", nama: "UD Wrap Sejahtera", kota: "Semarang", kontak: "0878-9911-0022", tipe: "Shrink Wrap", status: "Nonaktif" },
];

export type Packaging = {
  kode: string;
  nama: string;
  unit: string;
  dimensi: string;
  stok: number;
  minimum: number;
};

export const packaging: Packaging[] = [
  { kode: "PK-01", nama: "KARTON", unit: "box", dimensi: "60 × 40 × 40 cm", stok: 11810, minimum: 4000 },
  { kode: "PK-02", nama: "BOX CORRUGATED", unit: "box", dimensi: "50 × 35 × 30 cm", stok: 878, minimum: 500 },
  { kode: "PK-03", nama: "BOX MODULE", unit: "box", dimensi: "40 × 30 × 25 cm", stok: 191, minimum: 200 },
  { kode: "PK-04", nama: "PALLET", unit: "pallet", dimensi: "120 × 100 cm", stok: 94, minimum: 60 },
  { kode: "PK-05", nama: "POLYFOAM", unit: "pcs", dimensi: "80 × 60 × 3 cm", stok: 192, minimum: 100 },
  { kode: "PK-06", nama: "KERANJANG PLASTIK", unit: "pcs", dimensi: "60 × 40 × 32 cm", stok: 80, minimum: 50 },
  { kode: "PK-07", nama: "PETI", unit: "pcs", dimensi: "150 × 80 × 80 cm", stok: 13, minimum: 10 },
  { kode: "PK-08", nama: "COLLY", unit: "pcs", dimensi: "—", stok: 81, minimum: 40 },
];

export type BarcodeRow = {
  barcode: string;
  tipe: string;
  lokasi: string;
  kondisi: Kondisi;
  dicetak: string;
};

export const barcodes: BarcodeRow[] = [
  { barcode: "PLT-KRT-0093214", tipe: "KARTON", lokasi: "RAK A1-03", kondisi: "Good", dicetak: "21 Aug 2026" },
  { barcode: "PLT-PLT-0011876", tipe: "PALLET", lokasi: "YARD B", kondisi: "Good", dicetak: "21 Aug 2026" },
  { barcode: "PLT-PLF-0045512", tipe: "POLYFOAM", lokasi: "RAK C4-11", kondisi: "Karantina", dicetak: "20 Aug 2026" },
  { barcode: "PLT-BXC-0077310", tipe: "BOX CORRUGATED", lokasi: "RAK A2-07", kondisi: "Good", dicetak: "20 Aug 2026" },
  { barcode: "PLT-PTI-0000431", tipe: "PETI", lokasi: "YARD A", kondisi: "Good", dicetak: "19 Aug 2026" },
];

export type AuditRow = {
  waktu: string;
  aktor: string;
  aksi: string;
  objek: string;
  keterangan: string;
};

export const audit: AuditRow[] = [
  { waktu: "21 Aug 2026 · 09:41", aktor: "Rizky H.", aksi: "KELUAR", objek: "PLT-KRT-0093180", keterangan: "380 box ke Line Assembly TV" },
  { waktu: "21 Aug 2026 · 08:14", aktor: "Admin Utama", aksi: "MASUK", objek: "PLT-KRT-0093214", keterangan: "420 box dari PT Sinar Kemas" },
  { waktu: "21 Aug 2026 · 07:58", aktor: "Admin Utama", aksi: "UBAH", objek: "PK-03 BOX MODULE", keterangan: "Minimum stok 150 → 200" },
  { waktu: "20 Aug 2026 · 16:38", aktor: "Dewi S.", aksi: "KARANTINA", objek: "PLT-PLF-0045512", keterangan: "60 pcs polyfoam basah" },
  { waktu: "20 Aug 2026 · 09:05", aktor: "Admin Utama", aksi: "TAMBAH", objek: "SUP-004", keterangan: "Supplier PT Plastik Mandiri" },
];
