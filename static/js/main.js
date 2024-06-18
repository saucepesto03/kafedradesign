function changeContent(containerId) {
    const contentElement = document.getElementById(containerId);
    const options = document.querySelectorAll(`input[data-target="${containerId}"]`);
    let selectedValue;

    for (const option of options) {
        if (option.checked) {
            selectedValue = option.value;
            break;
        }
    }

    if (selectedValue) {
        console.log(`Загрузка шаблона с пути: ${selectedValue}`);
        fetch(selectedValue)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Ошибка загрузки: ${response.status} ${response.statusText}`);
                }
                return response.text();
            })
            .then(data => {
                contentElement.innerHTML = data;
                initializeNestedChoices(contentElement);
            })
            .catch(error => {
                contentElement.innerHTML = 'Ошибка загрузки шаблона.';
                console.error('Ошибка загрузки шаблона:', error);
            });
    } else {
        contentElement.innerHTML = 'Выберите шаблон для отображения контента.';
    }
}

function initializeNestedChoices(element) {
    const nestedChoices = element.querySelectorAll('.gallerychoice input[type="radio"]');
    
    nestedChoices.forEach(choice => {
        choice.addEventListener('change', () => {
            const containerId = choice.getAttribute('data-target');
            changeContent(containerId);
        });
    });

    // Инициализация начального контента для всех контейнеров в данном элементе
    nestedChoices.forEach(choice => {
        if (choice.checked) {
            const containerId = choice.getAttribute('data-target');
            changeContent(containerId);
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const allChoices = document.querySelectorAll('.gallerychoice input[type="radio"]');
    
    allChoices.forEach(choice => {
        choice.addEventListener('change', () => {
            const containerId = choice.getAttribute('data-target');
            changeContent(containerId);
        });
    });

    // Инициализация начального контента для всех контейнеров
    allChoices.forEach(choice => {
        if (choice.checked) {
            const containerId = choice.getAttribute('data-target');
            changeContent(containerId);
        }       
    });
});

// плавный скрол
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

// галерея
document.addEventListener('DOMContentLoaded', function() {
    const galleries = {
        gallery1: {
            bak1: 
            [
                'static/png/bakalavr/image1.png', 'static/png/bakalavr/image2.png', 'static/png/bakalavr/image3.png', 'static/png/bakalavr/image4.png'
                , 'static/png/bakalavr/image5.png', 'static/png/bakalavr/image6.png'
            ],
            mag1: 
            [
                'static/png/magistrat/image1.png', 'static/png/magistrat/image2.png', 'static/png/magistrat/image3.png', 'static/png/magistrat/image4.png'
                , 'static/png/magistrat/image5.png'
            ]
        }

    };

    function initializeGallery(galleryContainer, images) {
        let currentIndex = 0;

        const imgElement = galleryContainer.querySelector('.galleryImage');
        const prevButton = galleryContainer.querySelector('.prevButton');
        const nextButton = galleryContainer.querySelector('.nextButton');

        function showImage() {
            imgElement.src = images[currentIndex];
        }

        function showNextImage() {
            currentIndex = (currentIndex + 1) % images.length;
            showImage();
        }

        function showPrevImage() {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            showImage();
        }

        prevButton.addEventListener('click', showPrevImage);
        nextButton.addEventListener('click', showNextImage);

        showImage();
    }

    function updateGallery(galleryId, setId) {
        const galleryContainer = document.querySelector(`.gallery-container[data-gallery-id="${galleryId}"]`);
        if (galleryContainer && galleries[galleryId][setId]) {
            initializeGallery(galleryContainer, galleries[galleryId][setId]);
        }
    }

    document.querySelectorAll('input[name="choice1"]').forEach(radio => {
        radio.addEventListener('change', function() {
            const targetId = this.dataset.target;
            const setId = this.id;
            updateGallery('gallery1', setId);
        });
    });

    updateGallery('gallery1', 'bak1');
});