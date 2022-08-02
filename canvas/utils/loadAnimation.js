export const loadAnimation = (name, srcList) => {
  let images = {
    name: name,
    imageList: [],
  };
  srcList.forEach((src) => {
    let element = document.createElement("img");
    element.src = src;
    images.imageList.push(element);
  });

  return images;
};
