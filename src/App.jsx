import React, { useEffect, useRef } from "react";
import SplitType from "split-type";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
gsap.registerPlugin(CustomEase);

const Header = () => {
  const headerRef = useRef(null);
  const linkRef = useRef(null);
  const proRef = useRef(null);
  const dividerRef = useRef(null);
  const splitTextRef = useRef({ header: null, link: null, pro: null });
  const contextRef = useRef(null);

  useEffect(() => {
    contextRef.current = gsap.context(() => {
      const setupSplit = () => {
        gsap.killTweensOf("*");

        if (splitTextRef.current.header) {
          splitTextRef.current.header.revert();
        }
        if (splitTextRef.current.link) {
          splitTextRef.current.link.revert();
        }
        if (splitTextRef.current.pro) {
          splitTextRef.current.pro.revert();
        }

        [headerRef.current, linkRef.current, proRef.current].forEach(
          (element) => {
            element.style.display = "none";
            element.offsetHeight;
            element.style.display = "";
          }
        );

        splitTextRef.current.header = new SplitType(headerRef.current, {
          types: "lines",
          lineClass: "line",
          tagName: "div",
        });

        splitTextRef.current.link = new SplitType(linkRef.current, {
          types: "lines",
          lineClass: "line",
          tagName: "div",
        });

        splitTextRef.current.pro = new SplitType(proRef.current, {
          types: "lines",
          lineClass: "line",
          tagName: "div",
        });

        const allElements = [
          headerRef.current,
          linkRef.current,
          proRef.current,
        ];
        allElements.forEach((element) => {
          const lines = element.querySelectorAll(".line");
          lines.forEach((line) => {
            const textContent = line.textContent;
            line.innerHTML = `<span>${textContent}</span>`;
          });
        });

        const allSpans = document.querySelectorAll(".line span");

        gsap.set(allSpans, {
          yPercent: 100,
        });

        if (dividerRef.current) {
          gsap.set(dividerRef.current, {
            clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
          });
        }

        const tl = gsap.timeline({
          delay: 0.5,
        });

        tl.to(allSpans, {
          yPercent: 0,
          duration: 1.5,
          stagger: 0.15,
          ease: "power4.out",
        }).to(
          dividerRef.current,
          {
            clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
            duration: 1.2,
            ease: "power4.out",
          },
          "-=1.2"
        );
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
        resizeObserver.observe(linkRef.current);
        resizeObserver.observe(proRef.current);

        return () => resizeObserver.disconnect();
      });
    });

    return () => {
      if (contextRef.current) {
        contextRef.current.revert();
      }
      if (splitTextRef.current.header) {
        splitTextRef.current.header.revert();
      }
      if (splitTextRef.current.link) {
        splitTextRef.current.link.revert();
      }
      if (splitTextRef.current.pro) {
        splitTextRef.current.pro.revert();
      }
    };
  }, []);

  return (
    <div className="app">
      <div className="header">
        <h1 ref={headerRef}>
          Sharing all the sauce behind building dope interactive experiences and
          the finest websites that truly stand out.
        </h1>
      </div>

      <div className="ctas">
        <div className="subscribe-btn-wrapper">
          <div className="subscribe-btn">
            <Link to="https://www.youtube.com/@codegrid">
              <h1 ref={linkRef}>Subscribe</h1>
            </Link>
          </div>
        </div>
        <div ref={dividerRef} className="divider"></div>
        <div className="pro-btn-wrapper">
          <Link to="https://codegrid.gumroad.com/l/codegridpro">
            <h1 ref={proRef}>Get PRO</h1>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
