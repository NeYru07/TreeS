import { gsap } from "https://cdn.skypack.dev/gsap";
import { ScrollTrigger } from "https://cdn.skypack.dev/gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

gsap.config({
	force3D: false,
	autoSleep: 120,
	nullTargetWarn: false
});

const tl = gsap.timeline();

tl.from(
  ".rectangle",
  {
    duration: 0.8,
    x: 400,
    opacity: 0,
    ease: "power2.out",
    rotation: 50,
  },
  "-=0.3"
)
  .from(
    ".rectangle2",
    {
      duration: 0.8,
      x: 400,
      opacity: 0,
      ease: "power2.out",
      rotation: 50,
    },
    "-=0.3"
  )
  .fromTo(
    ".hero-image",
    {
      y: 200,
      opacity: 0,
      rotation: -10,
    },
    {
      duration: 2.4,
      y: 0,
      opacity: 1,
      rotation: 0,
      ease: "elastic.out(1, 0.7)",
      delay: 0.2,
    },
    "-=0.4"
  );

// Временно меняем позиционирование для анимации
gsap.set(".inscribe", { position: "relative", left: -800, opacity: 0 });

gsap.to(".inscribe", {
  duration: 1.5,
  left: 0,
  opacity: 1,
  ease: "power3.out",
});

ScrollTrigger.create({
        trigger: ".second-section",
        start: "top 80%",
        toggleActions: "play none none none",
        onEnter: () => {
            const secondBlockTl = gsap.timeline();
            
            secondBlockTl
            .from(".second-section", {
                duration: 0.8,
                y: 50,
                opacity: 0,
                ease: "power2.out"
            })
            .from(".second-section h1", {
                duration: 0.8,
                y: 30,
                opacity: 0,
                ease: "power2.out"
            }, "-=1")
            .from(".custom-pagination", {
                duration: 0.6,
                y: -20,
                opacity: 0,
                ease: "power2.out"
            }, "-=0.5")
            .from(".mySwiper", {
                duration: 1,
                y: 80,
                opacity: 0,
                ease: "power3.out"
            }, "-=0.5");
        }
    });

	 // Анимация третьего блока
// Анимация третьего блока
ScrollTrigger.create({
    trigger: ".third-section",
    start: "top 80%",
    toggleActions: "play none none none",
    onEnter: () => {
        const tl = gsap.timeline();
        
        tl.from(".third-section h1", {
            duration: 1,
            y: 80,
            opacity: 0,
            rotationX: -45,
            transformOrigin: "top",
            ease: "power3.out"
        })
        .from(".DBF", {
            duration: 0.8,
            x: -100,
            opacity: 0,
            ease: "power2.out"
        }, "-=0.5")
        .from(".DBS", {
            duration: 1,
            scale: 0,
            opacity: 0,
            ease: "back.out(1.7)"
        }, "-=0.3")
        .from(".DBT", {
            duration: 0.8,
            x: 100,
            opacity: 0,
            ease: "power2.out"
        }, "-=0.5")
        .from(".third-text-blocks .text-block:nth-child(1)", {
            duration: 0.7,
            y: 60,
            opacity: 0,
            ease: "power2.out"
        }, "-=0.3")
        .from(".third-text-blocks .text-block:nth-child(2)", {
            duration: 0.7,
            y: 60,
            opacity: 0,
            ease: "power2.out"
        }, "-=0.4") 
    }
});

gsap.set(".third-section button", { opacity: 0 });

gsap.to(".third-section button", {
  duration: 1.5,
  opacity: 1,
  ease: "power3.out",
  delay: 0.7,
});
