"use client"
import Candidate from '@/components/Candidate'
import { Button } from '@nextui-org/react'
import React, { useState } from 'react'

interface ICandidate {
    name: string
    picUrl: string
}

function Voting() {

    const candidates: ICandidate[] = [
        {
            name: "Amin",
            picUrl: "https://picsum.photos/200"
        },
        {
            name: "Afiq",
            picUrl: "https://picsum.photos/200"
        },
        {
            name: "Aminah",
            picUrl: "https://picsum.photos/200"
        },
    ]

    // const [selected, setSelected] = useState(false)

    const [selectedCandidate, setSelectedCandidate] = useState(-1)

  return (
    <div className='bg-white w-screen h-auto py-7 lg:py-0 lg:h-screen flex justify-center items-center text-black'>
        <div className='max-w-screen-md w-full flex flex-col justify-center items-center'>
            <h4 className='text-2xl font-medium mb-4'>Candidates</h4>
            <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {candidates.map((item, index) => {
                    return (
                        <div key={index} className='hover:cursor-pointer' onClick={() => {
                            setSelectedCandidate(index)
                        }}>
                            <Candidate candidateName={item.name} candidatePicUrl={item.picUrl} onSelected={index === selectedCandidate} />
                        </div>
                    )
                })}
            </div>
            <h4 className='text-xl font-medium mt-6 mb-4'>Selected candidate: {selectedCandidate === -1 ? "" : candidates[selectedCandidate].name}</h4>
            <Button color='primary' className='w-[200px]'>Vote</Button>
        </div>
    </div>
  )
}

export default Voting