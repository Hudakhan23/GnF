"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./GenZArtistCarousel.module.css";

const initialsFor = (name) =>
  name
    .replace(/[^A-Za-z0-9 ]/g, " ")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

export default function GenZArtistCarousel({ artists }) {
  const sectionRef = useRef(null);
  const railRef = useRef(null);
  const dragRef = useRef({ startX: 0, startScrollLeft: 0, active: false });
  const didDragRef = useRef(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);
  const [hasFocus, setHasFocus] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const updateControls = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;
    setCanScrollLeft(rail.scrollLeft > 2);
    setCanScrollRight(rail.scrollLeft + rail.clientWidth < rail.scrollWidth - 2);
  }, []);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return undefined;

    updateControls();
    rail.addEventListener("scroll", updateControls, { passive: true });

    const observer = new ResizeObserver(updateControls);
    observer.observe(rail);
    if (rail.firstElementChild) observer.observe(rail.firstElementChild);

    return () => {
      rail.removeEventListener("scroll", updateControls);
      observer.disconnect();
    };
  }, [updateControls]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(mediaQuery.matches);
    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    const target = sectionRef.current;
    if (!target) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { rootMargin: "80px 0px", threshold: 0.01 },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  const isAutoPlaying =
    autoScrollEnabled && isInView && !hasFocus && !reducedMotion;

  useEffect(() => {
    if (!isAutoPlaying) return undefined;

    const rail = railRef.current;
    if (!rail) return undefined;

    let frameId = 0;
    let previousTime = 0;

    const advance = (time) => {
      if (!rail.isConnected) return;

      if (document.hidden) {
        previousTime = 0;
        frameId = window.requestAnimationFrame(advance);
        return;
      }

      if (!previousTime) previousTime = time;
      const elapsed = Math.min(time - previousTime, 48);
      previousTime = time;

      const track = rail.querySelector("[data-artist-track]");
      const loopStartCard = rail.querySelector("[data-loop-start]");
      if (!track || !loopStartCard) return;

      const loopStart =
        loopStartCard.getBoundingClientRect().left -
        track.getBoundingClientRect().left;

      rail.scrollLeft += (36 * elapsed) / 1000;
      if (rail.scrollLeft >= loopStart) rail.scrollLeft -= loopStart;

      frameId = window.requestAnimationFrame(advance);
    };

    frameId = window.requestAnimationFrame(advance);
    return () => window.cancelAnimationFrame(frameId);
  }, [isAutoPlaying]);

  const moveRail = (direction) => {
    const rail = railRef.current;
    const firstCard = rail?.querySelector("[data-artist-card]");
    if (!rail || !firstCard) return;

    setAutoScrollEnabled(false);
    const gap = parseFloat(
      window.getComputedStyle(firstCard.parentElement).columnGap,
    ) || 18;
    const step = firstCard.getBoundingClientRect().width + gap;
    rail.scrollBy({
      left: direction * step,
      behavior: reducedMotion ? "instant" : "smooth",
    });
  };

  const handlePointerDown = (event) => {
    setAutoScrollEnabled(false);
    if (event.pointerType !== "mouse" || event.button !== 0 || !railRef.current) {
      return;
    }
    dragRef.current = {
      startX: event.clientX,
      startScrollLeft: railRef.current.scrollLeft,
      active: true,
    };
    didDragRef.current = false;
  };

  const handlePointerMove = (event) => {
    const rail = railRef.current;
    const drag = dragRef.current;
    if (!rail || !drag.active) return;

    const distance = event.clientX - drag.startX;
    if (Math.abs(distance) > 5 && !didDragRef.current) {
      didDragRef.current = true;
      rail.setPointerCapture(event.pointerId);
    }
    if (didDragRef.current) rail.scrollLeft = drag.startScrollLeft - distance;
  };

  const finishDrag = () => {
    dragRef.current.active = false;
  };

  const suppressDraggedClick = (event) => {
    if (!didDragRef.current) return;
    event.preventDefault();
    event.stopPropagation();
    didDragRef.current = false;
  };

  const stopOnArtistClick = (event) => {
    if (didDragRef.current) {
      suppressDraggedClick(event);
      return;
    }

    if (event.target.closest?.("[data-artist-card]")) {
      setAutoScrollEnabled(false);
    }
  };

  const handleFocusLeave = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) setHasFocus(false);
  };

  return (
    <section
      className={styles.section}
      id="next-wave-artists"
      ref={sectionRef}
      onFocusCapture={(event) =>
        setHasFocus(!event.target.hasAttribute("data-autoplay-control"))
      }
      onBlurCapture={handleFocusLeave}
    >
      <div className={styles.inner}>
        <div className={styles.heading}>
          <div className={styles.headingCopy}>
            <p className="eyebrow">Artist discovery · new generation</p>
            <h2>
              Pakistan&apos;s Gen-Z <em>Sound</em>
            </h2>
          </div>
          <p className={styles.intro}>
            The artists defining Pakistan&apos;s new generation of music. Meet
            Pakistani singers and music artists across rap, pop, R&amp;B and
            indie sounds, and discover live talent for events in Pakistan.
          </p>
          <div className={styles.controls} role="group" aria-label="Artist carousel controls">
            <button
              type="button"
              onClick={() => moveRail(-1)}
              disabled={!canScrollLeft}
              aria-label="Show previous artists"
            >
              <span aria-hidden="true">←</span>
            </button>
            <button
              type="button"
              data-autoplay-control
              onClick={() => setAutoScrollEnabled(!isAutoPlaying)}
              disabled={reducedMotion}
              aria-label={
                reducedMotion
                  ? "Automatic artist movement is disabled by your reduced-motion preference"
                  : autoScrollEnabled
                  ? "Pause automatic artist carousel"
                  : "Resume automatic artist carousel"
              }
              aria-pressed={!autoScrollEnabled}
            >
              <span aria-hidden="true">
                {autoScrollEnabled ? "Ⅱ" : "▶"}
              </span>
            </button>
            <button
              type="button"
              onClick={() => moveRail(1)}
              disabled={!canScrollRight}
              aria-label="Show more artists"
            >
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>

        <div
          className={styles.rail}
          ref={railRef}
          data-playing={isAutoPlaying ? "true" : "false"}
          role="region"
          aria-label="Pakistani Gen-Z artists"
          tabIndex={0}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={finishDrag}
          onPointerCancel={finishDrag}
          onClickCapture={stopOnArtistClick}
          onDragStart={(event) => event.preventDefault()}
        >
          <ul className={styles.track} data-artist-track>
            {[...artists, ...artists].map((artist, index) => {
              const isClone = index >= artists.length;

              return (
                <li
                  className={styles.card}
                  data-artist-card
                  data-loop-start={isClone && index === artists.length ? "true" : undefined}
                  aria-hidden={isClone ? "true" : undefined}
                  key={`${isClone ? "loop-" : ""}${artist.slug}`}
                >
                  <article>
                    {artist.href ? (
                      <Link
                        href={artist.href}
                        className={styles.imageLink}
                        aria-label={`View ${artist.name}'s GnF profile`}
                        draggable="false"
                        tabIndex={isClone ? -1 : undefined}
                      >
                        <ArtistVisual artist={artist} />
                      </Link>
                    ) : (
                      <div className={styles.imageLink}>
                        <ArtistVisual artist={artist} />
                      </div>
                    )}

                    <div className={styles.cardCopy}>
                      <p className={styles.genre}>
                        {artist.genres.join(" · ")}
                      </p>
                      <h3>{artist.name}</h3>
                      <p className={styles.memberLine}>{artist.artistType}</p>
                      <p className={styles.descriptor}>
                        {artist.discoveryDescriptor}
                      </p>
                      <div className={styles.cardActions}>
                        {artist.href ? (
                          <Link href={artist.href} tabIndex={isClone ? -1 : undefined}>View artist</Link>
                        ) : (
                          <span>{artist.artistType}</span>
                        )}
                        <a
                          href={artist.bookingUrl}
                          target="_blank"
                          rel="noreferrer"
                          tabIndex={isClone ? -1 : undefined}
                        >
                          Book artist <span aria-hidden="true">↗</span>
                        </a>
                      </div>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        </div>

        <div className={styles.footer}>
          <div>
            <p className={styles.footerPrompt}>
              Looking for an artist for your next event?
            </p>
            <p>
              Ask GnF about artist booking in Pakistan for concerts, campus
              shows, weddings and private events.
            </p>
          </div>
          <Link href="/contact">
            Book through GnF Events <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

function ArtistVisual({ artist }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <div className={styles.imageFrame}>
      {artist.image && !imageFailed ? (
        <Image
          src={artist.image}
          alt={`Portrait of ${artist.name}`}
          fill
          sizes="(max-width: 650px) 78vw, (max-width: 1000px) 39vw, 27vw"
          quality={75}
          unoptimized={artist.unoptimized === true}
          style={artist.imagePosition ? { objectPosition: artist.imagePosition } : undefined}
          draggable="false"
          onError={() => setImageFailed(true)}
        />
      ) : (
        <div
          className={styles.placeholder}
          role="img"
          aria-label={`${artist.name} artist artwork placeholder`}
        >
          <span className={styles.placeholderMark} aria-hidden="true">
            {initialsFor(artist.name)}
          </span>
          <span className={styles.placeholderName} aria-hidden="true">
            {artist.name}
          </span>
          <span className={styles.placeholderNote} aria-hidden="true">
            Artist portrait coming soon
          </span>
        </div>
      )}
      <span className={styles.imageArrow} aria-hidden="true">
        ↗
      </span>
    </div>
  );
}
