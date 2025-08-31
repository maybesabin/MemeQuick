"use client"

import { ArrowUpRight } from "lucide-react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { motion } from "framer-motion"
import { useMemeContext } from "@/app/contexts/meme-context"
import { useState, useEffect } from "react"

const HeroHeader = () => {
    const { setSearchQuery, searchQuery } = useMemeContext();
    const [localSearchQuery, setLocalSearchQuery] = useState("");

    // sync local search with global search
    useEffect(() => {
        setLocalSearchQuery(searchQuery);
    }, [searchQuery]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setLocalSearchQuery(value);
        setSearchQuery(value);
    };

    return (
        <div className="w-full md:mt-32 mt-12 flex flex-col gap-6 items-center justify-center md:text-center text-left">
            <motion.h1
                className="lg:text-7xl md:text-6xl text-5xl font-semibold"
                initial={{ y: 30, opacity: 0, filter: "blur(10px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
            >
                Generate <span className="text-purple-300 italic font-light">Memes</span>
            </motion.h1>
            <motion.h2
                initial={{ y: 30, opacity: 0, filter: "blur(10px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.4, ease: "easeOut", delay: 0.7 }}
                className="-mt-4 lg:text-7xl md:text-6xl text-5xl font-semibold"
            >
                Without Efforts
            </motion.h2>
            <motion.div
                initial={{ y: 30, opacity: 0, filter: "blur(10px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.4, ease: "easeOut", delay: 0.9 }}
                className="relative w-full flex items-center justify-center">
                <Input
                    maxLength={50}
                    className="lg:w-1/3 md:w-1/2 w-full py-5 pr-12 rounded-full md:text-sm text-xs"
                    placeholder="Search meme templates..."
                    value={localSearchQuery}
                    onChange={handleSearchChange}
                />
                <Button
                    size={'icon'}
                    className="dark rounded-full absolute lg:right-1/3 md:right-1/4 right-0 mr-1"
                >
                    <ArrowUpRight />
                </Button>
            </motion.div>
        </div>
    )
}

export default HeroHeader