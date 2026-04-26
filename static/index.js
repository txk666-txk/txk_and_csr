window.addEventListener("load", () => {
    new Container(config.wish, config.time, config.texts);

    const audio = document.querySelector('.song-audio-autoplay');
    const musicIcon = document.querySelector('.music-toggle');

    function playMusic() {
        if (!audio || !musicIcon || !audio.paused) return;
        audio.play().then(() => {
            musicIcon.classList.add('rotateImages');
        }).catch(() => {
            // Browsers may block autoplay until the first gesture.
        });
    }

    playMusic();

    document.addEventListener('click', playMusic, { once: true });
    document.addEventListener('touchstart', playMusic, { once: true });
});

function Container(wish, time, texts) {
    this.passedSeconds = 0;
    this.finalText = wish;
    this.beginDate = time
    this.texts = texts

    this.renderTexts(this.texts);
    document.querySelector('.pass-time .finalText').innerHTML = this.finalText;
    setInterval(() => {
        this.passedSeconds = Math.ceil((+ new Date() - new Date(this.beginDate).getTime()) / 1000);
        let list = ['days', 'hours', 'minutes', 'seconds'];

        list.forEach(item => {
            document.querySelector(`.pass-time .${item}`).innerHTML = this[item]();
        })
    }, 1000);
}

Container.prototype = {
    renderTexts(texts) {
        const div = document.createElement("div");
        texts.forEach(item => {
            const d = document.createElement("div");
            d.innerHTML = item;
            div.appendChild(d);
        });
        const marquee = document.getElementById("marquee");
        if (marquee) marquee.innerHTML = div.innerHTML;
    },
    finalText() {
        return this.finalText || "";
    },
    beginDate() {
        return this.beginDate;
    },
    days: function () {
        if (this.passedSeconds === 0) return "";
        return Math.floor(this.passedSeconds / (3600 * 24));
    },
    hours: function () {
        if (this.passedSeconds === 0) return "";
        return Math.floor(this.passedSeconds / 3600) % 24;
    },
    minutes: function () {
        if (this.passedSeconds === 0) return "";
        return Math.floor(this.passedSeconds / 60) % 60;
    },
    seconds: function () {
        if (this.passedSeconds === 0) return "";
        return this.passedSeconds % 60;
    },
};
