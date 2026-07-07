/*==================================================
                EVENT
==================================================*/

const EVENT = {

    date: "2026-08-08T18:00:00",

    title: "День рождения Лианы",

    owner: "Лиана"

};

/*==================================================
                HELPERS
==================================================*/

const $ = selector => document.querySelector(selector);

const $$ = selector => document.querySelectorAll(selector);

const body = document.body;

function pad(number){

    return String(number).padStart(2,"0");

}

/*==================================================
            PRELOADER
==================================================*/

window.addEventListener("load",()=>{

    const loader=$(".preloader");

    if(!loader) return;

    setTimeout(()=>{

        loader.classList.add("hide");

    },900);

    setTimeout(()=>{

        loader.remove();

    },1600);

});

/*==================================================
            HERO BUTTON
==================================================*/

const heroButton=$("#openInvitation");

const welcome=$("#welcome");

if(heroButton && welcome){

    heroButton.addEventListener("click",()=>{

        welcome.scrollIntoView({

            behavior:"smooth"

        });

    });

}

/*==================================================
            REVEAL
==================================================*/

const hiddenElements=$$(".section");

hiddenElements.forEach(el=>{

    el.classList.add("hidden");

});

const observer=new IntersectionObserver(entries=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{

    threshold:.15

});

hiddenElements.forEach(el=>{

    observer.observe(el);

});

/*==================================================
            PARALLAX
==================================================*/

const hero=$(".hero");

window.addEventListener("mousemove",(e)=>{

    if(!hero) return;

    const x=(e.clientX/window.innerWidth-.5)*20;

    const y=(e.clientY/window.innerHeight-.5)*20;

    hero.style.backgroundPosition=

    `${50+x}% ${50+y}%`;

});

/*==================================================
            NEXT PART
                COUNTDOWN
==================================================*/
/*==================================================
                COUNTDOWN
==================================================*/

const countdown = {

    target: new Date(EVENT.date).getTime(),

    days: $("#days"),

    hours: $("#hours"),

    minutes: $("#minutes"),

    seconds: $("#seconds")

};

function updateCountdown(){

    const now = Date.now();

    const distance = countdown.target - now;

    if(distance <= 0){

        countdown.days.textContent = "00";

        countdown.hours.textContent = "00";

        countdown.minutes.textContent = "00";

        countdown.seconds.textContent = "00";

        clearInterval(countdownInterval);

        return;

    }

    const days = Math.floor(

        distance /

        (1000*60*60*24)

    );

    const hours = Math.floor(

        distance %

        (1000*60*60*24)

        /

        (1000*60*60)

    );

    const minutes = Math.floor(

        distance %

        (1000*60*60)

        /

        (1000*60)

    );

    const seconds = Math.floor(

        distance %

        (1000*60)

        /

        1000

    );

    animateNumber(

        countdown.days,

        pad(days)

    );

    animateNumber(

        countdown.hours,

        pad(hours)

    );

    animateNumber(

        countdown.minutes,

        pad(minutes)

    );

    animateNumber(

        countdown.seconds,

        pad(seconds)

    );

}

function animateNumber(element,value){

    if(!element) return;

    if(element.textContent===value) return;

    element.textContent=value;

    element.classList.remove("tick");

    void element.offsetWidth;

    element.classList.add("tick");

}

updateCountdown();

const countdownInterval =

setInterval(

    updateCountdown,

    1000

);

/*==================================================
            HERO FADE
==================================================*/

window.addEventListener("scroll",()=>{

    const scroll = window.scrollY;

    if(!hero) return;

    hero.style.opacity =

        1 - scroll/900;

});

/*==================================================
            NEXT PART
                GALLERY
==================================================*/
/*==================================================
                GALLERY
==================================================*/

const galleryImages = $$(".gallery img");

const lightbox = document.createElement("div");
lightbox.className = "lightbox";

const lightboxImage = document.createElement("img");
lightboxImage.className = "lightbox-image";

const lightboxClose = document.createElement("button");
lightboxClose.className = "lightbox-close";
lightboxClose.innerHTML = "&times;";

lightbox.appendChild(lightboxImage);
lightbox.appendChild(lightboxClose);

body.appendChild(lightbox);

galleryImages.forEach(image => {

    image.addEventListener("click", () => {

        lightboxImage.src = image.src;

        lightbox.classList.add("active");

        body.style.overflow = "hidden";

    });

});

function closeLightbox(){

    lightbox.classList.remove("active");

    body.style.overflow = "";

}

lightboxClose.addEventListener(

    "click",

    closeLightbox

);

lightbox.addEventListener("click",(event)=>{

    if(event.target===lightbox){

        closeLightbox();

    }

});

document.addEventListener("keydown",(event)=>{

    if(

        event.key==="Escape" &&

        lightbox.classList.contains("active")

    ){

        closeLightbox();

    }

});

/*==================================================
            IMAGE EFFECT
==================================================*/

galleryImages.forEach(image=>{

    image.addEventListener("mouseenter",()=>{

        image.style.transform="scale(1.04)";

    });

    image.addEventListener("mouseleave",()=>{

        image.style.transform="";

    });

});

/*==================================================
                NEXT PART
                    RSVP
==================================================*/
/*==================================================
                    RSVP
==================================================*/

const rsvpForm = $("#rsvpForm");

const answerButtons = $$(".answers button");

let selectedAnswer = "";

answerButtons.forEach(button => {

    button.addEventListener("click", () => {

        answerButtons.forEach(btn => {

            btn.classList.remove("active");

        });

        button.classList.add("active");

        selectedAnswer =

            button.dataset.answer;

    });

});

/*==================================================
            SUCCESS MODAL
==================================================*/

let successModal = null;

function createSuccessModal(){

    if(successModal) return;

    successModal = document.createElement("div");

    successModal.className = "success-modal";

    successModal.innerHTML = `

        <div class="success-box">

            <h2>Спасибо ❤️</h2>

            <p>

                Твой ответ успешно сохранён.

            </p>

            <button>

                Закрыть

            </button>

        </div>

    `;

    body.appendChild(successModal);

    successModal

        .querySelector("button")

        .addEventListener("click",()=>{

            successModal.classList.remove("active");

        });

}

createSuccessModal();

/*==================================================
            RSVP SUBMIT
==================================================*/

if(rsvpForm){

    rsvpForm.addEventListener("submit",(event)=>{

        event.preventDefault();

        const name =

            rsvpForm

            .querySelector("input")

            .value

            .trim();

        const comment =

            rsvpForm

            .querySelector("textarea")

            .value

            .trim();

        if(name.length < 2){

            alert("Введите имя.");

            return;

        }

        if(selectedAnswer===""){

            alert("Выберите вариант ответа.");

            return;

        }

        const guest = {

            name,

            answer:selectedAnswer,

            comment,

            created:new Date()

        };

        sendToTelegram(guest);

        successModal.classList.add("active");

        rsvpForm.reset();

        selectedAnswer="";

        answerButtons.forEach(btn=>{

            btn.classList.remove("active");

        });

    });

}

/*==================================================
            SCROLL TO TOP
==================================================*/

const topButton = document.createElement("button");

topButton.className = "scroll-top";

topButton.innerHTML = "↑";

body.appendChild(topButton);

window.addEventListener("scroll",()=>{

    if(window.scrollY > 500){

        topButton.classList.add("show");

    }

    else{

        topButton.classList.remove("show");

    }

});

topButton.addEventListener("click",()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});

/*==================================================
                NEXT PART
            TELEGRAM API
==================================================*/
function sendToTelegram(data) {

    console.log("sendToTelegram вызвана");

    const TOKEN = "AAGiFujlFdAMHp4zNTP9MXwogdk2bF0s2U0  ";
    const CHAT_ID = "8378157846";

    const text = `🎉 Новый ответ на приглашение

👤 Имя: ${data.name}
✅ Ответ: ${data.answer}
💬 Комментарий: ${data.comment || "нет"}
🕒 ${data.created}`;

    console.log("Отправляем:", text);

    fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            chat_id: CHAT_ID,
            text: text
        })
    })
    .then(async (response) => {
        console.log("HTTP:", response.status);

        const result = await response.json();

        console.log("Ответ Telegram:", result);
    })
    .catch((error) => {
        console.error("Ошибка fetch:", error);
    });

}