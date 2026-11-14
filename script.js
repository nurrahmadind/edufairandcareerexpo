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
    const linkPersonal = `${baseUrl}?nama=${encodeURIComponent(tamu.nama_tamu)}&instansi=${encodeURIComponent(tamu.instansi)}&kategori=${encodeURIComponent(tamu.kategori)}`;
    const pesanWA = `Yth. *${tamu.nama_tamu}*\n(${tamu.instansi})\n\nDengan hormat, kami mengundang Bapak/Ibu untuk berpartisipasi dalam acara *Edu Fair & Career Day 2026*.\n\nInformasi lengkap & detail undangan dapat diakses melalui tautan berikut:\n${linkPersonal}\n\nTerima kasih atas perhatian dan kerja samanya.`;
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