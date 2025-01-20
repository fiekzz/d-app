"use client";
import { ICandidateItem } from "@/app/voting/page";
import React, { useEffect, useState } from "react";
import Candidate from "./Candidate";
import { Button } from "@nextui-org/react";
import getWeb3, { getContractInstance } from "@/utils/ethereum";

interface IItem {
  candidates: ICandidateItem[];
  file: string;
}

function HandleVoting({ candidates, file }: IItem) {
  const [selectedCandidate, setSelectedCandidate] = useState(-1);

  const [web3, setWeb3] = useState<any | null>(null);
  const [contract, setContract] = useState<any | null>(null);

  const ABIContract = file as any;

  const ContactAddress = "0xb325b49d9499713bf073741b1b6e09516de0476d";

  const castVote = async (candidate: string) => {
    try {
      const accounts = await web3.eth.getAccounts();
      await contract.methods.castVote(candidate).send({ from: accounts[0] });
      console.log(`Vote for ${candidate} cast successfully.`);
    } catch (error) {
      console.error("Error casting vote:", error);
    }
  };

  const tallyResults = async () => {
    try {

        var CandiateNames: string[] = []
        
        candidates.map((e) => {
            CandiateNames.push(e.people.name)
        })

      const candidateNames = CandiateNames; // Replace with your actual candidate names
      const results = await contract.methods.tallyResults(candidateNames).call();
      console.log("Tally results:", results);
    } catch (error) {
      console.error("Error tallying results:", error);
    }
  };

  useEffect(() => {
    const initWeb3 = async () => {
      try {
        const web3Instance = await getWeb3();
        setWeb3(web3Instance);

        // Replace 'YOUR_CONTRACT_ABI' and 'YOUR_CONTRACT_ADDRESS' with your smart contract ABI and address
        const contractInstance = await getContractInstance(
          web3Instance,
          ABIContract,
          ContactAddress
        );
        setContract(contractInstance);
      } catch (error) {
        console.error(error);
      }
    };

    initWeb3();
  }, []);

  return (
    <div className="bg-white w-screen h-auto py-7 lg:py-0 lg:h-screen flex justify-center items-center text-black">
      <div className="max-w-screen-md w-full flex flex-col justify-center items-center">
        <h4 className="text-2xl font-medium mb-4">Candidates</h4>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {candidates.map((item, index) => {
            return (
              <div
                key={index}
                className="hover:cursor-pointer"
                onClick={() => {
                  setSelectedCandidate(index);
                }}
              >
                <Candidate
                  candidateName={item.people.name}
                  candidatePicUrl={item.people.pictureUrl}
                  onSelected={index === selectedCandidate}
                />
              </div>
            );
          })}
        </div>
        <h4 className="text-xl font-medium mt-6 mb-4">
          Selected candidate:{" "}
          {selectedCandidate === -1
            ? ""
            : candidates[selectedCandidate].people.name}
        </h4>
        <Button color="primary" className="w-[200px]">
          Vote
        </Button>
      </div>
    </div>
  );

  // return <div>hello</div>
}

export default HandleVoting;
