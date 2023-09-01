import { randomGenerator } from "../utils";
import User from "./User";

export default class Bubble {
  private _goalSize: number;
  constructor(
    private _x: number,
    private _y: number,
    private _dy: number,
    private _initSize: number,
    private _ctx: CanvasRenderingContext2D | null,
    private _user: User
  ) {
    this._x = _x;
    this._y = _y;
    this._dy = _dy;
    this._initSize = _initSize;
    this._goalSize = 1;
    this._ctx = _ctx;
    this._user = _user;
    this._getDistance = this._getDistance.bind(this);
    this._draw = this._draw.bind(this);
    this.update = this.update.bind(this);
  }

  private _getDistance() {
    const targetDistance = Math.sqrt(
      Math.pow(this._user.getState().x - this._x, 2) +
        Math.pow(this._user.getState().y - this._y, 2)
    );
    if (targetDistance <= this._user.getState().size + this._goalSize) {
      if (this._x > this._user.getState().x) {
        this._x += 1;
      } else {
        this._x -= 1;
      }
    } else {
      if (this._ctx) {
        if (this._y > this._ctx.canvas.height / 1.2) {
          this._x += 0;
        } else if (this._y > this._ctx.canvas.height / 1.5) {
          this._x -= 0.3;
        } else if (this._y > this._ctx.canvas.height / 2.2) {
          this._x += 0.4;
        } else if (this._y > this._ctx.canvas.height / 3) {
          this._x -= 0.2;
        } else if (this._y > this._ctx.canvas.height / 4.4) {
          this._x += 0.3;
        }
      }
    }
  }

  private _draw() {
    if (this._ctx) {
      this._ctx.beginPath();
      this._ctx.lineWidth = 1;
      this._ctx.arc(this._x, this._y, this._goalSize, 0, Math.PI * 2);
      this._ctx.fillStyle = "#ffffff20";
      this._ctx.fill();
      this._ctx.strokeStyle = "#25CCF790";
      this._ctx.stroke();
      this._ctx.closePath();

      this._ctx.beginPath();
      this._ctx.lineWidth = 1;
      this._ctx.arc(
        this._x - this._goalSize * 0.4,
        this._y - this._goalSize * 0.4,
        this._goalSize / 4,
        0,
        -Math.PI * 2
      );
      this._ctx.fillStyle = "#ffffff99";
      this._ctx.fill();
      this._ctx.closePath();
    }
  }

  public update() {
    if (this._ctx) {
      if (this._y + this._goalSize < 0) {
        this._goalSize = 0;
        this._initSize = randomGenerator(2, this._ctx.canvas.height / 25);
        this._x = randomGenerator(
          this._user.getState().viewport.x,
          this._user.getState().viewport.x + this._ctx.canvas.width
        );
        this._y = randomGenerator(
          this._ctx.canvas.height / 1.05,
          this._ctx.canvas.height / 1.2
        );
        this._dy = randomGenerator(1, 3);
      } else {
        if (this._goalSize < this._initSize) {
          this._goalSize += 0.3;
        } else {
          this._y -= this._dy;
        }
      }
    }
    this._draw();
    this._getDistance();
  }
}
