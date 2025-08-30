import HeroHeader from '@/components/hero-header'
import MemeContainer from '@/components/meme-container'
import React from 'react'

const page = () => {
  return (
    <div className='flex items-start justify-center h-full'>
      <div className='xl:w-[80rem] w-full'>
        <HeroHeader />
        <MemeContainer />
      </div>
    </div>
  )
}

export default page