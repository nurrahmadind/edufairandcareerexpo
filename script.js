// 1. LOGIKA HALAMAN UNDANGAN (index.html)
if (document.getElementById('tampil-nama')) {
  const params = new URLSearchParams(window.location.search);
  const nama = params.get('nama');
  const instansi = params.get('instansi');
  const kategori = params.get('kategori');

  if (nama) document.getElementById('tampil-nama').textContent = nama;
  if (instansi) document.getElementById('tampil-instansi').textContent = instansi;
  if (kategori) document.getElementById('tampil-kategori').textContent = kategori;
}

// 2. LOGIKA HALAMAN ADMIN CSV BLAST (admin.html)
const csvInput = document.getElementById('csv-file');
const baseUrlInput = document.getElementById('base-url');

if (csvInput && baseUrlInput) {
  const currentPath = window.location.href.substring(0, window.location.href.lastIndexOf('/'));
  baseUrlInput.value = `${currentPath}/index.html`;

  csvInput.addEventListener('change', function (e) {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        renderTabelTamu(results.data);
      }
    });
  });
}

function renderTabelTamu(dataTamu) {
  const tbody = document.querySelector('#tabel-tamu tbody');
  tbody.innerHTML = '';
  const baseUrl = document.getElementById('base-url').value.trim();

  dataTamu.forEach((tamu, index) => {
    // Membuat tautan personal
    const linkPersonal = `${baseUrl}?nama=${encodeURIComponent(tamu.nama_tamu)}&instansi=${encodeURIComponent(tamu.instansi)}&kategori=${encodeURIComponent(tamu.kategori)}`;
    
    // Redaksi Pesan WhatsApp yang Lebih Lengkap & Profesional
    const pesanWA = `Yth. *${tamu.nama_tamu}*\n*${tamu.instansi}*\n\n Assalamu'alaikum Wr. Wb. Dengan hormat, kami mengundang Bapak/Ibu pimpinan instansi/mitra untuk hadir dan berpartisipasi dalam ajang pameran tahunan:\n\n🎓 *EDU FAIR & CAREER EXPO 2026*\n"Connecting Competence to Future: Bekerja, Melanjutkan, Berwirausaha"\n\n *Hari, Tanggal:* Rabu, 25 November 2026\n *Waktu:* 07.00 – 14.00 WIB\n *Lokasi:* SMKN 6 Kota Tangerang Selatan\n\nInformasi lengkap dapat diakses secara eksklusif melalui tautan personal berikut:\n${linkPersonal}\n\nMerupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu berkenan hadir memenuhi undangan ini.\n\nAtas perhatian, waktu, dan kerja sama yang baik, kami ucapkan terima kasih.\n\n*Hormat kami,*\n\n*Panitia Edu Fair & Career Expo 2026*`;

    const linkWA = `https://wa.me/${tamu.no_whatsapp}?text=${encodeURIComponent(pesanWA)}`;

    const row = `
      <tr>
        <td>${tamu.id || index + 1}</td>
        <td><strong>${tamu.nama_tamu}</strong></td>
        <td>${tamu.instansi}</td>
        <td>${tamu.kategori}</td>
        <td>${tamu.no_whatsapp}</td>
        <td>
          <a href="${linkWA}" target="_blank" class="btn">Kirim WA</a>
        </td>
      </tr>
    `;
    tbody.innerHTML += row;
  });
}
