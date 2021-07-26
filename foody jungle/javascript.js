function init() 
{
var canvas=document.getElementById("mycanvas");
var scoreboard=document.getElementById("scoreboard");
pen2=scoreboard.getContext('2d');
W=canvas.width=1000;
H=canvas.height=400;
score=0;
pen=canvas.getContext("2d");
gameover=false;
cs=50;
// making the food array
food_Arr=[];

pizza=new Image();
pizza.src="pizza.png";
food_Arr.push(pizza);
laddu=new Image();
laddu.src="laddu.png";
food_Arr.push(laddu);
burger=new Image();
burger.src="burger.png";
food_Arr.push(burger);
apple=new Image();
apple.src="apple.png";
food_Arr.push(apple);
coke=new Image();
coke.src="coke.png";
food_Arr.push(coke);
icecream=new Image();
icecream.src="icecream.png";
food_Arr.push(icecream);


tiger_img=new Image();
tiger_img.src="tiger.png";
food_aud=new Audio();
food_aud.src="food.wav";
gameover_aud=new Audio();
gameover_aud.src="gameover.wav";

food=getrandomfood();
snake={
    len:5,
    color:"blue",
    cells:[],
    direction:"right",
    
    createSnake: function()
                {
                    for(var i=1;i<=this.len;i++)this.cells.push({x:i,y:0});
                },
    drawSnake: function(){
        pen.fillStyle=this.color;
        var cs1=cs-(this.cells.length);
        if(cs1<10)cs1=10;
                for(var i=0;i<this.cells.length;i++)
                {
                    pen.drawImage(tiger_img,this.cells[i].x*cs,this.cells[i].y*cs,cs1,cs1);
                    cs1+=1;
                }
                var hx=this.cells[this.cells.length-1].x;
                var hy=this.cells[this.cells.length-1].y;
                for(var i=0;i<this.cells.length-1;i++)
                {
                    if(this.cells[i].x==hx && this.cells[i].y==hy)
                    {
                        gameover=true;
                        break;
                    }
                }
    },
    updateSnake: function()
    {
        var headx=this.cells[this.cells.length-1].x;
        var heady=this.cells[this.cells.length-1].y;
        if(headx==food.x && heady==food.y)
        {
            food_aud.play();
            
            food=getrandomfood();
            score++;
        }
        else
        {
            this.cells.shift();
        }
        var X,Y;
        if(this.direction=="right")
        {
            X=headx+1;
            Y=heady;
        }
        if(this.direction=="left")
        {
            X=headx-1;
            Y=heady;
        }
        if(this.direction=="up")
        {
            X=headx;
            Y=heady-1;
        }
        if(this.direction=="down")
        {
            X=headx;
            Y=heady+1;
        }
        
        this.cells.push({x:X,y:Y});
        var lastx=Math.round(W/cs);
        var lasty=Math.round(H/cs);
        if(X<0 || Y<0 || X>lastx || Y>lasty)
        {
            gameover_aud.play();
            gameover=true;
        }
        
    },
    
};
snake.createSnake();

function keypressed(e)
{
    
    
   if(e.key=="ArrowRight")snake.direction="right";
   if(e.key=="ArrowLeft")snake.direction="left";
   if(e.key=="ArrowDown")snake.direction="down";
   if(e.key=="ArrowUp")snake.direction="up";
}
document.addEventListener('keydown',keypressed);

}

function getrandomfood()
{
    foodx=Math.round((Math.random()*(W-cs))/cs);
    foody=Math.round((Math.random()*(H-cs))/cs);

    
    food_idx=Math.floor(Math.random() * (5 - 0 + 1)) ;
    var food={
        x:foodx,
        y:foody,
        idx:food_idx,
        colour:"red",
    };
    return food;
}
function draw() 
{
    pen.clearRect(0,0,W,H);
    pen2.clearRect(0,0,W,H);
    snake.drawSnake();
    pen.fillStyle=food.colour;
    
    for(var i=0;i<snake.cells.length-1;i++)
    {
        if((food.x==snake.cells[i].x && food.y==snake.cells[i].y))
        {
            food=getrandomfood();
            break;
        }
    }
    
    pen.drawImage(food_Arr[food_idx],food.x*cs,food.y*cs,cs,cs);
    // pen.drawImage(trophy_img,50,50,cs,cs);
    pen2.font="200px bold Verdana";
    pen2.fillStyle="yellow";
    pen2.fillText(score,50,140);
   
}
function update() 
{
    
   snake.updateSnake();
    

}
function gameloop() 
{
    draw();
    if(gameover==true)
    {
        
        clearInterval(f);
        alert("GAME OVER !!");
    }
    update();
}
init();
// draw();
f=setInterval(gameloop,150);