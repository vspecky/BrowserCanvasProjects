const mSlid = document.getElementById('m-slid');
const mInp = document.getElementById('m-inp');
mSlid.oninput = _ => {
    const newVal = Number(mSlid.value);
    mInp.value = mSlid.value;
    spr.setm(newVal);
    spr.draw();
}

mInp.oninput = _ => {
    const newVal = Number(mInp.value);
    mSlid.value = mInp.value;
    spr.setm(newVal);
    spr.draw();
}

const n1Slid = document.getElementById('n1-slid');
const n1Inp = document.getElementById('n1-inp');
n1Slid.oninput = _ => {
    const newVal = Number(n1Slid.value);
    n1Inp.value = n1Slid.value;
    spr.setn1(newVal);
    spr.draw();
}

n1Inp.oninput = _ => {
    const newVal = Number(n1Inp.value);
    n1Slid.value = n1Inp.value;
    spr.setn1(newVal);
    spr.draw();
}

const n2Slid = document.getElementById('n2-slid');
const n2Inp = document.getElementById('n2-inp');
n2Slid.oninput = _ => {
    const newVal = Number(n2Slid.value);
    n2Inp.value = n2Slid.value;
    spr.setn2(newVal);
    spr.draw();
}

n2Inp.oninput = _ => {
    const newVal = Number(n2Inp.value);
    n2Slid.value = n2Inp.value;
    spr.setn2(newVal);
    spr.draw();
}

const n3Slid = document.getElementById('n3-slid');
const n3Inp = document.getElementById('n3-inp');
n3Slid.oninput = _ => {
    const newVal = Number(n3Slid.value);
    n3Inp.value = n3Slid.value;
    spr.setn3(newVal);
    spr.draw();
}

n3Inp.oninput = _ => {
    const newVal = Number(n3Inp.value);
    n3Slid.value = n3Inp.value;
    spr.setn3(newVal);
    spr.draw();
}

const aSlid = document.getElementById('a-slid');
const aInp = document.getElementById('a-inp');
aSlid.oninput = _ => {
    const newVal = Number(aSlid.value);
    aInp.value = aSlid.value;
    spr.seta(newVal);
    spr.draw();
}

aInp.oninput = _ => {
    const newVal = Number(aInp.value);
    aSlid.value = aInp.value;
    spr.seta(newVal);
    spr.draw();
}


const bSlid = document.getElementById('b-slid');
const bInp = document.getElementById('b-inp');
bSlid.oninput = _ => {
    const newVal = Number(bSlid.value);
    bInp.value = bSlid.value;
    spr.setb(newVal);
    spr.draw();
}

bInp.oninput = _ => {
    const newVal = Number(bInp.value);
    bSlid.value = bInp.value;
    spr.setb(newVal);
    spr.draw();
}