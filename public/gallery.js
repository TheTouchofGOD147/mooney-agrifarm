document.addEventListener("DOMContentLoaded", () => {
    const track = document.querySelector(".carousel-track");
    const items = document.querySelectorAll(".carousel-item");
    const prevBtn = document.querySelector(".carousel-btn.prev");
    const nextBtn = document.querySelector(".carousel-btn.next");
    const dotsContainer = document.querySelector(".carousel-dots");

    let index = 0;
    const visibleSlides = 3;
    const totalSlides = items.length;
    const maxIndex = totalSlides - visibleSlides;

    // ✅ Create Dots Dynamically
    const totalDots = Math.ceil(totalSlides / visibleSlides);
    for (let i = 0; i < totalDots; i++) {
        const dot = document.createElement("button");
        if (i === 0) dot.classList.add("active");
        dotsContainer.appendChild(dot);
    }
    const dots = dotsContainer.querySelectorAll("button");

    // ✅ Apply Fade Effect to Active Items
    function setVisibleItems() {
        items.forEach((item, i) => {
            item.classList.remove("visible");
            if (i >= index && i < index + visibleSlides) {
                item.classList.add("visible");
            }
        });
    }

    // ✅ Update Slide Position + Fade
    function updateSlide() {
        track.style.transition = "transform 0.6s ease-in-out";
        track.style.transform = `translateX(-${index * (100 / visibleSlides)}%)`;

        setVisibleItems();

        dots.forEach((dot, i) => dot.classList.toggle("active", i === index));
    }

    // ✅ Navigation Buttons
    nextBtn.addEventListener("click", () => {
        if (index < maxIndex) {
            index++;
            updateSlide();
        }
    });

    prevBtn.addEventListener("click", () => {
        if (index > 0) {
            index--;
            updateSlide();
        }
    });

    // ✅ Dots Navigation
    dots.forEach((dot, i) => {
        dot.addEventListener("click", () => {
            index = i;
            updateSlide();
        });
    });

    // ✅ Swipe Support for Mobile
    let startX = 0;
    track.addEventListener("touchstart", (e) => {
        startX = e.touches[0].clientX;
    });
    track.addEventListener("touchend", (e) => {
        const endX = e.changedTouches[0].clientX;
        if (startX - endX > 50 && index < maxIndex) {
            index++;
            updateSlide();
        } else if (endX - startX > 50 && index > 0) {
            index--;
            updateSlide();
        }
    });

    // ✅ Initialize
    setVisibleItems();
});