import { useEffect, useState } from "react";
import EventModal from "./eventModal";
import { Event } from "./constants";


export default function Events({ events }: { events: Event[] }) {
    const [isEventModalOpen, setIsEventModalOpen] = useState(false);
    const [allEvents, setAllEvents] = useState(events)
    const [currentEvent, setCurrentEvent] = useState(events[0])

    useEffect(() => {
        setAllEvents(events)
    }, [events])


    const handleEventOnClick = () => {
        setIsEventModalOpen(false);
    }

    return (
        <div className={`pb-20`}>
            <div className="relative pl-6 pt-6">
                <div className="absolute top-0 left-0 w-1 bg-gray-900 h-full rounded"></div>
                {allEvents.map((event: Event, index: number) => (
                    <div key={index} className="relative mb-10">
                        <div className="absolute left-[-1.8rem] top-1.5 w-3 h-3 bg-yellow-300 rounded-full z-10 border-2 shadow" />
                        <div className="ml-2">
                            <p className="text-sm text-gray-500 font-medium">{new Date(event.date).toLocaleDateString('en-US', {
                                month: 'short',  // 'Aug'
                                day: 'numeric',  // '1'
                                year: 'numeric'  // '2025'
                            })}</p>
                            <h3 className="text-lg font-semibold text-gray-800">{event.title}</h3>
                            {
                                <div>
                                    <p className="text-gray-600 mt-1">{event.description}</p>
                                    <div className="py-1 space-x-2 flex flex-wrap gap-y-1">
                                        {
                                            event.attendees.map((person) => (
                                                <p key={person} className="bg-yellow-300 rounded-lg px-1 border-2">{person}</p>
                                            ))
                                        }
                                    </div>
                                    <button onClick={() => { setCurrentEvent(event); setIsEventModalOpen(true) }} className="mx-auto w-full p-2 bg-gray-200 rounded-lg mt-2 hover:bg-gray-400 hover:cursor-pointer border-2">sign me up</button>
                                </div>
                            }
                        </div>
                    </div>
                ))}
            </div>
            {
                isEventModalOpen && <EventModal setEvents={setAllEvents} handleOnClick={handleEventOnClick} currentEvent={currentEvent} />
            }
        </div>
    )
}