"use client";

import { useState } from "react";
import { EMAIL } from "@/data/site";
import styles from "./ContactForm.module.css";

const initialForm = { name: "", phone: "", email: "", event: "" };

export default function ContactForm() {
  const [form, setForm] = useState(initialForm);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function submit(event) {
    event.preventDefault();
    const subject = encodeURIComponent(`Artist booking enquiry from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nEvent: ${form.event}`,
    );
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  }

  return (
    <form className={styles.form} onSubmit={submit}>
      <h2>Send an enquiry</h2>
      <div className={styles.twoColumns}>
        <label>
          <span>Name *</span>
          <input
            name="name"
            value={form.name}
            onChange={updateField}
            placeholder="Your name"
            autoComplete="name"
            required
          />
        </label>
        <label>
          <span>Phone *</span>
          <input
            name="phone"
            type="tel"
            value={form.phone}
            onChange={updateField}
            placeholder="03xx xxxxxxx"
            autoComplete="tel"
            required
          />
        </label>
      </div>
      <label>
        <span>Email *</span>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={updateField}
          placeholder="you@example.com"
          autoComplete="email"
          required
        />
      </label>
      <label>
        <span>Your event *</span>
        <textarea
          name="event"
          value={form.event}
          onChange={updateField}
          rows="5"
          placeholder="Occasion, city, date, and the artists you have in mind"
          required
        />
      </label>
      <button type="submit">Send enquiry</button>
      <p className={styles.note}>This opens your email app with the enquiry pre-filled.</p>
    </form>
  );
}
