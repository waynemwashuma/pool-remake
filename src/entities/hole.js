import {
  Ball,
  Sprite,
  BasicMaterial,
  CircleGeometry,
  createEntity,
  Body,
  Vector2
} from "../../lib/chaos.module.js"
import { renderer,ballIntoHole,scratch } from "../vars.js"

export function createHole(x, y, r = 30) {
  const material = new BasicMaterial()
  material.fill = "black"
  const body = new Ball(r)
  body.type = Body.STATIC
  body.collisionResponse = false
  const entity = createEntity(x, y)
    .attach("body", body)
    /*.attach("sprite", new Sprite(
      new CircleGeometry(r),
      material
    ))/***/
  entity.register("precollision", (a, b) => {
    const posA = a.get("transform").position
    const posB = b.get("transform").position

    const dist = posB.clone().sub(posA).magnitude()
    if(dist > 30)return
    b.get("movable").velocity.set(0, 0)
    if (b.hasTag("cueball")) {
      posB.set(
        renderer.width / 2,
        renderer.height / 2
      )
      scratch.value = true
      return
    }
    b.removeSelf()
    ballIntoHole.value += 1
  })

  return entity
}