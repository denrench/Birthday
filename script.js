/* ==================================================
   BIRTHDAY WEBSITE — SCRIPT.JS
================================================== */

document.addEventListener("DOMContentLoaded", () => {


    /* ==================================================
       LOADER
    ================================================== */

    const loader = document.getElementById("loader");

    window.addEventListener("load", () => {

        setTimeout(() => {

            if (loader) {
                loader.classList.add("hidden");
            }

        }, 1200);

    });


    /* ==================================================
       HEADER — SCROLL
    ================================================== */

    const header = document.getElementById("header");

    function handleHeaderScroll() {

        if (!header) return;

        if (window.scrollY > 50) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }

    window.addEventListener(
        "scroll",
        handleHeaderScroll,
        { passive: true }
    );

    handleHeaderScroll();


    /* ==================================================
       MOBILE MENU
    ================================================== */

    const menuToggle =
        document.getElementById("menuToggle");

    const navigation =
        document.querySelector(".navigation");

    if (
        menuToggle &&
        navigation
    ) {

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
       COUNTDOWN
       08.08.2026 — 19:00
    ================================================== */

    const targetDate =
        new Date(
            "August 8, 2026 19:00:00"
        ).getTime();


    const daysElement =
        document.getElementById("days");

    const hoursElement =
        document.getElementById("hours");

    const minutesElement =
        document.getElementById("minutes");

    const secondsElement =
        document.getElementById("seconds");


    function formatNumber(number) {

        return String(number)
            .padStart(2, "0");

    }


    function updateCountdown() {

        const now =
            new Date().getTime();


        const distance =
            targetDate - now;


        if (distance <= 0) {

            if (daysElement) {
                daysElement.textContent = "00";
            }

            if (hoursElement) {
                hoursElement.textContent = "00";
            }

            if (minutesElement) {
                minutesElement.textContent = "00";
            }

            if (secondsElement) {
                secondsElement.textContent = "00";
            }

            return;

        }


        const days =
            Math.floor(
                distance /
                (1000 * 60 * 60 * 24)
            );


        const hours =
            Math.floor(
                (distance %
                    (1000 * 60 * 60 * 24)
                ) /
                (1000 * 60 * 60)
            );


        const minutes =
            Math.floor(
                (distance %
                    (1000 * 60 * 60)
                ) /
                (1000 * 60)
            );


        const seconds =
            Math.floor(
                (distance %
                    (1000 * 60)
                ) /
                1000
            );


        if (daysElement) {

            daysElement.textContent =
                formatNumber(days);

        }


        if (hoursElement) {

            hoursElement.textContent =
                formatNumber(hours);

        }


        if (minutesElement) {

            minutesElement.textContent =
                formatNumber(minutes);

        }


        if (secondsElement) {

            secondsElement.textContent =
                formatNumber(seconds);

        }

    }


    updateCountdown();


    const countdownInterval =
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


    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "show"
                            );

                            observer.unobserve(
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


    const galleryImages =
        Array.from(
            galleryItems
        ).map(
            item => {

                const image =
                    item.querySelector(
                        "img"
                    );

                return image
                    ? image.src
                    : "";

            }
        );


    function openLightbox(index) {

        if (
            !lightbox ||
            !lightboxImage ||
            !galleryImages.length
        ) {
            return;
        }


        currentImageIndex =
            index;


        lightboxImage.src =
            galleryImages[
                currentImageIndex
            ];


        lightboxImage.alt =
            `Фото ${
                currentImageIndex + 1
            }`;


        lightbox.classList.add(
            "active"
        );


        document.body.classList.add(
            "no-scroll"
        );

    }


    function closeLightbox() {

        if (!lightbox) return;


        lightbox.classList.remove(
            "active"
        );


        document.body.classList.remove(
            "no-scroll"
        );

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
       LIGHTBOX — KEYBOARD
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
       RSVP — ANSWER BUTTONS
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
       RSVP FORM
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


    const successClose =
        document.getElementById(
            "successClose"
        );


    const successButton =
        document.getElementById(
            "successButton"
        );


    const successMessage =
        document.getElementById(
            "successMessage"
        );


    function openSuccessModal(
        answer
    ) {

        if (!successModal) {
            return;
        }


        if (successMessage) {

            if (
                answer ===
                "Приду"
            ) {

                successMessage.textContent =
                    "Отлично! Буду ждать тебя на празднике 8 августа.";

            } else if (
                answer ===
                "Возможно"
            ) {

                successMessage.textContent =
                    "Хорошо! Надеюсь, у тебя получится прийти.";

            } else {

                successMessage.textContent =
                    "Жаль, что не получится. Спасибо, что сообщил!";

            }

        }


        successModal.classList.add(
            "active"
        );


        document.body.classList.add(
            "no-scroll"
        );

    }


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
       SEND RSVP TO TELEGRAM
    ================================================== */

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
                    ? guestAnswer.value.trim()
                    : "";


                const message =
                    messageInput
                    ? messageInput.value.trim()
                    : "";


                /* VALIDATION */

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
                            "Пожалуйста, выбери свой ответ.";

                    }

                    return;

                }


                /* LOADING */

                const submitButton =
                    rsvpForm.querySelector(
                        ".submit-button"
                    );


                const originalButtonText =
                    submitButton
                    ? submitButton.innerHTML
                    : "";


                if (submitButton) {

                    submitButton.disabled =
                        true;


                    submitButton.innerHTML =
                        `
                        <span>
                            Отправляем...
                        </span>
                        `;

                }


                if (formStatus) {

                    formStatus.textContent =
                        "";

                }


                try {


                    /*
                       ВАЖНО:

                       Здесь используется
                       твой Vercel API:

                       /api/telegram

                    */


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


                    const data =
                        await response.json();


                    if (
                        !response.ok ||
                        !data.success
                    ) {

                        throw new Error(
                            data.message ||
                            "Ошибка отправки"
                        );

                    }


                    /* SUCCESS */

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


                    openSuccessModal(
                        answer
                    );


                } catch (
                    error
                ) {


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


                        submitButton.innerHTML =
                            originalButtonText;

                    }

                }

            }
        );

    }


    /* ==================================================
       SCROLL TO TOP
    ================================================== */

    const scrollTop =
        document.getElementById(
            "scrollTop"
        );


    function handleScrollTop() {

        if (!scrollTop) return;


        if (
            window.scrollY >
            600
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
        handleScrollTop,
        { passive: true }
    );


    handleScrollTop();


    if (scrollTop) {

        scrollTop.addEventListener(
            "click",
            () => {

                window.scrollTo(
                    {
                        top: 0,
                        behavior:
                            "smooth"
                    }
                );

            }
        );

    }


    /* ==================================================
       SMOOTH ANCHOR LINKS
    ================================================== */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(
            link => {

                link.addEventListener(
                    "click",
                    event => {

                        const targetId =
                            link.getAttribute(
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


                        if (!target) {
                            return;
                        }


                        event.preventDefault();


                        const headerHeight =
                            header
                            ? header.offsetHeight
                            : 0;


                        const targetPosition =
                            target.getBoundingClientRect()
                                .top +
                            window.scrollY -
                            headerHeight;


                        window.scrollTo(
                            {
                                top:
                                    targetPosition,

                                behavior:
                                    "smooth"
                            }
                        );

                    }
                );

            }
        );


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
                    swipeDistance < 0
                ) {

                    showNextImage();

                } else {

                    showPreviousImage();

                }

            },
            {
                passive: true
            }
        );

    }


    /* ==================================================
       CONSOLE
    ================================================== */

    console.log(
        "🎉 Birthday website loaded successfully!"
    );

    console.log(
        "📅 Event: 08.08.2026"
    );

    console.log(
        "🕖 Time: 19:00"
    );

});
