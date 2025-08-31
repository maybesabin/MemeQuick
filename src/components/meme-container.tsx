"use client"

import Image from "next/image";
import { motion } from "framer-motion"
import { useMemeContext } from "@/app/contexts/meme-context";
import { useRouter } from "next/navigation";
import { flushSync } from "react-dom";
import { Meme } from "@/types/text";
import { Button } from "./ui/button";
import { X } from "lucide-react";

const MemeContainer = () => {
    const { setSelectedMeme, filteredMemes, isLoading, searchQuery, setSearchQuery } = useMemeContext();
    const router = useRouter();

    const handleMemeClick = (meme: Meme) => {
        flushSync(() => {
            setSelectedMeme({
                name: meme.name,
                imageUrl: meme.imageUrl
            });
        });
        router.push('/create/custom');
    };

    const handleClearSearch = () => {
        setSearchQuery("");
    };

    // Loading skeleton component
    const LoadingSkeleton = () => (
        <div className="flex flex-col items-center gap-2">
            <div className="md:h-56 h-42 w-full bg-gradient-to-br from-purple-900/60 to-purple-800/60 rounded-xl relative">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>
            <div className="w-3/4 h-4 rounded-full bg-gradient-to-r from-purple-900/60 to-purple-800/60" />
        </div>
    )

    // Meme item component
    const MemeItem = ({ item }: { item: Meme }) => (
        <div
            className="w-full transition-all duration-200 hover:scale-[103%] cursor-pointer"
            onClick={() => handleMemeClick(item)}
        >
            <div className="md:h-56 h-42 w-full rounded-xl overflow-hidden">
                <Image
                    className="h-full w-full object-cover brightness-90 hover:brightness-100 transition-all duration-200"
                    width={600}
                    height={600}
                    src={item.imageUrl}
                    alt={`${item.name} meme`}
                />
            </div>
            <p className="md:text-sm text-xs font-medium text-center mt-2 text-gray-200">
                {item.name}
            </p>
        </div>
    )

    // No results message
    const NoResults = () => (
        <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-gray-400"
            >
                <p className="md:text-lg text-sm font-medium mb-1">No memes found</p>
                <p className="md:text-sm text-xs">Try adjusting your search terms</p>
            </motion.div>
        </div>
    );

    // Search active header
    const SearchHeader = () => (
        <div className="col-span-full w-full flex items-center justify-between mb-4 md:text-sm text-xs">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="text-gray-300 md:w-auto w-1/2"
            >
                <span>Search results for: </span>
                <span className="font-medium text-purple-300 break-words">&quot;{searchQuery}&quot;</span>
            </motion.div>
            <Button
                onClick={handleClearSearch}
                variant="secondary"
                size="sm"
                className="md:text-sm text-xs dark text-gray-400 hover:text-gray-200 hover:bg-gray-700/50"
            >
                <X className="w-4 h-4" />
                Clear Search
            </Button>
        </div>
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut", delay: 1.5 }}
            className="md:mt-12 mt-6 w-full"
        >
            {/* Search Header */}
            {searchQuery && <SearchHeader />}

            {/* Memes Grid */}
            <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-6 w-full">
                {isLoading ? (
                    Array.from({ length: 10 }).map((_, idx) => (
                        <LoadingSkeleton key={`skeleton-${idx}`} />
                    ))
                ) : searchQuery && filteredMemes?.length === 0 ? (
                    <NoResults />
                ) : (
                    filteredMemes?.map((item: Meme, idx: number) => (
                        <MemeItem key={`meme-${idx}`} item={item} />
                    ))
                )}
            </div>
        </motion.div>
    )
}

export default MemeContainer    