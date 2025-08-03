import Image from "next/image"
import { useState } from "react"

export default function PhotoSlider({ photos, sold }: { photos: any, sold: boolean }) {
    const [current, setCurrent] = useState<Number>(0);
    
    return (
        <div className="relative">
            {
                photos.map((photo: any, index: number) => (
                    <Image
                        className={`
                            ${index == current ? "block" : "hidden"}
                            ${sold ? "opacity-50" : ""}
                            rounded-t-lg w-full bg-accent border-[3px] border-b-0 border-gray-500`}
                        src={photo}
                        alt="Description"
                        width={400}           // Required
                        height={400}          // Required
                        priority              // Optional: preload this image
                    />
                ))
            }
            <div className="absolute flex space-x-3 left-0 right-0 justify-center bottom-3">
                {
                    photos.length > 1 && !sold &&
                    photos.map((_: any, index: number) => (
                        <p onClick={()=> setCurrent(index)} className={`size-6 ${index == current ? "bg-yellow-300" : "bg-gray-100"} border-1 rounded-full text-center`}>{index+1}</p>
                    ))
                }
            </div>
        </div>
    )
}