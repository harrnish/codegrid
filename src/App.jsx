import React, { useEffect, useRef } from "react";
import SplitType from "split-type";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
gsap.registerPlugin(CustomEase);

const Header = () => {
  const headerRef = useRef(null);
  const splitTextRef = useRef(null);
  const contextRef = useRef(null);

  useEffect(() => {
    contextRef.current = gsap.context(() => {
      const setupSplit = () => {
        if (splitTextRef.current) {
          splitTextRef.current.revert();
        }

        headerRef.current.style.display = "none";
        headerRef.current.offsetHeight;
        headerRef.current.style.display = "";

        splitTextRef.current = new SplitType(headerRef.current, {
          types: "lines",
          lineClass: "line",
          tagName: "div",
        });

        const lines = headerRef.current.querySelectorAll(".line");
        lines.forEach((line) => {
          const textContent = line.textContent;
          line.innerHTML = `<span>${textContent}</span>`;
        });

        const spans = headerRef.current.querySelectorAll(".line span");
        gsap.set(spans, {
          yPercent: 100,
        });

        gsap.to(spans, {
          yPercent: 0,
          duration: 1.5,
          stagger: 0.15,
          delay: 0.5,
          ease: "power4.out",
        });
      };

      setupSplit();

      const mm = gsap.matchMedia();

      mm.add("(min-width: 0px)", () => {
        const resizeObserver = new ResizeObserver((entries) => {
          requestAnimationFrame(() => {
            setupSplit();
          });
        });

        resizeObserver.observe(headerRef.current);

        return () => resizeObserver.disconnect();
      });
    });

    return () => {
      if (contextRef.current) {
        contextRef.current.revert();
      }
      if (splitTextRef.current) {
        splitTextRef.current.revert();
      }
    };
  }, []);

  return (
    <div className="header">
      <h1 ref={headerRef}>
        Sharing all the sauce behind building dope interactive experiences and
        the finest websites that truly stand out.
      </h1>
    </div>
  );
};

export default Header;
