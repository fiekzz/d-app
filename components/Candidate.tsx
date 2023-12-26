"use client";

import { Button, Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import React, { useState } from "react";

export interface INameQ {
  candidateName: string;
  candidatePicUrl: string;
  onSelected: boolean;
}

function Candidate({ candidateName, candidatePicUrl, onSelected }: INameQ) {

  return (
    <Card className={onSelected ? "shadow-none border border-blue-500 py-4" : "py-4"}>
      <CardBody className="overflow-visible py-2">
        <Image
          alt={candidateName}
          className="object-cover rounded-xl"
          src={candidatePicUrl}
          width={270}
        />
      </CardBody>
      <CardHeader className="pb-1 pt-1 px-4 flex-col items-center mb-2">
        <h4 className="font-bold text-large">{candidateName}</h4>
      </CardHeader>
    </Card>
  );
}

export default Candidate;
