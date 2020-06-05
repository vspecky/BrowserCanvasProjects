class Point {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.drawX = null;
        this.drawY = null;
    }
}

class Line {
    constructor(a, b) {
        this.a = a;
        this.b = b;
    }

    draw() {
        line(this.a.drawX, this.a.drawY, this.b.drawX, this.b.drawY);
    }
}

class Shape {
    constructor(points, lines) {
        this.points = points;
        this.lines = lines;
    }

    draw() {
        this.lines.forEach(line => line.draw());
    }

    rotateAboutY(direction) {
        for (const point of this.points) {
            const theta_ = radians(direction === 1 ? 1 : -1);
            const x = point.x;
            const y = point.z;
            const x_ = x * cos(theta_) - y * sin(theta_);
            const y_ = x * sin(theta_) + y * cos(theta_);
            point.x = x_;
            point.z = y_;
        }
    }

    rotateAboutX(direction) {
        for (const point of this.points) {
            const theta_ = radians(direction === 1 ? 1 : -1);
            const x = point.z;
            const y = point.y;
            const x_ = x * cos(theta_) - y * sin(theta_);
            const y_ = x * sin(theta_) + y * cos(theta_);
            point.z = x_;
            point.y = y_;
        }
    }
}

const canvasWidth = 1280;
const canvasHeight = 800;

function getCube() {
    const cA = new Point(-200, 200, -200);
    const cB = new Point(200, 200, -200);
    const cC = new Point(200, 200, 200);
    const cD = new Point(-200, 200, 200);
    const cE = new Point(-200, -200, -200);
    const cF = new Point(200, -200, -200);
    const cG = new Point(200, -200, 200);
    const cH = new Point(-200, -200, 200);

    const CUBE = new Shape(
        [
            cA, cB, cC, cD,
            cE, cF, cG, cH
        ],
        [
            new Line(cA, cB), new Line(cB, cC),
            new Line(cC, cD), new Line(cD, cA),
            new Line(cE, cF), new Line(cF, cG),
            new Line(cG, cH), new Line(cH, cE),
            new Line(cA, cE), new Line(cB, cF),
            new Line(cC, cG), new Line(cD, cH)
        ]
    );

    return CUBE;
}

function getPyramid() {
    const pA = new Point(-200, 200, -200);
    const pB = new Point(200, 200, -200);
    const pC = new Point(200, 200, 200);
    const pD = new Point(-200, 200, 200);
    const pE = new Point(0, -200, 0);

    const PYRAMID = new Shape(
        [
            pA, pB, pC, pD,
            pE
        ],
        [
            new Line(pA, pB), new Line(pB, pC),
            new Line(pC, pD), new Line(pD, pA),
            new Line(pA, pE), new Line(pB, pE),
            new Line(pC, pE), new Line(pD, pE)
        ]
    );

    return PYRAMID;
}

function getTetrahedron() {
    const tA = new Point(200, 200, 200);
    const tB = new Point(-200, -200, 200);
    const tC = new Point(-200, 200, -200);
    const tD = new Point(200, -200, -200);

    const TETRAHEDRON = new Shape(
        [
            tA, tB,
            tC, tD
        ],
        [
            new Line(tA, tB), new Line(tA, tC),
            new Line(tB, tC), new Line(tA, tD),
            new Line(tB, tD), new Line(tC, tD)
        ]
    );

    return TETRAHEDRON;
}