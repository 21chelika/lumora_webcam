const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const captureBtn = document.getElementById('capture-btn');
const switchBtn = document.getElementById('switch-btn');
const nextBtn = document.getElementById('next-btn');
const timerDisplay = document.getElementById('timer');
const photoGallery = document.getElementById('photo-gallery');
const countDisplay = document.getElementById('count');
const backArrow = document.getElementById('camera-back-arrow');

let photos = [];
const maxPhotos = 10;
let currentFacing = 'user';   // 'user' = depan, 'environment' = belakang
let currentStream = null;
let isMirrored = true;

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

function stopCamera() {
    if (currentStream) {
        currentStream.getTracks().forEach(track => track.stop());
        currentStream = null;
    }
}

async function updateSwitchButton() {
    try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const cameras = devices.filter(device => device.kind === 'videoinput');
        switchBtn.style.display = cameras.length > 1 ? 'inline-block' : 'none';
    } catch (err) {
        switchBtn.style.display = 'none';
    }
}

async function startCamera() {
    try {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            throw new Error('Browser tidak mendukung akses kamera');
        }

        stopCamera();

        const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: { ideal: currentFacing } },
            audio: false
        });

        currentStream = stream;
        video.srcObject = stream;
        await video.play();

        // Cermin hanya untuk kamera depan
        const settings = stream.getVideoTracks()[0].getSettings();
        isMirrored = settings.facingMode
            ? settings.facingMode === 'user'
            : currentFacing === 'user';
        video.classList.toggle('mirrored', isMirrored);

        await updateSwitchButton();
        return true;
    } catch (err) {
        console.error('Camera error:', err);
        alert('Kameranya gak bisa diakses. Pastikan izin kamera aktif dan buka lewat localhost/HTTPS, bukan langsung dari file.');
        return false;
    }
}

async function switchCamera() {
    const previousFacing = currentFacing;
    switchBtn.disabled = true;
    captureBtn.disabled = true;

    currentFacing = currentFacing === 'user' ? 'environment' : 'user';
    const success = await startCamera();

    if (!success) {
        currentFacing = previousFacing;
        await startCamera();
    }

    switchBtn.disabled = false;
    captureBtn.disabled = false;
}

function startTimer() {
    if (photos.length >= maxPhotos) {
        return;
    }

    let count = 3;
    captureBtn.disabled = true;
    switchBtn.disabled = true;
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
        switchBtn.disabled = false;
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
    context.save();
    if (isMirrored) {
        context.translate(canvas.width, 0);
        context.scale(-1, 1);
    }
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    context.restore();

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
switchBtn.addEventListener('click', switchCamera);
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
