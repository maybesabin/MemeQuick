"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useRef, useState } from "react"

const GenerateMeme = () => {

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [image, setImage] = useState<string | null>(null)
    const [text, setText] = useState({
        topText: "",
        bottomText: ""
    })
    const [fadeIn, setFadeIn] = useState(false);

    useEffect(() => {
        setFadeIn(true);
    }, []);

    useEffect(() => {
        if (!canvasRef.current || !image) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const img = new Image();
        img.src = image;
        img.onload = () => {
            // Resize canvas to image size
            canvas.width = img.width;
            canvas.height = img.height;

            // Draw image
            ctx.drawImage(img, 0, 0);

            // Text styles
            ctx.fillStyle = "white";
            ctx.strokeStyle = "black";
            ctx.lineWidth = 3;
            ctx.textAlign = "center";
            ctx.font = `${Math.floor(canvas.width / 10)}px Impact`;

            // Top text
            ctx.fillText(text.topText.toUpperCase(), canvas.width / 2, 80);
            ctx.strokeText(text.topText.toUpperCase(), canvas.width / 2, 80);

            // Bottom text
            ctx.fillText(text.bottomText.toUpperCase(), canvas.width / 2, canvas.height - 30);
            ctx.strokeText(text.bottomText.toUpperCase(), canvas.width / 2, canvas.height - 30);
        };
    }, [image, text]);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setImage(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const downloadMeme = () => {
        if (!canvasRef.current) return;

        const formatText = (str: string) => str.trim().replace(/\s+/g, '-');

        const top = text.topText ? formatText(text.topText) : 'top';
        const bottom = text.bottomText ? formatText(text.bottomText) : 'bottom';

        const fileName = `${top}-${bottom}.png`;

        const link = document.createElement("a");
        link.download = fileName;
        link.href = canvasRef.current.toDataURL("image/png");
        link.click();
    };

    return (
        <div className="flex flex-col items-center gap-4 justify-center h-screen w-full bg-gradient-to-b from-black via-neutral-800 to-purple-900 text-white">
            <h1 className={`text-2xl font-medium transition-all duration-600 ease-in-out ${fadeIn ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                Make Memes. Quickly.
            </h1>
            <div className={`2xl:w-1/2 xl:w-[75%] w-[95%] text-neutral-300 flex lg:flex-row flex-col lg:items-start items-center gap-8 bg-neutral-900/80 rounded-2xl px-4 py-6 duration-600 delay-500 ease-in-out ${fadeIn ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
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
                    <div className={`w-full border border-neutral-700 lg:h-96 md:h-[26rem] h-80 rounded-xl mt-2`}>
                        {image &&
                            <canvas
                                ref={canvasRef}
                                className="w-full h-full rounded-xl"
                            />
                        }
                    </div>
                </div>
            </div>
        </div >
    )
}

export default GenerateMeme