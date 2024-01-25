import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React from "react";
import "./tailwind.output.css";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  // State to track which content to display

  const [changeContent, setChangeContent] = useState("");

  // Refs and inView states for each section
  const [refFirst, inViewFirst] = useInView({ triggerOnce: false });
  const [refSecond, inViewSecond] = useInView({ triggerOnce: false });
  const [refThird, inViewThird] = useInView({ triggerOnce: false });

  // Effect to handle animations based on change in content
  useEffect(() => {
    // Check if changeContent has a value
    if (changeContent) {
      const allAssets = document.querySelectorAll(".animate-in");
      const animations = [];

      // Loop through each asset and create a GSAP timeline for each
      allAssets.forEach((asset, index) => {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: ".animate-in-trigger",
            start: "top bottom",
            markers: true,
          },
        });

        // Add animations to the timeline with stagger
        timeline.fromTo(
          asset,
          { scale: 0.5, opacity: 0 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            transformOrigin: "left bottom",
            ease: "elastic.out(0.45,0.3)",
          },
          index * 0.2 // Stagger based on index
        );

        animations.push(timeline);
      });

      // Return a function to clean up animations when the component unmounts
      return () => {
        animations.forEach((anim) => {
          anim.kill();
        });
      };
    }
  }, [changeContent]);

  useEffect(() => {
    // Function to handle changes in intersection
    const handleIntersectionChange = (inView, sectionId) => {
      if (inView) {
        setChangeContent(sectionId);
      }
    };

    // Attach the intersection handler to each section
    handleIntersectionChange(inViewFirst, "first");
    handleIntersectionChange(inViewSecond, "second");
    handleIntersectionChange(inViewThird, "third");

    // Optional: Clean up if needed
    return () => {
      // Clean up logic here
    };
  }, [inViewFirst, inViewSecond, inViewThird]);

  return (
    <>
      <div className="w-full h-screen flex items-center justify-center">
        <h3>Content</h3>
      </div>
      <div className="relative h-full">
        <div
          style={{ top: "10px" }}
          className="w-full h-screen sticky z-[9999] bg-red-800  left-0"
        >
          {changeContent === "first" ? (
            <div className="animate-in-trigger w-full transition-all duration-500 h-full">
              <div className="h-full flex flex-col container mx-auto p-5 gap-20 items-center justify-center">
                <div className="animate-in bg-gray-500 h-full flex-1 w-full rounded-[1.5rem]"></div>
                <div className=" animate-in flex flex-1 gap-8 items-center justify-between w-full">
                  <div className=" animate-in space-y-8 flex-1">
                    <h1 className=" leading-full font-bold text-3xl">
                      Creative Design Agency for Entrepreneurs
                    </h1>
                    <div className=" flex gap-4 justify-between">
                      <p className=" max-w-md text-lg">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Suspendisse varius enim in eros elementum tristique
                      </p>
                      <div>
                        <button className="p-5 bg-white rounded-lg text-xl font-medium">
                          Sample Button
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="animate-in w-full h-full flex-1 bg-gray-400 rounded-[1.5rem]"></div>
                </div>
              </div>
            </div>
          ) : changeContent === "second" ? (
            <div className="animate-in-trigger w-full transition-all duration-500 h-full">
              <div className="h-full flex container mx-auto p-5 gap-10 items-center justify-center">
                <div className="animate-in bg-gray-500 h-full flex-1 w-full rounded-[1.5rem]"></div>
                <div className=" flex flex-col h-full gap-8 flex-1">
                  <div className="animate-in  space-y-8 flex-1 flex flex-col justify-center">
                    <h1 className=" leading-full font-bold text-3xl">
                      Creative Design Agency for Entrepreneurs
                    </h1>
                    <div className=" flex gap-4 justify-between">
                      <p className=" max-w-md text-lg">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Suspendisse varius enim in eros elementum tristique
                      </p>
                      <button className="p-5 bg-white rounded-lg text-xl font-medium">
                        Sample Button
                      </button>
                    </div>
                  </div>
                  <div className="animate-in w-full h-10 flex-1 bg-gray-400 rounded-[1.5rem]"></div>
                </div>
              </div>
            </div>
          ) : changeContent === "third" ? (
            <div className="animate-in-trigger w-full transition-all duration-500 h-full">
              <div className="h-full flex flex-row-reverse container mx-auto p-5 gap-10 items-center justify-center">
                <div className="animate-in bg-gray-500 h-full flex-1 w-full rounded-[1.5rem]"></div>
                <div className=" flex flex-col h-full gap-8 flex-1">
                  <div className=" animate-in space-y-8 flex-1 flex flex-col justify-center">
                    <h1 className=" leading-full font-bold text-3xl">
                      Creative Design Agency for Entrepreneurs
                    </h1>
                    <div className=" flex gap-4 justify-between">
                      <p className=" max-w-md text-lg">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Suspendisse varius enim in eros elementum tristique
                      </p>
                      <button className="p-5 bg-white rounded-lg text-xl font-medium">
                        Sample Button
                      </button>
                    </div>
                  </div>
                  <div className="animate-in w-full h-10 flex-1 bg-gray-400 rounded-[1.5rem]"></div>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>

        {/* these are the section trackers, adjust height value to depict how much scroll is needed for changing content */}
        <section
          ref={refFirst}
          id="first"
          className="sections h-screen w-full"
        ></section>
        <section
          ref={refSecond}
          id="second"
          className="sections h-screen w-full"
        ></section>
        <section
          ref={refThird}
          id="third"
          className="sections h-screen w-full"
        ></section>
      </div>
      <div className="w-full h-screen flex items-center justify-center">
        <h3>Content</h3>
      </div>
    </>
  );
};

export default App;
