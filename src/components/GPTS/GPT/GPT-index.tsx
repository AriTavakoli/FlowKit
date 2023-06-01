import { ChatGptProvider } from "./Context/ChatGptContext";
import StyleGpt from "./GPT";



export default function GPT({ refs }) {

  return (
    <ChatGptProvider>
      <StyleGpt refs = {refs}></StyleGpt>
    </ChatGptProvider>
  )

}

