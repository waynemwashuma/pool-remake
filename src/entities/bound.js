import { Box, Sprite, BasicMaterial, BoxGeometry, createEntity, Body } from "../../lib/chaos.module.js"

export function createBound(x, y, w, h, a) {
  const body = new Box(w, h)
  body.type = Body.STATIC
  return createEntity(x, y, a)
    .attach("body", body)
    /*.attach("sprite", new Sprite(
      new BoxGeometry(w, h),
      new BasicMaterial()
    ))/**/
}