import type { CSSProperties } from "react";

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
  {
    year: 2018,
    photo: {
      alt: "Young people seated on the floor of a workshop while an instructor talks them through a build.",
      width: 296,
      height: 224,
    },
    kind: "list",
    items: ["MakerGhat launches its first makerspace in Powai, Mumbai"],
  },
  {
    year: 2019,
    photo: {
      alt: "A desktop 3D printer on a workbench beside a row of freshly printed parts.",
      width: 320,
      height: 152,
    },
    kind: "list",
    items: [
      "We secure our first institutional grant to expand maker-education",
      "We receive our first individual grant to grow the program to 3 schools",
    ],
  },
  {
    year: 2020,
    photo: {
      alt: "Students in school uniform kneeling together over a shared task, comparing notes.",
      width: 272,
      height: 224,
    },
    kind: "list",
    items: [
      "We respond to COVID with recovery-focused education initiatives",
      "We launched virtual programs with VIDYA and Agastya Foundations",
      "We opened a second makerspace in Thane",
    ],
  },
  {
    year: 2021,
    photo: {
      alt: "A student cutting a strip of card, with a green map of India behind her.",
      width: 168,
      height: 240,
    },
    kind: "list",
    items: [
      "We expanded maker-education programs to Tamil Nadu",
      "We partnered with the JSW Foundation for our first CSR-led programs (the Museum of Solutions, Mumbai)",
    ],
  },
  {
    year: 2022,
    photo: {
      alt: "Students working together at a desk on a hands-on activity.",
      width: 264,
      height: 200,
    },
    kind: "list",
    items: ["We launched statewide programs in Odisha"],
  },
  {
    year: 2023,
    photo: {
      alt: "Students at a table holding up the piece they have just made.",
      width: 288,
      height: 184,
    },
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
    photo: {
      alt: "A large cohort photographed together in front of a summit banner.",
      width: 336,
      height: 200,
    },
    kind: "list",
    items: [
      "We launched our first IGNITE incubator cohort for young innovators across rural Tamil Nadu",
    ],
  },
  {
    year: 2025,
    photo: {
      alt: "A teacher addressing a class of seated students in a school hall.",
      width: 368,
      height: 328,
    },
    kind: "list",
    items: [
      "We became anchors for the pan-India STEM initiative under the Shikshagraha movement",
      "We launched the MakerGaon Fellowship in rural Maharashtra",
      "We launched a district-wide Nashik program with 12 high-end makerspaces",
    ],
  },
  {
    year: 2026,
    photo: {
      alt: "An open copy of The Discovery Diary, MakerGhat’s at-home learning publication.",
      width: 288,
      height: 216,
    },
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
            loading="lazy"
            draggable={false}
          />
        </figure>

        <div className="story__section story__section--mission">
          <img
            className="story__section-photo"
            src="/assets/story/mission.jpg"
            style={{ "--photo-w": "272px" } as CSSProperties }
            alt="Students steadying a tall metal tower they have built together."
            width={272}
            height={168}
            loading="lazy"
          />
          <h2 className="story__heading">Our mission</h2>
          <p className="story__body">
            Our mission is to make hands-on, maker-centered learning accessible
            across India, empowering young people to think critically, build
            confidently, and solve real-world problems beyond traditional
            classrooms.
          </p>
        </div>

        <div className="story__section story__section--why">
          <img
            className="story__section-photo"
            src="/assets/story/why.jpg"
            style={{ "--photo-w": "344px" } as CSSProperties }
            alt="A row of schoolgirls in uniform presenting a model they have made."
            width={344}
            height={216}
            loading="lazy"
          />
          <h2 className="story__heading">Why making?</h2>
          <p className="story__body">
            Making bridges the gap between knowledge and application through
            experiential learning. It builds 21st-century skills that empowers
            our youth to become confident job-seekers and entrepreneurs.
          </p>
        </div>

        <div className="story__section story__section--how">
          <img
            className="story__section-photo"
            src="/assets/story/how.jpg"
            style={{ "--photo-w": "584px" } as CSSProperties }
            alt="The MakerGhat team and their partners photographed together in a hall."
            width={584}
            height={400}
            loading="lazy"
          />
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
