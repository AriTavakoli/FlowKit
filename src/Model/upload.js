const { openai } = require('./OpenAi-api');
const {jsonData} = require('./data.jsonl');
const fs = require('fs');

async function upload() {
  try {
    const response = await openai.createFile(
      fs.createReadStream(jsonData),
      'fine-tune'
    );
    console.log('File ID: ', response.data.id)
  } catch (err) {
    console.log('err: ', err)
  }
}

upload()