document.addEventListener("DOMContentLoaded", function() {
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    gsap.to("#page2 h1", {
        transform: "translateX(-80%)",
        scrollTrigger: {
            trigger: "#page2",
            scroller: "body",
            start: "top 0%", // Animation starts when the top of #page2 hits the top of the viewport
            end: "+=2500%", // Animation ends after scrolling 300% of the viewport height
            scrub: true, // Smooth scrubbing effect
            pin: true, // Pin the #page2 element during the animation
            invalidateOnRefresh: true // Ensures the ScrollTrigger recalculates on refresh
        }
    });

    document.addEventListener("contextmenu",function(e){
        e.preventDefault()
    },false)

    const strings = document.querySelectorAll(".string");

    strings.forEach((string) => {
    const svg = string.querySelector("svg");
    const svgPath = svg.querySelector("path");

    const finalPath = `M 10 100 Q 675 100 1340 100`;

    string.addEventListener("mousemove", function (dets) {
        const rect = svg.getBoundingClientRect();
        const x = dets.clientX - rect.left;
        const y = dets.clientY - rect.top;

        const path = `M 10 100 Q ${x} ${y} 1340 100`;
        gsap.to(svgPath, {
            attr: { d: path },
            duration: 0.3,
            ease: "power3.out"
        });
    });

    string.addEventListener("mouseleave", function () {
        gsap.to(svgPath, {
            attr: { d: finalPath },
            duration: 1.5,
            ease: "elastic.out(1,0.2)"
        });
    });
    });

    var main = document.querySelector("#main");
    var cursor = document.querySelector("#crs");

    main.addEventListener("mousemove", function(dets) {
        gsap.to(cursor, {
            x: dets.x,
            y: dets.y,
            duration: 1,
            ease: "back.out"
        });
    });

    var audio = document.getElementById("backgroundMusic");
    var alph = document.querySelector(".alph");

    // // Play the music when the user clicks anywhere on the page
    // var musicStarted = false;
    // document.addEventListener("click", function() {
    //     if (!musicStarted) {
    //         audio.play();
    //         musicStarted = true;
    //     }
    // });

    // Stop the music after the animation is over (after 16 seconds in this case)
    setTimeout(function() {
        audio.pause();
        audio.currentTime = 0; // Reset the audio to the start
    }, 16000);



    function updateCountdown() {
        const now = new Date();
        let year = now.getFullYear();
        let eventDate = new Date(`February 21, ${year} 00:00:00`).getTime();
        
        if (now.getTime() > eventDate) {
            year += 1;
            eventDate = new Date(`February 21, ${year} 00:00:00`).getTime();
        }

        const timeLeft = eventDate - now.getTime();

        if (timeLeft > 0) {
            document.getElementById("days").textContent = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            document.getElementById("hours").textContent = String(Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
            document.getElementById("minutes").textContent = String(Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
            document.getElementById("seconds").textContent = String(Math.floor((timeLeft % (1000 * 60)) / 1000)).padStart(2, '0');
        }
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();
});