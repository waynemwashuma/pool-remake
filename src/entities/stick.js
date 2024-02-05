import { Box, Sprite, BasicMaterial, BoxGeometry, createEntity } from "../../lib/chaos.module.js"

export function createStick(x, y,w,h) {
  const material = new BasicMaterial()
  material.fill = "brown"
  material.stroke = "transparent"
  return createEntity(x, y)
    //.attach("body", new Box(w,h))
    .attach("sprite", new Sprite(
      new BoxGeometry(w,h),
      material
    ))
}