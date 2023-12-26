"use client"
import { Button, Input } from '@nextui-org/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Home() {

  const router = useRouter()

  const [matricNo, setMatricNo] = useState("")

  function handleToVotePage() {

    if (matricNo === "") {
      return
    }

    router.push('/voting')

  }

  return (
    <div className='flex items-center justify-center h-screen bg-white'>
      <div className='w-full lg:[500px] mx-4'>
        <div className='flex flex-col items-center justify-center'>
          <h4 className='text-black font-medium text-3xl mb-4'>Let&apos;s vote!</h4>
          <div className='flex flex-col sm:flex-row'>
            <Input type='number' label='Matric no' className='w-full' onChange={(e) => setMatricNo(e.target.value)}/>
            <Button color='primary' className='h-[50px] mt-4 sm:mt-0 sm:ml-4 sm:h-auto' onClick={handleToVotePage}>
              vote
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
