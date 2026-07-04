const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const captureBtn = document.getElementById('capture-btn');
const nextBtn = document.getElementById('next-btn');
const timerDisplay = document.getElementById('timer');
const photoGallery = document.getElementById('photo-gallery');
const countDisplay = document.getElementById('count');
const backArrow = document.getElementById('camera-back-arrow');

let photos = [];
const maxPhotos = 10;

function loadSavedPhotos() {
    photos = JSON.parse(localStorage.getItem('lumoraPhotos') || '[]').slice(0, maxPhotos);
    renderGallery();
}

function setBackLink() {
    const urlParams = new URLSearchParams(window.location.search);
    const selectedFrame = JSON.parse(localStorage.getItem('lumoraSelectedFrame') || 'null');
    const artistId = urlParams.get('artist') || (selectedFrame && selectedFrame.artistId);

    backArrow.href = artistId ? `artist-detail.html?id=${artistId}` : 'artist.html';
}

async function startCamera() {
    try {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            throw new Error('Browser tidak mendukung akses kamera');
        }

        const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'user' },
            audio: false
        });

        video.srcObject = stream;
        await video.play();
    } catch (err) {
        console.error('Camera error:', err);
        alert('Kameranya gak bisa diakses. Pastikan izin kamera aktif dan buka lewat localhost/HTTPS, bukan langsung dari file.');
    }
}

function startTimer() {
    if (photos.length >= maxPhotos) {
        return;
    }

    let count = 3;
    captureBtn.disabled = true;
    timerDisplay.style.display = 'block';
    timerDisplay.innerText = count;

    const interval = setInterval(() => {
        count--;

        if (count > 0) {
            timerDisplay.innerText = count;
            return;
        }

        clearInterval(interval);
        timerDisplay.style.display = 'none';
        captureBtn.disabled = false;
        takePhoto();
    }, 1000);
}

function takePhoto() {
    if (!video.videoWidth || !video.videoHeight) {
        alert('Kamera belum siap. Coba tunggu sebentar lalu capture lagi.');
        return;
    }

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    photos.push(canvas.toDataURL('image/jpeg', 0.78));
    renderGallery();
}

function renderGallery() {
    photoGallery.innerHTML = '';
    countDisplay.innerText = photos.length;

    photos.forEach((photoData, index) => {
        const item = document.createElement('div');
        item.className = 'gallery-item';

        const img = document.createElement('img');
        img.src = photoData;
        img.alt = `Photo ${index + 1}`;

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.type = 'button';
        deleteBtn.setAttribute('aria-label', `Delete photo ${index + 1}`);
        deleteBtn.innerText = 'x';
        deleteBtn.addEventListener('click', () => {
            photos.splice(index, 1);
            renderGallery();
        });

        item.appendChild(img);
        item.appendChild(deleteBtn);
        photoGallery.appendChild(item);
    });

    captureBtn.style.display = photos.length >= maxPhotos ? 'none' : 'inline-block';
    nextBtn.style.display = photos.length > 0 ? 'inline-block' : 'none';
}

captureBtn.addEventListener('click', startTimer);
nextBtn.addEventListener('click', () => {
    try {
        localStorage.setItem('lumoraPhotos', JSON.stringify(photos));
    } catch (err) {
        console.error('Photo save error:', err);
        alert('Foto terlalu besar untuk disimpan. Coba hapus beberapa foto dulu ya.');
        return;
    }

    window.location.href = 'poster.html';
});

setBackLink();
loadSavedPhotos();
startCamera();
