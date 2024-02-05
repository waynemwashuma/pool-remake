import { Vector2 } from "../lib/chaos.module.js"
import { BALL_RADIUS, STICK_WIDTH,playerTurn,ballIntoHole,scratch,power } from "./vars.js"
import { input } from "./vars.js"
export class StickManager {
  rad = Math.PI
  maxStrikeforce = 3100
  energyToNextShot = 10
  _active = true
  activeTouch = true
  powerTurn = false
  lastRad = 0
  touchdelta = { x: 0, y: 0 }
  power = power
  constructor(manager, stick, cueball, balls) {
    this.manager = manager
    this.stick = stick
    this.cueball = cueball
    this.balls = balls
  }
  setShootPower(power) {
    this.power.value = power > 100 ? 100 : power
  }
  setAngle(angle) {
    this.rad = angle % 360
  }
  input() {
    if (input.touch.touches.length) {
      const touch = input.touch.touches[0]

      if (this.activeTouch) {
        const dv = -(this.touchdelta.y - touch.clientY)
        if (this.powerTurn) {
          if (dv > 0)
            this.setShootPower(dv / 2)
        } else {
          this.setAngle(this.lastRad + dv / 200)
        }
      } else {
        this.touchdelta.x = touch.clientX
        this.touchdelta.y = touch.clientY
        if (touch.clientX > innerWidth / 2)
          this.powerTurn = false
        else {
          this.powerTurn = true
        }
      }
      this.activeTouch = true
    } else {
      if (this.activeTouch && this.powerTurn) {
        this.shoot(this.power.value)
      }
      this.lastRad = this.rad
      this.activeTouch = false
    }
  }
  update(dt) {
    if (this._active) {
      this.input()
      let tA = this.stick.get("transform")
      let tB = this.cueball.get("transform")
      let v = Vector2.fromRad(this.rad).multiply(
        STICK_WIDTH / 2 + BALL_RADIUS + 30
      ).add(tB.position)
      tA.position.x = v.x
      tA.position.y = v.y
      tA.orientation.value = this.rad
      return
    }
    let energy = 0
    this.balls.forEach(b => {
      energy += b.get("movable").velocity.magnitude()
    })
    energy += this.cueball.get("movable").velocity.magnitude()
    if (energy > this.energyToNextShot) return
    this.reappear()
  }
  shoot(power) {
    const vel = Vector2.fromRad(this.rad)
      .multiply(
        -power / 100 * this.maxStrikeforce
      )
    this.cueball.get("movable").velocity.add(vel)
    this.disappear()
  }
  reappear() {
    this.manager.add(this.stick)
    this._active = true
    if(!ballIntoHole.value || scratch.value){
      playerTurn.value = !playerTurn.value
    }
    scratch.value = false
    ballIntoHole.value = 0
  }
  disappear() {
    this.manager.remove(this.stick)
    this._active = false
  }
}