"use client"

import dynamic from "next/dynamic"

const GenerateMemeComponent = dynamic(() => import("../components/generate-meme"), {
  ssr: false
})

const page = () => {
  return (
    <div className="flex flex-col items-center gap-4 md:justify-center justify-start md:h-svh min-h-svh md:py-0 py-12 w-full bg-gradient-to-b from-black via-neutral-800 to-purple-900 text-white">
      <GenerateMemeComponent />
    </div>
  )
}

export default page