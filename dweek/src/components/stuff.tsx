import { useState } from "react";
import { Categories, Item } from "./constants";
import PhotoSlider from "./photoSlider";
import Modal from "./modal";


export default function Stuff({ stuff }: { stuff: Item[] }) {
    const [filterTags, setFilterTags] = useState<Set<Categories>>(new Set());
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentThing, setCurrentThing] = useState(stuff[0])
    
    const toggleTag = (tag: Categories) => {
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

    const handleOnClick = () => {
        setIsModalOpen(false);
    }

    return (
        <div className={`pb-20`}>
            <div className="flex justify-around w-full my-3">
                {
                    Object.values(Categories).map((category) => (
                        <button onClick={() => toggleTag(category)} className={`hover:cursor-pointer rounded-lg p-1.5 lg:w-1/4 bg-gray-200 ${filterTags.has(category) ? "bg-white border-2 border-yellow-300" : "border-2"}`} key={category}>{category}</button>
                    ))
                }
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 md:grid-cols-3">
                {
                    stuff
                        .filter((el: Item) => {
                            if (filterTags.size === 0) return true;

                            return [...el.tags].some(tag => filterTags.has(tag))
                        })
                        .map((el: Item, index: number) => (
                            <div key={el.heading + index} className="pb-2 w-full max-w-sm mx-auto text-black">
                                <div className="flex flex-col">
                                    <PhotoSlider photos={el.src} sold={el.sold} />
                                    <div id="body" className="bg-gray-100 rounded-b-lg p-1 px-2 border-2 flex flex-col space-y-2">
                                        <p className="text-center mb-3 mt-1 text-xl sm:min-h-[56px] flex items-center justify-center">{el.heading}</p>
                                        <div className="flex space-x-3 lg:space-x-2">
                                            {
                                                [...el.tags].map((tag: Categories) => {
                                                    return (
                                                        <div key={tag} className="bg-yellow-200 text-sm lg:text-xs w-fit px-1 truncate rounded-lg border-1">{tag}</div>)
                                                })
                                            }
                                        </div>
                                        <div className="border-2 border-gray-200 bg-white p-1 pt-0 rounded-lg break-words overflow-y-auto min-h-[50px] max-h-[300px] sm:min-h-[80px] sm:max-h-[80px] whitespace-pre-wrap">
                                            {el.description}
                                        </div>
                                        <button disabled={el.sold} onClick={() => { setIsModalOpen(true); setCurrentThing(el) }} className="disabled:opacity-50 disabled:cursor-not-allowed cursor-grabbing bg-gray-200 text-lg rounded-lg border-2 hover:bg-gray-300">
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
            {
                isModalOpen && <Modal handleOnClick={handleOnClick} currentThing={currentThing} />
            }
        </div>
    )
}