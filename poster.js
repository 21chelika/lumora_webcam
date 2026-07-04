const posterGrid = document.getElementById('poster-grid');
const createBtn = document.getElementById('create-btn');
const backBtn = document.getElementById('back-btn');
const posterKicker = document.getElementById('poster-kicker');
const posterTitle = document.getElementById('poster-title');
const savedPhotos = JSON.parse(localStorage.getItem('lumoraPhotos') || '[]');
const selectedFrame = JSON.parse(localStorage.getItem('lumoraSelectedFrame') || 'null');
const selectedIndexes = [];
const maxSelected = 6;

if (selectedFrame) {
    posterKicker.innerText = `${selectedFrame.artistName} ${selectedFrame.groupName}`;
    posterTitle.innerText = 'Choose 6 Photos';
    backBtn.href = `camera.html?artist=${selectedFrame.artistId}&frame=${selectedFrame.frameIndex}`;
}

function updateCreateButton() {
    createBtn.innerText = `Create Frame (${selectedIndexes.length}/${maxSelected})`;
    createBtn.disabled = selectedIndexes.length !== maxSelected;
}

function renderChoices() {
    posterGrid.innerHTML = '';

    if (!savedPhotos.length) {
        posterGrid.innerHTML = '<p class="empty-message">Belum ada foto. Balik ke camera dulu ya.</p>';
        return;
    }

    savedPhotos.forEach((photo, index) => {
        const choice = document.createElement('button');
        choice.className = 'poster-choice';
        choice.type = 'button';
        choice.setAttribute('aria-label', `Choose photo ${index + 1}`);

        const img = document.createElement('img');
        img.src = photo;
        img.alt = `Photo ${index + 1}`;

        const number = document.createElement('span');
        number.className = 'choice-number';

        choice.appendChild(img);
        choice.appendChild(number);
        choice.addEventListener('click', () => toggleChoice(index));
        posterGrid.appendChild(choice);
    });

    syncSelectionState();
}

function toggleChoice(index) {
    const existingIndex = selectedIndexes.indexOf(index);

    if (existingIndex >= 0) {
        selectedIndexes.splice(existingIndex, 1);
    } else if (selectedIndexes.length < maxSelected) {
        selectedIndexes.push(index);
    }

    syncSelectionState();
}

function syncSelectionState() {
    const choices = posterGrid.querySelectorAll('.poster-choice');

    choices.forEach((choice, index) => {
        const selectedOrder = selectedIndexes.indexOf(index);
        const number = choice.querySelector('.choice-number');
        choice.classList.toggle('selected', selectedOrder >= 0);
        number.innerText = selectedOrder >= 0 ? selectedOrder + 1 : '';
    });

    updateCreateButton();
}

createBtn.addEventListener('click', () => {
    if (selectedIndexes.length !== maxSelected) {
        return;
    }

    const selectedPhotos = selectedIndexes.map(index => savedPhotos[index]);
    localStorage.setItem('lumoraSelectedPhotos', JSON.stringify(selectedPhotos));
    window.location.href = 'result.html';
});

renderChoices();
