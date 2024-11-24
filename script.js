const mediaContent = {
    1: { type: 'image', src: 'images/1.png' },
    2: { type: 'video', src: 'videos/jour2.mp4' },
    3: { type: 'image', src: '/api/placeholder/800/600' },
};

function createCalendar() {
    const calendar = document.querySelector('.calendar');
    const currentDate = new Date();

    const startDate = new Date(2024, 10, 24);
    const endDate = new Date(2024, 11, 18);

    for (let i = 1; i <= 24; i++) {
        const caseElement = document.createElement('div');
        caseElement.className = 'case';

        const span = document.createElement('span');
        span.textContent = i;
        caseElement.appendChild(span);

        const caseDate = new Date(2024, 10, 23 + i);

        if (currentDate < startDate || currentDate > endDate || currentDate < caseDate) {
            caseElement.classList.add('locked');
        }

        caseElement.addEventListener('click', () => handleCaseClick(caseElement, i));
        calendar.appendChild(caseElement);
    }
}

function handleCaseClick(caseElement, dayNumber) {
    const currentDate = new Date();
    const startDate = new Date(2024, 10, 24);
    const endDate = new Date(2024, 11, 18);

    if (caseElement.classList.contains('locked')) {
        const caseDate = new Date(2024, 10, 23 + dayNumber);

        if (currentDate < startDate) {
            showError(caseElement, "Disponible à partir du 24 novembre !");
        } else if (currentDate > endDate) {
            showError(caseElement, "Le calendrier est terminé !");
        } else {
            const month = caseDate.getMonth() === 10 ? "novembre" : "décembre";
            const day = caseDate.getDate();
            showError(caseElement, `Disponible le ${day} ${month} !`);
        }
        return;
    }

    caseElement.classList.add('opened');

    showMedia(dayNumber);
}

function showMedia(dayNumber) {
    const modal = document.getElementById('mediaModal');
    const mediaContainer = document.getElementById('mediaContainer');
    mediaContainer.innerHTML = '';

    const content = mediaContent[dayNumber];
    if (!content) return;

    modal.style.display = 'flex';

    setTimeout(() => {
        if (content.type === 'image') {
            const img = document.createElement('img');
            img.src = content.src;
            img.alt = `Jour ${dayNumber}`;
            img.className = 'modal-image';

            img.onload = () => {
                mediaContainer.appendChild(img);
                requestAnimationFrame(() => {
                    modal.classList.add('active');
                });
            };
        } else if (content.type === 'video') {
            const video = document.createElement('video');
            video.src = content.src;
            video.className = 'modal-video';
            video.controls = true;
            video.autoplay = true;

            mediaContainer.appendChild(video);
            requestAnimationFrame(() => {
                modal.classList.add('active');
            });
        }
    }, 50);
}

function showError(element, message) {
    const errorModal = document.getElementById('errorModal');
    const errorMessage = document.getElementById('errorModalMessage');

    errorMessage.textContent = message;

    errorModal.classList.add('active');
}

function closeErrorModal() {
    const errorModal = document.getElementById('errorModal');
    errorModal.classList.remove('active');
}

document.querySelector('.close-button').addEventListener('click', (e) => {
    e.stopPropagation();
    closeMediaModal();
});

document.getElementById('mediaModal').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
        closeMediaModal();
    }
});

function closeMediaModal() {
    const modal = document.getElementById('mediaModal');
    modal.classList.remove('active');
    setTimeout(() => {
        modal.style.display = 'none';
        document.getElementById('mediaContainer').innerHTML = '';
    }, 500);
}

document.getElementById('errorModal').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
        closeErrorModal();
    }
});

document.addEventListener('DOMContentLoaded', createCalendar);