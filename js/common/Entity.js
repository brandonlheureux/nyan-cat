class Entity {
  id = "UNASSIGNED_ID";
  name = "UNASSIGNED_NAME";
  hitPoints = 0;
  position = { x: 0, y: 0 };

  constructor(id, name, hitPoints, position, domElement, deathAnimation = "") {
    this.id = id;
    this.name = name;
    this.hitPoints = hitPoints;
    this.position = position;
    this.domElement = domElement;
    this.deathAnimation = deathAnimation;
    this.sound = './sound/whatever.mp3'
  }
  animateDeath = () => {
    this.domElement.src = this.deathAnimation;
  };
  damage = (amount = 1) => {
    this.hitPoints -= amount;
  };
  heal = (amount = 1) => {
    this.hitPoints += amount;
  };
  destroy = (animate = true) => {
    this.hitPoints = 0;
    if (animate) {
      this.animateDeath();
    }
    setTimeout(() => {
      this.domElement.remove();
    }, 700);
  };
}

export { Entity };
