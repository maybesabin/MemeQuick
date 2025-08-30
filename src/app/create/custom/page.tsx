"use client"

import Meme from "@/components/meme"
import { useMemeContext } from "@/app/contexts/meme-context";

const CustomPage = () => {
    const { selectedMeme } = useMemeContext();

    return (
        <div className="flex flex-col items-center h-[90svh] gap-4 justify-center overflow-y-auto">
            <Meme selectedMeme={selectedMeme} />
        </div>
    )
}

export default CustomPage