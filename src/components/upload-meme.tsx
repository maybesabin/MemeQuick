import { Input } from "./ui/input"
import { SetStateAction } from "react";
import { toPng } from 'html-to-image'
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { Label } from "./ui/label";
import { motion, AnimatePresence } from "framer-motion";

interface UploadMemePropsType {
    image: string | null;
    setImage: React.Dispatch<SetStateAction<string | null>>;
    text: {
        topText: string;
        bottomText: string;
        stroke: number;
        fontSize: string;
    };
    setText: React.Dispatch<SetStateAction<{
        topText: string;
        bottomText: string;
        stroke: number;
        fontSize: string;
    }>>;
    memeRef: any;
}

const UploadMeme = ({
    image,
    setImage,
    text,
    setText,
    memeRef
}: UploadMemePropsType) => {
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

    const handleFontSizeChange = (value: number[]) => {
        const size = value[0];
        setText({ ...text, fontSize: `${size}px` });
    };

    const hasText = text.topText || text.bottomText;

    return (
        <div className="lg:w-2/5 w-full flex flex-col items-start gap-3">
            <Label htmlFor="imageUpload" className="md:text-sm text-xs">
                Upload Image
            </Label>
            <Input
                onChange={handleImageUpload}
                name="imageUpload"
                className="file:text-white md:text-sm text-xs"
                type="file"
            />

            <AnimatePresence>
                {hasText && (
                    <motion.div
                        initial={{ opacity: 0, height: 0, y: -10 }}
                        animate={{ opacity: 1, height: "auto", y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -10 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="w-full"
                    >
                        <Label htmlFor="strokeWidth" className="mt-5">
                            Stroke Width
                        </Label>
                        <div className="relative w-full flex items-center justify-between gap-3">
                            <Slider
                                min={0}
                                max={5}
                                step={0.25}
                                value={[text.stroke]}
                                onValueChange={(value) => setText({ ...text, stroke: value[0] })}
                            />
                            <p className="md:text-sm text-xs">{text.stroke}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {hasText && (
                    <motion.div
                        initial={{ opacity: 0, height: 0, y: -10 }}
                        animate={{ opacity: 1, height: "auto", y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -10 }}
                        transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
                        className="w-full"
                    >
                        <Label htmlFor="fontSize" className="mt-5">
                            Font Size
                        </Label>
                        <div className="relative w-full flex items-center justify-between gap-3">
                            <Slider
                                min={16}
                                max={72}
                                step={1}
                                value={[parseInt(text.fontSize.replace('px', '')) || 32]}
                                onValueChange={handleFontSizeChange}
                            />
                            <p className="md:text-sm text-xs">{text.fontSize}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <Label htmlFor="topText" className="mt-5">
                Add Your Text
            </Label>
            <Input
                value={text.topText}
                onChange={(e) => setText({ ...text, topText: e.target.value })}
                placeholder="Enter Top Text..."
                name="topText"
                className="file:text-white placeholder:text-neutral-500 md:text-sm text-xs"
                type="text"
            />
            <Input
                value={text.bottomText}
                onChange={(e) => setText({ ...text, bottomText: e.target.value })}
                placeholder="Enter Bottom Text..."
                name="bottomText"
                className="file:text-white placeholder:text-neutral-500 md:text-sm text-xs"
                type="text"
            />
            <Button
                disabled={!image}
                onClick={downloadMeme}
                className="mt-5 md:text-xs w-full"
                variant={"secondary"}
            >
                Download Meme
            </Button>
        </div>
    )
}

export default UploadMeme