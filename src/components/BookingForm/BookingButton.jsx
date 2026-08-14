"use client";

import { useState } from "react";
import BookingModal from "./BookingModal";

/**
 * Opens the booking enquiry dialog. When rendered on an artist profile the
 * artist is preselected; elsewhere the artist field starts empty.
 */
export default function BookingButton({
  artist = null,
  artists = [],
  className = "btn-gold",
  children,
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" className={className} onClick={() => setOpen(true)}>
        {children ||
          (artist ? `Book ${artist.name}` : "Request booking")}
      </button>
      {open && (
        <BookingModal
          artist={artist}
          artists={artists}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
