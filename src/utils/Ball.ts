import { autobind } from 'core-decorators';

@autobind
export default class Ball {
    // 공의 위치
    private _x: number;
    private _y: number;

    // 공의 색
    private readonly _color: string;

    // 공의 반지름
    private readonly _size: number;

    // 공이 출발할 각도
    private readonly _angle: number;

    // 공의 세기
    private readonly _power: number;

    // 공이 좌우로 움직이는 값
    private _directionX: number;

    // 공이 상하로 움직이는 값
    private _weight: number;

    private _canvas: HTMLCanvasElement;
    private _context: CanvasRenderingContext2D;

    private readonly _text: string;

    constructor(canvas: HTMLCanvasElement, text: string) {
        canvas.height = canvas.width;
        this._x = canvas.width * 0.5;
        this._y = canvas.height * 0.5;
        this._color = `rgba(${Math.random() * 100 + 100}, 99, 255)`;
        this._size = 40;
        this._angle = Math.random() * (Math.PI * 2);
        this._power = Math.random() + 0.5;
        this._directionX = this._power * Math.cos(this._angle);
        this._weight = this._power * Math.sin(this._angle);
        this._canvas = canvas;
        this._context = canvas.getContext('2d');
        this._text = text;
    }

    update() {
        this.move();
        this.bound();
        this.draw();
    }

    private move() {
        this._y += this._weight;
        this._x += this._directionX;
    }

    private bound() {
        // 상하 바운드 시 방향 전환
        if (this._y + this._size > this._canvas.height || this._y - this._size < 0) {
            this._weight *= -1;
        }

        // 좌우 바운드 시 방향 전환
        if (this._x > this._canvas.width - this._size || this._x - this._size < 0) {
            this._directionX *= -1;
        }
    }

    private draw() {
        this._context.fillStyle = this._color;
        this._context.beginPath();
        this._context.arc(this._x, this._y, this._size, 0, Math.PI * 2, true);
        this._context.closePath();
        this._context.fill();

        this._context.font = '43px 돋움 bold';
        this._context.fillStyle = 'white';
        let textX = this._x - this._size / 2;
        if (this._text.length === 1) textX += this._size / 5;
        this._context.fillText(this._text, textX, this._y + this._size / 2 - this._size / 8, this._size);
    }
}
