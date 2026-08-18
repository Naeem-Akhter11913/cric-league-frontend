import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";

/* ============================================================
   Social icons — plain inline SVGs. lucide-react dropped brand
   marks (Facebook/Twitter/Instagram/Youtube) as trademarked logos,
   so these are drawn by hand instead of imported.
   ============================================================ */
function FacebookIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width={props.size} height={props.size} fill={props.color}>
      <path d="M13.5 21v-8.2h2.75l.41-3.2h-3.16V7.5c0-.93.26-1.56 1.6-1.56h1.7V3.1C15.98 3.05 15.03 3 13.9 3c-2.35 0-3.96 1.44-3.96 4.08v2.52H7.18v3.2h2.76V21h3.56Z" />
    </svg>
  );
}
function TwitterIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width={props.size} height={props.size} fill={props.color}>
      <path d="M20.8 7.15c.01.18.01.36.01.54 0 5.5-4.19 11.85-11.85 11.85-2.36 0-4.55-.69-6.4-1.87.33.04.65.05.99.05 1.95 0 3.75-.66 5.18-1.79a4.18 4.18 0 0 1-3.9-2.9c.26.04.52.07.79.07.38 0 .75-.05 1.1-.14a4.17 4.17 0 0 1-3.34-4.09v-.05c.56.31 1.2.5 1.88.52a4.16 4.16 0 0 1-1.86-3.47c0-.77.2-1.48.57-2.09a11.85 11.85 0 0 0 8.6 4.36 4.7 4.7 0 0 1-.1-.95 4.16 4.16 0 0 1 7.2-2.85 8.2 8.2 0 0 0 2.64-1.01 4.18 4.18 0 0 1-1.83 2.3 8.3 8.3 0 0 0 2.39-.65 8.9 8.9 0 0 1-2.07 2.17Z" />
    </svg>
  );
}
function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width={props.size} height={props.size} fill="none" stroke={props.color} strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill={props.color} stroke="none" />
    </svg>
  );
}
function YoutubeIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width={props.size} height={props.size} fill={props.color}>
      <rect x="2" y="5.5" width="20" height="13" rx="4" fill="none" stroke={props.color} strokeWidth="1.8" />
      <path d="M10.5 9.2 15.5 12l-5 2.8V9.2Z" />
    </svg>
  );
}

/* ============================================================
   DATA
   ============================================================ */
const NAV_LINKS = ["Home", "Tournaments", "Teams", "Players", "Live Scores", "Rankings", "Blog", "Contact"];

const CONTACT_INFO = [
  {
    icon: Mail,
    label: "Email Us",
    lines: ["support@cricleague.com", "We reply within 24 hours"],
  },
  {
    icon: Phone,
    label: "Call Us",
    lines: ["+91 98765 43210", "Mon - Sat (9 AM - 7 PM)"],
  },
  {
    icon: MapPin,
    label: "Visit Us",
    lines: ["123 Cricket Street,", "Sports City, India"],
  },
];

const SOCIALS = [
  { icon: FacebookIcon, label: "Facebook" },
  { icon: TwitterIcon, label: "Twitter" },
  { icon: InstagramIcon, label: "Instagram" },
  { icon: YoutubeIcon, label: "YouTube" },
];

/* ============================================================
   Logo mark — simple ball/bat glyph, no external asset needed
   ============================================================ */
function LogoMark() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
      <circle cx="15" cy="15" r="13" fill="var(--color-primary)" />
      <path d="M15 3 C15 3 17 9 15 15 C13 21 15 27 15 27" stroke="#ffffff" strokeWidth="1.2" opacity="0.6" fill="none" />
      <path d="M4 12 C9 10 21 10 26 12" stroke="#ffffff" strokeWidth="1.2" opacity="0.6" fill="none" />
    </svg>
  );
}

/* ============================================================
   Contact info card
   ============================================================ */
function ContactInfoCard({ item }) {
  const Icon = item.icon;
  return (
    <div className="flex items-start gap-3">
      <span
        className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
        style={{ backgroundColor: "rgba(124,92,252,0.15)" }}
      >
        <Icon size={16} color="var(--color-primary-light)" />
      </span>
      <div>
        <p className="font-display font-semibold" style={{ color: "var(--color-text-onDark)", fontSize: "var(--fs-sm)" }}>
          {item.label}
        </p>
        {item.lines.map((line, i) => (
          <p
            key={i}
            className="font-body"
            style={{ color: "var(--color-text-onDark-faint)", fontSize: "var(--fs-xs)", lineHeight: 1.6 }}
          >
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   Contact form
   ============================================================ */
function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const inputStyle = {
    backgroundColor: "var(--color-bg-light)",
    border: "1px solid var(--color-border-light)",
    color: "var(--color-text-onLight)",
    fontSize: "var(--fs-sm)",
  };

  return (
    <div
      className="rounded-[var(--radius-lg)] p-5"
      style={{ backgroundColor: "var(--color-bg-light)" }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
        <input
          placeholder="Your Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="px-4 py-3 rounded-[var(--radius-md)] outline-none font-body"
          style={inputStyle}
        />
        <input
          placeholder="Your Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="px-4 py-3 rounded-[var(--radius-md)] outline-none font-body"
          style={inputStyle}
        />
      </div>
      <input
        placeholder="Subject"
        value={form.subject}
        onChange={(e) => setForm({ ...form, subject: e.target.value })}
        className="w-full px-4 py-3 rounded-[var(--radius-md)] outline-none font-body mb-3"
        style={inputStyle}
      />
      <textarea
        placeholder="Your Message"
        rows={4}
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        className="w-full px-4 py-3 rounded-[var(--radius-md)] outline-none font-body mb-4 resize-none"
        style={inputStyle}
      />
      <button
        className="w-full py-3 rounded-[var(--radius-md)] font-body font-semibold grad-primary"
        style={{ color: "#ffffff", fontSize: "var(--fs-sm)" }}
      >
        Send Message
      </button>
    </div>
  );
}

/* ============================================================
   Page / section
   ============================================================ */
export default function ContactFooter() {
  return (
    <footer style={{ backgroundColor: "var(--color-bg-dark)", borderRadius:20 }}>
      <div className="max-w-6xl mx-auto px-6 lg:px-10 py-10">
        <p className="font-body mb-8" style={{ color: "var(--color-text-onDark-muted)", fontSize: "var(--fs-sm)" }}>
          We're here to help. Get in touch!
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-10">
          <div className="flex flex-col gap-6">
            {CONTACT_INFO.map((item) => (
              <ContactInfoCard key={item.label} item={item} />
            ))}

            <div className="flex items-start gap-3">
              <span
                className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                style={{ backgroundColor: "rgba(124,92,252,0.15)" }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary-light)" strokeWidth="2">
                  <circle cx="12" cy="12" r="9" />
                </svg>
              </span>
              <div>
                <p className="font-display font-semibold mb-1.5" style={{ color: "var(--color-text-onDark)", fontSize: "var(--fs-sm)" }}>
                  Follow Us
                </p>
                <div className="flex items-center gap-2">
                  {SOCIALS.map((s) => {
                    const Icon = s.icon;
                    return (
                      <a
                        key={s.label}
                        href="#"
                        aria-label={s.label}
                        className="w-7 h-7 rounded-full flex items-center justify-center transition-colors hover:brightness-110"
                        style={{ backgroundColor: "var(--color-primary)" }}
                      >
                        <Icon size={13} color="#ffffff" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <ContactForm />
        </div>
      </div>
    </footer>
  );
}