/* ==================================================
   WAIT FOR DOM
================================================== */

document.addEventListener("DOMContentLoaded", () => {


    /* ==================================================
       LOADER
    ================================================== */

    const loader =
        document.getElementById("loader");

    window.addEventListener("load", () => {

        setTimeout(() => {

            if (loader) {
                loader.classList.add("hidden");
            }

        }, 700);

    });


    /* ==================================================
       MOBILE MENU
    ================================================== */

    const menuToggle =
        document.getElementById("menuToggle");

    const navigation =
        document.querySelector(".navigation");

    if (menuToggle && navigation) {

        menuToggle.addEventListener(
            "click",
            () => {

                menuToggle.classList.toggle(
                    "active"
                );

                navigation.classList.toggle(
                    "active"
                );

                document.body.classList.toggle(
                    "no-scroll"
                );

            }
        );


        const navigationLinks =
            navigation.querySelectorAll("a");

        navigationLinks.forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    menuToggle.classList.remove(
                        "active"
                    );

                    navigation.classList.remove(
                        "active"
                    );

                    document.body.classList.remove(
                        "no-scroll"
                    );

                }
            );

        });

    }


    /* ==================================================
       HEADER ON SCROLL
    ================================================== */

    const header =
        document.querySelector(".header");

    function updateHeader() {

        if (!header) return;

        if (window.scrollY > 50) {

            header.classList.add(
                "scrolled"
            );

        } else {

            header.classList.remove(
                "scrolled"
            );

        }

    }

    window.addEventListener(
        "scroll",
        updateHeader
    );

    updateHeader();


    /* ==================================================
       SMOOTH SCROLL
    ================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener(
                "click",
                function (event) {

                    const targetId =
                        this.getAttribute(
                            "href"
                        );

                    if (
                        !targetId ||
                        targetId === "#"
                    ) {
                        return;
                    }

                    const target =
                        document.querySelector(
                            targetId
                        );

                    if (!target) return;

                    event.preventDefault();

                    const headerHeight =
                        header
                            ? header.offsetHeight
                            : 0;

                    const targetPosition =
                        target.offsetTop -
                        headerHeight;

                    window.scrollTo({

                        top:
                            targetPosition,

                        behavior:
                            "smooth"

                    });

                }
            );

        });


    /* ==================================================
       COUNTDOWN
    ================================================== */

    const daysElement =
        document.getElementById("days");

    const hoursElement =
        document.getElementById("hours");

    const minutesElement =
        document.getElementById("minutes");

    const secondsElement =
        document.getElementById("seconds");


    /*
        Дата праздника:

        08.08.2026
        18:00

        Если время изменится,
        поменяем эту строку.
    */

    const birthdayDate =
        new Date(
            "2026-08-08T18:00:00+05:00"
        );


    function addZero(number) {

        return String(number)
            .padStart(2, "0");

    }


    function updateCountdown() {

        const now =
            new Date();

        const difference =
            birthdayDate.getTime() -
            now.getTime();


        if (difference <= 0) {

            if (daysElement)
                daysElement.textContent =
                    "00";

            if (hoursElement)
                hoursElement.textContent =
                    "00";

            if (minutesElement)
                minutesElement.textContent =
                    "00";

            if (secondsElement)
                secondsElement.textContent =
                    "00";

            return;

        }


        const days =
            Math.floor(
                difference /
                (1000 * 60 * 60 * 24)
            );


        const hours =
            Math.floor(
                (
                    difference /
                    (1000 * 60 * 60)
                ) % 24
            );


        const minutes =
            Math.floor(
                (
                    difference /
                    (1000 * 60)
                ) % 60
            );


        const seconds =
            Math.floor(
                (
                    difference /
                    1000
                ) % 60
            );


        if (daysElement) {

            daysElement.textContent =
                addZero(days);

        }


        if (hoursElement) {

            hoursElement.textContent =
                addZero(hours);

        }


        if (minutesElement) {

            minutesElement.textContent =
                addZero(minutes);

        }


        if (secondsElement) {

            secondsElement.textContent =
                addZero(seconds);

        }

    }


    updateCountdown();

    setInterval(
        updateCountdown,
        1000
    );


    /* ==================================================
       SCROLL REVEAL
    ================================================== */

    const revealElements =
        document.querySelectorAll(
            ".reveal"
        );


    if (
        "IntersectionObserver"
        in window
    ) {

        const revealObserver =
            new IntersectionObserver(

                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target
                                    .classList
                                    .add(
                                        "show"
                                    );

                                revealObserver
                                    .unobserve(
                                        entry.target
                                    );

                            }

                        }
                    );

                },

                {
                    threshold: 0.12
                }

            );


        revealElements.forEach(
            element => {

                revealObserver.observe(
                    element
                );

            }
        );

    } else {

        revealElements.forEach(
            element => {

                element.classList.add(
                    "show"
                );

            }
        );

    }


    /* ==================================================
       GALLERY
    ================================================== */

    const galleryItems =
        document.querySelectorAll(
            ".gallery-item"
        );


    const lightbox =
        document.getElementById(
            "lightbox"
        );


    const lightboxImage =
        document.getElementById(
            "lightboxImage"
        );


    const lightboxClose =
        document.getElementById(
            "lightboxClose"
        );


    const lightboxPrev =
        document.getElementById(
            "lightboxPrev"
        );


    const lightboxNext =
        document.getElementById(
            "lightboxNext"
        );


    let currentImageIndex = 0;


    const galleryImages = [

        "photo-1.jpeg",

        "photo-2.jpeg",

        "photo-3.jpeg",

        "photo-4.jpeg"

    ];


    function openLightbox(index) {

        if (
            !lightbox ||
            !lightboxImage
        ) {
            return;
        }


        currentImageIndex =
            index;


        lightboxImage.src =
            galleryImages[
                currentImageIndex
            ];


        lightbox.classList.add(
            "active"
        );


        document.body.classList.add(
            "no-scroll"
        );

    }


    function closeLightbox() {

        if (!lightbox) {
            return;
        }


        lightbox.classList.remove(
            "active"
        );


        document.body.classList.remove(
            "no-scroll"
        );


        setTimeout(() => {

            if (lightboxImage) {

                lightboxImage.src =
                    "";

            }

        }, 400);

    }


    function showPreviousImage() {

        currentImageIndex--;

        if (
            currentImageIndex < 0
        ) {

            currentImageIndex =
                galleryImages.length - 1;

        }


        if (lightboxImage) {

            lightboxImage.src =
                galleryImages[
                    currentImageIndex
                ];

        }

    }


    function showNextImage() {

        currentImageIndex++;

        if (
            currentImageIndex >=
            galleryImages.length
        ) {

            currentImageIndex = 0;

        }


        if (lightboxImage) {

            lightboxImage.src =
                galleryImages[
                    currentImageIndex
                ];

        }

    }


    galleryItems.forEach(
        (item, index) => {

            item.addEventListener(
                "click",
                () => {

                    openLightbox(
                        index
                    );

                }
            );

        }
    );


    if (lightboxClose) {

        lightboxClose.addEventListener(
            "click",
            closeLightbox
        );

    }


    if (lightboxPrev) {

        lightboxPrev.addEventListener(
            "click",
            showPreviousImage
        );

    }


    if (lightboxNext) {

        lightboxNext.addEventListener(
            "click",
            showNextImage
        );

    }


    if (lightbox) {

        lightbox.addEventListener(
            "click",
            event => {

                if (
                    event.target ===
                    lightbox
                ) {

                    closeLightbox();

                }

            }
        );

    }


    /* ==================================================
       LIGHTBOX KEYBOARD
    ================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                !lightbox ||
                !lightbox.classList.contains(
                    "active"
                )
            ) {
                return;
            }


            if (
                event.key ===
                "Escape"
            ) {

                closeLightbox();

            }


            if (
                event.key ===
                "ArrowLeft"
            ) {

                showPreviousImage();

            }


            if (
                event.key ===
                "ArrowRight"
            ) {

                showNextImage();

            }

        }
    );


    /* ==================================================
       RSVP ANSWERS
    ================================================== */

    const answerButtons =
        document.querySelectorAll(
            ".answer-button"
        );


    const guestAnswer =
        document.getElementById(
            "guestAnswer"
        );


    answerButtons.forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    answerButtons.forEach(
                        item => {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );


                    button.classList.add(
                        "active"
                    );


                    const answer =
                        button.dataset.answer;


                    if (guestAnswer) {

                        guestAnswer.value =
                            answer;

                    }

                }
            );

        }
    );


    /* ==================================================
       RSVP FORM + TELEGRAM
    ================================================== */

    const rsvpForm =
        document.getElementById(
            "rsvpForm"
        );


    const formStatus =
        document.getElementById(
            "formStatus"
        );


    const successModal =
        document.getElementById(
            "successModal"
        );


    const successMessage =
        document.getElementById(
            "successMessage"
        );


    const successClose =
        document.getElementById(
            "successClose"
        );


    const successButton =
        document.getElementById(
            "successButton"
        );


    if (rsvpForm) {

        rsvpForm.addEventListener(
            "submit",
            async event => {

                event.preventDefault();


                const nameInput =
                    document.getElementById(
                        "guestName"
                    );


                const messageInput =
                    document.getElementById(
                        "guestMessage"
                    );


                const name =
                    nameInput
                        ? nameInput.value.trim()
                        : "";


                const answer =
                    guestAnswer
                        ? guestAnswer.value
                        : "";


                const message =
                    messageInput
                        ? messageInput.value.trim()
                        : "";


                /* ------------------------------
                   VALIDATION
                ------------------------------ */

                if (!name) {

                    if (formStatus) {

                        formStatus.textContent =
                            "Пожалуйста, введи своё имя.";

                    }

                    if (nameInput) {

                        nameInput.focus();

                    }

                    return;

                }


                if (!answer) {

                    if (formStatus) {

                        formStatus.textContent =
                            "Пожалуйста, выбери вариант ответа.";

                    }

                    return;

                }


                /* ------------------------------
                   LOADING
                ------------------------------ */

                const submitButton =
                    rsvpForm.querySelector(
                        'button[type="submit"]'
                    );


                if (submitButton) {

                    submitButton.disabled =
                        true;

                    submitButton.style.opacity =
                        "0.6";

                    submitButton.style.pointerEvents =
                        "none";

                }


                if (formStatus) {

                    formStatus.textContent =
                        "Отправляем ответ...";

                }


                try {

                    /* --------------------------
                       SEND TO VERCEL API
                    -------------------------- */

                    const response =
                        await fetch(
                            "/api/telegram",
                            {

                                method:
                                    "POST",

                                headers: {

                                    "Content-Type":
                                        "application/json"

                                },

                                body:
                                    JSON.stringify({

                                        name:
                                            name,

                                        answer:
                                            answer,

                                        message:
                                            message

                                    })

                            }
                        );


                    let result = {};

                    try {

                        result =
                            await response.json();

                    } catch (jsonError) {

                        result = {};

                    }


                    /* --------------------------
                       SERVER ERROR
                    -------------------------- */

                    if (
                        !response.ok ||
                        !result.success
                    ) {

                        throw new Error(
                            result.message ||
                            "Не удалось отправить ответ."
                        );

                    }


                    /* --------------------------
                       SUCCESS
                    -------------------------- */

                    if (successMessage) {

                        successMessage.textContent =
                            `Спасибо, ${name}! Твой ответ «${answer}» успешно отправлен.`;

                    }


                    if (successModal) {

                        successModal.classList.add(
                            "active"
                        );

                    }


                    document.body.classList.add(
                        "no-scroll"
                    );


                    /* --------------------------
                       RESET FORM
                    -------------------------- */

                    rsvpForm.reset();


                    answerButtons.forEach(
                        button => {

                            button.classList.remove(
                                "active"
                            );

                        }
                    );


                    if (guestAnswer) {

                        guestAnswer.value =
                            "";

                    }


                    if (formStatus) {

                        formStatus.textContent =
                            "";

                    }


                } catch (error) {

                    console.error(
                        "RSVP Error:",
                        error
                    );


                    if (formStatus) {

                        formStatus.textContent =
                            "Не удалось отправить ответ. Попробуй ещё раз.";

                    }

                } finally {

                    if (submitButton) {

                        submitButton.disabled =
                            false;

                        submitButton.style.opacity =
                            "";

                        submitButton.style.pointerEvents =
                            "";

                    }

                }

            }
        );

    }


    /* ==================================================
       SUCCESS MODAL CLOSE
    ================================================== */

    function closeSuccessModal() {

        if (!successModal) {
            return;
        }


        successModal.classList.remove(
            "active"
        );


        document.body.classList.remove(
            "no-scroll"
        );

    }


    if (successClose) {

        successClose.addEventListener(
            "click",
            closeSuccessModal
        );

    }


    if (successButton) {

        successButton.addEventListener(
            "click",
            closeSuccessModal
        );

    }


    if (successModal) {

        successModal.addEventListener(
            "click",
            event => {

                if (
                    event.target ===
                    successModal
                ) {

                    closeSuccessModal();

                }

            }
        );

    }


    /* ==================================================
       SCROLL TOP
    ================================================== */

    const scrollTop =
        document.getElementById(
            "scrollTop"
        );


    function updateScrollTop() {

        if (!scrollTop) {
            return;
        }


        if (
            window.scrollY > 500
        ) {

            scrollTop.classList.add(
                "show"
            );

        } else {

            scrollTop.classList.remove(
                "show"
            );

        }

    }


    window.addEventListener(
        "scroll",
        updateScrollTop
    );


    updateScrollTop();


    if (scrollTop) {

        scrollTop.addEventListener(
            "click",
            () => {

                window.scrollTo({

                    top:
                        0,

                    behavior:
                        "smooth"

                });

            }
        );

    }


    /* ==================================================
       MAP BUTTON
    ================================================== */

    const mapButton =
        document.getElementById(
            "mapButton"
        );


    if (mapButton) {

        mapButton.addEventListener(
            "click",
            event => {

                if (
                    mapButton.getAttribute(
                        "href"
                    ) === "#"
                ) {

                    event.preventDefault();

                    alert(
                        "Ссылка на карту появится после выбора места проведения."
                    );

                }

            }
        );

    }


    /* ==================================================
       TOUCH SWIPE FOR LIGHTBOX
    ================================================== */

    let touchStartX = 0;

    let touchEndX = 0;


    if (lightbox) {

        lightbox.addEventListener(
            "touchstart",
            event => {

                touchStartX =
                    event.changedTouches[0]
                        .screenX;

            },
            {
                passive: true
            }
        );


        lightbox.addEventListener(
            "touchend",
            event => {

                touchEndX =
                    event.changedTouches[0]
                        .screenX;


                const swipeDistance =
                    touchEndX -
                    touchStartX;


                if (
                    Math.abs(
                        swipeDistance
                    ) < 50
                ) {

                    return;

                }


                if (
                    swipeDistance > 0
                ) {

                    showPreviousImage();

                } else {

                    showNextImage();

                }

            },
            {
                passive: true
            }
        );

    }


    /* ==================================================
       PRELOAD GALLERY IMAGES
    ================================================== */

    galleryImages.forEach(
        imagePath => {

            const image =
                new Image();

            image.src =
                imagePath;

        }
    );


    /* ==================================================
       CONSOLE
    ================================================== */

    console.log(
        "Birthday website initialized successfully."
    );

    console.log(
        "Telegram RSVP integration is active."
    );


});
