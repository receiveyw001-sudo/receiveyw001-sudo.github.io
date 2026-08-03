document.addEventListener("DOMContentLoaded", function () {
    /* =========================
       Artwork slideshow
    ========================== */

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

        if (slides.length < 2) {
            return;
        }

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

    /* =========================
       Mobile navigation
    ========================== */

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
        const dropdownTrigger = dropdown.querySelector(".drop-button");

        if (!dropdownTrigger) {
            return;
        }

        dropdownTrigger.addEventListener("click", function (event) {
            if (window.innerWidth > 700) {
                return;
            }

            event.preventDefault();

            dropdowns.forEach(function (otherDropdown) {
                if (otherDropdown !== dropdown) {
                    otherDropdown.classList.remove("mobile-open");
                }
            });

            dropdown.classList.toggle("mobile-open");
        });
    });

    /* =========================
       Navigation transitions
    ========================== */

    const navigationLinks = document.querySelectorAll(".navbar a[href]");

    navigationLinks.forEach(function (link) {
        link.addEventListener("click", function (event) {
            const destination = link.getAttribute("href");

            if (
                !destination ||
                destination === "#" ||
                destination.startsWith("mailto:") ||
                destination.startsWith("http")
            ) {
                return;
            }

            /*
             * On mobile, do not navigate when the user is
             * tapping a dropdown title to open its submenu.
             */
            if (
                window.innerWidth <= 700 &&
                link.classList.contains("drop-button")
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

                if (navigation) {
                    navigation.classList.remove("mobile-open");
                }

                if (menuToggle) {
                    menuToggle.textContent = "☰";
                    menuToggle.setAttribute("aria-expanded", "false");
                }

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

    /* =========================
       Contact panel
    ========================== */

    const contactButton = document.querySelector(".contact-toggle");
    const contactPanel = document.querySelector("#contact-panel");
    const contactForm = document.querySelector("#contact-form");

    if (contactButton && contactPanel) {
        contactButton.addEventListener("click", function () {
            const isOpen = contactPanel.classList.toggle("open");

            contactButton.textContent = isOpen
                ? "Close Contact Form"
                : "Contact Us";

            contactButton.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            if (isOpen) {
                setTimeout(function () {
                    contactPanel.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });
                }, 250);
            }
        });
    }

    /* =========================
       Contact form submission
    ========================== */

    if (contactForm) {
        contactForm.addEventListener("submit", async function (event) {
            event.preventDefault();

            const submitButton =
                contactForm.querySelector('button[type="submit"]');

            const statusMessage =
                contactForm.querySelector(".form-status");

            submitButton.disabled = true;
            submitButton.textContent = "Sending...";
            statusMessage.textContent = "";

            const formData = new FormData(contactForm);

            try {
                const response = await fetch(
                    "https://formsubmit.co/ajax/Inkspire.dbhs@gmail.com",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json"
                        },
                        body: JSON.stringify({
                            name: formData.get("name"),
                            email: formData.get("email"),
                            message: formData.get("message"),
                            _subject: "New Inkspire website message"
                        })
                    }
                );

                const result = await response.json();

                console.log("FormSubmit response:", result);

                const submissionSucceeded =
                    response.ok &&
                    (
                        result.success === true ||
                        result.success === "true"
                    );

                if (!submissionSucceeded) {
                    throw new Error(
                        result.message || "Submission failed"
                    );
                }

                contactForm.innerHTML = `
                    <div class="form-success">
                        <h3>Message sent!</h3>
                        <p>
                            Thank you for contacting Inkspire.
                            We will respond as soon as possible.
                        </p>
                    </div>
                `;
            } catch (error) {
                console.error("Contact form error:", error);

                statusMessage.textContent =
                    "The message could not be sent. Please try again.";

                submitButton.disabled = false;
                submitButton.textContent = "Send Message";
            }
        });
    }
});

window.addEventListener("pageshow", function () {
    document.body.classList.remove("page-leaving");
});
