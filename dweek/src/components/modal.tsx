import { useState } from "react";
import { Item, People } from "./constants";
import Spinner from "./constants";

export default function Modal({ handleOnClick, currentThing }: { handleOnClick: () => void, currentThing: Item }) {
    const [interestee, setInterestee] = useState<People | null>(null)
    const [wait, setWait] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);


    async function sendEmail(currentThing: Item, interestee: People | null) {
        await new Promise(f => setTimeout(f, 2000));
        setWait(false);
        setSuccess(true)
        await new Promise(f => setTimeout(f, 2000));
        setSuccess(false)
        setInterestee(null);
    }

    const toggleInterestee = (person: People) => {
        if (person === interestee) return setInterestee(null)
        setInterestee(person)
    };

    return (
        <div className="z-10 h-screen w-screen bg-gray-300/50 flex fixed justify-center items-center top-0 left-0 right-0 font-semibold text-black">
            <div className="p-4 bg-contrast bg-white shadow rounded-lg border-2 border-black w-10/12 sm:w-8/12 h-fit md:w-6/12 lg:w-4/12 max-w-xl relative">
                <div onClick={() => handleOnClick()} className="absolute uppercase right-3 top-0 p-1 hover:cursor-pointer">x</div>
                <div className="p-2 flex w-full flex-col gap-y-3 lg:gap-y-5 place-content-center justify-around text-center">
                    <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">{currentThing.heading}</h1>
                    <div className="grid grid-cols-3 w-full lg:w-10/12 p-3 gap-3">
                        {
                            (Object.values(People) as People[]).map((person) => (
                                <button onClick={() => toggleInterestee(person)} className={`hover:cursor-pointer rounded-lg w-fit mx-auto px-3 py-1 ${interestee === person ? "bg-yellow-400" : "bg-gray-200"}`} key={person}>{person}</button>
                            ))
                        }
                    </div>
                    {
                        wait ?
                            <div className="animate-spin"><Spinner /></div>
                            :
                            <button disabled={interestee === null} onClick={
                                () => {
                                    setWait(true);
                                    sendEmail(currentThing, interestee);
                                }}
                                className={`px-2 py-1 text-xl border-2 hover:cursor-pointer w-full mx-auto border-black rounded-xl bg-accent tracking-widest disabled:opacity-50`}>
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