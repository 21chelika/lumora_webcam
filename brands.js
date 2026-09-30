const defaultSixSlots = [
    { x: 8.4, y: 4.4, w: 39.2, h: 19.3 },
    { x: 52.5, y: 4.4, w: 39.2, h: 19.3 },
    { x: 8.4, y: 26.5, w: 39.2, h: 19.4 },
    { x: 52.5, y: 26.5, w: 39.2, h: 19.4 },
    { x: 8.4, y: 48.6, w: 39.2, h: 19.4 },
    { x: 52.5, y: 48.6, w: 39.2, h: 19.4 }
];

const evanFrameSlots = {
    musicPink: [
        { x: 3.3, y: 7.1, w: 43.1, h: 17.2, radius: '0 8% 8% 8%' },
        { x: 52.4, y: 14.8, w: 43.5, h: 17.2 },
        { x: 3.3, y: 27.5, w: 43.1, h: 17.0 },
        { x: 52.4, y: 36.3, w: 43.5, h: 17.2, radius: '0 8% 8% 8%' },
        { x: 3.3, y: 48.1, w: 43.1, h: 17.2, radius: '0 8% 8% 8%' },
        { x: 52.4, y: 57.0, w: 43.5, h: 17.2 }
    ],
    simpleBeige: [
        { x: 8.4, y: 4.4, w: 39.2, h: 19.3 },
        { x: 52.5, y: 4.4, w: 39.2, h: 19.3 },
        { x: 8.4, y: 26.5, w: 39.2, h: 19.4 },
        { x: 52.5, y: 26.5, w: 39.2, h: 19.4 },
        { x: 8.4, y: 48.6, w: 39.2, h: 19.4 },
        { x: 52.5, y: 48.6, w: 39.2, h: 19.4 }
    ],
    debutRed: [
        { x: 4.1, y: 5.7, w: 39.8, h: 18.3, radius: '1%' },
        { x: 54.0, y: 5.2, w: 40.5, h: 18.0, radius: '50%' },
        { x: 7.5, y: 30.5, w: 38.0, h: 17.0, rotate: '-11deg' },
        { x: 54.0, y: 31.0, w: 38.0, h: 17.0, rotate: '8deg' },
        { x: 3.7, y: 58.1, w: 42.0, h: 18.0, radius: '50%' },
        { x: 53.0, y: 53.0, w: 39.0, h: 17.5, radius: '1%' }
    ],
    pinkRide: [
        { x: 3.1, y: 7.0, w: 42.3, h: 17.6 },
        { x: 53.6, y: 7.0, w: 42.3, h: 17.6 },
        { x: 2.9, y: 27.5, w: 42.3, h: 17.6 },
        { x: 53.4, y: 27.5, w: 42.3, h: 17.6 },
        { x: 3.5, y: 47.8, w: 42.3, h: 17.6 },
        { x: 53.9, y: 47.8, w: 42.3, h: 17.6 }
    ],
    darkRide: [
        { x: 5.0, y: 11.4, w: 41.3, h: 17.2 },
        { x: 54.4, y: 11.4, w: 41.3, h: 17.2 },
        { x: 4.8, y: 31.5, w: 41.3, h: 17.2 },
        { x: 54.2, y: 31.5, w: 41.3, h: 17.2 },
        { x: 5.3, y: 51.4, w: 41.3, h: 17.2 },
        { x: 54.7, y: 51.4, w: 41.3, h: 17.2 }
    ],
    gothicRed: [
        { x: 6.3, y: 7.2, w: 41.0, h: 19.6, radius: '0 0 7% 7%' },
        { x: 52.6, y: 7.2, w: 41.0, h: 19.6, radius: '28% 28% 0 0' },
        { x: 6.3, y: 30.0, w: 41.0, h: 19.6, radius: '28% 28% 0 0' },
        { x: 52.6, y: 30.0, w: 41.0, h: 19.6, radius: '28% 28% 0 0' },
        { x: 6.3, y: 56.5, w: 41.0, h: 19.6, radius: '28% 28% 5% 5%' },
        { x: 52.6, y: 56.5, w: 41.0, h: 19.6, radius: '28% 28% 5% 5%' }
    ],
    laceRed: [
        { x: 4.6, y: 3.0, w: 42.3, h: 19.6 },
        { x: 53.2, y: 3.0, w: 42.3, h: 19.6 },
        { x: 4.6, y: 25.6, w: 42.3, h: 19.6 },
        { x: 53.2, y: 25.6, w: 42.3, h: 19.6 },
        { x: 4.6, y: 48.1, w: 42.3, h: 19.6 },
        { x: 53.2, y: 48.1, w: 42.3, h: 19.6 }
    ],
    softPink: [
        { x: 3.2, y: 7.0, w: 42.0, h: 17.2, radius: '0 8% 8% 8%' },
        { x: 52.6, y: 14.7, w: 43.0, h: 17.1 },
        { x: 3.3, y: 27.5, w: 42.0, h: 17.0 },
        { x: 52.6, y: 36.2, w: 43.0, h: 17.1, radius: '0 8% 8% 8%' },
        { x: 3.2, y: 48.1, w: 42.0, h: 17.2, radius: '0 8% 8% 8%' },
        { x: 52.6, y: 57.0, w: 43.0, h: 17.1 }
    ]
};

const leesolFrameSlots = [
    { x: 3.6, y: 7.9, w: 42.7, h: 17.2 },
    { x: 3.6, y: 29.2, w: 42.7, h: 17.2 },
    { x: 3.6, y: 50.5, w: 42.7, h: 17.2 },
    { x: 53.6, y: 3.8, w: 42.7, h: 17.1 },
    { x: 53.6, y: 25.1, w: 42.7, h: 17.1 },
    { x: 53.6, y: 46.4, w: 42.7, h: 17.1 }
];

// Slot khusus untuk Frame Yeonjun (yj_bf dan yj_ride) yang sudah disesuaikan posisinya
const yeonjunFrameSlots = {
    bf: [
        { x: 5.2, y: 6.8, w: 42.5, h: 19.0 },
        { x: 52.3, y: 6.8, w: 42.5, h: 19.0 },
        { x: 5.2, y: 28.9, w: 42.5, h: 19.0 },
        { x: 52.3, y: 28.9, w: 42.5, h: 19.0 },
        { x: 5.2, y: 51.0, w: 42.5, h: 19.0 },
        { x: 52.3, y: 51.0, w: 42.5, h: 19.0 }
    ]
};
function createFrame(fileName, name, slots = defaultSixSlots) {
    return {
        src: fileName.startsWith('http') ? fileName : `assets/frames/${fileName}`,
        name: name,
        slots: slots
    };
}


const artistDatabase = {
    "dapoer easy": {
        name: "DAPOER EASY BU DIDAH",
        group: "brand frame",
        thumbImg: "assets/bu didah.png",
        detailImg: "assets/bu didah.png",
        frames: [
            createFrame(
                "https://dhzljytflsetfkcpsscr.supabase.co/storage/v1/object/public/frames/dapoer_budidah%20(1).png",
                "budidah frame",
                yeonjunFrameSlots.bf
            )
        ]
    },

    "coming soon": {
        name: "COMING SOON",
        thumbImg: "assets/coming soon.png",
        detailImg: "assets/coming soon.png",
        frames: [
            createFrame(
                "https://dhzljytflsetfkcpsscr.supabase.co/storage/v1/object/public/frames/LEESOL%20FRAME.png",
                "Leesol Frame",
                leesolFrameSlots
            )
        ]
    }
};

document.addEventListener("DOMContentLoaded", function() {
    
    const artistGrid = document.getElementById('artistGrid');
    
    if (artistGrid) {
        const artistKeys = Object.keys(artistDatabase);
        const searchInput = document.querySelector('.search-box input');

        function renderArtists(searchTerm = '') {
            const normalizedSearch = searchTerm.trim().toLowerCase();
            const filteredKeys = artistKeys.filter(key => {
                const artist = artistDatabase[key];
                return [key, artist.name, artist.group].some(value =>
                    value.toLowerCase().includes(normalizedSearch)
                );
            });

            artistGrid.innerHTML = '';

            if (!filteredKeys.length) {
                artistGrid.innerHTML = '<p class="empty-message">Artist tidak ditemukan.</p>';
                return;
            }

        filteredKeys.forEach(key => {
            const artist = artistDatabase[key];
            
            const card = document.createElement('a');
            card.href = key === 'dapoer easy'
                ? `artist-detail.html?id=${encodeURIComponent(key)}`
                : key === 'cafe event'
                ? 'cafe.html'
                : key === 'classic frame'
                    ? 'classic.html'
                    : key === 'brands frame'
                        ? 'brands.html'
                    : `artist-detail.html?id=${encodeURIComponent(key)}`;
            card.className = 'artist-card';
            card.style.textDecoration = 'none';
            
            card.innerHTML = `
                <div class="artist-image">
                    <img src="${artist.thumbImg}" alt="${artist.name}">
                </div>
                <h3>${artist.name}</h3>
                <p>${artist.group}</p>
            `;
            
            artistGrid.appendChild(card);
        });
        }

        renderArtists();
        searchInput?.addEventListener('input', event => {
            renderArtists(event.target.value);
        });
    }

    const artistNameElement = document.getElementById('artistName');
    
    if (artistNameElement) {
        const urlParams = new URLSearchParams(window.location.search);
        const artistId = urlParams.get('id');
        const artistData = artistDatabase[artistId];

        if (artistData) {
            document.getElementById('artistName').innerText = artistData.name;
            document.getElementById('groupName').innerText = artistData.group;
            document.getElementById('artistImg').src = artistData.detailImg;

            document.title = `${artistData.name} | Lumora`;

            const gallery = document.getElementById('frameGallery');
            gallery.innerHTML = ''; 

            artistData.frames.forEach((frame, index) => {
                const frameSrc = typeof frame === 'string' ? frame : frame.src;
                const frameName = typeof frame === 'string' ? `Frame ${artistData.name}` : frame.name;
                const frameBox = document.createElement('div');
                frameBox.className = 'frame-item';
                frameBox.innerHTML = `<img src="${frameSrc}" alt="${frameName}">`;
                frameBox.addEventListener('click', () => {
                    localStorage.setItem('lumoraSelectedFrame', JSON.stringify({
                        artistId: artistId,
                        artistName: artistData.name,
                        groupName: artistData.group,
                        artistImg: artistData.detailImg,
                        frameSrc: frameSrc,
                        frameName: frameName,
                        slots: typeof frame === 'string' ? null : frame.slots,
                        frameIndex: index
                    }));
                    window.location.href = `camera.html?artist=${artistId}&frame=${index}`;
                });
                gallery.appendChild(frameBox);
            });
        } else {
            document.getElementById('groupName').innerText = "Artist Not Found";
            document.getElementById('artistName').innerText = "";
        }
    }
});
