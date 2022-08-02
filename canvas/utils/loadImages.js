export const loadImages = (srcList) => {
  let images = {};
  srcList.forEach((srcObj) => {
    let element = document.createElement("img");
    element.src = srcObj.path;
    images[srcObj.name] = element;
  });

  return images;
};
