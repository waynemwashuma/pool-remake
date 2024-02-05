import { Box, Sprite, StaticImageMaterial, BoxGeometry, createEntity } from "../../lib/chaos.module.js"

export function createBackground(w,h) {
  const image = new Image()
  image.src = "/assets/table.png"
  const material = new StaticImageMaterial(image,w,h)
  
  return createEntity(w/2, h/2)
    .attach("sprite", new Sprite(
      new BoxGeometry(w,h),
      material
    ))
}