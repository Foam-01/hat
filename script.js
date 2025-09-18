const mockData = [
  { lat: 16.823, lng: 100.275, helmet: true, plate: 'กข1234' },
  { lat: 16.820, lng: 100.270, helmet: false, plate: 'ขค5678' },
  { lat: 16.825, lng: 100.278, helmet: true, plate: 'งง9012' },
  { lat: 16.819, lng: 100.268, helmet: false, plate: 'จจ3456' }
];

new Chart(document.getElementById('dailyChart'), {
  type: 'bar',
  data: {
    labels: ['M', 'T', 'W', 'Th', 'F', 'Sa', 'Su'],
    datasets: [
      {
        label: 'สวมหมวก',
        data: [30, 32, 28, 35, 33, 29, 31],
        backgroundColor: '#1a73e8'
      },
      {
        label: 'ไม่สวมหมวก',
        data: [5, 6, 4, 7, 6, 5, 4],
        backgroundColor: '#e53935'
      }
    ]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' }
    }
  }
});

new Chart(document.getElementById('monthlyChart'), {
  type: 'line',
  data: {
    labels: ['1', '2', '3', '4', '5', '6'],
    datasets: [{
      label: 'อัตราการสวมหมวก (%)',
      data: [72, 75, 77, 78, 79, 80],
      borderColor: '#1a73e8',
      backgroundColor: 'rgba(26,115,232,0.1)',
      fill: true
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' }
    }
  }
});

// ตำแหน่งกล้อง (mock พิกัดจาก Plus Code)
const cameraLocations = [
  { name: 'ประตู 1', lat: 16.8350625, lng: 100.2153125 },
  { name: 'ประตู 2', lat: 16.8239375, lng: 100.2155625 },
  { name: 'ประตู 3', lat: 16.8302341, lng: 100.2030665 }
];

const map = L.map('map').setView([16.829, 100.212], 15);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

cameraLocations.forEach(cam => {
  L.marker([cam.lat, cam.lng])
    .bindPopup(`<strong>${cam.name}</strong><br>พิกัด: ${cam.lat.toFixed(6)}, ${cam.lng.toFixed(6)}`)
    .addTo(map);
});
function showPopup(type) {
  const popup = document.getElementById('popup');
  const body = document.getElementById('popup-body');

  let content = '';
  if (type === 'helmet') {
    content = '<h3>ข้อมูลผู้สวมหมวกกันน็อก</h3><ul><li>กข1234 - 18 ก.ย. 2025</li><li>งง9012 - 18 ก.ย. 2025</li></ul>';
  } else if (type === 'noHelmet') {
    content = '<h3>ข้อมูลผู้ไม่สวมหมวกกันน็อก</h3><ul><li>ขค5678 - 18 ก.ย. 2025</li><li>จจ3456 - 18 ก.ย. 2025</li></ul>';
  } else if (type === 'plates') {
    content = '<h3>ป้ายทะเบียนที่ตรวจจับได้</h3><ul><li>กข1234</li><li>ขค5678</li><li>งง9012</li><li>จจ3456</li></ul>';
  } else if (type === 'rate') {
    content = '<h3>อัตราการสวมหมวกวันนี้</h3><p>รวมทั้งหมด 239 คน<br>สวมหมวก 192 คน<br>คิดเป็น 80%</p>';
  }

  body.innerHTML = content;
  popup.classList.remove('hidden');
}

function closePopup() {
  document.getElementById('popup').classList.add('hidden');
}
