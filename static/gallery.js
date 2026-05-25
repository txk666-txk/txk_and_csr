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
    container.innerHTML = '';
    loadPhotos(container);
}

function createPhotoCard(src, index) {
    const card = document.createElement('figure');
    card.className = 'gallery-card';

    const img = new Image();
    img.src = src;
    img.alt = `memory ${index + 1}`;
    img.className = 'gallery-photo';

    const caption = document.createElement('figcaption');
    caption.textContent = `回忆 ${String(index + 1).padStart(2, '0')}`;

    card.appendChild(img);
    card.appendChild(caption);
    return card;
}

function closeGallery() {
    const overlay = document.getElementById('gallery-overlay');
    overlay.classList.remove('visible');
    setTimeout(() => {
        overlay.classList.add('hidden');
    }, 500); // Wait for fade out
}

function loadPhotos(container) {
    const featured = (config.gallery && config.gallery.featured_photos) ? config.gallery.featured_photos : [];
    const maxPhotos = config.gallery && config.gallery.max_photos ? config.gallery.max_photos : 50;
    const sources = featured.length ? featured : Array.from({ length: maxPhotos }, (_, i) => `./static/photos/${i + 1}.jpg`);

    sources.forEach((src, index) => {
        const card = createPhotoCard(src, index);
        card.style.opacity = '0';
        card.style.transform = 'translateY(18px) scale(0.98) rotate(' + ((index % 2 === 0 ? -1 : 1) * (index % 5)) + 'deg)';
        container.appendChild(card);

        const delay = 180 + (index * 110);
        setTimeout(() => {
            card.style.transition = 'opacity 1.1s ease, transform 1.1s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1) rotate(0deg)';
        }, delay);
    });
}
