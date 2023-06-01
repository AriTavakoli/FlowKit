
//require test html file

// const fs = require( 'fs' );
// const path = require( 'path' );
// //load html file
// //load html file that is in this folder
// const htmlFile = path.join(__dirname, 'test.html');

export default class HtmlParser {

  constructor(htmlFile) {

    this.htmlFile = new DOMParser().parseFromString(htmlFile, 'text/html');


  }

  getNode(selector) {

   return this.htmlFile.getElementsByClassName(selector)[0]

  }

  getAllChildren(nodeClassName) {

    const currentNode = this.getNode(nodeClassName)
    const childArr = []
    const parentObj = {}


    //create helper recursive function that adds the parent name as the key to parentObj and the children as the value
    const helper = (currentNode, parentObj) => {
      if (currentNode.children === undefined || currentNode.children === null) return childArr;
      //create a nested object with the parent name as the key and the children as the value
      parentObj[currentNode.className] = {}
      // parentObj[currentNode.className].children = currentNode.children//
      //loop through the children and push them into the childArr
      for (let i = 0; i < currentNode.children.length; i++) {
        const child = currentNode.children[i];
        childArr.push(child)
        helper(child, parentObj[currentNode.className])
      }
    }
    helper(currentNode, parentObj)
    return parentObj
  }



  getClassNames(rootNode) {

    let componentTree = this.getAllChildren(rootNode)

    let classNames = []

    const helper = (componentTree) => {
      for (let key in componentTree) {
        classNames.push(key)
        helper(componentTree[key])
      }
    }
    helper(componentTree)

    console.log(classNames);
    return classNames


  }





  printObjectTree(obj, indent, isLastChild, printValues) {

    for (const key in obj) {
      let value = '';
      if (printValues && typeof obj[key] !== 'object') {
        value = `: ${obj[key]}`;
      }
      console.log(indent + (isLastChild ? '└── ' : '├── ') + key + value);
      if (typeof obj[key] === 'object') {
        const childIndent = indent + (isLastChild ? '    ' : '│   ');
        let lastChild = Object.keys(obj[key]).length === 0;

        // Check if the child node is an array
        if (Array.isArray(obj[key])) {
          for (let i = 0; i < obj[key].length; i++) {
            // Check if the array element is an object
            if (typeof obj[key][i] === 'object') {
              // Recursively print the object
              this.printObjectTree(obj[key][i], childIndent + (i === obj[key].length - 1 ? '    ' : '│   '), true, printValues);
            } else {
              // Print the array element
              console.log(childIndent + (i === obj[key].length - 1 ? '└── ' : '├── ') + obj[key][i]);
            }
          }
        } else {
          // Recursively print the child object
          this.printObjectTree(obj[key], childIndent, lastChild, printValues);
        }
      }
    }
  }





}

