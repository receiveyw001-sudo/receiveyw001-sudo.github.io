document.addEventListener("DOMContentLoaded", function () {
    const slideshowSections =
        document.querySelectorAll(".category-slideshow");

    slideshowSections.forEach(function (slideshow) {
        const slides =
            slideshow.querySelectorAll(".category-slide");

        const previousButton =
            slideshow.querySelector(".category-previous");

        const nextButton =
            slideshow.querySelector(".category-next");

        const dotsContainer =
            slideshow.querySelector(".category-dots");

        if (slides.length === 0) {
            return;
        }

        let currentSlide = 0;
        let timer;
        const dots = [];

        /*
         * Automatically creates the correct number of dots.
         * You do not need to add dots manually later.
         */
        slides.forEach(function (_, index) {
            const dot = document.createElement("button");

            dot.className = "category-dot";
            dot.type = "button";
            dot.setAttribute(
                "aria-label",
                "Show project " + (index + 1)
            );

            dot.addEventListener("click", function () {
                showSlide(index);
                restartSlideshow();
            });

            dotsContainer.appendChild(dot);
            dots.push(dot);
        });

        function showSlide(index) {
            slides.forEach(function (slide) {
                slide.classList.remove("active");
            });

            dots.forEach(function (dot) {
                dot.classList.remove("active");
            });

            currentSlide =
                (index + slides.length) % slides.length;

            slides[currentSlide].classList.add("active");
            dots[currentSlide].classList.add("active");
        }

        function restartSlideshow() {
            clearInterval(timer);

            if (slides.length < 2) {
                return;
            }

            timer = setInterval(function () {
                showSlide(currentSlide + 1);
            }, 5000);
        }

        if (slides.length < 2) {
            previousButton.hidden = true;
            nextButton.hidden = true;
        } else {
            previousButton.addEventListener("click", function () {
                showSlide(currentSlide - 1);
                restartSlideshow();
            });

            nextButton.addEventListener("click", function () {
                showSlide(currentSlide + 1);
                restartSlideshow();
            });
        }

        showSlide(0);
        restartSlideshow();
    });
    const eventSlides =
    document.querySelectorAll(".events-slide");

const eventDots =
    document.querySelectorAll(".events-dot");

const eventPrevious =
    document.querySelector(".events-previous");

const eventNext =
    document.querySelector(".events-next");

let currentEventSlide = 0;
let eventTimer = null;

function showEventSlide(index) {
    if (eventSlides.length === 0) {
        return;
    }

    eventSlides.forEach(function (slide) {
        slide.classList.remove("active");
    });

    eventDots.forEach(function (dot) {
        dot.classList.remove("active");
    });

    currentEventSlide =
        (index + eventSlides.length) %
        eventSlides.length;

    eventSlides[currentEventSlide]
        .classList.add("active");

    if (eventDots[currentEventSlide]) {
        eventDots[currentEventSlide]
            .classList.add("active");
    }
}

function restartEventSlideshow() {
    clearInterval(eventTimer);

    if (eventSlides.length < 2) {
        return;
    }

    eventTimer = setInterval(function () {
        showEventSlide(currentEventSlide + 1);
    }, 4000);
}

if (eventSlides.length > 0) {
    showEventSlide(0);
    restartEventSlideshow();

    if (eventPrevious) {
        eventPrevious.addEventListener("click", function () {
            showEventSlide(currentEventSlide - 1);
            restartEventSlideshow();
        });
    }

    if (eventNext) {
        eventNext.addEventListener("click", function () {
            showEventSlide(currentEventSlide + 1);
            restartEventSlideshow();
        });
    }

    eventDots.forEach(function (dot, index) {
        dot.addEventListener("click", function () {
            showEventSlide(index);
            restartEventSlideshow();
        });
    });
}

});