"use client";

import { type CSSProperties, useState } from "react";

/* Figma files each year's copy in a frame of its own, filed under the
   year marker: eight are bulleted lists, 2026 is a plain paragraph. */
type YearBase = {
  year: number;
  /* The photograph cut back out of the illustration for that year.
     Rendered only in the linear layout below 1200px, where the
     illustration itself cannot be used; its intrinsic size is given
     so the column reserves the right space before it loads. */
  photo: { alt: string; width: number; height: number };
};

export type YearEntry = YearBase &
  ({ kind: "list"; items: string[] } | { kind: "note"; text: string });

type Props = {
  years: YearEntry[];
};

export default function StoryYears({ years }: Props) {
  const [openYear, setOpenYear] = useState<number | null>(null);

  return (
    <ul className="story-years">
      {years.map((entry) => {
        const { year } = entry;
        const isOpen = openYear === year;

        return (
          <li
            className={`story-years__item story-years__item--y${year}${
              isOpen ? " story-years__item--open" : ""
            }`}
            key={year}
          >
            <img
              className="story-years__photo"
              src={`/assets/story/y${year}.jpg`}
              alt={entry.photo.alt}
              width={entry.photo.width}
              height={entry.photo.height}
              style={
                { "--photo-w": `${entry.photo.width}px` } as CSSProperties
              }
              loading="lazy"
            />

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
              <div className="story-years__clip">
                <div className="story-years__body">
                  {entry.kind === "list" ? (
                    <ul className="story-years__list">
                      {entry.items.map((item, index) => (
                        <li className="story-years__bullet" key={index}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="story-years__note">{entry.text}</p>
                  )}
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
