"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import SeasonalHomeAccent from "@/components/SeasonalHomeAccent";

const EASE = [0.22, 1, 0.36, 1] as const;

const MOBILE_HERO_SRC = "/mobile-background.png";
const DESKTOP_HERO_SRC = "/pc-background.png";

const TAGLINE_WORDS = ["Munaro", "Plaza", "&", "Ibex", "Hub,", "Lusaka"];
const DESCRIPTION_LINES = [
  "Where precision craftsmanship meets modern luxury.",
  "Experience grooming elevated to an art form.",
];

export default function HomeHero() {
  return (
    <section className="hero hero--image hero--enhanced" id="hero">
      <SeasonalHomeAccent />

      {/* 1. Background collage — cinematic settle (fade + scale 1.08 → 1) */}
      <motion.div
        className="hero__media"
        aria-hidden="true"
        initial={{ opacity: 0, scale: 1.08 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: EASE }}
      >
        <img
          className="hero__bg hero__bg-img hero__bg-img--mobile"
          src={MOBILE_HERO_SRC}
          alt=""
          decoding="async"
          fetchPriority="high"
        />
        <img
          id="hero-bg"
          className="hero__bg hero__bg-img hero__bg-img--desktop"
          src={DESKTOP_HERO_SRC}
          alt=""
          decoding="async"
          fetchPriority="high"
        />
      </motion.div>

      <div className="hero__overlay"></div>

      <div className="hero__deco" aria-hidden="true">
        <span className="hero__float hero__float--1">✂</span>
        <span className="hero__float hero__float--2">✨</span>
        <span className="hero__float hero__float--3">💅</span>
      </div>

      <div className="container hero__content">
        {/* 2. Glass card — fade, rise 30px, scale 0.96 → 1 */}
        <motion.div
          className="hero__glass"
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.75, ease: EASE }}
        >
          {/* 3. Location — word-by-word upward reveal */}
          <p className="hero__tagline">
            {TAGLINE_WORDS.map((word, i) => (
              <Fragment key={word + i}>
                <motion.span
                  className="hero-intro__word"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 1.1 + i * 0.08, ease: EASE }}
                >
                  {word}
                </motion.span>
                {i < TAGLINE_WORDS.length - 1 ? " " : ""}
              </Fragment>
            ))}
          </p>

          {/* 4. Title — Grooming from left, Lounge from right, blur → sharp */}
          <h1 className="hero__title">
            <motion.span
              className="hero-intro__title-word"
              initial={{ opacity: 0, x: -44, filter: "blur(8px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.85, delay: 1.45, ease: EASE }}
            >
              Grooming
            </motion.span>{" "}
            <motion.span
              className="hero-intro__title-word"
              initial={{ opacity: 0, x: 44, filter: "blur(8px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.85, delay: 1.45, ease: EASE }}
            >
              Lounge
            </motion.span>
            <br />
            {/* 5. Subtitle — rise, fade, blur removal */}
            <motion.span
              className="hero__title-sub"
              initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, delay: 1.95, ease: EASE }}
            >
              Barbershop &amp; Salon
            </motion.span>
          </h1>

          {/* 6. Description — line-by-line reveal */}
          <p className="hero__subtitle">
            {DESCRIPTION_LINES.map((line, i) => (
              <Fragment key={line}>
                <motion.span
                  className="hero-intro__line"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 2.15 + i * 0.12, ease: EASE }}
                >
                  {line}
                </motion.span>
                {i < DESCRIPTION_LINES.length - 1 ? " " : ""}
              </Fragment>
            ))}
          </p>

          {/* 7. Buttons — Book from left, View from right, finish together */}
          <div className="hero__actions">
            <motion.a
              href="/book"
              className="btn btn--primary btn--glow"
              initial={{ opacity: 0, x: -32, scale: 0.94 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 2.45, ease: EASE }}
            >
              Book Appointment
            </motion.a>
            <motion.a
              href="/services"
              className="btn btn--glass"
              initial={{ opacity: 0, x: 32, scale: 0.94 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 2.45, ease: EASE }}
            >
              View Services
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
