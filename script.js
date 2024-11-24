const mediaContent = {
    1: {
        medias: [
            {type: 'image', src: 'images/1.png', description: 'première approche'}
        ]
    },
    2: {
        medias: [
            {type: 'image', src: 'images/2.jpg', description: 'Première Relance'},
            {type: 'image', src: 'images/2-A.jpg', description: 'Premier Bonne Nuit'}
        ]
    },
    3: {
        medias: [
            {type: 'image', src: 'images/3.jpg', description: 'Premier Délire'}
        ]
    },
    4: {
        medias: [
            {type: 'video', src: 'videos/4.mp4', description: 'Premier Date'},
            {type: 'image', src: 'images/4A.jpg'},
            {type: 'video', src: 'videos/4B.mp4', description: 'MIAM'},
            {type: 'image', src: 'images/4C.jpg'}
        ]
    },
    5: {
        medias: [
            {type: 'image', src: 'images/5.jpg', description: 'Deuxième Date'},
            {type: 'video', src: 'videos/5A.mp4'},
            {type: 'image', src: 'images/5B.jpg'},
        ]
    },
    6: {
        medias: [
            {type: 'video', src: 'videos/6A.mp4', description: 'Troisième Date'},
            {type: 'image', src: 'images/6B.jpg'},
            {type: 'image', src: 'images/6C.jpg', description: 'Cinéma'},
        ]
    },
    7: {
        medias: [
            {type: 'image', src: 'images/7.jpg', description: 'Direction Chez Lili'},
            {type: 'image', src: 'images/7B.jpg', description: 'Toi Même Tu Sais'}
        ]
    },
    8: {
        medias: [
            {type: 'image', src: 'images/8.jpg', description: 'Quatrième Date'},
            {type: 'image', src: 'images/8A.jpg', description: 'Big O\'Tacos : Round 1'},
            {type: 'image', src: 'images/8B.jpg', description: 'Première Photo Ensemble'},
            {type: 'image', src: 'images/8C.jpg', description: 'Big O\'Tacos : Round 2'}
        ]
    },
    9: {
        medias: [
            {type: 'image', src: 'images/9.jpg', description: 'Premier FaceTime'}
        ]
    },
    10: {
        medias: [
            {type: 'image', src: 'images/10.jpg', description: 'Easy Win'},
            {type: 'image', src: 'images/10A.jpg', description: 'No One Can Beat Me'},
            {type: 'image', src: 'images/10B.jpg', description: 'Soit T\'es Bon Soit T\'es Pas Bon'}
        ]
    },
    11: {
        medias: [
            {type: 'image', src: 'images/11.jpg', description: 'La meilleure décision'}
        ]
    },
    12: {
        medias: [
            {type: 'image', src: 'images/12.jpg', description: 'Drôle de proposition'}
        ]
    },
    13: {
        medias: [
            {type: 'image', src: 'images/13.jpg', description: 'Harcèlement appréciable'}
        ]
    },
    14: {
        medias: [
            {type: 'image', src: 'images/14.jpg', description: 'Première Communication'}
        ]
    },
    15: {
        medias: [
            {type: 'image', src: 'images/15.jpg', description: 'Ton Cœur de Pierre'}
        ]
    },
    16: {
        medias: [
            {type: 'image', src: 'images/16.jpg', description: 'Premiers widgets'}
        ]
    },
    17: {
        medias: [
            {type: 'video', src: 'videos/17.mp4', description: 'Point faible : trop fort'},
            {type: 'image', src: 'images/17B.jpg', description: 'Matching'},
        ]
    }
};

const unwrapSound = document.getElementById('unwrapSound');

function playUnwrapSound() {
    unwrapSound.currentTime = 0;
    unwrapSound.volume = 0.5;
    try {
        unwrapSound.play().catch(function(error) {
            console.log("Lecture du son impossible : ", error);
        });
    } catch (e) {
        console.log("Erreur de lecture du son : ", e);
    }
}

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

    playUnwrapSound();

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


function createSnowfall() {
    const snowflakes = ['❅', '❆', '❄'];
    const maxSnowflakes = 50;
    const container = document.body;

    function createSnowflake() {
        if (document.querySelectorAll('.snowflake').length > maxSnowflakes) return;

        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.textContent = snowflakes[Math.floor(Math.random() * snowflakes.length)];

        // Position initiale aléatoire
        const startPosition = Math.random() * window.innerWidth;
        snowflake.style.left = `${startPosition}px`;

        container.appendChild(snowflake);

        // Animation
        requestAnimationFrame(() => {
            snowflake.classList.add('active');

            const duration = 5000 + Math.random() * 5000;
            const rotation = -30 + Math.random() * 60;
            const horizontalMove = -50 + Math.random() * 100;

            snowflake.style.transition = `all ${duration}ms linear`;
            snowflake.style.transform = `translateY(${window.innerHeight + 20}px) translateX(${horizontalMove}px) rotate(${rotation}deg)`;

            // Supprimer le flocon après l'animation
            setTimeout(() => {
                snowflake.remove();
            }, duration);
        });
    }

    setInterval(() => {
        if (Math.random() < 0.4) {
            createSnowflake();
        }
    }, 200);
}

document.addEventListener('DOMContentLoaded', createCalendar);
document.addEventListener('DOMContentLoaded', createSnowfall);