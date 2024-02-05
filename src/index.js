import { createBall, createHole, createStick, createBound, createBackground } from "./entities/index.js"
import { StickManager } from "./stickmanager.js"
import {
  game,
  renderer,
  BALL_RADIUS,
  STICK_WIDTH,
  START_POS_X,
  START_POS_Y,
  CUE_START_POS_X,
  STICK_HEIGHT,
  playerTurn
} from "./vars.js"

const bounds = createBoundingBox(
  60, 50,
  renderer.width - 120, renderer.height - 100,
  1000
)
const cueball = createBall(
  CUE_START_POS_X,
  START_POS_Y,
  BALL_RADIUS,
  "white"
)
const balls = stackpyramid(
  START_POS_X,
  START_POS_Y,
  BALL_RADIUS,
  4
)
const holes = createholes(
  renderer.width - 120,
  renderer.height - 100,
  60,
  50
)
const stick = createStick(
  0,
  START_POS_Y,
  STICK_WIDTH,
  STICK_HEIGHT
)
cueball.addTag("cueball")
stick.addTag("stick")
startGame()
game.registerSystem("stick", new StickManager(game, stick, cueball, balls))

function startGame() {
  game.add(createBackground(renderer.width, renderer.height))
  addToManager(game, bounds)
  addToManager(game, holes)
  game.add(cueball)
  addToManager(game, balls)
  game.add(stick)
  playerTurn.value = true
}

function endGame() {
  game.clear()
}

function stackpyramid(x, y, radius = 10, no = 5) {
  const balls = []
  let dy = y - (radius * no / 2) - (radius * 2)
  for (let i = no; i > 0; i--) {
    dy += radius
    for (let j = 0; j < i; j++) {
      let entity = createBall(x + radius * i * 2, dy + radius * j * 2, radius)
      balls.push(entity)
    }
  }
  return balls
}

function createholes(width, height, offX, offY, radius) {
  const topleft = createHole(offX, offY, radius)
  const topMiddle = createHole(offX + width / 2, offY, radius)
  const topRight = createHole(offX + width, offY, radius)
  const bottomleft = createHole(offX, offY + height, radius)
  const bottomMiddle = createHole(offX + width / 2, offY + height, radius)
  const bottomRight = createHole(offX + width, offY + height, radius)

  return [
    topleft,
    topMiddle,
    topRight,
    bottomleft,
    bottomMiddle,
    bottomRight
    ]
}

function addToManager(manager, entities) {
  for (let i = 0; i < entities.length; i++) {
    manager.add(entities[i])
  }
}

function createBoundingBox(x, y, w, h, t = 20) {
  let l1 = createBound(
    x + w / 2,
    y - t / 2,
    w - BALL_RADIUS * 4,
    t,
    0
  )
  let l2 = createBound(
    x + w + t / 2,
    y + h / 2,
    t,
    h - BALL_RADIUS * 4,
    0
  )
  let l3 = createBound(
    x + w / 2,
    y + h + t / 2,
    w - BALL_RADIUS * 4,
    t,
    0
  )
  let l4 = createBound(
    x - t / 2,
    y + h / 2,
    t,
    h - BALL_RADIUS * 4,
    0
  )
  return [l1, l2, l3, l4]
}
/*setTimeout(() => {
  game.getSystem("stick").shoot(100)
}, 500)/**/