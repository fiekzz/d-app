"use client";

import getWeb3, { getContractInstance } from "@/utils/ethereum";
import { Button, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Web3 from "web3";

interface IParam {
  abiData: any;
}

function HandleVoter({ abiData }: IParam) {

    const testAbi = [
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_voter",
                    "type": "address"
                }
            ],
            "name": "addValidVoter",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "castVote",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "hasVoted",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_voter",
                    "type": "address"
                }
            ],
            "name": "isValidVoter",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "owner",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "tallyResults",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "totalVotes",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "validVoters",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]

  const router = useRouter();

  const [Address, setAddress] = useState("");

  const [web3, setWeb3] = useState<Web3 | null>(null);

  const [contract, setContract] = useState<any | null>(null);

  async function handleToVotePage() {
    const isValid = await checkValidVoter(Address);

    console.log(isValid);

    if (Address === "") {
      return;
    }

    if (!isValid) {
      return;
    }

    router.push("/voting");
  }

  const checkValidVoter = async (address: string) => {
    try {
      const isValidVoter = await contract.methods
        .isValidVoter(address)
        .call();
      console.log(`${address} is a valid voter: ${isValidVoter}`);
      return true;
    } catch (error) {
      //   console.error(error);
      console.log(error);
      
      return false;
    }
  };

  const ContactAddress = "0x943b0300e8f31a5edce3209592fd324f1858d7e3";

  useEffect(() => {
    const initWeb3 = async () => {
      try {
        const web3Instance = await getWeb3();
        setWeb3(web3Instance);

        // Replace 'YOUR_CONTRACT_ABI' and 'YOUR_CONTRACT_ADDRESS' with your smart contract ABI and address
        const contractInstance = await getContractInstance(
          web3Instance,
        //   ABIContract,
        testAbi,
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
    <div className="flex items-center justify-center h-screen bg-slate-200">
      <div className="w-full lg:w-[600px] mx-4">
        <div className="flex flex-col items-center justify-center py-10 rounded-xl shadow-xl bg-white">
          <h4 className="text-black font-medium text-3xl mb-4">
            Let&apos;s vote!
          </h4>
          <div className="flex flex-col sm:flex-row">
            <Input
              type="text"
              label="Your address"
              className="w-full lg:w-[400px]"
              onChange={(e) => setAddress(e.target.value)}
            />
            <Button
              color="primary"
              className="h-[50px] mt-4 sm:mt-0 sm:ml-4 sm:h-auto"
              onClick={handleToVotePage}
            >
              Start voting
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HandleVoter;
