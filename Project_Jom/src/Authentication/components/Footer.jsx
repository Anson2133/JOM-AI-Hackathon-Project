// components/Footer.jsx
import React from 'react';

export default function Footer() {
  return (
    <footer className="footer">
      <p>
        © {new Date().getFullYear()} MyTampines Assistant · Project Jom ·{' '}
        <a href="/privacy">Privacy Policy</a> ·{' '}
        <a href="/terms">Terms of Use</a>
      </p>
    </footer>
  );
}
