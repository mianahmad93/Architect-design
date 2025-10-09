import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollSmoother, ScrollTrigger } from "gsap/all";
import "./ScrollyImages.css"; // Put your CSS here or inline styles

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const Featured = () => {
  const wrapperRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    // Create ScrollSmoother instance
    const smoother = ScrollSmoother.create({
      wrapper: wrapperRef.current,
      content: contentRef.current,
      smooth: 2,
      speed: 3,
      effects: true,
      onUpdate: (self) => {
        // clamp to limit skew
        const clamp = gsap.utils.clamp(-20, 20);
        let skewSetter = gsap.quickTo("img", "skewY");
        skewSetter(clamp(self.getVelocity() / -50));
      },
      onStop: () => {
        gsap.quickTo("img", "skewY")(0);
      },
    });

    return () => {
      smoother.kill();
    };
  }, []);

  return (
    <>
      <h1 className="text">Scrolly Images</h1>
      <h1 aria-hidden="true" className="text outline-text">
        Scrolly Images
      </h1>
      <h1 aria-hidden="true" className="text filter-text">
        Scrolly Images
      </h1>

      <div id="wrapper" ref={wrapperRef}>
        <section id="content" ref={contentRef}>
          <section className="images">
            <img
              data-speed="0.8"
              src="https://images.unsplash.com/photo-1556856425-366d6618905d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fG5lb258ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60"
              alt=""
            />
            <img
              data-speed="0.9"
              src="https://images.unsplash.com/photo-1520271348391-049dd132bb7c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
              alt=""
            />
            <img
              data-speed="1"
              src="https://images.unsplash.com/photo-1609166214994-502d326bafee?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
              alt=""
            />
            <img
              data-speed="1.1"
              src="https://images.unsplash.com/photo-1589882265634-84f7eb9a3414?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=434&q=80"
              alt=""
            />
            <img
              data-speed="0.9"
              src="https://images.unsplash.com/photo-1514689832698-319d3bcac5d5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=434&q=80"
              alt=""
            />
            <img
              data-speed="1.2"
              src="https://images.unsplash.com/photo-1535207010348-71e47296838a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
              alt=""
            />
            <img
              data-speed="0.8"
              src="https://images.unsplash.com/photo-1588007375246-3ee823ef4851?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjR8fG5lb258ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60"
              alt=""
            />
            <img
              data-speed="1"
              src="https://images.unsplash.com/photo-1571450669798-fcb4c543f6a4?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjF8fG5lb258ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60"
              alt=""
            />
          </section>
        </section>
      </div>
    </>
  );
};

export default Featured;
