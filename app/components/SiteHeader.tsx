"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import "./site-header.css";

type NavItem = {
  label: string;
  href: string;
  /** Figma renders a chevron on the items that open a sub-menu. */
  hasMenu?: boolean;
  /** "About us" uses the wider 28px inline padding in the design. */
  wide?: boolean;
};

const NAV_ITEMS: NavItem[] = [
  { label: "About us", href: "#", wide: true },
  { label: "Space", href: "#", hasMenu: true },
  { label: "Curriculum", href: "#" },
  { label: "Training", href: "#" },
  { label: "Evidence", href: "#", hasMenu: true },
  { label: "Programs", href: "#" },
  { label: "Get involved", href: "#", hasMenu: true },
];

export default function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);

  // Collapse the panel again once the viewport is back above the breakpoint,
  // so the desktop bar never inherits the mobile "open" state.
  useEffect(() => {
    const query = window.matchMedia("(min-width: 1025px)");
    const close = () => setIsOpen(false);
    query.addEventListener("change", close);
    return () => query.removeEventListener("change", close);
  }, []);

  return (
    <header className="site-header">
      <Link className="site-header__logo" href="/" aria-label="MakerGhat home">
        <img
          className="site-header__logo-image"
          src="/assets/logo-makerghat.svg"
          alt="MakerGhat"
          width={128}
          height={59}
        />
      </Link>

      <button
        className="site-header__toggle"
        type="button"
        aria-expanded={isOpen}
        aria-controls="primary-navigation"
        aria-label={isOpen ? "Close main menu" : "Open main menu"}
        onClick={() => setIsOpen((open) => !open)}
      >
        <span className="site-header__burger" />
      </button>

      <nav
        className={`site-header__nav${isOpen ? " site-header__nav--open" : ""}`}
        id="primary-navigation"
        aria-label="Main"
      >
        <ul className="site-nav">
          {NAV_ITEMS.map((item) => (
            <li className="site-nav__item" key={item.label}>
              <a
                className={[
                  "site-nav__link",
                  item.wide ? "site-nav__link--wide" : "",
                  item.hasMenu ? "site-nav__link--menu" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                href={item.href}
              >
                {item.label}
                {item.hasMenu ? (
                  <img
                    className="site-nav__chevron"
                    src="/assets/chevron-down.svg"
                    alt=""
                    aria-hidden="true"
                    width={11}
                    height={8}
                  />
                ) : null}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
