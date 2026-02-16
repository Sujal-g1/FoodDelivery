import { useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Header = () => {
  const container = useRef();
  const headerRef = useRef();

  useGSAP(() => {

    gsap.to(".circle", {
      scale: 25,
      opacity:40,
      ease: "none",
      scrollTrigger: {
        trigger: headerRef.current,
        start: "top top",
        end: "+=1200",
        scrub: true,
        pin: true,
        markers: true
      }
    });

  }, { scope: container });

  return (
    <div ref={container} className="relative">

      {/* HERO SECTION */}
      <section
        ref={headerRef}
        className="relative h-screen w-full flex items-center justify-center overflow-hidden"
      >

        {/* Expanding Circle */}
        <div className="circle absolute top-1/2 left-1/2 
                        -translate-x-1/2 -translate-y-1/2
                        h-40 w-40 bg-orange-400 rounded-full opacity-0">
        </div>

        {/* Text */}
        <div className="relative z-10 text-center">
          <motion.h1
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-6xl font-bold text-[#25671E] mb-4"
          >
            Hot meals.
          </motion.h1>

          <motion.h1
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl font-bold text-[#25671E] mb-4"
          >
            Zero wait.
          </motion.h1>

          <motion.h1
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-6xl font-bold text-[#25671E]"
          >
            Maximum flavor.
          </motion.h1>
        </div>

      </section>

      {/* EXTRA SCROLL SPACE AFTER HERO */}
      <section className="h-[150vh] bg-gray-100"></section>

    </div>
  );
};

export default Header;
