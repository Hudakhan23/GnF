"use client";

import { useCallback, useRef, useState } from "react";
import { EVENTS, track } from "@/lib/analytics";
import BookingModal from "./BookingModal";

/**
 * Opens the booking enquiry dialog. When rendered on an artist profile the
 * artist is preselected; elsewhere the artist field starts empty (or with
 * `defaultArtistName`). `source` labels where the enquiry started.
 */
export default function BookingButton({
  artist = null,
  artists = [],
  defaultArtistName = "",
  source = "booking_modal",
  className = "btn-gold",
  children,
}) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef(null);

  const openModal = () => {
    setOpen(true);
    track(EVENTS.bookingModalOpen, {
      cta_location: source,
      artist_slug: artist?.slug,
    });
  };

  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  return (
    <>
      <button
        type="button"
        className={className}
        onClick={openModal}
        ref={triggerRef}
      >
        {children || (artist ? `Book ${artist.name}` : "Request booking")}
      </button>
      {open && (
        <BookingModal
          artist={artist}
          artists={artists}
          defaultArtistName={defaultArtistName}
          source={source}
          onClose={close}
        />
      )}
    </>
  );
}
