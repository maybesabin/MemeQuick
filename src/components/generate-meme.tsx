"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useRef, useState } from "react"
import { toPng } from 'html-to-image'

const GenerateMeme = () => {
    const memeRef = useRef<HTMLDivElement>(null);
    const [image, setImage] = useState<string | null>(null)
    const [text, setText] = useState({
        topText: "",
        bottomText: ""
    })
    const [fadeIn, setFadeIn] = useState(false);

    useEffect(() => {
        setFadeIn(true);
        window.scrollTo(0, 0)
    }, []);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setImage(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const downloadMeme = async () => {
        if (!memeRef.current || !image) return;

        try {
            const formatText = (str: string) => str.trim().replace(/\s+/g, '-');
            const top = text.topText ? formatText(text.topText) : 'top';
            const bottom = text.bottomText ? formatText(text.bottomText) : 'bottom';
            const fileName = `${top}-${bottom}.png`;

            const dataUrl = await toPng(memeRef.current, {
                quality: 1.0,
                backgroundColor: 'transparent'
            });

            const link = document.createElement("a");
            link.download = fileName;
            link.href = dataUrl;
            link.click();
        } catch (error) {
            console.error('Error generating meme:', error);
        }
    };

    return (
        <>
            <h1 className={`text-2xl font-medium transition-all duration-600 ease-in-out ${fadeIn ? 'translate-y-0 opacity-100 blur-none' : 'translate-y-10 opacity-0 blur-xl'}`}>
                Make Memes. Quickly.
            </h1>
            <div className={`2xl:w-1/2 xl:w-[75%] w-[95%] text-neutral-300 flex lg:flex-row flex-col lg:items-start items-center gap-8 bg-neutral-900/80 rounded-2xl px-4 py-6 duration-600 delay-500 ease-in-out ${fadeIn ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 blur-xl'}`}>
                <div className="lg:w-2/5 w-full flex flex-col items-start gap-3">
                    <>
                        <Label htmlFor="imageUpload" className="md:text-sm text-xs">
                            Upload Image
                        </Label>
                        <Input
                            onChange={handleImageUpload}
                            name="imageUpload"
                            className="file:text-white md:text-sm text-xs"
                            type="file"
                        />
                    </>

                    <>
                        <Label htmlFor="imageUpload" className="mt-5 md:text-sm text-xs">
                            Add Your Text
                        </Label>
                        <Input
                            value={text.topText}
                            onChange={(e) => setText({ ...text, topText: e.target.value })}
                            placeholder="Enter Top Text..."
                            name="imageUpload"
                            className="file:text-white placeholder:text-neutral-500 md:text-sm text-xs"
                            type="text"
                        />
                        <Input
                            value={text.bottomText}
                            onChange={(e) => setText({ ...text, bottomText: e.target.value })}
                            placeholder="Enter Bottom Text..."
                            name="imageUpload"
                            className="file:text-white placeholder:text-neutral-500 md:text-sm text-xs"
                            type="text"
                        />
                    </>

                    <Button
                        disabled={!image}
                        onClick={downloadMeme}
                        className="mt-5 md:text-xs w-full"
                        variant={"secondary"}
                    >
                        Download Meme
                    </Button>
                </div>

                <div className="lg:w-3/5 w-full">
                    <h2 className="md:text-sm text-xs">Your Meme Preview</h2>
                    <div className={`w-full border border-neutral-700 lg:h-96 md:h-[26rem] h-80 rounded-xl mt-2 overflow-hidden`}>
                        {image && (
                            <div
                                ref={memeRef}
                                className="relative w-full h-full"
                                style={{
                                    backgroundImage: `url(${image})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat'
                                }}
                            >
                                {/* Top Text */}
                                {text.topText && (
                                    <div
                                        className="absolute top-0 left-1/2 transform -translate-x-1/2 text-center"
                                        style={{
                                            color: 'white',
                                            WebkitTextStroke: "0.5px black",
                                            fontSize: 'clamp(16px, 4vw, 52px)',
                                            fontWeight: 'bold',
                                            fontFamily: 'Impact, Arial Black, sans-serif',
                                            textTransform: 'uppercase',
                                            maxWidth: '90%',
                                            wordWrap: 'break-word'
                                        }}
                                    >
                                        {text.topText}
                                    </div>
                                )}

                                {/* Bottom Text */}
                                {text.bottomText && (
                                    <div
                                        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-center"
                                        style={{
                                            color: 'white',
                                            WebkitTextStroke: "0.5px black",
                                            fontSize: 'clamp(16px, 4vw, 52px)',
                                            fontWeight: 'bold',
                                            fontFamily: 'Impact, Arial Black, sans-serif',
                                            textTransform: 'uppercase',
                                            maxWidth: '90%',
                                            wordWrap: 'break-word'
                                        }}
                                    >
                                        {text.bottomText}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default GenerateMeme