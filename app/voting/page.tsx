import Candidate from '@/components/Candidate'
import HandleVoting from '@/components/HandleVoting'
import supabase from '@/utils/supabase'
import { Button } from '@nextui-org/react'
import React, { useState } from 'react'
import { promises as fs } from 'fs';
import abiFile from '../abi.json'

export interface People {
    id: number;
    name: string;
    pictureUrl: string;
}

export interface ICandidateItem {
    people: People
}

async function Voting() {

    const { data, error } = await supabase.from('candidates').select('people (id, name, pictureUrl)')

    const Candidates = data as ICandidateItem[] | null

    const file = await fs.readFile(process.cwd() + '/app/abi.json', 'utf8');

    const abiData = JSON.parse(file)
    
    return (
        <HandleVoting candidates={Candidates!} file={abiData}/>
    )
}

export default Voting