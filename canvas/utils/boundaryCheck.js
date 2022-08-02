export const withinBoundary = (entity, boundaryWidth, boundaryHeight) => {
  let boundary = {
    left: 0,
    right: boundaryWidth,
    top: 0,
    bottom: boundaryHeight,
  };

  let entityRect = {
    left: entity.position.x,
    right: entity.position.x + entity.dimensions.width,
    top: entity.position.y,
    bottom: entity.position.y + entity.dimensions.height,
  };

  return {
    bottom: entityRect.bottom <= boundary.bottom,
    top: entityRect.top >= boundary.top,
    left: entityRect.left >= boundary.left,
    right: entityRect.right <= boundary.right,
  };
};
