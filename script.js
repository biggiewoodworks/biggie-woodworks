/* ==========================================================
   BIGGIE WOODWORKS
   SCRIPT.JS
   Version 2.0
========================================================== */

/* ==========================================================
   MOBILE NAVIGATION
========================================================== */

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", () => {

        navLinks.classList.toggle("active");

    });

    document.querySelectorAll(".nav-links a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("active");

        });

    });

    document.addEventListener("click", (e) => {

        if (
            !menuBtn.contains(e.target) &&
            !navLinks.contains(e.target)
        ) {

            navLinks.classList.remove("active");

        }

    });

}


/* ==========================================================
   NAVBAR + SCROLL TO TOP
========================================================== */

const navbar = document.querySelector(".navbar");
const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {

    if (navbar) {

        navbar.classList.toggle(
            "scrolled",
            window.scrollY > 50
        );

    }

    if (topBtn) {

        topBtn.style.display =
            window.scrollY > 350
                ? "flex"
                : "none";

    }

});

if (topBtn) {

    topBtn.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}


/* ==========================================================
   SCROLL REVEAL
========================================================== */

const observer = new IntersectionObserver(

(entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},

{
    threshold:0.15
}

);

document.querySelectorAll("section").forEach(section=>{

    section.classList.add("hidden");

    observer.observe(section);

});
/* ==========================================================
   PROFESSIONAL GALLERY LIGHTBOX
========================================================== */

const galleryImages = document.querySelectorAll(".gallery-item img");
const lightbox = document.querySelector(".lightbox");
const lightboxImg = document.querySelector(".lightbox-img");
const closeBtn = document.querySelector(".close-lightbox");

let currentIndex = 0;

const images = [...galleryImages];

function openLightbox(index){

    currentIndex = index;

    lightbox.classList.add("active");

    document.body.style.overflow = "hidden";

    updateImage();

}

function closeLightbox(){

    lightbox.classList.remove("active");

    document.body.style.overflow = "";

}

function updateImage(){

    lightboxImg.src = images[currentIndex].src;

    lightboxImg.alt = images[currentIndex].alt;

}

function nextImage(){

    currentIndex++;

    if(currentIndex >= images.length){

        currentIndex = 0;

    }

    updateImage();

}

function previousImage(){

    currentIndex--;

    if(currentIndex < 0){

        currentIndex = images.length - 1;

    }

    updateImage();

}

images.forEach((img,index)=>{

    img.addEventListener("click",()=>{

        openLightbox(index);

    });

});

if(closeBtn){

    closeBtn.addEventListener("click",closeLightbox);

}

if(lightbox){

    lightbox.addEventListener("click",(e)=>{

        if(e.target===lightbox){

            closeLightbox();

        }

    });

}

/* ==========================================================
   KEYBOARD SUPPORT
========================================================== */

document.addEventListener("keydown",(e)=>{

    if(!lightbox.classList.contains("active")) return;

    if(e.key==="Escape"){

        closeLightbox();

    }

    if(e.key==="ArrowRight"){

        nextImage();

    }

    if(e.key==="ArrowLeft"){

        previousImage();

    }

});

/* ==========================================================
   MOBILE SWIPE
========================================================== */

let startX = 0;

lightboxImg.addEventListener("touchstart",(e)=>{

    startX = e.touches[0].clientX;

});

lightboxImg.addEventListener("touchend",(e)=>{

    let endX = e.changedTouches[0].clientX;

    if(startX-endX>60){

        nextImage();

    }

    if(endX-startX>60){

        previousImage();

    }/* ==========================================================
   GALLERY PRELOAD
========================================================== */

images.forEach(image => {

    const preload = new Image();

    preload.src = image.src;

});


/* ==========================================================
   SMOOTH ACTIVE NAVIGATION
========================================================== */

const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const top = section.offsetTop - 120;

        const height = section.offsetHeight;

        if (window.scrollY >= top &&
            window.scrollY < top + height) {

            current = section.getAttribute("id");

        }

    });

    navItems.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

});


/* ==========================================================
   BUTTON RIPPLE EFFECT
========================================================== */

document.querySelectorAll(".btn").forEach(button => {

    button.addEventListener("click", function(e) {

        const ripple = document.createElement("span");

        const rect = this.getBoundingClientRect();

        ripple.style.left = (e.clientX - rect.left) + "px";

        ripple.style.top = (e.clientY - rect.top) + "px";

        ripple.classList.add("ripple");

        this.appendChild(ripple);

        setTimeout(() => {

            ripple.remove();

        }, 600);

    });

});


/* ==========================================================
   IMAGE FADE-IN
========================================================== */

const allImages = document.querySelectorAll("img");

allImages.forEach(img => {

    img.addEventListener("load", () => {

        img.classList.add("loaded");

    });

});


/* ==========================================================
   WEBSITE READY
========================================================== */

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

    console.log("Biggie Woodworks Website Ready.");

});

});
