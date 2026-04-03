/**
 * Site-wide config. WhatsApp CTAs render only when set.
 *
 * Set in .env.local:
 *   NEXT_PUBLIC_WHATSAPP_NUMBER=919876543210
 * (country code + number, digits only, no + or spaces)
 */
export function getWhatsAppHref(): string | null {
  const raw = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim();
  if (!raw || !/^\d{8,15}$/.test(raw)) return null;
  return `https://wa.me/${raw}`;
}
