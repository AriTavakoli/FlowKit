import { v4 as uuid } from 'uuid';

export function deepCloneWithNewIds(data) {
  if (!data || !data.templateLayout) {
    console.error('Invalid data object provided:', data);
    return null;
  }

  const idMapping = {};

  const clonedData = JSON.parse(JSON.stringify(data));

  const newTemplateLayout = {};
  for (const key in clonedData.templateLayout) {
    const newId = uuid();
    newTemplateLayout[newId] = clonedData.templateLayout[key];
    idMapping[key] = newId;
  }
  clonedData.templateLayout = newTemplateLayout;

  clonedData.blocks.forEach(block => {
    const oldId = block.id;
    if (idMapping.hasOwnProperty(oldId)) {
      block.id = idMapping[oldId];
    }

    for (const fieldKey in block.fields) {
      const oldFieldId = fieldKey;
      const newFieldId = uuid();
      idMapping[oldFieldId] = newFieldId;

      // Update the field ID in the block's fields
      block.fields[newFieldId] = block.fields[oldFieldId];
      delete block.fields[oldFieldId];
      block.fields[newFieldId].fieldId = newFieldId;

      // Update the field ID inside the attributes of the corresponding elements in the templateLayout
      clonedData.templateLayout[block.id].forEach(elements => {
        elements.forEach(element => {
          if (element.attributes && element.attributes.fieldId === oldFieldId) {
            element.attributes.fieldId = newFieldId;
          }
        });
      });
    }
  });

  return clonedData;
}


function downloadJSON(data, filename) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}