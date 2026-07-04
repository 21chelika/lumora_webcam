const selectedPhotos = JSON.parse(
    localStorage.getItem('lumoraSelectedPhotos') || localStorage.getItem('lumoraPhotos') || '[]'
).slice(0, 6);
const selectedFrame = JSON.parse(localStorage.getItem('lumoraSelectedFrame') || 'null');
const photoLayer = document.getElementById('photo-layer');
const frameOverlay = document.getElementById('frame-overlay');
const slotCount = 6;
const defaultSlots = [
    { x: 8.4, y: 4.4, w: 39.2, h: 19.3 },
    { x: 52.5, y: 4.4, w: 39.2, h: 19.3 },
    { x: 8.4, y: 26.5, w: 39.2, h: 19.4 },
    { x: 52.5, y: 26.5, w: 39.2, h: 19.4 },
    { x: 8.4, y: 48.6, w: 39.2, h: 19.4 },
    { x: 52.5, y: 48.6, w: 39.2, h: 19.4 }
];

if (selectedFrame && selectedFrame.frameSrc) {
    frameOverlay.src = selectedFrame.frameSrc;
    frameOverlay.alt = `${selectedFrame.artistName} frame`;
} else {
    frameOverlay.style.display = 'none';
}

for (let index = 0; index < slotCount; index++) {
    const slotData = (selectedFrame && selectedFrame.slots && selectedFrame.slots[index]) || defaultSlots[index];
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
