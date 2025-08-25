import React, { Ref } from 'react';

interface MemePreviewPropsType {
    image: string | null;
    memeRef: Ref<HTMLDivElement> | null;
    text: {
        topText: string;
        bottomText: string;
        stroke: number;
        fontSize: string;
    };
}

const MemePreview = ({
    image,
    memeRef,
    text

}: MemePreviewPropsType) => {
    return (
        <div className="lg:w-3/5 w-full">
            <h2 className="md:text-sm text-xs">Your Meme Preview</h2>
            <div className={`w-full border border-neutral-700 lg:h-96 md:h-[26rem] h-80 rounded-xl mt-2 overflow-hidden`}>
                {image && (
                    <div
                        ref={memeRef}
                        className="relative w-full h-full"
                        style={{
                            backgroundImage: `url(${image})`,
                            backgroundSize: 'contain',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat'
                        }}
                    >
                        {/* Top Text */}
                        {text.topText && (
                            <div
                                className="absolute top-4 left-1/2 transform -translate-x-1/2 text-center"
                                style={{
                                    color: 'white',
                                    WebkitTextStroke: `${text.stroke}px black`,
                                    fontSize: text.fontSize,
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
                                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center"
                                style={{
                                    color: 'white',
                                    WebkitTextStroke: `${text.stroke}px black`,
                                    fontSize: text.fontSize,
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
    )
}

export default MemePreview