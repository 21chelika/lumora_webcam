const collections = {
    'kpop event': {
        name: 'KPOP EVENT',
        category: 'K-pop collection',
        description: 'Choose a frame for your next fan moment.',
        image: 'assets/1.png',
        frames: [
            'https://via.placeholder.com/300x400/E5E7E1/E5E7E1',
            'https://via.placeholder.com/300x400/E5E7E1/E5E7E1'
        ]
    },
    'cafe event': {
        name: 'CAFE EVENT',
        category: 'Cafe collection',
        description: 'Belum ada frame yang tersedia untuk Cafe Event.',
        image: 'assets/2.png',
        status: 'not-available',
        frames: []
    },
    'classic frame': {
        name: 'CLASSIC FRAME',
        category: 'Classic collection',
        description: 'Koleksi frame classic sedang kami siapkan.',
        image: 'assets/3.png',
        status: 'coming-soon',
        frames: []
    },
    'brands frame': {
        name: 'BRANDS FRAME',
        category: 'Brands collection',
        description: 'Enam frame pertama untuk koleksi brands sedang kami siapkan.',
        image: 'assets/4.png',
        status: 'coming-soon',
        frames: [],
        placeholderCount: 6
    }
};

const params = new URLSearchParams(window.location.search);
const collectionId = params.get('id') || 'kpop event';
const collection = collections[collectionId];
const frameGrid = document.getElementById('collection-frames');

if (!collection) {
    document.getElementById('collection-name').textContent = 'Collection not found';
    document.getElementById('collection-description').textContent = 'Return to collections and choose another category.';
} else {
    document.title = `${collection.name} | Lumora`;
    document.getElementById('collection-category').textContent = collection.category;
    document.getElementById('collection-name').textContent = collection.name;
    document.getElementById('collection-description').textContent = collection.description;
    document.getElementById('collection-image').src = collection.image;
    document.getElementById('collection-image').alt = `${collection.name} preview`;

    if (!collection.frames.length && collection.placeholderCount) {
        for (let index = 0; index < collection.placeholderCount; index++) {
            const placeholder = document.createElement('div');
            placeholder.className = 'collection-frame-placeholder';
            placeholder.innerHTML = `<span>Frame ${index + 1}</span><small>Coming Soon</small>`;
            frameGrid.appendChild(placeholder);
        }
    } else if (!collection.frames.length) {
        const status = document.createElement('div');
        status.className = `collection-status ${collection.status}`;
        status.textContent = collection.status === 'coming-soon'
            ? 'Coming Soon'
            : 'Frame belum tersedia';
        frameGrid.appendChild(status);
    }

    collection.frames.slice(0, 6).forEach((frameSrc, index) => {
        const frame = document.createElement('button');
        frame.type = 'button';
        frame.className = 'collection-frame';
        frame.setAttribute('aria-label', `Choose ${collection.name} frame ${index + 1}`);
        frame.innerHTML = `<img src="${frameSrc}" alt="${collection.name} frame ${index + 1}"><span>Frame ${index + 1}</span>`;
        frame.addEventListener('click', () => {
            localStorage.setItem('lumoraSelectedFrame', JSON.stringify({
                artistId: `collection-${collectionId}`,
                artistName: collection.name,
                groupName: collection.category,
                artistImg: collection.image,
                frameSrc,
                frameName: `${collection.name} Frame ${index + 1}`,
                slots: null,
                frameIndex: index
            }));
            window.location.href = `camera.html?artist=collection-${encodeURIComponent(collectionId)}&frame=${index}`;
        });
        frameGrid.appendChild(frame);
    });
}
