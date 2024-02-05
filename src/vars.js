import {
  World,
  Renderer2D,
  Input,
  createManager,
  DOMEventHandler,
  Signal
} from "../lib/chaos.module.js"

export const game = createManager()
export const renderer = new Renderer2D()
export const world = new World()
export const DOMevents = new DOMEventHandler()
export const input = new Input(DOMevents)

renderer.bindTo("#can")
renderer.setViewport(innerWidth, innerHeight / 3)
world.linearDamping = 0.005
game.registerSystem("renderer", renderer)
game.registerSystem("world", world)


export const playerTurn = new Signal(true)
export const scratch = new Signal(false)
export const ballIntoHole = new Signal(0)
export const power = new Signal(0)
export const START_POS_X = renderer.width / 1.5
export const START_POS_Y = renderer.height / 2
export const CUE_START_POS_X = 200
export const BALL_RADIUS = 15
export const STICK_WIDTH = 400
export const STICK_HEIGHT = 10

playerTurn.addListener((signal) => {
  let element = document.querySelector("#player-turn")
  if (signal.value)
    element.innerHTML = "Player 1"
  else
    element.innerHTML = "Player 2"
})
power.addListener((signal)=>{
  let element = document.querySelector("#power-meter")
  element.value = signal.value
})