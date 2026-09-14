const selectedPhotos = JSON.parse(
    localStorage.getItem('lumoraSelectedPhotos') || localStorage.getItem('lumoraPhotos') || '[]'
).slice(0, 6);
const selectedFrame = JSON.parse(localStorage.getItem('lumoraSelectedFrame') || 'null');
const photoLayer = document.getElementById('photo-layer');
const frameOverlay = document.getElementById('frame-overlay');
const downloadButton = document.getElementById('download-btn');
const slotCount = 6;
const defaultSixSlots = [
    { x: 8.4, y: 4.4, w: 39.2, h: 19.3 },
    { x: 52.5, y: 4.4, w: 39.2, h: 19.3 },
    { x: 8.4, y: 26.5, w: 39.2, h: 19.4 },
    { x: 52.5, y: 26.5, w: 39.2, h: 19.4 },
    { x: 8.4, y: 48.6, w: 39.2, h: 19.4 },
    { x: 52.5, y: 48.6, w: 39.2, h: 19.4 }
];
const leesolSlots = [
    { x: 3.6, y: 7.9, w: 42.7, h: 17.2 },
    { x: 3.6, y: 29.2, w: 42.7, h: 17.2 },
    { x: 3.6, y: 50.5, w: 42.7, h: 17.2 },
    { x: 53.6, y: 3.8, w: 42.7, h: 17.1 },
    { x: 53.6, y: 25.1, w: 42.7, h: 17.1 },
    { x: 53.6, y: 46.4, w: 42.7, h: 17.1 }
];

if (selectedFrame && selectedFrame.frameSrc) {
    frameOverlay.src = selectedFrame.frameSrc;
    frameOverlay.alt = `${selectedFrame.artistName} frame`;
    frameOverlay.addEventListener('load', () => {
        if (frameOverlay.naturalWidth && frameOverlay.naturalHeight) {
            document.querySelector('.frame-stage').style.aspectRatio =
                `${frameOverlay.naturalWidth} / ${frameOverlay.naturalHeight}`;
        }
    });
} else {
    frameOverlay.style.display = 'none';
}

const isLeesolFrame = selectedFrame && (
    selectedFrame.artistId === 'leesol' ||
    (selectedFrame.frameSrc && selectedFrame.frameSrc.includes('LEESOL'))
);
const frameSlots = isLeesolFrame
    ? leesolSlots
    : selectedFrame && Array.isArray(selectedFrame.slots)
        ? selectedFrame.slots
        : defaultSixSlots;

function loadImage(source) {
    return new Promise((resolve, reject) => {
        const image = new Image();

        if (source.startsWith('http')) {
            image.crossOrigin = 'anonymous';
        }

        image.onload = () => resolve(image);
        image.onerror = reject;
        image.src = source;
    });
}

function drawCoverImage(context, image, x, y, width, height) {
    const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
    const sourceWidth = width / scale;
    const sourceHeight = height / scale;
    const sourceX = (image.naturalWidth - sourceWidth) / 2;
    const sourceY = (image.naturalHeight - sourceHeight) / 2;

    context.drawImage(
        image,
        sourceX,
        sourceY,
        sourceWidth,
        sourceHeight,
        x,
        y,
        width,
        height
    );
}

async function downloadResult() {
    if (!selectedFrame || !selectedFrame.frameSrc) {
        return;
    }

    downloadButton.disabled = true;
    downloadButton.innerText = 'Preparing...';

    try {
        const frameImage = await loadImage(selectedFrame.frameSrc);
        const canvas = document.createElement('canvas');
        canvas.width = frameImage.naturalWidth;
        canvas.height = frameImage.naturalHeight;
        const context = canvas.getContext('2d');

        for (let index = 0; index < slotCount; index++) {
            if (!selectedPhotos[index]) {
                continue;
            }

            const photo = await loadImage(selectedPhotos[index]);
            const slotData = frameSlots[index] || defaultSixSlots[index];
            const x = canvas.width * slotData.x / 100;
            const y = canvas.height * slotData.y / 100;
            const width = canvas.width * slotData.w / 100;
            const height = canvas.height * slotData.h / 100;

            context.save();
            context.beginPath();
            context.rect(x, y, width, height);
            context.clip();
            drawCoverImage(context, photo, x, y, width, height);
            context.restore();
        }

        context.drawImage(frameImage, 0, 0, canvas.width, canvas.height);
        const link = document.createElement('a');
        link.download = `lumora-frame-${Date.now()}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    } catch (error) {
        console.error('Download error:', error);
        alert('Gambar belum bisa diunduh. Coba refresh halaman lalu ulangi.');
    } finally {
        downloadButton.disabled = false;
        downloadButton.innerText = 'Download';
    }
}

for (let index = 0; index < slotCount; index++) {
    const slotData = frameSlots[index] || defaultSixSlots[index];
    const slot = document.createElement('div');
    slot.className = 'photo-slot';
    slot.style.left = `${slotData.x}%`;
    slot.style.top = `${slotData.y}%`;
    slot.style.width = `${slotData.w}%`;
    slot.style.height = `${slotData.h}%`;
    slot.style.borderRadius = slotData.radius || '0';
    slot.style.transform = slotData.rotate ? `rotate(${slotData.rotate})` : '';

    if (selectedPhotos[index]) {
        const img = document.createElement('img');
        img.src = selectedPhotos[index];
        img.alt = `Selected photo ${index + 1}`;
        slot.appendChild(img);
    }

    photoLayer.appendChild(slot);
}

downloadButton.addEventListener('click', downloadResult);