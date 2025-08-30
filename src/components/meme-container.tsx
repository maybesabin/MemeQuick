"use client"

import { useQuery } from "@tanstack/react-query";
import axios from "axios"
import Image from "next/image";
import { motion } from "framer-motion"
import { useMemeContext } from "@/app/contexts/meme-context";
import { useRouter } from "next/navigation";
import { flushSync } from "react-dom";
import { Meme } from "@/types/text";

const MemeContainer = () => {
    const { setSelectedMeme } = useMemeContext();
    const router = useRouter();

    const fetchMemes = async () => {
        const res = await axios.get(`/api/memes`)
        return res.data;
    }

    const { data, isLoading } = useQuery({
        queryKey: ['memes'],
        queryFn: fetchMemes
    })

    const handleMemeClick = (meme: Meme) => {
        flushSync(() => {
            setSelectedMeme({
                name: meme.name,
                imageUrl: meme.imageUrl
            });
        });
        router.push('/create/custom');
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

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut", delay: 1.5 }}
            className="md:mt-12 mt-6 grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-6 w-full"
        >
            {isLoading ? (
                Array.from({ length: 10 }).map((_, idx) => (
                    <LoadingSkeleton key={`skeleton-${idx}`} />
                ))
            ) : (
                data?.memes?.map((item: Meme, idx: number) => (
                    <MemeItem key={`meme-${idx}`} item={item} />
                ))
            )}
        </motion.div>
    )
}

export default MemeContainer    