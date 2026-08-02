document.addEventListener("DOMContentLoaded", function () {
    const slides = document.querySelectorAll(".showcase-slide");
    const dots = document.querySelectorAll(".showcase-dot");
    const previousButton = document.querySelector(".showcase-previous");
    const nextButton = document.querySelector(".showcase-next");

    if (slides.length === 0) {
        return;
    }

    let currentSlide = 0;
    let slideshowTimer;

    function showSlide(index) {
        slides.forEach(function (slide) {
            slide.classList.remove("active");
        });

        dots.forEach(function (dot) {
            dot.classList.remove("active");
        });

        currentSlide = (index + slides.length) % slides.length;

        slides[currentSlide].classList.add("active");

        if (dots[currentSlide]) {
            dots[currentSlide].classList.add("active");
        }
    }

    function startAutomaticSlideshow() {
        clearInterval(slideshowTimer);

        slideshowTimer = setInterval(function () {
            showSlide(currentSlide + 1);
        }, 4000);
    }

    if (previousButton) {
        previousButton.addEventListener("click", function () {
            showSlide(currentSlide - 1);
            startAutomaticSlideshow();
        });
    }

    if (nextButton) {
        nextButton.addEventListener("click", function () {
            showSlide(currentSlide + 1);
            startAutomaticSlideshow();
        });
    }

    dots.forEach(function (dot, index) {
        dot.addEventListener("click", function () {
            showSlide(index);
            startAutomaticSlideshow();
        });
    });

    showSlide(0);
    startAutomaticSlideshow();
});
