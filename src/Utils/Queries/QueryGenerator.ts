type QueryTemplate = {
  template: QueryTemplate;
  templateLayout: any;
  queryName: string;
  bubbleColor: string;
  conversationStyle: string;
  responseLength: number;
  markDownTemplateQuery: string;
  markDownTemplateOutput: string;
};


export default class QueryGenerator {
  template: QueryTemplate;
  bubbleColor: string;


  constructor(data: QueryTemplate) {
    this.template = JSON.parse(data.template);
    this.bubbleColor = data.bubbleColor;
  }

  generateQuery() {

    const templateLayout = this.template.templateLayout
    const query = [];

    for (const [key, value] of Object.entries(templateLayout)) {

      // push them in order to the query array
      for (let i = 0; i < value.length; i++) {
        for (let j = 0; j < value[i].length; j++) {
          // console.log(value[i][j]);
          if (value[i][j].type === 'DIV') {
            const queryObject = {
              type: value[i][j].type,
              textContent: value[i][j].textContent,
              attributes: value[i][j].attributes
            }
            const extractedFieldInfo = this.getFieldValueById(value[i][j].attributes.fieldId)
            queryObject['fieldInfo'] = extractedFieldInfo;
            query.push(queryObject);
          } else {
            query.push(value[i][j]);
          }
        }
      }
    }

    return query;

  }


  getFieldValueById(fieldId) {
    // Iterate through all the blocks in the template
    for (let i = 0; i < this.template.blocks.length; i++) {
      const block = this.template.blocks[i];
      // Check if the block contains the field with the specified id
      if (block.fields[fieldId]) {
        // Return the value of the field
        return block.fields[fieldId].value;
      }
    }
    // If the field with the specified id is not found, return null
    return null;
  }




}
