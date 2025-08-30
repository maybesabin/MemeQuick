"use client"

import Image from "next/image"
import emoji from "../assets/goofy.png"
import { Button } from "./ui/button"
import { Plus, Star } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

const Navbar = () => {
    return (
        <div className='flex items-center justify-center w-full'>
            <motion.div
                initial={{ y: 20, opacity: 0, filter: "blur(10px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className='xl:w-[80rem] w-full flex items-center justify-between'
            >
                <Link
                    href={'/'}
                    className="flex items-center gap-2"
                >
                    <Image
                        className="md:size-6 size-4.5"
                        height={600}
                        width={600}
                        src={emoji}
                        alt="Goofy Iphone Emoji"
                    />
                    <p className="font-medium md:text-2xl text-base">MemeQuick</p>
                </Link>

                <div className="md:text-sm text-xs dark flex items-center gap-2">
                    <Button
                        className="md:flex hidden"
                        onClick={() => window.open("https://github.com/maybesabin/MemeQuick")}
                        variant={"secondary"}
                    >
                        <Star />
                        Star
                    </Button>
                    <Link href={'/create/custom'}>
                        <Button
                            className="md:text-sm text-xs"
                            variant={"default"}
                        >
                            <Plus className="md:size-4 size-2.5" />
                            Create
                        </Button>
                    </Link>
                </div>
            </motion.div>
        </div >
    )
}

export default Navbar