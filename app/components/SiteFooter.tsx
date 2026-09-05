import "./site-footer.css";

const RESOURCE_LINKS = [
  "Blueprint to our makerspaces",
  "IGNITE Incubator Program",
  "MakerGaon Fellowship",
  "Curriculum Resources",
  "Dashboard",
  "Reports",
];

const FAQ_LINKS = ["Space", "Curriculum", "Training", "Evidence"];

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <img
        className="site-footer__skyline"
        src="/assets/footer-skyline.svg"
        alt=""
        aria-hidden="true"
        width={1443}
        height={98}
      />

      <div className="site-footer__body">
        <div className="site-footer__inner">
          <div className="site-footer__column">
            <h2 className="site-footer__title">
              Connect
              <br />
              with Us
            </h2>

            <a className="site-footer__about" href="#">
              About Us
            </a>

            <address className="site-footer__contact">
              <p className="site-footer__contact-item">
                <img
                  className="site-footer__contact-icon"
                  src="/assets/icon-phone.svg"
                  alt=""
                  aria-hidden="true"
                  width={21}
                  height={21}
                />
                <a href="tel:+919447756484">+91 9447756484</a>
              </p>
              <p className="site-footer__contact-item">
                <img
                  className="site-footer__contact-icon"
                  src="/assets/icon-email.svg"
                  alt=""
                  aria-hidden="true"
                  width={21}
                  height={21}
                />
                <a href="mailto:info@makerghat.org">info@makerghat.org</a>
              </p>
            </address>
          </div>

          <nav
            className="site-footer__column site-footer__column--resources"
            aria-labelledby="footer-resources"
          >
            <h2 className="site-footer__heading" id="footer-resources">
              Resources
            </h2>
            <ul className="site-footer__links">
              {RESOURCE_LINKS.map((label) => (
                <li key={label}>
                  <a className="site-footer__link" href="#">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav
            className="site-footer__column site-footer__column--faqs"
            aria-labelledby="footer-faqs"
          >
            <h2 className="site-footer__heading" id="footer-faqs">
              FAQs
            </h2>
            <ul className="site-footer__links">
              {FAQ_LINKS.map((label) => (
                <li key={label}>
                  <a className="site-footer__link" href="#">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="site-footer__column site-footer__column--brand">
            <p className="site-footer__brand">
              <img
                className="site-footer__brand-hand"
                src="/assets/footer-logo-hand.svg"
                alt=""
                aria-hidden="true"
                width={80}
                height={79}
              />
              <img
                className="site-footer__brand-wordmark"
                src="/assets/footer-logo-wordmark.svg"
                alt="MakerGhat"
                width={105}
                height={57}
              />
            </p>

            <a className="site-footer__subscribe" href="#">
              Subscribe to our newsletter
            </a>

            <img
              className="site-footer__divider"
              src="/assets/footer-divider.svg"
              alt=""
              aria-hidden="true"
              width={240}
              height={3}
            />

            <img
              className="site-footer__social"
              src="/assets/icons-social.svg"
              alt="Follow MakerGhat on Instagram, Substack, YouTube and LinkedIn"
              width={120}
              height={23}
            />

            <p className="site-footer__licence">
              MakerGhat and its assets are licensed
              <br />
              under CC BY-SA4.0
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
