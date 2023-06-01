import StorageOps from "../../../pages/Content/GPT/components/utils/StorageOps";


type Fragment = {
  [key: string]: {
    active: boolean,
    bubbleColor: string,
    conversationStyle: string,
    markDownTemplateOutput: string,
    markDownTemplateQuery: string,
    queryName: string,
    responseLength: number
  }

}


// takes in the default Templates and seeds the database with them. Can be used for reset or initial load.


export default async function seedStorage(Fragment: Fragment) {
  console.log(Object.keys(Fragment), 'Object.keys(Frag)');

  // let clear = await StorageOps.clearLocalStorage();

  let defaultTemplates = Fragment
  StorageOps.addBatchTemplateItems(defaultTemplates).then((result) => {
    console.log(result, 'result');
  })

}
