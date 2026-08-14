export const SITE_URL = "https://www.gnfevents.com.pk";
export const SITE_NAME = "GnF Events";
export const WHATSAPP_NUMBER = "923219492571";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
export const EMAIL = "gnfeventspakistan@gmail.com";
export const PHONE_PRIMARY = "+923009492571";
export const PHONE_SECONDARY = "+923219492571";
export const ADDRESS = "93 D, Divine Garden, Lahore, Pakistan";

export function whatsappLink(message = "") {
  return message
    ? `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`
    : WHATSAPP_URL;
}

export const socialLinks = {
  facebook: "https://www.facebook.com/glow.fanz",
  instagram: "https://www.instagram.com/gnfeventsofficial",
  whatsapp: WHATSAPP_URL,
};
