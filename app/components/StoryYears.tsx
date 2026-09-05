"use client";

import { useState } from "react";

export type YearEntry = {
  year: number;
  /* The copy filed under that year in the Figma file, one string per
     paragraph. */
  content: string[];
};

type Props = {
  years: YearEntry[];
};

export default function StoryYears({ years }: Props) {
  const [openYear, setOpenYear] = useState<number | null>(null);

  return (
    <ul className="story-years">
      {years.map(({ year, content }) => {
        const isOpen = openYear === year;

        return (
          <li
            className={`story-years__item story-years__item--y${year}${
              isOpen ? " story-years__item--open" : ""
            }`}
            key={year}
          >
            <button
              className="story-years__marker"
              type="button"
              aria-expanded={isOpen}
              aria-controls={`story-year-panel-${year}`}
              onClick={() => setOpenYear(isOpen ? null : year)}
            >
              <span className="story-years__value">{year}</span>
              <img
                className="story-years__chevron"
                src="/assets/chevron-year.svg"
                alt=""
                aria-hidden="true"
                width={24}
                height={24}
              />
              <span className="story-years__sr">
                {isOpen ? "Hide" : "Show"} what happened in {year}
              </span>
            </button>

            <div
              className={`story-years__panel${
                isOpen ? " story-years__panel--open" : ""
              }`}
              id={`story-year-panel-${year}`}
            >
              <div className="story-years__body">
                {content.map((paragraph, index) => (
                  <p className="story-years__text" key={index}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
