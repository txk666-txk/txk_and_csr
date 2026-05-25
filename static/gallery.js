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
        const columnOffset = index % 3;
        const delay = 120 + (index * 55);
        const drift = (columnOffset - 1) * 18;
        const scale = 0.94 + (index % 4) * 0.015;

        card.style.opacity = '0';
        card.style.transform = `translateY(-120px) translateX(${drift}px) rotate(${(index % 2 === 0 ? -1 : 1) * (index % 6)}deg) scale(${scale})`;
        container.appendChild(card);

        setTimeout(() => {
            card.style.transition = 'opacity 1.2s ease, transform 1.2s cubic-bezier(0.22, 1, 0.36, 1)';
            card.style.opacity = '1';
            card.style.transform = `translateY(0) translateX(0) rotate(0deg) scale(1)`;
        }, delay);
    });
}
