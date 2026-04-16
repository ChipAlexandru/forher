import { useState, useEffect, useRef } from 'react';
import { useLang } from '../context/LanguageContext';

const labels = {
  de: {
    title: 'Wir starten bald',
    subtitle: 'Seien Sie unter den Ersten, die eine Konsultation mit einer Menopause-Fachperson buchen.',
    placeholder: 'Ihre E-Mail-Adresse',
    button: 'Benachrichtigen',
    footer: 'CHF 300 \u00b7 45\u201360 Min. \u00b7 Video \u00b7 Kein Wartezeit',
    thanks: 'Vielen Dank! Wir melden uns bei Ihnen.',
  },
  fr: {
    title: 'Lancement bient\u00f4t',
    subtitle: 'Soyez parmi les premi\u00e8res \u00e0 r\u00e9server une consultation avec une sp\u00e9cialiste de la m\u00e9nopause.',
    placeholder: 'Votre adresse e-mail',
    button: 'Me notifier',
    footer: 'CHF 300 \u00b7 45\u201360 min \u00b7 Vid\u00e9o \u00b7 Sans liste d\u2019attente',
    thanks: 'Merci ! Nous vous contacterons.',
  },
  en: {
    title: 'Launching soon',
    subtitle: 'Be the first to book a consultation with a menopause specialist.',
    placeholder: 'Your email address',
    button: 'Notify me',
    footer: 'CHF 300 \u00b7 45\u201360 min \u00b7 Video \u00b7 No waiting list',
    thanks: 'Thank you! We\u2019ll be in touch.',
  },
};

export default function WaitlistModal({ open, onClose }) {
  const { lang } = useLang();
  const t = labels[lang] || labels.en;
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const inputRef = useRef(null);

  // Track modal open in GA4
  useEffect(() => {
    if (open && typeof window.gtag === 'function') {
      window.gtag('event', 'waitlist_modal_open', {
        event_category: 'engagement',
        event_label: lang,
      });
    }
  }, [open, lang]);

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      // Focus input after animation
      const timer = setTimeout(() => inputRef.current?.focus(), 150);
      return () => clearTimeout(timer);
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  // Reset state when modal closes
  useEffect(() => {
    if (!open) {
      const timer = setTimeout(() => {
        setEmail('');
        setSubmitted(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [open]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!email.trim()) return;
    const payload = { email: email.trim(), lang, timestamp: new Date().toISOString() };
    fetch('https://script.google.com/macros/s/AKfycbxAJl8e_UPrvOF4dXvJAMyYxByvjTjg4ZSzJjCS9aagBOnEiwTkdisB8unWiYnnLRmd/exec', {
      method: 'POST',
      body: JSON.stringify(payload),
    }).catch(() => {});
    // Track email submission in GA4
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'waitlist_signup', {
        event_category: 'conversion',
        event_label: lang,
      });
    }
    setSubmitted(true);
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={t.title}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-charcoal/50 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-cream rounded-lg shadow-2xl w-full max-w-md p-8 md:p-10 animate-modal-in">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-stone hover:text-forest hover:bg-stone/10 transition-colors bg-transparent border-0 cursor-pointer"
          aria-label="Close"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {!submitted ? (
          <>
            <div className="text-center mb-8">
              <h2 className="font-serif font-bold text-forest text-2xl md:text-3xl mb-3">
                {t.title}
              </h2>
              <p className="font-sans text-stone text-sm leading-relaxed max-w-sm mx-auto">
                {t.subtitle}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                ref={inputRef}
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.placeholder}
                className="w-full border border-border rounded-[2px] px-4 py-3 font-sans text-sm text-charcoal placeholder:text-stone/50 bg-white focus:outline-none focus:ring-2 focus:ring-forest/40 focus:border-forest transition-colors"
              />
              <button
                type="submit"
                className="w-full bg-forest text-cream font-sans font-medium text-sm uppercase tracking-wider px-6 py-3.5 rounded-[2px] hover:bg-forest-mid transition-colors border-0 cursor-pointer"
              >
                {t.button}
              </button>
            </form>

            <p className="font-sans text-stone/60 text-xs text-center mt-6">
              {t.footer}
            </p>
          </>
        ) : (
          <div className="text-center py-4">
            <div className="w-14 h-14 rounded-full bg-sage/20 flex items-center justify-center mx-auto mb-5">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#6B8F6E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <p className="font-sans font-medium text-forest text-base">
              {t.thanks}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
