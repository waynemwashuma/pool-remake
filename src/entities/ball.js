import { Ball, Sprite, BasicMaterial, CircleGeometry, createEntity } from "../../lib/chaos.module.js"

export function createBall(x, y, r = 10,color = "red") {
  const material = new BasicMaterial()
  material.fill = color
  const body = new Ball(r)
  body.kineticFriction = 0
  body.staticFriction = 0
  return createEntity(x, y)
    .attach("body", body)
    .attach("sprite", new Sprite(
      new CircleGeometry(r),
      material
    ))
}