document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll(".fade-scroll");

    const observer = new IntersectionObserver((entries, observerInstance) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observerInstance.unobserve(entry.target); // ✅ stop observing once visible
            }
        });
    }, { threshold: 0.2 });

    elements.forEach(el => observer.observe(el));
});