document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll("section, .contact-card, .product-card, .gallery-item");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("fade-in");
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(el => observer.observe(el));
});