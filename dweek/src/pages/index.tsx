import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { useState } from "react";
import Modal from "./modal";
import PhotoSlider from "./photoSlider";
import EventModal from "./eventModal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export enum People {
  robbie = "Robbie",
  luke = "Luke",
  eilidh = "Eilidh",
  sadhil = "Sadhil",
  michael = "Michael",
  fabs = "Fabs",
  simrin = "Simrin",
  ben = "Ben"
}

export type Event = {
  date: string;
  title: string;
  description?: string;
  attendees: any;
};

export default function Home() {

  enum categories {
    livingRoom = "living room",
    kitchen = "kitchen",
    bedroom = "bedroom",
  }

  enum sections {
    event,
    stuff
  }

  const _events = [
    {
      date: "Aug 1, 2025",
      title: "Project Kickoff",
      description: "Initial planning meeting with stakeholders.",
      attendees: [
        "Ben"
      ]
    },
    {
      date: "Aug 10, 2025",
      title: "Design Review",
      description: "UI/UX walkthrough and design approval.",
      attendees: [
        "Ben"
      ]
    },
    {
      date: "Aug 20, 2025",
      title: "Development Phase Starts",
      attendees: [
        "Ben"
      ]
    },
    {
      date: "Sep 15, 2025",
      title: "Beta Release",
      description: "First round of internal testing.",
      attendees: [
        "Ben",
        "Luke"
      ]
    }
  ];

  const stuff = [
    {
      src: [
        "/images/char.jpg"
      ],
      sold: false,
      heading: "red chair innhhit",
      description: "it's IKEA okay??",
      tags: new Set<categories>([
        categories.livingRoom,
        categories.bedroom
      ])
    },
    {
      src: [
        "/images/char.jpg"
      ],
      sold: false,
      heading: "red chair innhhit",
      description: "it's IKEA okay??",
      tags: new Set<categories>([
        categories.livingRoom,
        categories.bedroom
      ])
    },
    {
      src: [
        "/images/char.jpg"
      ],
      sold: false,
      heading: "red chair innhhit",
      description: "it's IKEA okay??",
      tags: new Set<categories>([
        categories.livingRoom,
        categories.bedroom
      ])
    },
    {
      src: [
        "/images/char.jpg"
      ],
      sold: true,
      heading: "red chair innhhit",
      description: "it's IKEA okay??",
      tags: new Set<categories>([
        categories.livingRoom,
        categories.bedroom
      ])
    },
  ]

  const [filterTags, setFilterTags] = useState<Set<categories>>(new Set());
  const [currentSection, setCurrentSection] = useState(sections.event);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [currentThing, setCurrentThing] = useState({})
  const [currentEvent, setEvent] = useState({})
  const [events, setEvents] = useState(_events)

  const handleOnClick = () => {
    setIsModalOpen(false);
  }

  const handleEventOnClick = () => {
    setIsEventModalOpen(false);
  }


  const toggleTag = (tag: categories) => {
    setFilterTags(prev => {
      const next = new Set(prev);
      if (next.has(tag)) {
        next.delete(tag);
      } else {
        next.add(tag);
      }
      return next;
    });
  };

  return (
    <div
      className={`${geistSans.className} ${geistMono.className} overflow-y-auto font-sans grid bg-gray-300 grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 sm:pt-10`}
    >
      <main className="flex flex-col w-full h-full max-w-3xl">
        <div className="bg-gray-100 p-10 rounded-2xl shadow-lg text-center mx-auto mb-5 mt-2">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">We going to Copenhagen!</h1>
          <p className="text-lg text-gray-700 mb-6">
            Discover amazing features, connect with others, and explore new possibilities.
          </p>
        </div>
        <div className="flex justify-center bg-gray-200 rounded-lg rounded-b-none w-full space-x-3 p-2">
          <button className={`p-2 hover:-translate-y-1 hover:bg-gray-400 w-1/2 rounded-lg ${currentSection == sections.event ? "bg-white border-2 border-yellow-300" : "bg-gray-100"}`} onClick={() => setCurrentSection(sections.event)}>events</button>
          <button className={`p-2 hover:-translate-y-1 hover:bg-gray-400 w-1/2 rounded-lg ${currentSection == sections.stuff ? "bg-white border-2 border-yellow-300" : "bg-gray-100"}`} onClick={() => setCurrentSection(sections.stuff)}>stuff</button>
        </div>
        <div className={`pb-10 ${currentSection === sections.event ? "block" : "hidden"}`}>
          <div className="relative pl-6 pt-6">
            <div className="absolute top-0 left-0 w-1 bg-gray-900 h-full rounded"></div>
            {events.map((event, index) => (
              <div key={index} className="relative mb-10">
                <div className="absolute left-[-1.8rem] top-1.5 w-3 h-3 bg-yellow-300 rounded-full z-10 border-2 shadow" />
                <div className="ml-2">
                  <p className="text-sm text-gray-500 font-medium">{event.date}</p>
                  <h3 className="text-lg font-semibold text-gray-800">{event.title}</h3>
                  {event.description && (
                    <div>
                      <p className="text-gray-600 mt-1">{event.description}</p>
                      <div className="py-1 space-x-2 flex">
                        {
                          event.attendees.map((person) => (
                            <p className="bg-yellow-300 rounded-lg px-1 border-2">{person}</p>
                          ))
                        }
                      </div>
                      <button onClick={() => { setEvent(event); setIsEventModalOpen(true) }} className="mx-auto w-full p-2 bg-gray-200 rounded-lg mt-2 hover:bg-gray-300">sign me up</button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={`pb-10 ${currentSection === sections.stuff ? "block" : "hidden"}`}>
          <div className="flex justify-around w-full my-3">
            {
              Object.values(categories).map((category) => (
                <button onClick={() => toggleTag(category)} className={`rounded-lg p-1.5 bg-gray-200 ${filterTags.has(category) ? "bg-white border-2 border-yellow-300" : "border-2"}`} key={category}>{category}</button>
              ))
            }
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 lg:grid-cols-3">
            {
              stuff
                .filter(el => {
                  if (filterTags.size === 0) return true;

                  return [...el.tags].some(tag => filterTags.has(tag))
                })
                .map((el: any) => (
                  <div className="pb-2 w-full text-black">
                    <div className="flex flex-col">
                      <PhotoSlider photos={el.src} sold={el.sold} />
                      <div id="body" className="bg-gray-100 rounded-b-lg p-1 px-2 border-2 border-gray-500 flex flex-col space-y-2">
                        <p className="text-center text-xl mb-3 mt-1">{el.heading}</p>
                        <div className="flex space-x-3">
                          {
                            [...el.tags].map((tag: categories) => {
                              return (
                                <div className="bg-yellow-200 text-sm w-fit px-1 rounded-lg border-2 border-gray-300">{tag}</div>)
                            })
                          }
                        </div>
                        <div className="border-2 border-gray-200 bg-white p-1 pt-0 overflow-y-auto rounded-lg min-h-[50px] max-h-[100px]">
                          {el.description}
                        </div>
                        <button disabled={el.sold} onClick={() => { setIsModalOpen(true); setCurrentThing(el) }} className="disabled:opacity-50 bg-gray-200 text-lg rounded-lg border-2 border-gray-300 hover:bg-gray-300">
                          {
                            el.sold ?
                              "taken innit"
                              :
                              "gimme"
                          }
                        </button>
                      </div>
                    </div>
                  </div>
                ))
            }
          </div>
        </div>
        {
          isModalOpen && <Modal handleOnClick={handleOnClick} currentThing={currentThing} people={People} />
        }
        {
          isEventModalOpen && <EventModal events={events} setEvents={setEvents} handleOnClick={handleEventOnClick} currentEvent={currentEvent} />
        }
      </main>
    </div>
  );
}
