"use client"

import { createContext, useContext, useState } from "react";

interface MemeData {
    name: string;
    imageUrl: string;
}

interface MemeContext {
    selectedMeme: MemeData | null;
    setSelectedMeme: (meme: MemeData | null) => void;
}

const MemeContext = createContext<MemeContext | null>(null)

export const MemeProvider = ({ children }: { children: React.ReactNode }) => {

    const [selectedMeme, setSelectedMeme] = useState<MemeData | null>(null);

    return (
        <MemeContext.Provider value={{ selectedMeme, setSelectedMeme }}>
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