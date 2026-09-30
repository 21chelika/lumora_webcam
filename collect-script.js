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
        thumbImg: "assets/1.png", 
        detailImg: "assets/1.png", 
        frames: [
            "https://via.placeholder.com/300x400/E5E7E1/E5E7E1", 
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
    },
    "brands frame": {
        name: "BRANDS FRAME",
        group: "category of brands frames",
        thumbImg: "assets/4.png",
        detailImg: "assets/4.png",
        frames: ["https://via.placeholder.com/300x400/E5E7E1/E5E7E1"]
    }
};


document.addEventListener("DOMContentLoaded", function() {
    

    const artistGrid = document.getElementById('artistGrid');
    
    if (artistGrid) {
        artistGrid.innerHTML = ''; // Kosongkan grid sebelum diisi

        // Mengambil semua kunci (sunghoon, jay, dll) dari database
        const artistKeys = Object.keys(artistDatabase);

        artistKeys.forEach(key => {
            const artist = artistDatabase[key];
            
            const card = document.createElement('a');
            card.href = key === 'cafe event'
                ? 'cafe.html'
                : key === 'classic frame'
                    ? 'classic.html'
                : key === 'brands frame'
                    ? 'brands.html'
                : key === 'kpop event'
                    ? `artist.html?id=${encodeURIComponent(key)}`
                    : `collection-detail.html?id=${encodeURIComponent(key)}`;
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
