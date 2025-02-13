// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {

    //  Mobile Menu Toggle
    const menuToggle = document.querySelector("#menu-toggle");
    const navMenu = document.querySelector("nav ul");

    if (menuToggle) {
        menuToggle.addEventListener("click", function () {
            navMenu.classList.toggle("active");
        });
    }

    //  Contact Form Submission with Local Storage
    const contactForm = document.querySelector("#contact-form");

    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent page reload

            const name = document.querySelector("#name").value.trim();
            const email = document.querySelector("#email").value.trim();
            const message = document.querySelector("#message").value.trim();

            if (!name || !email || !message) {
                alert("Please fill out all fields.");
                return;
            }

            // Store form data in localStorage
            localStorage.setItem("contactName", name);
            localStorage.setItem("contactEmail", email);
            localStorage.setItem("contactMessage", message);

            alert(`Thank you, ${name}, for contacting us! We'll get back to you soon.`);
            contactForm.reset();
        });
    }

    //  Dynamic Greeting Based on Time of Day
    function getGreeting() {
        const hour = new Date().getHours();
        if (hour < 12) {
            return "Good morning!";
        } else if (hour < 18) {
            return "Good afternoon!";
        } else {
            return "Good evening!";
        }
    }

    const greetingElement = document.querySelector("#dynamic-greeting");
    if (greetingElement) {
        greetingElement.textContent = `${getGreeting()} Welcome to HaQtec Solutions!`;
    }

    //  Dynamic Services List
    const servicesContainer = document.querySelector("#services-list");

    if (servicesContainer) {
        const services = [
            { title: "Cloud Computing", image: "images/cloud.jpg", desc: "Scalable cloud solutions for businesses." },
            { title: "Cybersecurity", image: "images/security.jpg", desc: "Protect your business with top-tier security." },
            { title: "AI & Automation", image: "images/ai.jpg", desc: "Leverage AI for efficiency and growth." },
            { title: "IT Consulting", image: "images/consulting.jpg", desc: "Expert guidance for your tech strategy." }
        ];

        servicesContainer.innerHTML = services
            .map(service => `
                <div class="service">
                    <img src="${service.image}" alt="${service.title}">
                    <h2>${service.title}</h2>
                    <p>${service.desc}</p>
                </div>
            `).join("");
    }

    //  Lazy Load Images
    const lazyImages = document.querySelectorAll("img[data-src]");

    const lazyLoad = (image) => {
        const src = image.getAttribute("data-src");
        if (!src) return;
        image.src = src;
        image.removeAttribute("data-src");
    };

    const imgObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                lazyLoad(entry.target);
                observer.unobserve(entry.target);
            }
        });
    });

    lazyImages.forEach(img => imgObserver.observe(img));

    //  Service Search Filter
    const filterInput = document.querySelector("#filter-services");
    const serviceCards = document.querySelectorAll(".service-cards .card");

    if (filterInput) {
        filterInput.addEventListener("input", function () {
            const searchValue = this.value.toLowerCase();
            serviceCards.forEach(card => {
                const serviceName = card.querySelector("h3").textContent.toLowerCase();
                card.style.display = serviceName.includes(searchValue) ? "block" : "none";
            });
        });
    }

    //  Rotating Testimonials
    const testimonials = [
        "HaQtec Solutions transformed our IT infrastructure. Highly recommend!",
        "Professional, efficient, and innovative solutions. Great team!",
        "Outstanding cybersecurity services! Our data is now fully secure.",
        "Their cloud solutions streamlined our business operations. Fantastic work!"
    ];

    let testimonialIndex = 0;
    const testimonialElement = document.querySelector("#testimonial");

    function updateTestimonial() {
        if (testimonialElement) {
            testimonialElement.textContent = testimonials[testimonialIndex];
            testimonialIndex = (testimonialIndex + 1) % testimonials.length;
        }
    }

    setInterval(updateTestimonial, 5000);
    updateTestimonial(); // Show first testimonial immediately
});
