document.addEventListener("DOMContentLoaded", function () {
    const slides = document.querySelectorAll(".showcase-slide");
    const dots = document.querySelectorAll(".showcase-dot");
    const previousButton = document.querySelector(".showcase-previous");
    const nextButton = document.querySelector(".showcase-next");

    console.log("Slides found:", slides.length);
    console.log("Dots found:", dots.length);

    if (!slides.length || !previousButton || !nextButton) {
        console.error("Slideshow elements were not found.");
        return;
    }

    let currentSlide = 0;
    let slideshowTimer;

    function showSlide(index) {
        slides.forEach((slide) => {
            slide.classList.remove("active");
        });

        dots.forEach((dot) => {
            dot.classList.remove("active");
        });

        currentSlide = (index + slides.length) % slides.length;

        slides[currentSlide].classList.add("active");

        if (dots[currentSlide]) {
            dots[currentSlide].classList.add("active");
        }
    }

    function startSlideshow() {
        clearInterval(slideshowTimer);

        slideshowTimer = setInterval(function () {
            showSlide(currentSlide + 1);
        }, 5000);
    }

    previousButton.addEventListener("click", function () {
        showSlide(currentSlide - 1);
        startSlideshow();
    });

    nextButton.addEventListener("click", function () {
        showSlide(currentSlide + 1);
        startSlideshow();
    });

    dots.forEach(function (dot, index) {
        dot.addEventListener("click", function () {
            showSlide(index);
            startSlideshow();
        });
    });

    showSlide(0);
    startSlideshow();
});