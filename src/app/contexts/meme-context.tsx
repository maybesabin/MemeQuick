"use client"

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { createContext, useContext, useState, useMemo } from "react";
import { Meme } from "@/types/text";

interface MemeData {
    name: string;
    url: string;
}

interface MemeContext {
    selectedMeme: MemeData | null;
    setSelectedMeme: (meme: MemeData | null) => void;
    memes: Meme[] | undefined;
    isLoading: boolean;
    error: Error | null;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    filteredMemes: Meme[] | undefined;
}

const MemeContext = createContext<MemeContext | null>(null)

export const MemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [selectedMeme, setSelectedMeme] = useState<MemeData | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>("");

    const fetchMemes = async () => {
        const res = await axios.get(`https://api.imgflip.com/get_memes`)
        console.log(res.data)
        return res.data;
    }

    const { data, isLoading, error } = useQuery({
        queryKey: ['memes'],
        queryFn: fetchMemes
    })

    const memes = data?.data?.memes;

    // Filter memes based on search query
    const filteredMemes = useMemo(() => {
        if (!memes || !searchQuery.trim()) return memes;

        return memes.filter((meme: Meme) =>
            meme.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
        );
    }, [memes, searchQuery]);

    return (
        <MemeContext.Provider value={{
            selectedMeme,
            setSelectedMeme,
            memes,
            isLoading,
            error,
            searchQuery,
            setSearchQuery,
            filteredMemes
        }}>
            {children}
        </MemeContext.Provider>
    )
}

export const useMemeContext = () => {
    const context = useContext(MemeContext);
    if (!context) {
        throw new Error("MemeContext must be used within MemeProvider")
    }
    return context;
}