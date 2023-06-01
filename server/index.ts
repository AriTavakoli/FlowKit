import express from 'express';
import bodyParser from 'body-parser';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { PineconeStore } from 'langchain/vectorstores/pinecone';
import { makeChain } from './utils/makechain';
import { getPinecone } from './utils/pinecone-client';
import { PINECONE_INDEX_NAME, PINECONE_NAME_SPACE } from './config/pinecone';


const app = express();
app.use(bodyParser.json());

app.post('/api/ask', async (req, res) => {
  const { question, history } = req.body;

  console.log('question', question);

  if (!question) {
    return res.status(400).json({ message: 'No question in the request' });
  }

  const sanitizedQuestion = question.trim().replaceAll('\n', ' ');

  try {
    const pineconeClient = await getPinecone();
    const index = await pineconeClient.Index(PINECONE_INDEX_NAME);

    const vectorStore = await PineconeStore.fromExistingIndex(
      new OpenAIEmbeddings({}),
      {
        pineconeIndex: index,
        textKey: 'text',
        namespace: PINECONE_NAME_SPACE,
      },
    );

    const chain = makeChain(vectorStore);
    const response = await chain.call({
      question: sanitizedQuestion,
      chat_history: history || [],
    });

    console.log('response', response);
    res.status(200).json(response);
  } catch (error : any) {
    console.log('error', error);
    res.status(500).json({ error: error.message || 'Something went wrong' });
  }
});

app.use((req, res) => {
  res.status(405).json({ error: 'Method not allowed' });
});

const PORT =  2000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
