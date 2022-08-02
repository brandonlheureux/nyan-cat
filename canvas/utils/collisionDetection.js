export const checkCollision = (entity1, entity2) => {
  let rect1 = {
    x: entity1.position.x,
    y: entity1.position.y,
    ...entity1.dimensions,
  };
  let rect2 = {
    x: entity2.position.x,
    y: entity2.position.y,
    ...entity2.dimensions,
  };
  return (
    entity1.collideable &&
    entity2.collideable &&
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.height + rect1.y > rect2.y
  );
};
