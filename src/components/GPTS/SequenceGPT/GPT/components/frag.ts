


const Frag1 = ` v2 I want you to act as a professional in React and take theis following data structgure that represents and hmtl element along with its corresponding. I want you to convert this and write a react an equivalent react component.
Give me suggestions on how to improve the css.


{{"tag":"div","class":"container-4","children":[{"tag":"div","class":"hero-wrapper","children":[{"tag":"div","class":"hero-split","children":[{"tag":"img","class":"shadow-two","children":[],"css":{"shadow-two":{}}}],"css":{"hero-split":{"all":".hero-split {display: flex; max-width: 46%; flex-direction: column; justify-content: flex-start; align-items: flex-start;}","screen and (max-width: 991px)":".hero-split {max-width: 100%; margin-bottom: 40px;}"}}},{"tag":"div","class":"hero-split","children":[{"tag":"h1","class":null,"children":[],"css":""},{"tag":"p","class":"margin-bottom-24px","children":[],"css":{"margin-bottom-24px":{}}},{"tag":"div","class":"hero-form","children":[],"css":{"hero-form":{}}},{"tag":"a","class":"text-link-arrow","children":[],"css":{"text-link-arrow":{}}}],"css":{"hero-split":{"all":".hero-split {display: flex; max-width: 46%; flex-direction: column; justify-content: flex-start; align-items: flex-start;}","screen and (max-width: 991px)":".hero-split {max-width: 100%; margin-bottom: 40px;}"}}}],"css":{"hero-wrapper":{"all":".hero-wrapper {display: flex; justify-content: space-between; align-items: center;}","screen and (max-width: 991px)":".hero-wrapper {margin-bottom: -40px; flex-direction: column; justify-content: flex-start; align-items: flex-start;}"}}}],"css":{"container-4":{"all":".container-4 {width: 100%; max-width: 940px; margin-right: auto; margin-left: auto;}","screen and (max-width: 991px)":".container-4 {max-width: 728px;}","screen and (max-width: 479px)":".container-4 {max-width: none;}"}}}`


const Frag2 = ' give me the color of the sky'

const Frag3 = 'give me 10 system design questions'

const Frag4 = 'give me front end questions'

const Frag5 = 'what does the word "bem" mean'

const Frag6 = 'what is the difference between a class and an id'

const Frag7 = 'what is 2 + 2'


let arr = [Frag1, Frag2, Frag3, Frag4, Frag5, Frag6, Frag7
]; //add more fragments here

//pick one random fragment




let Frag = JSON.stringify(Frag1);





export default Frag;  // eslint-disable-line import/prefer-default-export