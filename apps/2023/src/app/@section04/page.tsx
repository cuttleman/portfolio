"use client";

import "./_styles/page.scss";

import { create as confettiCreate } from "canvas-confetti";
import clsx from "clsx";
import { useInView } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BiLogoGmail, BiLogoGithub, BiLogoLinkedinSquare } from "react-icons/bi";
import { MdCancel } from "react-icons/md";

import MailForm from "./_components/MailForm.client";

const Section04 = () => {
  const ref = useRef(null);
  const canvasRef = useRef<HTMLCanvasElement>(null as unknown as HTMLCanvasElement);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const [isOpen, setIsOpen] = useState(false);

  const toggleMailForm = () => {
    setIsOpen((prev) => !prev);
  };

  const closeMailForm = () => {
    setIsOpen(false);
  };

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
                <button onClick={toggleMailForm} type="button">
                  <BiLogoGmail />
                </button>
              </li>
            </ul>
          </div>
          <div className={clsx("form-container", isOpen && "show")}>
            <button onClick={toggleMailForm} type="button">
              <MdCancel />
            </button>
            <MailForm closeMailForm={closeMailForm} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section04;
