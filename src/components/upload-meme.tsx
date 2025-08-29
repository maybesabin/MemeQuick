import { Input } from "./ui/input"
import { Ref, SetStateAction } from "react";
import { toPng } from 'html-to-image'
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { Label } from "./ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Edit } from "lucide-react";
import { text } from "@/types/text";

interface UploadMemePropsType {
    image: string | null;
    setImage: React.Dispatch<SetStateAction<string | null>>;
    text: text;
    setText: React.Dispatch<SetStateAction<text>>;
    memeRef: Ref<HTMLDivElement> | null;
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
        if (!memeRef || !('current' in memeRef) || !memeRef.current || !image) return;

        try {
            const container = memeRef.current as HTMLElement;

            // Wait for images inside the container to be fully loaded (mobile fix)
            const imgs = Array.from(container.querySelectorAll('img')) as HTMLImageElement[];
            await Promise.all(
                imgs.map(img =>
                    img.complete && img.naturalWidth > 0
                        ? Promise.resolve()
                        : new Promise<void>(resolve => {
                            const onLoad = () => { img.removeEventListener('load', onLoad); resolve(); };
                            img.addEventListener('load', onLoad, { once: true });
                        })
                )
            );

            container.style.transform = 'translateZ(0)';
            await new Promise(resolve => setTimeout(resolve, 100));

            // Ensure web fonts are ready
            if (document && 'fonts' in document) {
                try { await (document).fonts.ready; } catch { }
            }

            // to ensure layout/paint settled on mobile Safari
            await new Promise(requestAnimationFrame);
            await new Promise(requestAnimationFrame);
            await new Promise(requestAnimationFrame);
            await new Promise(requestAnimationFrame);

            const formatText = (str: string) => str.trim().replace(/\s+/g, '-');
            const top = text.topText ? formatText(text.topText) : 'top';
            const bottom = text.bottomText ? formatText(text.bottomText) : 'bottom';
            const fileName = `${top}-${bottom}.png`;

            const dataUrl = await toPng(container, {
                quality: 1.0,
                backgroundColor: 'transparent',
                cacheBust: true,
                pixelRatio: window.devicePixelRatio || 1,
                width: container.offsetWidth,
                height: container.offsetHeight,
                style: {
                    transform: 'scale(1)',
                    transformOrigin: 'top left',
                }
            });

            const link = document.createElement("a");
            link.download = fileName;
            link.href = dataUrl;
            link.click();
        } catch (error) {
            console.error('Error generating meme:', error);
        }
    };

    const handleTextSizeChange = (value: number[], type: "top" | "bottom") => {
        const size = value[0];
        if (type === "top") {
            setText({ ...text, topTextFontSize: `${size}px` });
        } else {
            setText({ ...text, bottomTextFontSize: `${size}px` });
        }
    };

    const hasText = text.topText || text.bottomText;

    return (
        <div className="lg:w-2/5 w-full flex flex-col items-start gap-2">
            <Label htmlFor="imageUpload" className="md:text-sm text-xs">
                Upload Image
            </Label>
            <Input
                onChange={handleImageUpload}
                name="imageUpload"
                className="file:text-white md:text-sm text-xs"
                type="file"
            />

            <Label htmlFor="topText" className="mt-3">
                Add Your Text
            </Label>

            {/* Top Text */}
            <div className="flex items-center gap-2 w-full">
                <Input
                    disabled={!image}
                    value={text.topText}
                    onChange={(e) => setText({ ...text, topText: e.target.value })}
                    placeholder="Enter Top Text..."
                    name="topText"
                    className="file:text-white placeholder:text-neutral-500 md:text-sm text-xs"
                    type="text"
                />
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            disabled={!hasText}
                            variant={"secondary"}
                            size={"icon"}
                            className="dark cursor-pointer"
                        >
                            <Edit />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="dark">
                        <Label htmlFor="top-text-stroke-width" className="mt-5">
                            Stroke Width
                        </Label>
                        <div className="relative w-full flex items-center justify-between gap-3">
                            <Slider
                                name="top-text-stroke-width"
                                className="mt-2"
                                min={0}
                                max={5}
                                step={0.25}
                                value={[text.topStrokeWidth]}
                                onValueChange={(value) => setText({ ...text, topStrokeWidth: value[0] })}
                            />
                            <span className="md:text-sm text-xs">{text.topStrokeWidth}</span>
                        </div>
                        <Label htmlFor="top-text-size" className="mt-5">
                            Font Size
                        </Label>
                        <div className="relative w-full flex items-center justify-between gap-3">
                            <Slider
                                name="top-text-size"
                                className="mt-2"
                                min={16}
                                max={72}
                                step={1}
                                value={[parseInt(text.topTextFontSize.replace('px', '')) || 32]}
                                onValueChange={(val) => handleTextSizeChange(val, "top")}
                            />
                            <span className="md:text-sm text-xs">{text.topTextFontSize.split("px")}</span>
                        </div>
                        <Label htmlFor="top-text-opacity" className="mt-5">
                            Opacity
                        </Label>
                        <div className="relative w-full flex items-center justify-between gap-3">
                            <Slider
                                name="top-text-opacity"
                                className="mt-2"
                                min={0}
                                max={100}
                                step={1}
                                value={[text.topTextOpacity]}
                                onValueChange={(val) => setText({ ...text, topTextOpacity: val[0] })}
                            />
                            <span className="md:text-sm text-xs">{text.topTextOpacity}%</span>
                        </div>
                        <Label htmlFor="top-text-letter-spacing" className="mt-5">
                            Letter Spacing
                        </Label>
                        <div className="relative w-full flex items-center justify-between gap-3">
                            <Slider
                                name="top-text-letter-spacing"
                                className="mt-2"
                                min={0}
                                max={15}
                                step={1}
                                value={[text.topLetterSpacing]}
                                onValueChange={(val) => setText({ ...text, topLetterSpacing: val[0] })}
                            />
                            <span className="md:text-sm text-xs">{text.topLetterSpacing}</span>
                        </div>
                        <Label htmlFor="top-text-color" className="mt-5">
                            Text Color
                        </Label>
                        <div className="w-full flex items-center gap-2 mt-2">
                            <input
                                className="w-1/6 h-9"
                                name="top-text-color"
                                type="color"
                                onChange={(e) => setText({ ...text, topTextColor: e.target.value })}
                                value={text.topTextColor}
                            />
                            <Input
                                className="w-5/6 h-8"
                                type="text"
                                onChange={(e) => setText({ ...text, topTextColor: e.target.value })}
                                value={text.topTextColor}
                            />
                        </div>
                        <Label htmlFor="top-stroke-color" className="mt-5">
                            Stroke Color
                        </Label>
                        <div className="w-full flex items-center gap-2 mt-2">
                            <input
                                className="w-1/6 h-9"
                                name="top-stroke-color"
                                type="color"
                                onChange={(e) => setText({ ...text, topStrokeColor: e.target.value })}
                                value={text.topStrokeColor}
                            />
                            <Input
                                className="w-5/6 h-8"
                                type="text"
                                onChange={(e) => setText({ ...text, topStrokeColor: e.target.value })}
                                value={text.topStrokeColor}
                            />
                        </div>
                    </PopoverContent>
                </Popover>
            </div>

            {/* Bottom Text */}
            <div className="flex items-center gap-2 w-full">
                <Input
                    disabled={!image}
                    value={text.bottomText}
                    onChange={(e) => setText({ ...text, bottomText: e.target.value })}
                    placeholder="Enter Bottom Text..."
                    name="bottomText"
                    className="file:text-white placeholder:text-neutral-500 md:text-sm text-xs"
                    type="text"
                />
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            disabled={!hasText}
                            variant={"secondary"}
                            size={"icon"}
                            className="dark cursor-pointer"
                        >
                            <Edit />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="dark">
                        <Label htmlFor="bottom-text-stroke-width" className="mt-5">
                            Stroke Width
                        </Label>
                        <div className="relative w-full flex items-center justify-between gap-3">
                            <Slider
                                name="bottom-text-stroke-width"
                                className="mt-2"
                                min={0}
                                max={5}
                                step={0.25}
                                value={[text.bottomStrokeWidth]}
                                onValueChange={(value) => setText({ ...text, bottomStrokeWidth: value[0] })}
                            />
                            <span className="md:text-sm text-xs">{text.bottomStrokeWidth}</span>
                        </div>
                        <Label htmlFor="bottom-text-size" className="mt-5">
                            Font Size
                        </Label>
                        <div className="relative w-full flex items-center justify-between gap-3">
                            <Slider
                                name="bottom-text-size"
                                className="mt-2"
                                min={16}
                                max={72}
                                step={1}
                                value={[parseInt(text.bottomTextFontSize.replace('px', '')) || 32]}
                                onValueChange={(val) => handleTextSizeChange(val, "bottom")}
                            />
                            <span className="md:text-sm text-xs">{text.bottomTextFontSize.split("px")}</span>
                        </div>
                        <Label htmlFor="bottom-text-opacity" className="mt-5">
                            Opacity
                        </Label>
                        <div className="relative w-full flex items-center justify-between gap-3">
                            <Slider
                                name="bottom-text-opacity"
                                className="mt-2"
                                min={0}
                                max={100}
                                step={1}
                                value={[text.bottomTextOpacity]}
                                onValueChange={(val) => setText({ ...text, bottomTextOpacity: val[0] })}
                            />
                            <span className="md:text-sm text-xs">{text.bottomTextOpacity}%</span>
                        </div>
                        <Label htmlFor="bottom-text-letter-spacing" className="mt-5">
                            Letter Spacing
                        </Label>
                        <div className="relative w-full flex items-center justify-between gap-3">
                            <Slider
                                name="bottom-text-letter-spacing"
                                className="mt-2"
                                min={0}
                                max={15}
                                step={1}
                                value={[text.bottomLetterSpacing]}
                                onValueChange={(val) => setText({ ...text, bottomLetterSpacing: val[0] })}
                            />
                            <span className="md:text-sm text-xs">{text.bottomLetterSpacing}</span>
                        </div>
                        <Label htmlFor="bottom-text-color" className="mt-5">
                            Text Color
                        </Label>
                        <div className="w-full flex items-center gap-2 mt-2">
                            <input
                                className="w-1/6 h-9"
                                name="bottom-text-color"
                                type="color"
                                onChange={(e) => setText({ ...text, bottomTextColor: e.target.value })}
                                value={text.bottomTextColor}
                            />
                            <Input
                                className="w-5/6 h-8"
                                type="text"
                                onChange={(e) => setText({ ...text, bottomTextColor: e.target.value })}
                                value={text.bottomTextColor}
                            />
                        </div>
                        <Label htmlFor="bottom-stroke-color" className="mt-5">
                            Stroke Color
                        </Label>
                        <div className="w-full flex items-center gap-2 mt-2">
                            <input
                                className="w-1/6 h-9"
                                name="bottom-stroke-color"
                                type="color"
                                onChange={(e) => setText({ ...text, bottomStrokeColor: e.target.value })}
                                value={text.bottomStrokeColor}
                            />
                            <Input
                                className="w-5/6 h-8"
                                type="text"
                                onChange={(e) => setText({ ...text, bottomStrokeColor: e.target.value })}
                                value={text.bottomStrokeColor}
                            />
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
            <Button
                disabled={!image}
                onClick={downloadMeme}
                className="mt-3 md:text-xs w-full"
                variant={"secondary"}
            >
                Download Meme
            </Button>
        </div >
    )
}

export default UploadMeme