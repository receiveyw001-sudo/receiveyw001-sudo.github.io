document.addEventListener("DOMContentLoaded", function () {
    /* =========================
       Homepage artwork slideshow
    ========================== */

    const slides = document.querySelectorAll(".showcase-slide");
    const dots = document.querySelectorAll(".showcase-dot");
    const previousButton = document.querySelector(".showcase-previous");
    const nextButton = document.querySelector(".showcase-next");

    let currentSlide = 0;
    let slideshowTimer = null;

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
        if (slideshowTimer) {
            clearInterval(slideshowTimer);
        }

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

    function closeMobileNavigation() {
        if (navigation) {
            navigation.classList.remove("mobile-open");
        }

        if (menuToggle) {
            menuToggle.textContent = "☰";
            menuToggle.setAttribute("aria-expanded", "false");
        }

        dropdowns.forEach(function (dropdown) {
            dropdown.classList.remove("mobile-open");
        });
    }

    if (menuToggle && navigation) {
        menuToggle.addEventListener("click", function () {
            const isOpen =
                navigation.classList.toggle("mobile-open");

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
       Contact form panel
    ========================== */

    const contactButton =
        document.querySelector(".contact-toggle");

    const contactPanel =
        document.querySelector("#contact-panel");

    const contactForm =
        document.querySelector("#contact-form");

    function openContactForm() {
        if (!contactPanel) {
            return;
        }

        contactPanel.classList.add("open");

        if (contactButton) {
            contactButton.textContent = "Close Contact Form";
            contactButton.setAttribute("aria-expanded", "true");
        }

        setTimeout(function () {
            contactPanel.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        }, 150);
    }

    if (contactButton && contactPanel) {
        contactButton.addEventListener("click", function () {
            const isOpen =
                contactPanel.classList.toggle("open");

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
       Navigation transitions
    ========================== */

    const navigationLinks =
        document.querySelectorAll(".navbar a[href]");

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

            if (
                window.innerWidth <= 700 &&
                link.classList.contains("drop-button")
            ) {
                return;
            }

            /* About Us → Contact */
            if (destination === "#contact") {
                event.preventDefault();

                openContactForm();
                closeMobileNavigation();

                return;
            }

            /* Other sections on this page */
            if (destination.startsWith("#")) {
                const target =
                    document.querySelector(destination);

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

                closeMobileNavigation();
                return;
            }

            /* Links to another page */
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
       Contact form: Web3Forms
    ========================== */

    if (contactForm) {
        contactForm.addEventListener(
            "submit",
            async function (event) {
                event.preventDefault();

                const submitButton =
                    contactForm.querySelector(
                        'button[type="submit"]'
                    );

                const statusMessage =
                    contactForm.querySelector(".form-status");

                if (!submitButton || !statusMessage) {
                    return;
                }

                submitButton.disabled = true;
                submitButton.textContent = "Sending...";
                statusMessage.textContent = "";

                const formData = new FormData(contactForm);

                formData.set(
                    "access_key",
                    "cdc3047f-8612-4e72-b8e7-a1ba9ee2f549"
                );

                formData.set(
                    "subject",
                    "New Inkspire website message"
                );

                formData.set(
                    "from_name",
                    "DBHS Inkspire Website"
                );

                try {
                    const response = await fetch(
                        "https://api.web3forms.com/submit",
                        {
                            method: "POST",
                            body: formData
                        }
                    );

                    const result = await response.json();

                    console.log(
                        "Web3Forms response:",
                        result
                    );

                    if (
                        !response.ok ||
                        result.success !== true
                    ) {
                        throw new Error(
                            result.message ||
                            "The submission was not accepted."
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
                    console.error(
                        "Contact form error:",
                        error
                    );

                    statusMessage.textContent =
                        "The message could not be sent. Please try again.";

                    submitButton.disabled = false;
                    submitButton.textContent = "Send Message";
                }
            }
        );
    }
});

window.addEventListener("pageshow", function () {
    document.body.classList.remove("page-leaving");
});

window.handleGoogleLogin = function (response) {
    const base64Url = response.credential.split(".")[1];

    const base64 = base64Url
        .replace(/-/g, "+")
        .replace(/_/g, "/");

    const payload = JSON.parse(
        decodeURIComponent(
            atob(base64)
                .split("")
                .map(function (c) {
                    return "%" +
                        ("00" + c.charCodeAt(0).toString(16)).slice(-2);
                })
                .join("")
        )
    );

    const email = payload.email;

    document.getElementById("google-email").value = email;

    document.getElementById("signedInEmailText").textContent = email;

    document.getElementById("googleButtonWrap").hidden = true;
    document.getElementById("signedEmailBox").hidden = false;

    document.getElementById("send-message-button").disabled = false;
};

