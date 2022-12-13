class Rectangle {
  constructor(height, width) {
    this.height = height * 2;
    this.width = width * 2;
  }
}

const rec = new Rectangle(100, 100);
console.log(rec.height);
console.log(rec.width);
