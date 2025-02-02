import React from "react";
import Button from "./Button";

const ImageClip = ({ src, clipClass }) => {
  return (
    <div className={clipClass}>
      <img src={src} />
    </div>
  );
};
const Contact = () => {
  return (
    <div id="contact" className="min-h-96 w-screen my-20 px-10 ">
      <div className="relative rounded-lg bg-black py-24 text-blue-50 sm:overflow-hidden">
        <div className="absolute hidden -left-20 top-0 h-full w-72 overflow-hidden sm:block lg:left-20 lg:w-96">
          <ImageClip clipClass="contact-clip-path-1" src="img/contact-1.webp" />
          <ImageClip
            clipClass="contact-clip-path-2 lg:translate-y-40"
            src="img/contact-2.webp"
          />
        </div>
        <div className="absolute -top-40 left-20 w-60 sm:top-1/2 md:left-auto md:right-10 lg:top-20 lg:w-80">
          <ImageClip
            clipClass="absolute md:scale-150"
            src="img/swordman-partial.webp"
          />
          <ImageClip
            clipClass="sword-man-clip-path md:scale-125"
            src="img/swordman.webp"
          />
        </div>
        <div className="flex flex-col items-center text-center ">
          <p className="font-general  uppercase text-[10px]">join zentry</p>
          <p className="mt-10 special-font w-full font-zentry text-5xl md:text-[6rem] leading-[0.9]">
            Let's b<b>u</b>ild the <br /> new era of g<b>a</b>ming <br />t
            <b>o</b>gether
          </p>
          <Button
            title="Contact Us"
            containerClass="mt-10 cusor-pointer hover:scale-110 transition duration-500 ease-in-out"
          ></Button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
