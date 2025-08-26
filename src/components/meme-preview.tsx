import React, { Ref, useState } from 'react';
import { motion } from 'framer-motion';
import type { MemeTextState } from '../lib/text';

interface MemePreviewPropsType {
    image: string | null;
    memeRef: Ref<HTMLDivElement> | null;
    text: MemeTextState;
}

const MemePreview = ({
    image,
    memeRef,
    text,
}: MemePreviewPropsType) => {
    const [isDragging, setIsDragging] = useState(false);
    const guideXPercent = 50;
    const guideYPercent = 50;

    return (
        <div className="lg:w-3/5 w-full">
            <h2 className="md:text-sm text-xs">Your Meme Preview</h2>
            <div className={`w-full border border-neutral-700 lg:h-[30rem] md:h-[26rem] h-80 rounded-xl mt-2 overflow-hidden`}>
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
                        {isDragging && (
                            <>
                                <div
                                    className="absolute top-0 bottom-0 w-px bg-yellow-400 pointer-events-none"
                                    style={{ left: `${guideXPercent}%` }}
                                />
                                <div
                                    className="absolute left-0 right-0 h-px bg-yellow-400 pointer-events-none"
                                    style={{ top: `${guideYPercent}%` }}
                                />
                            </>
                        )}
                        {/* Top Text */}
                        {text.topText && (
                            <motion.div
                                className="absolute transform -translate-x-1/2 -translate-y-1/2 text-center cursor-move"
                                drag
                                dragMomentum={false}
                                onDragStart={() => setIsDragging(true)}
                                onDrag={() => { }}
                                onDragEnd={() => setIsDragging(false)}
                                style={{
                                    color: 'white',
                                    WebkitTextStroke: `${text.stroke}px black`,
                                    fontSize: text.topTextFontSize,
                                    fontWeight: 'bold',
                                    fontFamily: 'Impact, Arial Black, sans-serif',
                                    textTransform: 'uppercase',
                                    maxWidth: '90%',
                                    wordWrap: 'break-word',
                                    left: `${text.topPosXPercent}%`,
                                    top: `${text.topPosYPercent}%`
                                }}
                            >
                                {text.topText}
                            </motion.div>
                        )}

                        {/* Bottom Text */}
                        {text.bottomText && (
                            <motion.div
                                className="absolute transform -translate-x-1/2 -translate-y-1/2 text-center cursor-move"
                                drag
                                dragMomentum={false}
                                onDragStart={() => setIsDragging(true)}
                                onDrag={() => { }}
                                onDragEnd={() => setIsDragging(false)}
                                style={{
                                    color: 'white',
                                    WebkitTextStroke: `${text.stroke}px black`,
                                    fontSize: text.bottomTextFontSize,
                                    fontWeight: 'bold',
                                    fontFamily: 'Impact, Arial Black, sans-serif',
                                    textTransform: 'uppercase',
                                    maxWidth: '90%',
                                    wordWrap: 'break-word',
                                    left: `${text.bottomPosXPercent}%`,
                                    top: `${text.bottomPosYPercent}%`
                                }}
                            >
                                {text.bottomText}
                            </motion.div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default MemePreview