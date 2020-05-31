class Supershapes {
    constructor(canvasWidth, canvasHeight) {
        this.rScale = 100;
        this.xCenter = canvasWidth / 2;
        this.yCenter = canvasHeight / 2;
        this.n1 = 1;
        this.n2 = 1;
        this.n3 = 1;
        this.m = 1;
        this.a = 1;
        this.b = 1;
    }

    setn1(n1) {
        this.n1 = n1;
    }

    setn2(n2) {
        this.n2 = n2;
    }

    setn3(n3) {
        this.n3 = n3;
    }

    setm(m) {
        this.m = m;
    }

    seta(a) {
        this.a = a;
    }

    setb(b) {
        this.b = b;
    }

    draw() {
        push();
        translate(this.xCenter, this.yCenter);
        stroke(255);
        strokeWeight(3);
        background(0);

        for (let i = 0; i < 360; i += 0.1) {
            const phi = radians(i);

            const cosTerm = pow(abs(cos(this.m * phi / 4)) / this.a, this.n2);
            const sinTerm = pow(abs(sin(this.m * phi / 4)) / this.b, this.n3);

            const r = (1 / pow(cosTerm + sinTerm, 1 / this.n1)) * this.rScale;

            point(r * cos(phi), r * sin(phi));
        }
        pop();
    }
}