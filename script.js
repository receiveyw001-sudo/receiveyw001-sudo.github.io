document.addEventListener("DOMContentLoaded", function () {
    /* Artwork slideshow */

    const slides = document.querySelectorAll(".showcase-slide");
    const dots = document.querySelectorAll(".showcase-dot");
    const previousButton = document.querySelector(".showcase-previous");
    const nextButton = document.querySelector(".showcase-next");

    let currentSlide = 0;
    let slideshowTimer;

    function showSlide(index) {
        if (slides.length === 0) {
            return;
        }

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

    function restartSlideshow() {
        clearInterval(slideshowTimer);

        slideshowTimer = setInterval(function () {
            showSlide(currentSlide + 1);
        }, 4000);
    }

    if (slides.length > 0) {
        showSlide(0);
        restartSlideshow();

        if (previousButton) {
            previousButton.addEventListener("click", function () {
                showSlide(currentSlide - 1);
                restartSlideshow();
            });
        }

        if (nextButton) {
            nextButton.addEventListener("click", function () {
                showSlide(currentSlide + 1);
                restartSlideshow();
            });
        }

        dots.forEach(function (dot, index) {
            dot.addEventListener("click", function () {
                showSlide(index);
                restartSlideshow();
            });
        });
    }

    /* Navigation transitions */

    const navigationLinks = document.querySelectorAll(".navbar a[href]");

    navigationLinks.forEach(function (link) {
        link.addEventListener("click", function (event) {
            const destination = link.getAttribute("href");

            if (
                !destination ||
                destination.startsWith("mailto:") ||
                destination.startsWith("http")
            ) {
                return;
            }

            /* Section on the current page */
            if (destination.startsWith("#")) {
                const target = document.querySelector(destination);

                if (!target) {
                    return;
                }

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

                target.classList.remove("section-fade");

                void target.offsetWidth;

                target.classList.add("section-fade");

                setTimeout(function () {
                    target.classList.remove("section-fade");
                }, 700);

                return;
            }

            /* Another HTML page */
            if (destination.includes(".html")) {
                event.preventDefault();

                document.body.classList.add("page-leaving");

                setTimeout(function () {
                    window.location.href = destination;
                }, 350);
            }
        });
    });
});

window.addEventListener("pageshow", function () {
    document.body.classList.remove("page-leaving");
});
document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const navigation = document.querySelector(".nav-links");
    const dropdowns = document.querySelectorAll(".dropdown");

    if (menuToggle && navigation) {
        menuToggle.addEventListener("click", function () {
            const isOpen = navigation.classList.toggle("mobile-open");

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            menuToggle.textContent = isOpen ? "✕" : "☰";
        });
    }

    dropdowns.forEach(function (dropdown) {
        const dropdownTrigger =
            dropdown.querySelector(".drop-button");

        if (!dropdownTrigger) {
            return;
        }

        dropdownTrigger.addEventListener("click", function (event) {
            if (window.innerWidth > 700) {
                return;
            }

            /*
             * First tap opens the submenu.
             * A normal link inside the submenu opens the destination.
             */
            event.preventDefault();

            dropdown.classList.toggle("mobile-open");
        });
    });
});