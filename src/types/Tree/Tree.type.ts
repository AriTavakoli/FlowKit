

export type Tree = {
  tag: string;
  class: string;
  children: Tree[];
  css: {
    initCssString: string;
    classData: {
      [key: string]: {
        [key: string]: string;
      };
    }[];
    className: string;
  };
  textContent: string | null;
  imageUrl: string | null;
};


export type CssString = {
  initCssString: string;
  classData: {
    [key: string]: {
      [key: string]: string;
    };
  }[];
  className: string;
};





const exampleCssString = {
  "initCssString": { },
  "classData": [
    {
      "all": {
        ".main-wrapper.home": ".main-wrapper.home {width: 100%;}",
        ".main-wrapper": ".main-wrapper {position: relative; z-index: 100; display: flex; overflow: hidden; width: 100vw; height: auto; margin-top: 45px; margin-bottom: 22px; padding-top: 75px; padding-bottom: 75px; flex-direction: column; justify-content: center; align-items: center;}",
        ".title-wrapper-copy": ".title-wrapper-copy {max-width: 560px; margin-right: auto; margin-bottom: 49px; margin-left: auto; text-align: center;}",
        ".js-type-writer": ".js-type-writer {position: relative; z-index: 4; margin-top: 0px; margin-bottom: 20px; font-family: system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen, Ubuntu, Cantarell, \"Fira Sans\", \"Droid Sans\", \"Helvetica Neue\", sans-serif; color: rgb(87, 87, 87); font-size: 60px; line-height: 1.1; font-weight: 600; letter-spacing: -0.03em;}",
        ".video-subheading": ".video-subheading {position: relative; z-index: 4; color: rgb(88, 88, 88); font-size: 22px; line-height: 30px;}",
        ".polaroids-wrapper": ".polaroids-wrapper {position: relative; display: flex; width: 28rem; height: 32rem; flex-direction: column; justify-content: center; align-items: center;}",
        ".polaroid-frame._1": ".polaroid-frame._1 {z-index: 1; transform: rotate(13deg);}",
        ".polaroid-frame": ".polaroid-frame {position: absolute; width: 22.5rem; height: 27.5rem; padding: 1.25rem; border-radius: 0.25rem; background-color: rgb(252, 252, 252); box-shadow: rgba(0, 19, 97, 0.1) 0px 0px 1px -1px inset, rgba(0, 19, 97, 0.1) 0px 0px 4px 2px;}",
        ".polaroid-frame._2": ".polaroid-frame._2 {z-index: 2; transform: rotate(3deg);}",
        ".polaroid-frame._3": ".polaroid-frame._3 {z-index: 3; transform: rotate(-3deg);}",
        ".polaroid-frame._4": ".polaroid-frame._4 {z-index: 4; transform: rotate(0deg);}",
        ".polaroid-frame._5": ".polaroid-frame._5 {z-index: 5;}"
          }
    },
    {
      "screen and (max-width: 991px)": {
        ".title-wrapper-copy": ".title-wrapper-copy {margin-bottom: 100px;}",
        ".polaroids-wrapper": ".polaroids-wrapper {transform: scale(0.8);}",
        ".polaroid-frame._1": ".polaroid-frame._1 {transform: translate(-48vw, 0px) rotate(13deg);}",
        ".polaroid-frame._2": ".polaroid-frame._2 {transform: translate(54vw, 0px) rotate(3deg);}",
        ".polaroid-frame._3": ".polaroid-frame._3 {transform: translate(40vw, -1vh) rotate(14deg);}",
        ".polaroid-frame._4": ".polaroid-frame._4 {transform: translate(-25vw, 0px) rotate(-6deg);}"
          }
    },
    {
      "screen and (max-width: 767px)": { }
    },
    {
      "screen and (max-width: 479px)": {
        ".main-wrapper.home": ".main-wrapper.home {margin-top: 50px; padding-top: 0px; padding-bottom: 0px;}",
        ".main-wrapper": ".main-wrapper {display: flex; padding-right: 10px; padding-left: 10px;}",
        ".title-wrapper-copy": ".title-wrapper-copy {margin-bottom: 0px;}",
        ".js-type-writer": ".js-type-writer {font-size: 40px;}",
        ".video-subheading": ".video-subheading {font-size: 20px;}",
        ".polaroids-wrapper": ".polaroids-wrapper {transform: scale(0.6);}"
          }
    }
  ],
  "className": ".polaroid-image-wrapper"
}


const exampleNode = {
  "tag": "div",
  "class": "polaroid-frame _2",
  "children": [
    {
      "tag": "div",
      "class": "polaroid-image-wrapper",
      "children": [],
      "css": {
        "initCssString": {},
        "classData": [
          {
            "all": {
              ".main-wrapper.home": ".main-wrapper.home {width: 100%;}",
              ".main-wrapper": ".main-wrapper {position: relative; z-index: 100; display: flex; overflow: hidden; width: 100vw; height: auto; margin-top: 45px; margin-bottom: 22px; padding-top: 75px; padding-bottom: 75px; flex-direction: column; justify-content: center; align-items: center;}",
              ".title-wrapper-copy": ".title-wrapper-copy {max-width: 560px; margin-right: auto; margin-bottom: 49px; margin-left: auto; text-align: center;}",
              ".js-type-writer": ".js-type-writer {position: relative; z-index: 4; margin-top: 0px; margin-bottom: 20px; font-family: system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen, Ubuntu, Cantarell, \"Fira Sans\", \"Droid Sans\", \"Helvetica Neue\", sans-serif; color: rgb(87, 87, 87); font-size: 60px; line-height: 1.1; font-weight: 600; letter-spacing: -0.03em;}",
              ".video-subheading": ".video-subheading {position: relative; z-index: 4; color: rgb(88, 88, 88); font-size: 22px; line-height: 30px;}",
              ".polaroids-wrapper": ".polaroids-wrapper {position: relative; display: flex; width: 28rem; height: 32rem; flex-direction: column; justify-content: center; align-items: center;}",
              ".polaroid-frame._1": ".polaroid-frame._1 {z-index: 1; transform: rotate(13deg);}",
              ".polaroid-frame": ".polaroid-frame {position: absolute; width: 22.5rem; height: 27.5rem; padding: 1.25rem; border-radius: 0.25rem; background-color: rgb(252, 252, 252); box-shadow: rgba(0, 19, 97, 0.1) 0px 0px 1px -1px inset, rgba(0, 19, 97, 0.1) 0px 0px 4px 2px;}",
              ".polaroid-frame._2": ".polaroid-frame._2 {z-index: 2; transform: rotate(3deg);}",
              ".polaroid-frame._3": ".polaroid-frame._3 {z-index: 3; transform: rotate(-3deg);}",
              ".polaroid-frame._4": ".polaroid-frame._4 {z-index: 4; transform: rotate(0deg);}",
              ".polaroid-frame._5": ".polaroid-frame._5 {z-index: 5;}"
            }
          },
          {
            "screen and (max-width: 991px)": {
              ".title-wrapper-copy": ".title-wrapper-copy {margin-bottom: 100px;}",
              ".polaroids-wrapper": ".polaroids-wrapper {transform: scale(0.8);}",
              ".polaroid-frame._1": ".polaroid-frame._1 {transform: translate(-48vw, 0px) rotate(13deg);}",
              ".polaroid-frame._2": ".polaroid-frame._2 {transform: translate(54vw, 0px) rotate(3deg);}",
              ".polaroid-frame._3": ".polaroid-frame._3 {transform: translate(40vw, -1vh) rotate(14deg);}",
              ".polaroid-frame._4": ".polaroid-frame._4 {transform: translate(-25vw, 0px) rotate(-6deg);}"
            }
          },
          {
            "screen and (max-width: 767px)": {}
          },
          {
            "screen and (max-width: 479px)": {
              ".main-wrapper.home": ".main-wrapper.home {margin-top: 50px; padding-top: 0px; padding-bottom: 0px;}",
              ".main-wrapper": ".main-wrapper {display: flex; padding-right: 10px; padding-left: 10px;}",
              ".title-wrapper-copy": ".title-wrapper-copy {margin-bottom: 0px;}",
              ".js-type-writer": ".js-type-writer {font-size: 40px;}",
              ".video-subheading": ".video-subheading {font-size: 20px;}",
              ".polaroids-wrapper": ".polaroids-wrapper {transform: scale(0.6);}"
            }
          }
        ],
        "className": ".polaroid-image-wrapper"
      },
      "textContent": null,
      "imageUrl": null
    },
    {
      "tag": "div",
      "class": "polaroid-text",
      "children": [],
      "css": {
        "initCssString": {},
        "classData": [
          {
            "all": {
              ".main-wrapper.home": ".main-wrapper.home {width: 100%;}",
              ".main-wrapper": ".main-wrapper {position: relative; z-index: 100; display: flex; overflow: hidden; width: 100vw; height: auto; margin-top: 45px; margin-bottom: 22px; padding-top: 75px; padding-bottom: 75px; flex-direction: column; justify-content: center; align-items: center;}",
              ".title-wrapper-copy": ".title-wrapper-copy {max-width: 560px; margin-right: auto; margin-bottom: 49px; margin-left: auto; text-align: center;}",
              ".js-type-writer": ".js-type-writer {position: relative; z-index: 4; margin-top: 0px; margin-bottom: 20px; font-family: system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen, Ubuntu, Cantarell, \"Fira Sans\", \"Droid Sans\", \"Helvetica Neue\", sans-serif; color: rgb(87, 87, 87); font-size: 60px; line-height: 1.1; font-weight: 600; letter-spacing: -0.03em;}",
              ".video-subheading": ".video-subheading {position: relative; z-index: 4; color: rgb(88, 88, 88); font-size: 22px; line-height: 30px;}",
              ".polaroids-wrapper": ".polaroids-wrapper {position: relative; display: flex; width: 28rem; height: 32rem; flex-direction: column; justify-content: center; align-items: center;}",
              ".polaroid-frame._1": ".polaroid-frame._1 {z-index: 1; transform: rotate(13deg);}",
              ".polaroid-frame": ".polaroid-frame {position: absolute; width: 22.5rem; height: 27.5rem; padding: 1.25rem; border-radius: 0.25rem; background-color: rgb(252, 252, 252); box-shadow: rgba(0, 19, 97, 0.1) 0px 0px 1px -1px inset, rgba(0, 19, 97, 0.1) 0px 0px 4px 2px;}",
              ".polaroid-frame._2": ".polaroid-frame._2 {z-index: 2; transform: rotate(3deg);}",
              ".polaroid-frame._3": ".polaroid-frame._3 {z-index: 3; transform: rotate(-3deg);}",
              ".polaroid-frame._4": ".polaroid-frame._4 {z-index: 4; transform: rotate(0deg);}",
              ".polaroid-frame._5": ".polaroid-frame._5 {z-index: 5;}"
            }
          },
          {
            "screen and (max-width: 991px)": {
              ".title-wrapper-copy": ".title-wrapper-copy {margin-bottom: 100px;}",
              ".polaroids-wrapper": ".polaroids-wrapper {transform: scale(0.8);}",
              ".polaroid-frame._1": ".polaroid-frame._1 {transform: translate(-48vw, 0px) rotate(13deg);}",
              ".polaroid-frame._2": ".polaroid-frame._2 {transform: translate(54vw, 0px) rotate(3deg);}",
              ".polaroid-frame._3": ".polaroid-frame._3 {transform: translate(40vw, -1vh) rotate(14deg);}",
              ".polaroid-frame._4": ".polaroid-frame._4 {transform: translate(-25vw, 0px) rotate(-6deg);}"
            }
          },
          {
            "screen and (max-width: 767px)": {}
          },
          {
            "screen and (max-width: 479px)": {
              ".main-wrapper.home": ".main-wrapper.home {margin-top: 50px; padding-top: 0px; padding-bottom: 0px;}",
              ".main-wrapper": ".main-wrapper {display: flex; padding-right: 10px; padding-left: 10px;}",
              ".title-wrapper-copy": ".title-wrapper-copy {margin-bottom: 0px;}",
              ".js-type-writer": ".js-type-writer {font-size: 40px;}",
              ".video-subheading": ".video-subheading {font-size: 20px;}",
              ".polaroids-wrapper": ".polaroids-wrapper {transform: scale(0.6);}"
            }
          }
        ],
        "className": ".polaroid-text"
      },
      "textContent": "where do thoughts come from?",
      "imageUrl": null
    }
  ],
  "css": {
    "initCssString": ".polaroid-frame._2 {z-index: 2; transform: rotate(3deg);}",
    "classData": [
      {
        "all": {
          ".main-wrapper.home": ".main-wrapper.home {width: 100%;}",
          ".main-wrapper": ".main-wrapper {position: relative; z-index: 100; display: flex; overflow: hidden; width: 100vw; height: auto; margin-top: 45px; margin-bottom: 22px; padding-top: 75px; padding-bottom: 75px; flex-direction: column; justify-content: center; align-items: center;}",
          ".title-wrapper-copy": ".title-wrapper-copy {max-width: 560px; margin-right: auto; margin-bottom: 49px; margin-left: auto; text-align: center;}",
          ".js-type-writer": ".js-type-writer {position: relative; z-index: 4; margin-top: 0px; margin-bottom: 20px; font-family: system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen, Ubuntu, Cantarell, \"Fira Sans\", \"Droid Sans\", \"Helvetica Neue\", sans-serif; color: rgb(87, 87, 87); font-size: 60px; line-height: 1.1; font-weight: 600; letter-spacing: -0.03em;}",
          ".video-subheading": ".video-subheading {position: relative; z-index: 4; color: rgb(88, 88, 88); font-size: 22px; line-height: 30px;}",
          ".polaroids-wrapper": ".polaroids-wrapper {position: relative; display: flex; width: 28rem; height: 32rem; flex-direction: column; justify-content: center; align-items: center;}",
          ".polaroid-frame._1": ".polaroid-frame._1 {z-index: 1; transform: rotate(13deg);}",
          ".polaroid-frame": ".polaroid-frame {position: absolute; width: 22.5rem; height: 27.5rem; padding: 1.25rem; border-radius: 0.25rem; background-color: rgb(252, 252, 252); box-shadow: rgba(0, 19, 97, 0.1) 0px 0px 1px -1px inset, rgba(0, 19, 97, 0.1) 0px 0px 4px 2px;}",
          ".polaroid-frame._2": ".polaroid-frame._2 {z-index: 2; transform: rotate(3deg);}",
          ".polaroid-frame._3": ".polaroid-frame._3 {z-index: 3; transform: rotate(-3deg);}",
          ".polaroid-frame._4": ".polaroid-frame._4 {z-index: 4; transform: rotate(0deg);}",
          ".polaroid-frame._5": ".polaroid-frame._5 {z-index: 5;}"
        }
      },
      {
        "screen and (max-width: 991px)": {
          ".title-wrapper-copy": ".title-wrapper-copy {margin-bottom: 100px;}",
          ".polaroids-wrapper": ".polaroids-wrapper {transform: scale(0.8);}",
          ".polaroid-frame._1": ".polaroid-frame._1 {transform: translate(-48vw, 0px) rotate(13deg);}",
          ".polaroid-frame._2": ".polaroid-frame._2 {transform: translate(54vw, 0px) rotate(3deg);}",
          ".polaroid-frame._3": ".polaroid-frame._3 {transform: translate(40vw, -1vh) rotate(14deg);}",
          ".polaroid-frame._4": ".polaroid-frame._4 {transform: translate(-25vw, 0px) rotate(-6deg);}"
        }
      },
      {
        "screen and (max-width: 767px)": {}
      },
      {
        "screen and (max-width: 479px)": {
          ".main-wrapper.home": ".main-wrapper.home {margin-top: 50px; padding-top: 0px; padding-bottom: 0px;}",
          ".main-wrapper": ".main-wrapper {display: flex; padding-right: 10px; padding-left: 10px;}",
          ".title-wrapper-copy": ".title-wrapper-copy {margin-bottom: 0px;}",
          ".js-type-writer": ".js-type-writer {font-size: 40px;}",
          ".video-subheading": ".video-subheading {font-size: 20px;}",
          ".polaroids-wrapper": ".polaroids-wrapper {transform: scale(0.6);}"
        }
      }
    ],
    "className": ".polaroid-frame._2"
  },
  "textContent": null,
  "imageUrl": null
}