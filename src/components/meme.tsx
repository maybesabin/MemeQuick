"use client"

import { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"
import MemePreview from "./meme-preview"
import UploadMeme from "./upload-meme"
import { text } from "@/types/text"

interface MemeData {
    name: string;
    url: string;
}

interface MemeProps {
    selectedMeme?: MemeData | null;
}

const Meme = ({ selectedMeme }: MemeProps) => {
    const memeRef = useRef<HTMLDivElement>(null);
    const [image, setImage] = useState<string | null>(null)
    const [text, setText] = useState<text>({
        // Top Text Properties
        topText: "",
        topTextColor: "#ffffff",
        topStrokeColor: "#000000",
        topStrokeWidth: 0.5,
        topTextFontSize: "32px",
        topPosXPercent: 50,
        topPosYPercent: 6,
        topTextOpacity: 100,
        topLetterSpacing: 0,

        // Bottom Text Properties
        bottomText: "",
        bottomTextColor: "#ffffff",
        bottomStrokeColor: "#000000",
        bottomStrokeWidth: 0.5,
        bottomTextFontSize: "32px",
        bottomPosXPercent: 50,
        bottomPosYPercent: 94,
        bottomTextOpacity: 100,
        bottomLetterSpacing: 0
    })

    // Set the image when selectedMeme changes
    useEffect(() => {
        if (selectedMeme?.url) {
            setImage(selectedMeme.url);
        }
    }, [selectedMeme?.url]);



    return (
        <>
            <motion.h1
                initial={{ y: 20, opacity: 0, filter: "blur(10px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="md:text-2xl text-base font-medium"
            >
                {selectedMeme ? `${selectedMeme.name}` : "Make Memes. Quickly."}
            </motion.h1>

            <motion.div
                initial={{ y: 20, opacity: 0, filter: "blur(10px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
                className="2xl:w-1/2 xl:w-[75%] w-full text-neutral-300 flex lg:flex-row flex-col lg:items-start items-center gap-8 bg-neutral-900/80 rounded-2xl px-4 py-6"
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