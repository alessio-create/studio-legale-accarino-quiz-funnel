import { Link } from "@tanstack/react-router";

const Footer = () => (
  <footer className="bg-primary py-6 text-primary-foreground">
    <div className="container">
      <div className="flex flex-col items-center justify-between gap-3 text-center text-xs text-primary-foreground/60 md:flex-row md:text-left">
        <p>
          © {new Date().getFullYear()} Studio Legale Accarino · Edilizia, Urbanistica & Espropri.
          Tutti i diritti riservati.
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          <Link to="/" className="hover:text-accent">Home</Link>
          <Link to="/privacy-policy" className="hover:text-accent">Privacy Policy</Link>
          <Link to="/cookie-policy" className="hover:text-accent">Cookie Policy</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
