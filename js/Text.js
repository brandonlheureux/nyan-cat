// This class is not used in the project yet.
class Text {
  // The constructor has three parameters. Here is an example of how you would create
  // an instance of this class
  constructor(root, xPos, yPos) {
    // We create a DOM element, set its CSS attributes then append it to the parent DOM element. We also
    // set the \`domElement\` property of the instance to the newly created DOM element so we can update it later
    this.domElement = document.createElement("div");
    this.domElement.style.position = "absolute";
    this.domElement.style.left = xPos;
    this.domElement.style.top = yPos;
    this.domElement.style.color = "white";
    this.domElement.style.font = "bold 30px Impact";
    this.domElement.style.zIndex = 2000;

    root.appendChild(this.domElement);
  }

  // This method is used to update the text displayed in the DOM element
  update(txt) {
    this.domElement.innerText = txt;
  }
}

export { Text };
