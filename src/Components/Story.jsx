import React, { useRef } from "react";
import gsap from "gsap";
import AnimatedTitle from "./AnimatedTitle";
import RoundedCorner from "./RoundedCorner";
const Story = () => {
  const frameRef = useRef(null);

  const HandleMouseLeave = () => {
    const element = frameRef.current;

    gsap.to(element, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.3,
      ease: "power1.inOut",
    });
  };

  const HandleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const element = frameRef.current;

    if (!element) return;
    const rect = element.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top; // get the mouse position within the element

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const RorateX = ((y - centerY) / centerY) * -10;
    const RorateY = ((x - centerX) / centerX) * 10;

    gsap.to(element, {
      rotateX: RorateX,
      rotateY: RorateY,
      duration: 0.3,
      transformPerspective: 500,
      ease: "power1.inOut",
    });
  };

  return (
    <section>
      <div className="min-h-dvh w-screen bg-black text-blue-50" id="story">
        <div className="flex size-full flex-col items-center py-10 pb-24">
          <p className="font-general text-sm uppercase md:text-[10px]">
            The open ip universe
          </p>
          <div className="relative size-full">
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
                    onMouseLeave={HandleMouseLeave}
                    onMouseUp={HandleMouseLeave}
                    onMouseEnter={HandleMouseLeave}
                    onMouseMove={HandleMouseMove}
                  />
                </div>
              </div>
              <RoundedCorner />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Story;
