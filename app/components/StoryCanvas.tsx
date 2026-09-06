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

/* Each year marker is a disclosure button; the copy is the frame
   filed under that year in Figma (Frame 1114 - 1133). 2026 is set as
   a plain paragraph there, the rest as bulleted lists. */
const YEARS: YearEntry[] = [
  { year: 2018, kind: "list", items: [] },
  {
    year: 2019,
    kind: "list",
    items: [
      "We secure our first institutional grant to expand maker-education",
      "We receive our first individual grant to grow the program to 3 schools",
    ],
  },
  {
    year: 2020,
    kind: "list",
    items: [
      "We respond to COVID with recovery-focused education initiatives",
      "We launched virtual programs with VIDYA and Agastya Foundations",
      "We opened a second makerspace in Thane",
    ],
  },
  {
    year: 2021,
    kind: "list",
    items: [
      "We expanded maker-education programs to Tamil Nadu",
      "We partnered with the JSW Foundation for our first CSR-led programs (the Museum of Solutions, Mumbai)",
    ],
  },
  {
    year: 2022,
    kind: "list",
    items: ["We launched statewide programs in Odisha"],
  },
  {
    year: 2023,
    kind: "list",
    items: [
      "We became official curriculum partner for NITI Aayog’s Atal Tinkering Labs (ATLs)",
      "We opened makerspaces across districts in Tamil Nadu & Karnataka",
      "We launched a new program with the Piramal Foundation in Jhunjhunu, Rajasthan",
      "We developed & launched our 3-levels tinkering curriculum & EdApp LMS across all 10,000+ ATLs in India",
    ],
  },
  {
    year: 2024,
    kind: "list",
    items: [
      "We launched our first IGNITE incubator cohort for young innovators across rural Tamil Nadu",
    ],
  },
  {
    year: 2025,
    kind: "list",
    items: [
      "We became anchors for the pan-India STEM initiative under the Shikshagraha movement",
      "We launched the MakerGaon Fellowship in rural Maharashtra",
      "We launched a district-wide Nashik program with 12 high-end makerspaces",
    ],
  },
  {
    year: 2026,
    kind: "note",
    text: "We published the Discovery Diary, our first at-home intervention for hands-on learning for children",
  },
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
