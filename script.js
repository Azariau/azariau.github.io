const mediaContent = {
    2: {
        medias: [
            { type: 'image', src: 'images/1.png', description: 'Premier approche' },
        ]
    },
    1: {
        medias: [
            { type: 'image', src: 'images/2.jpg', description: 'Première relance' },
            { type: 'image', src: 'images/2-A.jpg', description: 'Premier "Bonne Nuit"' }
        ]
    },
    3: {
        medias: [
            { type: 'image', src: '/api/placeholder/800/600', description: 'Un moment magique' }
        ]
    },
    4: {
        medias: [
            { type: 'video', src: 'videos/4.mp4', description: 'Premier Date' }
        ]
    },
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

    const swiperContainer = document.createElement('div');
    swiperContainer.className = 'swiper';

    const swiperWrapper = document.createElement('div');
    swiperWrapper.className = 'swiper-wrapper';

    const prevButton = document.createElement('div');
    prevButton.className = 'swiper-button-prev';

    const nextButton = document.createElement('div');
    nextButton.className = 'swiper-button-next';

    const pagination = document.createElement('div');
    pagination.className = 'swiper-pagination';

    content.medias.forEach(media => {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';

        if (media.type === 'image') {
            const img = document.createElement('img');
            img.src = media.src;
            img.className = 'modal-image';
            img.alt = media.description || '';
            slide.appendChild(img);
        } else if (media.type === 'video') {
            const video = document.createElement('video');
            video.src = media.src;
            video.className = 'modal-video';
            video.controls = true;
            video.autoplay = true;
            slide.appendChild(video);
        }

        if (media.description) {
            const desc = document.createElement('div');
            desc.className = 'media-description';
            desc.innerHTML = media.description;
            setTimeout(() => desc.style.opacity = '1', 100);
            slide.appendChild(desc);
        }

        swiperWrapper.appendChild(slide);
    });

    swiperContainer.appendChild(swiperWrapper);
    swiperContainer.appendChild(prevButton);
    swiperContainer.appendChild(nextButton);
    swiperContainer.appendChild(pagination);
    mediaContainer.appendChild(swiperContainer);

    const swiper = new Swiper('.swiper', {
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        }
    });

    requestAnimationFrame(() => {
        modal.classList.add('active');
    });
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