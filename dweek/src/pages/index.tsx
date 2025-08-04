import { Geist, Geist_Mono } from "next/font/google";
import { useState } from "react";
import Stuff from "../components/stuff";
import Events from "../components/events";
import JumboTron from "../components/JumboTron";
import { Event, People, Sections, Categories, Item } from "../components/constants";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {

  const _events: Event[] = [
    {
      date: "Aug 1, 2025",
      title: "Project Kickoff",
      description: "Initial planning meeting with stakeholders.",
      attendees: [
      ]
    },
    {
      date: "Aug 10, 2025",
      title: "Design Review",
      description: "UI/UX walkthrough and design approval.",
      attendees: [
      ]
    },
    {
      date: "Aug 20, 2025",
      title: "Development Phase Starts",
      description: "Initial planning meeting with stakeholders.",
      attendees: [
      ]
    },
    {
      date: "Sep 15, 2025",
      title: "Beta Release",
      description: "First round of internal testing.",
      attendees: [
      ]
    }
  ];

  const stuff: Item[] = [
    {
      src: [
        "/images/char.jpg"
      ],
      sold: false,
      heading: "red chair innhhit",
      description: "it's IKEA okay??",
      tags: new Set<Categories>([
        Categories.livingRoom,
        Categories.bedroom
      ])
    },
    {
      src: [
        "/images/char.jpg"
      ],
      sold: false,
      heading: "red chair innhhit",
      description: "it's IKEA okay??",
      tags: new Set<Categories>([
        Categories.livingRoom,
        Categories.bedroom
      ])
    },
    {
      src: [
        "/images/char.jpg",
      ],
      sold: false,
      heading: "red chair innhhit",
      description: "it's IKEA okay??",
      tags: new Set<Categories>([
        Categories.livingRoom,
        Categories.bedroom
      ])
    },
    {
      src: [
        "/images/char.jpg",
        "/images/char.jpg",
      ],
      sold: true,
      heading: "red chair innhhit",
      description: "it's IKEA okay??",
      tags: new Set<Categories>([
        Categories.livingRoom,
        Categories.bedroom
      ])
    },
  ]

  const parseEvents = (events: Event[]) => {
    return events.map((event): Event => (
      {
        ...event,
        attendees: event.attendees.map((attendee: string) => attendee as People)
      }
    ))
  }

  const [currentSection, setCurrentSection] = useState<Sections>(Sections.event);

  return (
    <div
      className={`${geistSans.className} ${geistMono.className} overflow-y-auto font-sans grid bg-gray-300 grid-rows-[20px_1fr_20px] text-black items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 sm:pt-10`}
    >
      <main className="flex flex-col w-full h-full max-w-3xl">
        <JumboTron />
        <div className="flex justify-center bg-gray-200 rounded-lg rounded-b-none w-full space-x-3 p-2">
          <button className={`p-2 hover:-translate-y-1 hover:bg-gray-400 w-1/2 rounded-lg ${currentSection == Sections.event ? "bg-white border-2 border-yellow-300" : "bg-gray-100"}`} onClick={() => setCurrentSection(Sections.event)}>events</button>
          <button className={`p-2 hover:-translate-y-1 hover:bg-gray-400 w-1/2 rounded-lg ${currentSection == Sections.stuff ? "bg-white border-2 border-yellow-300" : "bg-gray-100"}`} onClick={() => setCurrentSection(Sections.stuff)}>stuff</button>
        </div>
        <div className={`${currentSection === Sections.event ? "block" : "hidden"}`}>
          <Events events={parseEvents(_events)} />
        </div>
        <div className={`${currentSection === Sections.stuff ? "block" : "hidden"}`}>
          <Stuff stuff={stuff} />
        </div>
      </main>
    </div>
  );
}
