
function lineToDot() {
    let canvas = document.querySelector('canvas');
    canvas.width = document.body.offsetWidth;
   canvas.height = canvas.width*0.65;
    let ctx = canvas.getContext('2d');
    let mX, mY;
    let pos = createPosition();

    function createArc() {
        for (let i = 0; i < pos.length; i++) {
            ctx.beginPath();
            ctx.arc(pos[i].x,pos[i].y,1,Math.PI*2,false);
            ctx.moveTo(pos[i].x,pos[i].y);

            if (Math.abs(mX - pos[i].x) < 60 && Math.abs(mY - pos[i].y ) < 60) {
                ctx.lineTo(mX, mY)
            }
            ctx.fillStyle = 'white';
            ctx.strokeStyle = 'white';
            ctx.fill();
            ctx.stroke();
            ctx.closePath();
        }
    }
    createArc();
    canvas.addEventListener('mousemove', (e) => {
        mX = e.clientX;
        mY = e.clientY;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        createArc();

    });

    function createPosition() {
        let w = canvas.width;
        let h = canvas.height;
        let count = w * h * 5 / 10000;
        let posArr = [];
        for (let i = 0; i < count; i++) {
            posArr.push({
                x: Math.floor(Math.random() * w - 10),
                y: Math.floor(Math.random() * h - 10)
            })
        }
        return posArr;
    }
};

function snow() {
    let canvas = document.querySelector('canvas');
    canvas.width = document.body.offsetWidth;
    canvas.height = canvas.width * 0.65;
    let ctx = canvas.getContext('2d');
    let flakes = [];

    class Flake{
        constructor(){
            this.x = Math.floor(Math.random()*canvas.width);
            this.y = 0;
            this.layer = Math.floor(Math.random()*9+1);
            this.r = 3-this.layer*0.2
        }
        createFlake(){
            ctx.beginPath();
            ctx.arc(this.x,this.y,this.r,0,Math.PI*2,false);
            ctx.fillStyle = 'white';
            ctx.fill();
        }
    }

    function moveFlake() {
        let timer = setInterval(()=>{
            ctx.clearRect(0,0,canvas.width,canvas.height);
            for (let i = 0; i < 3 ; i++) {
                flakes.push(new Flake());
            }
            for (let i = 0; i <flakes.length ; i++) {
                flakes[i].y=flakes[i].y+20-flakes[i].layer*2
                flakes[i].createFlake();
                if (flakes[i].y >= canvas.height){
                    flakes.splice(i,1)
                }
            }
        },50)
    }
    moveFlake();
};

function stars(){
    let canvas = document.querySelector('canvas');
    canvas.width = document.body.offsetWidth;
    canvas.height = canvas.width * 0.65;
    let ctx = canvas.getContext('2d');

    let radius = 1,
        starsIndex = 0,
        stars = [],
        TWO_PI = Math.PI*2,
        centerX = innerWidth/2,
        centerY = innerHeight/2,
        focalLength = 100,
        starRadius = null,
        starX = null,
        starY = null,
        numStars = 2000,
        mouse = {},
        starX_dir = 0,
        starY_dir = 0;

    canvas.addEventListener('mousewheel', function(e){
        if(e.deltaY < 0){
            focalLength *= 1.1;
        }else{
            focalLength /= 1.1;
        }

        if(focalLength >= innerWidth){
            focalLength = innerWidth - 20;
        }else if(focalLength < 100){
            focalLength = 100;
        }

    }, false);

    class Star{
        constructor() {
            this.x = x;
            this.y = y;
            this.z = z;
            this.radius = radius;
            this.color = "#fff";
            starsIndex++;
            stars[starsIndex] = this;
            this.id = starsIndex;
        }

        update (){
            starX = (this.x - centerX) * (focalLength / this.z);
            starX += centerX;

            starY = (this.y - centerY) * (focalLength / this.z);
            starY += centerY;

            starRadius = radius * (focalLength / this.z);

            starX += starX_dir;
            starY += starY_dir;

            this.z += -10;

            if(this.z <= 0){
                this.z = parseInt(innerWidth);
            }
            this.draw();
        };
        draw (){
            ctx.beginPath();
            ctx.arc(starX,starY,starRadius, TWO_PI, false);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.closePath();
        }
    }

    let s;
    for(s = 0; s < numStars; s++){
        x = Math.random() * innerWidth;
        y = Math.random() * innerHeight;
        z = Math.random() * innerWidth;
        new Star(x,y,z);
    }
    function animate(){
        requestAnimationFrame(animate);
        ctx.fillStyle = "#000";
        ctx.fillRect(0,0,innerWidth,innerHeight);
        for( let i in stars){
            stars[i].update();
        }
    }
    animate();
}


