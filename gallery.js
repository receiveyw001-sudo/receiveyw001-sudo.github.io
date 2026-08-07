document.addEventListener("DOMContentLoaded", function () {
    initializeCategorySlideshows();
    initializeEventsSlideshow();
});

function initializeCategorySlideshows() {
    const slideshows = document.querySelectorAll(
        ".category-slideshow"
    );

    slideshows.forEach(function (slideshow) {
        const slides = Array.from(
            slideshow.querySelectorAll(
                ".category-showcase > .category-slide"
            )
        );

        const previousButton = slideshow.querySelector(
            ".category-previous"
        );

        const nextButton = slideshow.querySelector(
            ".category-next"
        );

        const dotsContainer = slideshow.querySelector(
            ".category-dots"
        );

        if (
            slides.length === 0 ||
            !dotsContainer ||
            !previousButton ||
            !nextButton
        ) {
            return;
        }

        let currentSlide = 0;
        let timer = null;

        dotsContainer.replaceChildren();

        const dots = slides.map(function (_, index) {
            const dot = document.createElement("button");

            dot.className = "category-dot";
            dot.type = "button";
            dot.setAttribute(
                "aria-label",
                "Show project " + (index + 1)
            );

            dot.addEventListener("click", function () {
                showSlide(index);
                restartTimer();
            });

            dotsContainer.appendChild(dot);

            return dot;
        });

        function showSlide(index) {
            currentSlide =
                (index + slides.length) % slides.length;

            slides.forEach(function (slide, slideIndex) {
                slide.classList.toggle(
                    "active",
                    slideIndex === currentSlide
                );
            });

            dots.forEach(function (dot, dotIndex) {
                dot.classList.toggle(
                    "active",
                    dotIndex === currentSlide
                );
            });
        }

        function restartTimer() {
            clearInterval(timer);

            if (slides.length < 2) {
                return;
            }

            timer = setInterval(function () {
                showSlide(currentSlide + 1);
            }, 5000);
        }

        const hasMultipleSlides = slides.length > 1;

        previousButton.hidden = !hasMultipleSlides;
        nextButton.hidden = !hasMultipleSlides;

        if (hasMultipleSlides) {
            previousButton.addEventListener(
                "click",
                function () {
                    showSlide(currentSlide - 1);
                    restartTimer();
                }
            );

            nextButton.addEventListener(
                "click",
                function () {
                    showSlide(currentSlide + 1);
                    restartTimer();
                }
            );
        }

        showSlide(0);
        restartTimer();

        console.log(
            "Gallery slideshow:",
            slideshow.closest(".gallery-category")?.id,
            "slides:",
            slides.length,
            "dots:",
            dots.length
        );
    });
}

function initializeEventsSlideshow() {
    const slides = Array.from(
        document.querySelectorAll(".events-slide")
    );

    const dots = Array.from(
        document.querySelectorAll(".events-dot")
    );

    const previousButton = document.querySelector(
        ".events-previous"
    );

    const nextButton = document.querySelector(
        ".events-next"
    );

    if (slides.length === 0) {
        return;
    }

    let currentSlide = 0;
    let timer = null;

    function showSlide(index) {
        currentSlide =
            (index + slides.length) % slides.length;

        slides.forEach(function (slide, slideIndex) {
            slide.classList.toggle(
                "active",
                slideIndex === currentSlide
            );
        });

        dots.forEach(function (dot, dotIndex) {
            dot.classList.toggle(
                "active",
                dotIndex === currentSlide
            );
        });
    }

    function restartTimer() {
        clearInterval(timer);

        if (slides.length < 2) {
            return;
        }

        timer = setInterval(function () {
            showSlide(currentSlide + 1);
        }, 4000);
    }

    previousButton?.addEventListener(
        "click",
        function () {
            showSlide(currentSlide - 1);
            restartTimer();
        }
    );

    nextButton?.addEventListener(
        "click",
        function () {
            showSlide(currentSlide + 1);
            restartTimer();
        }
    );

    dots.forEach(function (dot, index) {
        dot.addEventListener("click", function () {
            showSlide(index);
            restartTimer();
        });
    });

    showSlide(0);
    restartTimer();
}