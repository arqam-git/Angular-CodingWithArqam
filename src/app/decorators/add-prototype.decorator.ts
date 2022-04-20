export function addPrototypeDecorator(target: any) {
  // console.log('addPrototypeDecorator called....!', target);
  target.prototype.stickers = ['GitHub', 'Google', 'Mozilla', 'Angular'];
}
