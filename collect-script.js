function createFrame(fileName, name, slots = defaultSixSlots) {
    return {
        src: `assets/frames/${fileName}`,
        name: name,
        slots: slots
    };
}


const artistDatabase = {
    "kpop event": {
        name: "KPOP EVENT",
        group: "category of kpop events",
        thumbImg: "assets/1.png", // Foto untuk di home
        detailImg: "assets/1.png", // Foto untuk di halaman detail
        frames: [
            "https://via.placeholder.com/300x400/E5E7E1/E5E7E1", // Link frame
            "https://via.placeholder.com/300x400/E5E7E1/E5E7E1"
        ]
    },
    "cafe event": {
        name: "CAFE EVENT",
        group: "category of cafe events",
        thumbImg: "assets/2.png",
        detailImg: "assets/2.png",
        frames: ["https://via.placeholder.com/300x400/E5E7E1/E5E7E1"]
    },
    "classic frame": {
        name: "CLASSIC FRAME",
        group: "category of classic frames",
        thumbImg: "assets/3.png",
        detailImg: "assets/3.png",
        frames: ["https://via.placeholder.com/300x400/E5E7E1/E5E7E1"]
    }
};

// 2. LOGIKA UNTUK MENAMPILKAN DATA KE HTML
document.addEventListener("DOMContentLoaded", function() {
    
    // --- A. LOGIKA UNTUK HALAMAN HOME (artist.html) ---
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
                artistGrid.innerHTML = '<p class="empty-message">Event tidak ditemukan.</p>';
                return;
            }

        filteredKeys.forEach(key => {
            const artist = artistDatabase[key];
            
            // Membuat elemen kartu artis (<a>)
            const card = document.createElement('a');
            card.href = `artist.html?id=${key}`; // Otomatis bikin link
            card.className = 'artist-card';
            card.style.textDecoration = 'none'; // Biar teksnya nggak bergaris bawah
            
            // Mengisi HTML ke dalam kartu
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

    // --- B. LOGIKA UNTUK HALAMAN DETAIL (artist-detail.html) ---
    const artistNameElement = document.getElementById('artistName');
    
    if (artistNameElement) {
        const urlParams = new URLSearchParams(window.location.search);
        const artistId = urlParams.get('id');
        const artistData = artistDatabase[artistId];

        if (artistData) {
            document.getElementById('artistName').innerText = artistData.name;
            document.getElementById('groupName').innerText = artistData.group;
            document.getElementById('artistImg').src = artistData.detailImg;

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
