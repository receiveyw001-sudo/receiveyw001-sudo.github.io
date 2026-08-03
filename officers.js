document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.querySelector(".officer-carousel");

    if (!carousel) {
        return;
    }

    const track = carousel.querySelector(".officer-carousel-track");
    const cards = Array.from(
        carousel.querySelectorAll(".small-officer-card")
    );

    const previousButton = carousel.querySelector(
        ".officer-carousel-previous"
    );

    const nextButton = carousel.querySelector(
        ".officer-carousel-next"
    );

    const dotsContainer = document.querySelector(
        ".officer-carousel-dots"
    );

    if (
        !track ||
        cards.length === 0 ||
        !previousButton ||
        !nextButton ||
        !dotsContainer
    ) {
        return;
    }

    let currentIndex = 0;
    let autoPlayTimer = null;

    function cardsPerView() {
        if (window.innerWidth <= 600) {
            return 1;
        }

        if (window.innerWidth <= 850) {
            return 2;
        }

        return 3;
    }

    function maximumIndex() {
        return Math.max(
            0,
            cards.length - cardsPerView()
        );
    }

    function createDots() {
        dotsContainer.innerHTML = "";

        for (
            let index = 0;
            index <= maximumIndex();
            index += 1
        ) {
            const dot = document.createElement("button");

            dot.className = "officer-carousel-dot";
            dot.type = "button";

            dot.setAttribute(
                "aria-label",
                `Show officer group ${index + 1}`
            );

            dot.addEventListener("click", function () {
                currentIndex = index;
                updateCarousel();
                restartAutoPlay();
            });

            dotsContainer.appendChild(dot);
        }
    }

    function updateCarousel() {
        const gap = 24;
        const cardWidth =
            cards[0].getBoundingClientRect().width;

        const maxIndex = maximumIndex();

        if (currentIndex > maxIndex) {
            currentIndex = 0;
        }

        if (currentIndex < 0) {
            currentIndex = maxIndex;
        }

        track.style.transform =
            `translateX(-${currentIndex * (cardWidth + gap)}px)`;

        const dots = dotsContainer.querySelectorAll(
            ".officer-carousel-dot"
        );

        dots.forEach(function (dot, index) {
            dot.classList.toggle(
                "active",
                index === currentIndex
            );
        });
    }

    function nextSlide() {
        currentIndex += 1;

        if (currentIndex > maximumIndex()) {
            currentIndex = 0;
        }

        updateCarousel();
    }

    function previousSlide() {
        currentIndex -= 1;

        if (currentIndex < 0) {
            currentIndex = maximumIndex();
        }

        updateCarousel();
    }

    function startAutoPlay() {
        clearInterval(autoPlayTimer);

        if (cards.length <= cardsPerView()) {
            return;
        }

        autoPlayTimer = setInterval(function () {
            nextSlide();
        }, 3000);
    }

    function stopAutoPlay() {
        clearInterval(autoPlayTimer);
    }

    function restartAutoPlay() {
        stopAutoPlay();
        startAutoPlay();
    }

    previousButton.addEventListener("click", function () {
        previousSlide();
        restartAutoPlay();
    });

    nextButton.addEventListener("click", function () {
        nextSlide();
        restartAutoPlay();
    });

    carousel.addEventListener("mouseenter", function () {
        stopAutoPlay();
    });

    carousel.addEventListener("mouseleave", function () {
        startAutoPlay();
    });

    carousel.addEventListener("touchstart", function () {
        stopAutoPlay();
    });

    carousel.addEventListener("touchend", function () {
        startAutoPlay();
    });

    window.addEventListener("resize", function () {
        currentIndex = 0;
        createDots();
        updateCarousel();
        restartAutoPlay();
    });

    createDots();
    updateCarousel();
    startAutoPlay();
    const workSlides =
    document.querySelectorAll(".officer-work-slide");

const workDots =
    document.querySelectorAll(".officer-work-dot");

const workPrevious =
    document.querySelector(".officer-work-previous");

const workNext =
    document.querySelector(".officer-work-next");

let currentWorkSlide = 0;
let workTimer = null;

function showWorkSlide(index) {
    if (workSlides.length === 0) {
        return;
    }

    workSlides.forEach(function (slide) {
        slide.classList.remove("active");
    });

    workDots.forEach(function (dot) {
        dot.classList.remove("active");
    });

    currentWorkSlide =
        (index + workSlides.length) % workSlides.length;

    workSlides[currentWorkSlide].classList.add("active");

    if (workDots[currentWorkSlide]) {
        workDots[currentWorkSlide].classList.add("active");
    }
}

function restartWorkSlideshow() {
    clearInterval(workTimer);

    if (workSlides.length < 2) {
        return;
    }

    workTimer = setInterval(function () {
        showWorkSlide(currentWorkSlide + 1);
    }, 4000);
}

if (workSlides.length > 0) {
    showWorkSlide(0);
    restartWorkSlideshow();

    if (workPrevious) {
        workPrevious.addEventListener("click", function () {
            showWorkSlide(currentWorkSlide - 1);
            restartWorkSlideshow();
        });
    }

    if (workNext) {
        workNext.addEventListener("click", function () {
            showWorkSlide(currentWorkSlide + 1);
            restartWorkSlideshow();
        });
    }

    workDots.forEach(function (dot, index) {
        dot.addEventListener("click", function () {
            showWorkSlide(index);
            restartWorkSlideshow();
        });
    });
}
});
