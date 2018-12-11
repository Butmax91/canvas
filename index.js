let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

let mX, mY ;
let pos = createPosition();
function createRect(){
    for (let i = 0; i <pos.length ; i++) {
        ctx.fillRect(pos[i].x,pos[i].y,6,6);
        ctx.moveTo(pos[i].x+3,pos[i].y+3);
        console.log(mX - pos[i].x);
        if (Math.abs(mX - pos[i].x )< 60 && Math.abs(mY - pos[i].y+3) < 60){

            ctx.lineTo(mX,mY)
        }

    }
}
canvas.addEventListener('mousemove',(e)=>{
    mX = e.clientX;
    mY = e.clientY;
    ctx.clearRect(0,0,canvas.width,canvas.height );
    ctx.beginPath();
    createRect();
    ctx.stroke();

});

function createPosition(){
    let w = canvas.width;
    let h = canvas.height;
    let count = w*h*5/10000;
    let posArr = [];
    for (let i = 0; i <count ; i++) {
        posArr.push({
            x : Math.floor(Math.random()*w-10),
            y : Math.floor(Math.random()*h-10)
        })
    }
    return posArr;
}
createPosition();

