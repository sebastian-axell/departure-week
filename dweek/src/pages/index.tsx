import { Geist, Geist_Mono } from "next/font/google";
import { useEffect, useState } from "react";
import Stuff from "../components/stuff";
import Events from "../components/events";
import JumboTron from "../components/JumboTron";
import Spinner, { Event, People, Sections, Categories, Item, BASE_URL } from "../components/constants";
import axios from "axios";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {

  const [events, setEvents] = useState<Event[]>([])
  const [stuff, setStuff] = useState<Item[]>([])
  const [currentSection, setCurrentSection] = useState<Sections>(Sections.event);

  const parseEvents = (events: Event[]) => {
    return events.map((event): Event => (
      {
        ...event,
        attendees: event.attendees == null ? [] : event.attendees.map((attendee: string) => attendee as People)
      }
    ))
  }

  const parseStuff = (stuffs: Item[]) => {
    return stuffs.map((item): Item => (
      {
        ...item,
        tags: item.tags == null ? new Set<Categories>() : new Set<Categories>(Array.from(item.tags).map((tag: string) => tag as Categories))
      }
    ))
  }

  useEffect(() => {
    const fetchData = async () => {
      const res_event: Event[] = (await axios.get(BASE_URL + '/events')).data;
      const res_stuff: Item[] = (await axios.get(BASE_URL + '/stuff')).data;

      setStuff(parseStuff(res_stuff))
      setEvents(parseEvents(res_event))
    }
    fetchData();
  }, [])

  return (
    <div
      className={`${geistSans.className} ${geistMono.className} overflow-x-hidden flex font-sans grid bg-gray-300 grid-rows-[20px_1fr_20px] text-black items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 sm:pt-10`}
    >
      <main className="flex flex-col w-full h-full max-w-3xl">
        <JumboTron />
        <div className="flex justify-center bg-gray-200 rounded-lg rounded-b-none w-full space-x-3 p-2">
          <button className={`p-2 hover:cursor-pointer hover:-translate-y-1 hover:bg-gray-400 w-1/2 rounded-lg ${currentSection == Sections.event ? "bg-white border-2 border-yellow-300" : "bg-gray-100"}`} onClick={() => setCurrentSection(Sections.event)}>events</button>
          <button className={`p-2 hover:cursor-pointer hover:-translate-y-1 hover:bg-gray-400 w-1/2 rounded-lg ${currentSection == Sections.stuff ? "bg-white border-2 border-yellow-300" : "bg-gray-100"}`} onClick={() => setCurrentSection(Sections.stuff)}>stuff</button>
        </div>
        <div className={`${currentSection === Sections.event ? "block" : "hidden"}`}>
          {
            events.length === 0 ?
              <div className="mt-5">
                <Spinner />
              </div>
              :
              <Events events={events} />
          }
        </div>
        <div className={`${currentSection === Sections.stuff ? "block" : "hidden"}`}>
          {
            stuff.length === 0 ?
              <div className="mt-5">
                <Spinner />
              </div>
              :
              <Stuff stuff={stuff} />
          }
        </div>
      </main>
    </div>
  );
}
