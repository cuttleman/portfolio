"use client";

import "./_styles/page.scss";

import { create as confettiCreate } from "canvas-confetti";
import { useInView } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { BiLogoGmail, BiLogoGithub, BiLogoLinkedinSquare } from "react-icons/bi";

const Section04 = () => {
  const ref = useRef(null);
  const canvasRef = useRef<HTMLCanvasElement>(null as unknown as HTMLCanvasElement);
  const isInView = useInView(ref, { once: true, amount: 0.6 });

  useEffect(() => {
    if (!isInView) return;

    const myConfetti = confettiCreate(canvasRef.current, { resize: true });

    void myConfetti({
      particleCount: 100,
      startVelocity: 30,
      spread: 360,
      origin: { x: 0.5, y: 0 },
    });

    return () => {
      myConfetti?.reset();
    };
  }, [isInView]);

  return (
    <div className="section-container" id="contact" ref={ref}>
      <div className="section">
        <div className="section04">
          <canvas ref={canvasRef} />

          {/* eslint-disable-next-line @next/next/no-img-element -- . */}
          <img alt="armature" src="/image/armature_bye.png" />

          <div className="contact">
            <div className="title">Contact</div>
            <ul>
              <li>
                <Link href="https://github.com/cuttleman" target="_blank">
                  <BiLogoGithub />
                </Link>
              </li>
              <li>
                <Link href="https://linkedin.com/in/juno-lee-95139a255" target="_blank">
                  <BiLogoLinkedinSquare />
                </Link>
              </li>
              <li>
                <a href="mailto:silluat11@gmail.com" rel="noreferrer" target="_blank">
                  <BiLogoGmail />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section04;
