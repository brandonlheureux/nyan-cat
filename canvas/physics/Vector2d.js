export class Vector2d {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  add = (vector) => {
    return Vector2d.add(this, vector);
  };
  subtract = (vector) => {
    return Vector2d.subtract(this, vector);
  };
  multiply = (scalar) => {
    return Vector2d.multiply(this, scalar);
  };
  divide = (scalar) => {
    return Vector2d.divide(this, scalar);
  };
  magnitude = () => {
    return Vector2d.magnitude(this);
  };
  normalize = () => {
    return Vector2d.normalize(this);
  };
  distanceTo = (vector) => {
    return Vector2d.distanceBetween(this, vector);
  };
  limitTo = (maxMagnitude) => {
    return Vector2d.limit(this, maxMagnitude);
  };
  isNullVector = () => {
    return Vector2d.isNullVector(this);
  };
  dot = (vector) => {
    return Vector2d.dotProduct(this, vector);
  };
  rotate = (degrees) => {
    return Vector2d.rotate(this, degrees);
  };

  static add = (vector1, vector2) => {
    return new Vector2d(vector1.x + vector2.x, vector1.y + vector2.y);
  };
  static subtract = (vector1, vector2) => {
    return new Vector2d(vector1.x - vector2.x, vector1.y - vector2.y);
  };
  static multiply = (vector, scalar) => {
    return new Vector2d(vector.x * scalar, vector.y * scalar);
  };
  static divide = (vector, scalar) => {
    return new Vector2d(vector.x / scalar, vector.y / scalar);
  };
  static magnitudeFrom = (vector) => {
    return Math.hypot(vector.x, vector.y);
  };
  static normalize = (vector) => {
    const magnitude = Vector2d.magnitudeFrom(vector);
    if (vector.isNullVector()) return vector;
    return new Vector2d(vector.x / magnitude, vector.y / magnitude);
  };
  static distanceBetween = (vector1, vector2) => {
    return Math.hypot(Vector2d.subtract(vector1, vector2));
  };
  static limit = (vector, maxMagnitude) => {
    return Vector2d.magnitudeFrom(vector) <= maxMagnitude
      ? vector
      : Vector2d.normalize(vector).multiply(maxMagnitude);
  };

  static isNullVector = (vector) => {
    return vector.x === 0 && vector.y === 0;
  };

  static dotProduct = (vector1, vector2) => {
    return new Vector2d(vector1.x * vector2.x, vector1.y * vector2.y);
  };

  static rotate = (vector, degrees) => {
    let radians = degrees * (Math.PI / 180);
    return new Vector2d(
      vector.x * Math.cos(radians) - vector.y * Math.sin(radians),
      vector.x * Math.sin(radians) + vector.y * Math.cos(radians)
    );
  };
}
