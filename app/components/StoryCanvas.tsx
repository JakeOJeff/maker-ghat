import StoryYears, { type YearEntry } from "./StoryYears";
import "./story-canvas.css";

type Tab = {
  label: string;
  modifier: string;
  current?: boolean;
};

const TABS: Tab[] = [
  { label: "MakerGhat story", modifier: "story", current: true },
  { label: "MakerGhat team", modifier: "team" },
  { label: "Support system", modifier: "support" },
  { label: "Volunteers & Alumni", modifier: "volunteers" },
];

/* Each year marker is a disclosure button. `content` holds the copy
   filed under that year in the Figma file, one string per paragraph;
   a year with no paragraphs renders as a plain, static marker. */
const YEARS: YearEntry[] = [
  { year: 2018, content: [] },
  { year: 2019, content: [] },
  { year: 2020, content: [] },
  { year: 2021, content: [] },
  { year: 2022, content: [] },
  { year: 2023, content: [] },
  { year: 2024, content: [] },
  { year: 2025, content: [] },
  { year: 2026, content: [] },
];

export default function StoryCanvas() {
  return (
    <section className="story" aria-labelledby="story-title">
      <div className="story__stage">
        <div className="story__panel" />

        <nav className="story-tabs" aria-label="Our story">
          <ul>
            {TABS.map((tab) => (
              <li
                className={`story-tabs__item story-tabs__item--${tab.modifier}`}
                key={tab.modifier}
              >
                <a
                  className="story-tabs__link"
                  href="#"
                  aria-current={tab.current ? "page" : undefined}
                >
                  <span className="story-tabs__label">{tab.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <h1 className="story__title" id="story-title">
          The story that built MakerGhat
        </h1>

        <figure className="story__hero">
          <img
            className="story__hero-image"
            src="/assets/hero-3d-printer.jpg"
            alt="A Bambu Lab 3D printer part-way through printing a yellow component."
            width={1281}
            height={393}
          />
        </figure>

        <figure className="story__illustration">
          <img
            className="story__illustration-image"
            src="/assets/story-illustration.jpg"
            alt="An illustrated timeline of MakerGhat from 2018 to 2026: a dashed green path winds down the page, linking photographs of students building models, running workshops, teaching in classrooms and displaying printed publications, with hand-drawn doodles of a lightbulb, scissors, a magnifying glass, a map of India and a rocket along the way."
            width={1328}
            height={3145}
            draggable={false}
          />
        </figure>

        <div className="story__section story__section--mission">
          <h2 className="story__heading">Our mission</h2>
          <p className="story__body">
            Our mission is to make hands-on, maker-centered learning accessible
            across India, empowering young people to think critically, build
            confidently, and solve real-world problems beyond traditional
            classrooms.
          </p>
        </div>

        <div className="story__section story__section--why">
          <h2 className="story__heading">Why making?</h2>
          <p className="story__body">
            Making bridges the gap between knowledge and application through
            experiential learning. It builds 21st-century skills that empowers
            our youth to become confident job-seekers and entrepreneurs.
          </p>
        </div>

        <div className="story__section story__section--how">
          <h2 className="story__heading">How did MG start</h2>
          <p className="story__body">
            MG origin story featuring founders, Lorem ipsum dolor sit amet,
            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis.
          </p>
        </div>

        <StoryYears years={YEARS} />
      </div>
    </section>
  );
}
