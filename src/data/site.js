export const SITE_URL = "https://www.gnfevents.com.pk";
export const SITE_NAME = "GnF Events";
export const ORGANIZATION_SCHEMA_ID = `${SITE_URL}/#organization`;
export const WEBSITE_SCHEMA_ID = `${SITE_URL}/#website`;
export const EMAIL = "gnfeventspakistan@gmail.com";

/**
 * Phone numbers. The 0321 line is the primary business number (also the
 * WhatsApp line); the 0300 line is a secondary contact. `e164` is used for
 * tel: links and structured data, `display` is the visible international form.
 */
export const PHONE_PRIMARY = {
  e164: "+923219492571",
  display: "+92 321 9492571",
};
export const PHONE_SECONDARY = {
  e164: "+923009492571",
  display: "+92 300 9492571",
};
export const telHref = (phone) => `tel:${phone.e164}`;

export const WHATSAPP_NUMBER = PHONE_PRIMARY.e164.replace("+", "");
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

/** Staffed office that clients can visit. */
export const ADDRESS_PARTS = {
  streetAddress: "93-D, Divine Garden",
  addressLocality: "Lahore",
  addressCountry: "PK",
};
export const ADDRESS = "93-D, Divine Garden, Lahore, Pakistan";

export function whatsappLink(message = "") {
  return message
    ? `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`
    : WHATSAPP_URL;
}

/** Prefill for general WhatsApp CTAs: prompts only, no assumed details. */
export const WHATSAPP_GENERAL_MESSAGE =
  "Hi GnF Events, I'd like to enquire about booking an artist for my event.\nEvent type: \nDate: \nCity: ";

export const socialLinks = {
  facebook: "https://www.facebook.com/glow.fanz",
  instagram: "https://www.instagram.com/gnfeventsofficial",
  whatsapp: WHATSAPP_URL,
};
