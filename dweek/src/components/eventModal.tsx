import { useState } from "react";
import { BASE_URL, Event, People } from "./constants";
import Spinner from "./constants";
import axios from "axios";

export default function EventModal({ handleOnClick: closeModal, currentEvent, setEvents }: { handleOnClick: () => void, currentEvent: Event, setEvents: React.Dispatch<React.SetStateAction<Event[]>> }) {
    const [interestee, setInterestee] = useState<People | null>(null)
    const [wait, setWait] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [attendees, setAttendees] = useState(currentEvent.attendees)
    const [buttonDisabled, setButtonDisabled] = useState(true)

    async function updateEvent() {
        currentEvent = {
            ...currentEvent,
            attendees: attendees
        }
        await axios.post(BASE_URL + "/events", currentEvent);
        setWait(false);
        setSuccess(true)
        setEvents((prevEvents: Event[]) => [
            currentEvent,
            ...prevEvents.filter((e: Event) => e.title !== currentEvent.title)
        ].sort((a, b) => a.date.localeCompare(b.date))
        );
        setInterestee(null);
        await new Promise(f => setTimeout(f, 2000));
        setButtonDisabled(true);
        setSuccess(false)
        closeModal()
    }

    const toggleInterestee = (person: People) => {
        const isSamePerson = person === interestee;
        const isAttending = attendees.includes(person);
        if (isSamePerson) {
            setButtonDisabled(true);
            setAttendees(attendees.filter((p) => p !== person));
            setInterestee(null);
        } else if (isAttending) {
            const updatedAttendees = attendees.filter((p) => p !== person);
            setAttendees(updatedAttendees);
            setButtonDisabled(false);
        } else {
            setAttendees(
                [
                    ...attendees,
                    person
                ]
            )
            setInterestee(person);
            setButtonDisabled(false);
        }
    };

    return (
        <div className="z-10 h-screen w-screen bg-gray-300/50 flex fixed justify-center items-center -top-8 left-0 right-0 font-semibold text-black">
            <div className="p-4 bg-contrast bg-white shadow rounded-lg border-2 border-black w-10/12 sm:w-8/12 h-fit md:w-6/12 lg:w-4/12 max-w-xl relative">
                <div onClick={() => closeModal()} className="absolute uppercase hover:cursor-pointer right-3 top-0 p-1">x</div>
                <div className="p-2 flex w-full flex-col gap-y-3 lg:gap-y-5 place-content-center justify-around text-center">
                    <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">{currentEvent.title}</h1>
                    <p className="text-sm text-gray-500 font-medium">{currentEvent.date}</p>
                    {
                        <div>
                            <p className="text-gray-600 mt-1 whitespace-pre-wrap break-words max-h-[400px] overflow-y-auto">{currentEvent.description}</p>
                        </div>
                    }
                    <div className="grid grid-cols-3 w-full lg:w-10/12 p-3 gap-3">
                        {
                            (Object.values(People) as People[]).map((person) => (
                                <button onClick={() => toggleInterestee(person)}
                                    className={`rounded-lg w-fit mx-auto hover:cursor-pointer px-3 py-1 ${(interestee === person || attendees.indexOf(person) > -1) ? "bg-yellow-400" : "bg-gray-200"}`} key={person}>{person}</button>
                            ))
                        }
                    </div>
                    {
                        wait ?
                            <div className="animate-spin"><Spinner /></div>
                            :
                            <button disabled={buttonDisabled} onClick={
                                () => {
                                    setWait(true);
                                    updateEvent();
                                }}
                                className={`${success ? "bg-yellow-300" : ""} px-2 hover:cursor-pointer disabled:cursor-not-allowed py-1 text-xl border-2 w-full mx-auto border-black rounded-xl bg-accent tracking-widest disabled:opacity-50`}>
                                {
                                    success ?
                                        "interest sent!"
                                        :
                                        "submit interest"
                                }
                            </button>
                    }
                </div>
            </div>
        </div>
    )
}