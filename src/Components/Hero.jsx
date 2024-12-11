import React, { useState, useRef, useEffect } from "react";
import Button from "./Button";
import { TiChevronRight } from "react-icons/ti";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [Loading, setLoading] = useState(true);
  const [loadedVideo, setloadedVideo] = useState(0);

  const TotalVideo = 4;
  const nextVideoRef = useRef(null);

  const handleVideoLoad = () => {
    setloadedVideo((prev) => prev + 1);
  };
  // the next video calculate
  const nextvideoIndex = (currentIndex % TotalVideo) + 1;

  const HandleMiniVideoClick = () => {
    setHasClicked(true);

    setCurrentIndex(nextvideoIndex);
  };

  const getVideoSrc = (index) => `videos/hero-${index}.mp4`;

  useEffect(() => {
    if (loadedVideo === TotalVideo - 1) {
      setLoading(false);
    }
  }, [loadedVideo]);

  useGSAP(
    () => {
      if (hasClicked) {
        gsap.set("#next-video", { visibility: "visible" });
        gsap.to("#next-video", {
          transformOrigin: "center center",
          scale: 1,
          width: "100%",
          height: "100%",
          duration: 0.7,
          ease: "power1.inOut",
          onStart: () => nextVideoRef.current.play(),
        });
        gsap.from("#current-video", {
          transformOrigin: "center center",
          scale: 0,
          duration: 1.5,
          ease: "power1.inOut",
        });
      }
    },
    {
      dependencies: [currentIndex],
      revertOnUpdate: true,
    }
  );
  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0, 70% 0, 88% 90%, 0 95%)",
      borderRadius: "0% 0% 40% 10%",
    });
    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0% 0% 0% 0%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: 1,
      },
    });
  });

  return (
    <div className="relative h-dvh overflow-x-hidden w-screen">
      {Loading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
      )}
      <div
        id="video-frame"
        className="relative w-screen z-10 h-dvh overflow-hidden rounded-lg bg-blue-75"
      >
        <div>
          <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
            <div
              onClick={HandleMiniVideoClick}
              className="origin-center scale-50 opacity-0 transition-all duration-400 ease-in hover:scale-100 hover:opacity-100 hover:"
            >
              <video
                ref={nextVideoRef}
                src={getVideoSrc(nextvideoIndex)}
                loop
                muted
                id="currect-video"
                className="size-64 origin-center scale-150 object-cover object-center "
                onLoadedData={handleVideoLoad}
              />
            </div>
          </div>
          <video
            ref={nextVideoRef}
            src={getVideoSrc(currentIndex)}
            loop
            muted
            id="next-video"
            className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
            onLoadedData={handleVideoLoad}
          />

          <video
            src={getVideoSrc(
              currentIndex === TotalVideo - 1 ? 1 : currentIndex
            )}
            loop
            muted
            autoPlay
            className="absolute left-0 top-0 size-full object-cover object-center"
            onLoadedData={handleVideoLoad}
          />
        </div>

        <h1 className="special-font hero-heading absolute bottom-5 right-5 text-blue-75 z-40 ">
          RE
          <b>A</b>
          LITY
        </h1>
        <div className="absolute top-20 left-0 size-full z-40">
          <div className="mt-5 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-blue-100">
              Redifi<b>n</b>e
            </h1>
            <p className="mb-5 max-w-64 font-robertregular text-blue-100">
              Enter the Mategame <br />
              Unleash the Play Economy
            </p>
            <Button
              id="Watch-trailer"
              title="Watch Trailer"
              leftIcon={<TiChevronRight />}
              containerClass="!bg-yellow-300 flex-center gap-1"
            />
          </div>
        </div>
      </div>
      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black ">
        RE
        <b>A</b>
        LITY
      </h1>
    </div>
  );
};

export default Hero;
