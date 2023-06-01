import StyleGpt from "@src/components/GPT/GPT";
import { QueryBuilderGptProvider } from "./Context/QueryBuilderGptContext";
import QueryBuilderGpt from "./queryBuilderGpt";

export default function LiveGPT({ sequenceRef , executeCurrentSequence}) {

  return (
    <QueryBuilderGpt
    sequenceRef={sequenceRef ? sequenceRef : null}
    executeCurrentSequence={executeCurrentSequence ? executeCurrentSequence : null}
     ></QueryBuilderGpt>
  );
}