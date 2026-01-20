// 霸都丶傲天 2019年12月24日 (Modified for Love Gallery)

document.addEventListener('DOMContentLoaded', () => {
    initGalleryTrigger();
});

function initGalleryTrigger() {
    const trigger = document.getElementById('gallery-trigger');
    const label = config.gallery && config.gallery.folder_label ? config.gallery.folder_label : "Love Album";
    // Set the label text
    const textEl = trigger.querySelector('.trigger-text');
    if (textEl) textEl.innerText = label;

    trigger.addEventListener('click', () => {
        openGallery();
    });
}

function openGallery() {
    const overlay = document.getElementById('gallery-overlay');
    const container = document.getElementById('gallery-content');
    overlay.classList.remove('hidden');
    overlay.classList.add('visible');

    // Clear previous content to avoid duplicates if re-opened (optional, or keep them)
    container.innerHTML = '';

    loadPhotos(container);
}

function closeGallery() {
    const overlay = document.getElementById('gallery-overlay');
    overlay.classList.remove('visible');
    setTimeout(() => {
        overlay.classList.add('hidden');
    }, 500); // Wait for fade out
}

function loadPhotos(container) {
    const maxPhotos = config.gallery && config.gallery.max_photos ? config.gallery.max_photos : 50;

    // Attempt to load photos from 1 to maxPhotos
    // Strategy: We create an Image object for each index. If it loads, we append it.
    // If it fails, we assume that photo doesn't exist.

    // To make it appear "slowly and romantically", we will append them but set them to opacity 0 first,
    // then animate them in with random delays.

    let loadedCount = 0;

    for (let i = 1; i <= maxPhotos; i++) {
        const img = new Image();
        img.src = `./static/photos/${i}.jpg`;
        img.className = 'gallery-photo';
        img.style.opacity = '0'; // Start hidden

        img.onload = () => {
            // Randomize position slightly or just grid? 
            // Let's do a masonry-like float or just a nice flex grid.
            container.appendChild(img);

            // Random delay for fade in
            const delay = Math.random() * 2000 + 500; // 0.5s to 2.5s delay
            setTimeout(() => {
                img.style.transition = 'opacity 1.5s ease, transform 1.5s ease';
                img.style.opacity = '1';
                img.style.transform = 'scale(1)';
            }, delay + (i * 100)); // Staggered start plus random
        };

        img.onerror = () => {
            // Image doesn't exist, ignore
        };
    }
}
