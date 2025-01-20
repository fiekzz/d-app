import HandleVoter from "@/components/HandleVoter";
import abiData from '@/app/abi.json'

export default function Home() {

  return <HandleVoter abiData={abiData} />;
}
