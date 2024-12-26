import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import AnimatedTitle from "./AnimatedTitle";
import RoundedCorner from "./RoundedCorner";
import Button from "./Button";

gsap.registerPlugin(ScrollTrigger);

const Story = () => {
  const frameRef = useRef(null);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    // Initialize Scroll Animations
    const context = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            end: "top 50%",
            scrub: true,
          },
        }
      );

      // Frame (image) animation
      gsap.fromTo(
        frameRef.current,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: frameRef.current,
            start: "top 90%",
            end: "top 60%",
            scrub: true,
          },
        }
      );

      // Text animation
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 90%",
            end: "top 60%",
            scrub: true,
          },
        }
      );

      // Button animation
      gsap.fromTo(
        buttonRef.current,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: buttonRef.current,
            start: "top 95%",
            end: "top 70%",
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => context.revert(); // Clean up GSAP context
  }, []);

  const handleMouseLeave = () => {
    const element = frameRef.current;

    gsap.to(element, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.3,
      ease: "power1.inOut",
    });
  };

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const element = frameRef.current;

    if (!element) return;
    const rect = element.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    gsap.to(element, {
      rotateX,
      rotateY,
      duration: 0.3,
      transformPerspective: 500,
      ease: "power1.inOut",
    });
  };

  return (
    <section ref={sectionRef} id="story">
      <div className="min-h-dvh w-screen bg-black text-blue-50">
        <div className="flex size-full flex-col items-center py-10 pb-24">
          <p className="font-general text-sm uppercase md:text-[10px]">
            The open IP universe
          </p>
          <div className="relative size-full" ref={titleRef}>
            <AnimatedTitle
              title="the st<b>o</b>ry of <br /> a hidden real<b>m</b>"
              containerClass="!text-blue-50 mt-5 pointer-events-none mix-blend-difference relative z-10"
            />
            <div className="story-img-container">
              <div className="story-img-mask">
                <div className="story-img-content">
                  <img
                    src="/img/entrance.webp"
                    alt="entrance"
                    className="object-contain"
                    ref={frameRef}
                    onMouseLeave={handleMouseLeave}
                    onMouseUp={handleMouseLeave}
                    onMouseEnter={handleMouseLeave}
                    onMouseMove={handleMouseMove}
                  />
                </div>
              </div>
              <RoundedCorner />
            </div>
          </div>
          <div
            className="-mt-80 flex w-full justify-center md:-mt-64 md:me-44 md:justify-end"
            ref={textRef}
          >
            <div className="flex h-full w-fit flex-col items-center md:items-start">
              <p className="mt-3 max-w-sm text-center font-ciricularweb text-violet-50 md:text-start">
                Where realms converge, lies Zentry and the boundless pillar.
                Discover its secrets and shape your fate amidst infinite
                opportunities.
              </p>
              <Button
                id="realm-button"
                title="Discover Prologue"
                containerClass="mt-5 hover:scale-105 transition duration-200 ease-in-out"
                ref={buttonRef}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Story;
