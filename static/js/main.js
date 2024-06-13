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

        // авный скрол
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

// document.addEventListener("DOMContentLoaded", function() {
//     console.log("Document loaded, initializing galleries...");
//     const galleries = document.querySelectorAll('.gallery-container');

//     if (galleries.length === 0) {
//         console.error("No galleries found on the page.");
//     } else {
//         console.log(`${galleries.length} galleries found.`);
//     }
    
//     const galleryImages = {
//         gallery1: [
//             "{{ url_for('static', filename='png/bakalavr/image1.png') }}",
//             "{{ url_for('static', filename='png/bakalavr/image2.png') }}",
//             "{{ url_for('static', filename='png/bakalavr/image3.png') }}",
//             "{{ url_for('static', filename='png/bakalavr/image4.png') }}",
//             "{{ url_for('static', filename='png/bakalavr/image5.png') }}",
//             "{{ url_for('static', filename='png/bakalavr/image6.png') }}"
//         ]
//     };
    
//     galleries.forEach(gallery => {
//         const galleryId = gallery.getAttribute('data-gallery-id');
//         const imageElement = gallery.querySelector('.galleryImage');
//         const prevButton = gallery.querySelector('.prevButton');
//         const nextButton = gallery.querySelector('.nextButton');

//         console.log(`Initializing gallery ${galleryId}`);
        
//         if (!imageElement) {
//             console.error(`No image element found in gallery ${galleryId}`);
//         }
//         if (!prevButton) {
//             console.error(`No previous button found in gallery ${galleryId}`);
//         }
//         if (!nextButton) {
//             console.error(`No next button found in gallery ${galleryId}`);
//         }

//         const images = galleryImages[galleryId];
//         let currentIndex = 0;

//         function updateImage() {
//             console.log(`Updating image for gallery ${galleryId}, index ${currentIndex}`);
//             imageElement.src = images[currentIndex];
//             console.log(`New image source: ${imageElement.src}`);
//         }

//         prevButton.addEventListener('click', () => {
//             currentIndex = (currentIndex - 1 + images.length) % images.length;
//             console.log(`Previous button clicked for gallery ${galleryId}, new index ${currentIndex}`);
//             updateImage();
//         });

//         nextButton.addEventListener('click', () => {
//             currentIndex = (currentIndex + 1) % images.length;
//             console.log(`Next button clicked for gallery ${galleryId}, new index ${currentIndex}`);
//             updateImage();
//         });

//         // инициализация первого изображения
//         updateImage();
//     });
// });