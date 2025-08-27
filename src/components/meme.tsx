"use client"

import { useRef, useState } from "react"
import { motion } from "framer-motion"
import MemePreview from "./meme-preview"
import UploadMeme from "./upload-meme"
import { text } from "@/types/text"

const Meme = () => {
    const memeRef = useRef<HTMLDivElement>(null);
    const [image, setImage] = useState<string | null>(null)
    const [text, setText] = useState<text>({
        topTextColor: "#FFF",
        bottomTextColor: "#FFF",
        topText: "",
        bottomText: "",
        topStrokeWidth: 0.5,
        bottomStrokeWidth: 0.5,
        topTextFontSize: "32px",
        bottomTextFontSize: "32px",
        topPosXPercent: 50,
        topPosYPercent: 6,
        bottomPosXPercent: 50,
        bottomPosYPercent: 94,
        topTextOpacity: 100,
        bottomTextOpacity: 100,
        topLetterSpacing: 0,
        bottomLetterSpacing: 0
    })

    return (
        <>
            <motion.h1
                initial={{ y: 20, opacity: 0, filter: "blur(10px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-2xl font-medium"
            >
                Make Memes. Quickly.
            </motion.h1>

            <motion.div
                initial={{ y: 20, opacity: 0, filter: "blur(10px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
                className="2xl:w-1/2 xl:w-[75%] w-[95%] text-neutral-300 flex lg:flex-row flex-col lg:items-start items-center gap-8 bg-neutral-900/80 rounded-2xl px-4 py-6"
            >
                <UploadMeme
                    image={image}
                    setImage={setImage}
                    text={text}
                    setText={setText}
                    memeRef={memeRef}
                />

                <MemePreview
                    image={image}
                    memeRef={memeRef}
                    text={text}
                />
            </motion.div>
        </>
    )
}

export default Meme