 // ==========================
// BIGGIE WOODWORKS
// SCRIPT.JS
// ==========================

// ---------- Mobile Menu ----------

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
}

// ---------- Scroll To Top ----------

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {

    if (topBtn) {

        if (window.scrollY > 300) {
            topBtn.style.display = "flex";
        } else {
            topBtn.style.display = "none";
        }

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

// ---------- Navbar Background ----------

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (!navbar) return;

    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

});

// ---------- Scroll Reveal ----------

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }

    });

},{
    threshold:0.2
});

document.querySelectorAll("section").forEach(section => {
    section.classList.add("hidden");
    observer.observe(section);
});

// ---------- Gallery Lightbox With Swipe ----------

const galleryImages = document.querySelectorAll(".gallery-item img");
const lightbox = document.querySelector(".lightbox");
console.log(lightbox);
const lightboxImg = document.querySelector(".lightbox-img");
const closeBtn = document.querySelector(".close-lightbox");

let currentImage = 0;
let imageSources = [];

galleryImages.forEach(img => {
    imageSources.push({
        src: img.src,
        alt: img.alt
    });
});


if (galleryImages.length && lightbox && lightboxImg && closeBtn) {


    galleryImages.forEach((img, index) => {

        img.addEventListener("click", () => {

            currentImage = index;

            lightbox.classList.add("active");

            showImage();

        });

    });


    function showImage(){

        lightboxImg.src = imageSources[currentImage].src;
        lightboxImg.alt = imageSources[currentImage].alt;

    }


    function nextImage(){

        currentImage++;

        if(currentImage >= imageSources.length){
            currentImage = 0;
        }

        showImage();

    }


    function previousImage(){

        currentImage--;

        if(currentImage < 0){
            currentImage = imageSources.length - 1;
        }

        showImage();

    }


    // Swipe support

    let startX = 0;


    lightboxImg.addEventListener("touchstart", (e)=>{

        startX = e.touches[0].clientX;

    });


    lightboxImg.addEventListener("touchend", (e)=>{

        let endX = e.changedTouches[0].clientX;

        if(startX - endX > 50){

            nextImage();

        }

        if(endX - startX > 50){

            previousImage();

        }

    });


    closeBtn.addEventListener("click", () => {

        lightbox.classList.remove("active");

    });


    lightbox.addEventListener("click", (e)=>{

        if(e.target === lightbox){

            lightbox.classList.remove("active");

        }

    });


}

// ==========================
// SCROLL REVEAL ANIMATION
// ==========================

const revealElements = document.querySelectorAll("section");

function revealOnScroll() {
    const windowHeight = window.innerHeight;

    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const revealPoint = 100;

        if (elementTop < windowHeight - revealPoint) {
            element.classList.add("show");
        }
    });
}

window.addEventListener("scroll", revealOnScroll);

// Run once when page loads
revealOnScroll();