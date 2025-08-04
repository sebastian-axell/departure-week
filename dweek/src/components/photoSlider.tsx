import Image from "next/image"
import { useState } from "react"

export default function PhotoSlider({ photos, sold }: { photos: string[], sold: boolean }) {
    const [current, setCurrent] = useState<number>(0);

    return (
        <div className="relative">
            {
                photos.map((photo, index: number) => (
                    <Image
                        className={`
                            ${index == current ? "block" : "hidden"}
                            ${sold ? "opacity-50" : ""}
                            rounded-t-lg w-full bg-accent border-b-0 border-2 border-black`}
                        src={photo}
                        key={photo}
                        alt="Description"
                        width={400}           // Required
                        height={400}          // Required
                        priority              // Optional: preload this image
                    />
                ))
            }
            <div className="absolute flex space-x-3 left-0 right-0 justify-center bottom-3">
                {
                    photos.length > 1 &&
                    photos.map((_: string, index: number) => (
                        <p key={index} onClick={() => setCurrent(index)} className={`size-6 ${index == current ? "bg-yellow-300" : "bg-gray-100"} border-1 rounded-full text-center`}>{index + 1}</p>
                    ))
                }
            </div>
        </div>
    )
}