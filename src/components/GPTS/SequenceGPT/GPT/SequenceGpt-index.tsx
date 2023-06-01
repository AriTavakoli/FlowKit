import SequenceGpt from "./SequenceGpt";
import React from "react";

export default function SequenceIndex({ sequenceRef }) {

  return (
    <SequenceGpt sequenceRef={sequenceRef ? sequenceRef : null} ></SequenceGpt>
  );
}