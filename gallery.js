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
});