
/* ==========================================
   1. SAPAAN BERDASARKAN WAKTU
========================================== */

function sapaanWaktu() {
    const elemenSapaan = document.getElementById("sapaan-waktu");

    // Jalankan hanya jika elemen tersedia
    if (!elemenSapaan) {
        return;
    }

    const jam = new Date().getHours();
    let sapaan;

    if (jam >= 5 && jam < 11) {
        sapaan = "Selamat Pagi!";
    } else if (jam >= 11 && jam < 15) {
        sapaan = "Selamat Siang!";
    } else if (jam >= 15 && jam < 18) {
        sapaan = "Selamat Sore!";
    } else {
        sapaan = "Selamat Malam!";
    }

    elemenSapaan.textContent =
        sapaan + " Selamat Datang di Klinik Sehat Nusantara.";
}

// Jalankan fungsi sapaan
sapaanWaktu();


/* ==========================================
   2. DATA DOKTER
========================================== */

const dataDokter = [
    {
        nama: "dr. Andi Pratama",
        poli: "Umum",
        spesialisasi: "Dokter Umum",
        hari: "Senin - Rabu",
        jam: "08.00 - 12.00"
    },
    {
        nama: "drg. Siti Rahma",
        poli: "Gigi",
        spesialisasi: "Dokter Gigi",
        hari: "Selasa - Kamis",
        jam: "09.00 - 13.00"
    },
    {
        nama: "dr. Maya Lestari",
        poli: "KIA",
        spesialisasi: "Dokter Kesehatan Ibu dan Anak",
        hari: "Senin - Jumat",
        jam: "08.00 - 11.00"
    },
    {
        nama: "dr. Budi Santoso",
        poli: "Gizi",
        spesialisasi: "Dokter Konsultasi Gizi",
        hari: "Rabu - Sabtu",
        jam: "10.00 - 14.00"
    }
];


/* ==========================================
   3. MENAMPILKAN KARTU DAN TABEL DOKTER
========================================== */

function tampilkanDokter(poli = "Semua") {

    const daftarDokter = document.getElementById("daftarDokter");
    const pesanDokter = document.getElementById("pesanDokter");
    const tabelJadwal = document.getElementById("tabelJadwalDokter");

    // Periksa apakah elemen tersedia
    // Fungsi hanya berjalan pada halaman dokter
    if (!daftarDokter || !tabelJadwal) {
        return;
    }

    // Filter data dokter berdasarkan poliklinik
    const hasilFilter = poli === "Semua"
        ? dataDokter
        : dataDokter.filter(function(dokter) {
            return dokter.poli === poli;
        });

    // Bersihkan tampilan sebelumnya
    daftarDokter.innerHTML = "";
    tabelJadwal.innerHTML = "";

    // Jika dokter tidak ditemukan
    if (hasilFilter.length === 0) {
        if (pesanDokter) {
            pesanDokter.textContent = "Dokter tidak ditemukan.";
        }
        return;
    }

    // Hapus pesan jika data ditemukan
    if (pesanDokter) {
        pesanDokter.textContent = "";
    }

    // Tampilkan setiap dokter dalam bentuk kartu
    hasilFilter.forEach(function(dokter) {

        daftarDokter.innerHTML += `
            <div class="col-md-6 col-lg-3">
                <div class="card kartu-dokter text-center h-100">
                    <div class="card-body">

                        <i class="bi bi-person-circle ikon-dokter"></i>

                        <h5>${dokter.nama}</h5>

                        <p>${dokter.spesialisasi}</p>

                        <hr>

                        <p>
                            <strong>Poliklinik:</strong>
                            ${dokter.poli}
                        </p>

                        <p>
                            <strong>Hari:</strong>
                            ${dokter.hari}
                        </p>

                        <p>
                            <strong>Jam:</strong>
                            ${dokter.jam}
                        </p>

                    </div>
                </div>
            </div>
        `;

        // Masukkan data dokter ke tabel jadwal
        tabelJadwal.innerHTML += `
            <tr>
                <td>${dokter.nama}</td>
                <td>${dokter.poli}</td>
                <td>${dokter.hari}</td>
                <td>${dokter.jam}</td>
            </tr>
        `;

    });
}


/* ==========================================
   4. FILTER BERDASARKAN POLIKLINIK
========================================== */

const filterPoli = document.getElementById("filterPoli");

// Periksa apakah dropdown filter tersedia
if (filterPoli) {

    filterPoli.addEventListener("change", function() {

        // Ambil pilihan poliklinik pengguna
        const poliDipilih = this.value;

        // Tampilkan dokter sesuai pilihan
        tampilkanDokter(poliDipilih);

    });

}


/* ==========================================
   5. TAMPILKAN SEMUA DOKTER SAAT HALAMAN DIBUKA
========================================== */

tampilkanDokter();


/* ==========================================
   6. FITUR PENDAFTARAN PASIEN
========================================== */

const formPendaftaran = document.getElementById("formPendaftaran");

if (formPendaftaran) {

    const inputTanggalLahir = document.getElementById("tanggalLahir");
    const inputTanggalKunjungan = document.getElementById("tanggalKunjungan");
    const inputPoli = document.getElementById("poliPendaftaran");
    const inputDokter = document.getElementById("dokterPendaftaran");
    const inputKeluhan = document.getElementById("keluhan");

    const modalElement = document.getElementById("modalRingkasan");
    const modalRingkasan = new bootstrap.Modal(modalElement);

    let nomorAntrean = 1;


    /* --------------------------------------
       A. MENGATUR BATAS TANGGAL
    -------------------------------------- */

    function formatTanggalInput(tanggal) {
        const tahun = tanggal.getFullYear();
        const bulan = String(tanggal.getMonth() + 1).padStart(2, "0");
        const hari = String(tanggal.getDate()).padStart(2, "0");

        return `${tahun}-${bulan}-${hari}`;
    }

    const hariIni = new Date();
    hariIni.setHours(0, 0, 0, 0);

    const batasTanggal = new Date(hariIni);
    batasTanggal.setDate(batasTanggal.getDate() + 14);

    inputTanggalLahir.max = formatTanggalInput(hariIni);

    inputTanggalKunjungan.min = formatTanggalInput(hariIni);
    inputTanggalKunjungan.max = formatTanggalInput(batasTanggal);


    /* --------------------------------------
       B. MENGHITUNG USIA PASIEN
    -------------------------------------- */

    function hitungUsia(tanggalLahir) {

        if (!tanggalLahir) {
            return null;
        }

        const lahir = new Date(tanggalLahir + "T00:00:00");
        const sekarang = new Date();

        let usia = sekarang.getFullYear() - lahir.getFullYear();

        const bulan = sekarang.getMonth() - lahir.getMonth();

        if (
            bulan < 0 ||
            (bulan === 0 && sekarang.getDate() < lahir.getDate())
        ) {
            usia--;
        }

        return usia;
    }


    inputTanggalLahir.addEventListener("change", function () {

        const usia = hitungUsia(this.value);
        const informasiUsia = document.getElementById("informasiUsia");

        if (usia !== null && usia >= 0) {
            informasiUsia.textContent = `Usia pasien: ${usia} tahun`;
        } else {
            informasiUsia.textContent = "";
        }

    });


    /* --------------------------------------
       C. DOKTER BERUBAH SESUAI POLIKLINIK
    -------------------------------------- */

    inputPoli.addEventListener("change", function () {

        const poliDipilih = this.value;

        inputDokter.innerHTML =
            '<option value="">-- Pilih Dokter --</option>';

        if (poliDipilih === "") {
            inputDokter.disabled = true;
            return;
        }

        const dokterTersedia = dataDokter.filter(function(dokter) {
            return dokter.poli === poliDipilih;
        });

        dokterTersedia.forEach(function(dokter) {

            const pilihan = document.createElement("option");

            pilihan.value = dokter.nama;
            pilihan.textContent = dokter.nama;

            inputDokter.appendChild(pilihan);

        });

        inputDokter.disabled = false;

    });


    /* --------------------------------------
       D. PENGHITUNG KARAKTER KELUHAN
    -------------------------------------- */

    inputKeluhan.addEventListener("input", function () {

        const jumlah = this.value.length;

        document.getElementById("jumlahKarakter").textContent =
            `${jumlah}/200 karakter`;

    });


    /* --------------------------------------
       E. FUNGSI PESAN ERROR
    -------------------------------------- */

    function tampilkanError(id, pesan) {
        document.getElementById(id).textContent = pesan;
    }


    function hapusSemuaError() {

        const daftarError = [
            "errorNama",
            "errorNik",
            "errorTanggalLahir",
            "errorGender",
            "errorTelepon",
            "errorEmail",
            "errorPoli",
            "errorDokter",
            "errorTanggalKunjungan",
            "errorKeluhan",
            "errorPersetujuan"
        ];

        daftarError.forEach(function(id) {
            tampilkanError(id, "");
        });

    }


    /* --------------------------------------
       F. VALIDASI FORMULIR
    -------------------------------------- */

    function validasiForm() {

        hapusSemuaError();

        let valid = true;

        const nama = document.getElementById("nama").value.trim();
        const nik = document.getElementById("nik").value.trim();
        const tanggalLahir = inputTanggalLahir.value;

        const gender = document.querySelector(
            'input[name="jenisKelamin"]:checked'
        );

        const telepon = document.getElementById("telepon").value.trim();
        const email = document.getElementById("email").value.trim();

        const poli = inputPoli.value;
        const dokter = inputDokter.value;

        const tanggalKunjungan = inputTanggalKunjungan.value;
        const keluhan = inputKeluhan.value.trim();

        const persetujuan = document.getElementById("persetujuan").checked;


        // Validasi nama
        if (!/^[A-Za-zÀ-ÿ\s]{3,}$/.test(nama)) {

            tampilkanError(
                "errorNama",
                "Nama wajib diisi, minimal 3 karakter dan hanya huruf serta spasi."
            );

            valid = false;
        }


        // Validasi NIK
        if (!/^\d{16}$/.test(nik)) {

            tampilkanError(
                "errorNik",
                "NIK harus terdiri dari tepat 16 digit angka."
            );

            valid = false;
        }


        // Validasi tanggal lahir
        if (!tanggalLahir) {

            tampilkanError(
                "errorTanggalLahir",
                "Tanggal lahir wajib diisi."
            );

            valid = false;

        } else if (tanggalLahir > formatTanggalInput(hariIni)) {

            tampilkanError(
                "errorTanggalLahir",
                "Tanggal lahir tidak boleh di masa depan."
            );

            valid = false;

        }


        // Validasi jenis kelamin
        if (!gender) {

            tampilkanError(
                "errorGender",
                "Silakan pilih jenis kelamin."
            );

            valid = false;
        }


        // Validasi nomor HP
        if (!/^(08|62)\d{8,12}$/.test(telepon)) {

            tampilkanError(
                "errorTelepon",
                "Nomor HP harus diawali 08 atau 62 dan terdiri dari 10-14 digit."
            );

            valid = false;
        }


        // Validasi email (opsional)
        if (
            email !== "" &&
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        ) {

            tampilkanError(
                "errorEmail",
                "Format email tidak valid."
            );

            valid = false;
        }


        // Validasi poliklinik
        if (!poli) {

            tampilkanError(
                "errorPoli",
                "Silakan pilih poliklinik."
            );

            valid = false;
        }


        // Validasi dokter
        if (!dokter) {

            tampilkanError(
                "errorDokter",
                "Silakan pilih dokter."
            );

            valid = false;
        }


        // Validasi tanggal kunjungan
        if (!tanggalKunjungan) {

            tampilkanError(
                "errorTanggalKunjungan",
                "Tanggal kunjungan wajib diisi."
            );

            valid = false;

        } else if (
            tanggalKunjungan < formatTanggalInput(hariIni) ||
            tanggalKunjungan > formatTanggalInput(batasTanggal)
        ) {

            tampilkanError(
                "errorTanggalKunjungan",
                "Tanggal kunjungan harus antara hari ini dan 14 hari ke depan."
            );

            valid = false;
        }


        // Validasi keluhan
        if (keluhan.length < 10 || keluhan.length > 200) {

            tampilkanError(
                "errorKeluhan",
                "Keluhan harus berisi 10-200 karakter."
            );

            valid = false;
        }


        // Validasi persetujuan
        if (!persetujuan) {

            tampilkanError(
                "errorPersetujuan",
                "Anda harus menyetujui penggunaan data."
            );

            valid = false;
        }


        return valid;

    }


    /* --------------------------------------
       G. MEMBUAT NOMOR ANTREAN
    -------------------------------------- */

    function buatNomorAntrean(poli) {

        const nomor = String(nomorAntrean).padStart(3, "0");

        nomorAntrean++;

        return `${poli.toUpperCase()}-${nomor}`;

    }


    /* --------------------------------------
       H. MENAMPILKAN RINGKASAN
    -------------------------------------- */

    function tampilkanRingkasan() {

        const nama = document.getElementById("nama").value.trim();
        const nik = document.getElementById("nik").value.trim();
        const tanggalLahir = inputTanggalLahir.value;

        const gender = document.querySelector(
            'input[name="jenisKelamin"]:checked'
        ).value;

        const telepon = document.getElementById("telepon").value.trim();
        const email = document.getElementById("email").value.trim();

        const poli = inputPoli.value;
        const dokter = inputDokter.value;
        const tanggalKunjungan = inputTanggalKunjungan.value;
        const keluhan = inputKeluhan.value.trim();

        const usia = hitungUsia(tanggalLahir);

        const antrean = buatNomorAntrean(poli);


        document.getElementById("hasilAntrean").textContent = antrean;
        document.getElementById("hasilNama").textContent = nama;
        document.getElementById("hasilNik").textContent = nik;
        document.getElementById("hasilUsia").textContent = `${usia} tahun`;
        document.getElementById("hasilGender").textContent = gender;
        document.getElementById("hasilTelepon").textContent = telepon;
        document.getElementById("hasilEmail").textContent = email || "-";
        document.getElementById("hasilPoli").textContent = "Poli " + poli;
        document.getElementById("hasilDokter").textContent = dokter;
        document.getElementById("hasilTanggal").textContent = tanggalKunjungan;
        document.getElementById("hasilKeluhan").textContent = keluhan;

        modalRingkasan.show();

    }


    /* --------------------------------------
       I. EVENT SUBMIT FORMULIR
    -------------------------------------- */

    formPendaftaran.addEventListener("submit", function(event) {

        event.preventDefault();

        if (validasiForm()) {

            tampilkanRingkasan();

        }

    });


    /* --------------------------------------
       J. EVENT RESET FORMULIR
    -------------------------------------- */

    formPendaftaran.addEventListener("reset", function() {

        setTimeout(function() {

            hapusSemuaError();

            inputDokter.innerHTML =
                '<option value="">Pilih poliklinik terlebih dahulu</option>';

            inputDokter.disabled = true;

            document.getElementById("informasiUsia").textContent = "";

            document.getElementById("jumlahKarakter").textContent =
                "0/200 karakter";

        }, 0);

    });

}
