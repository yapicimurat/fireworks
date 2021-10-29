let targets = [];
let fireworks = [];


function setup() 
{
  createCanvas(750, 750);
  angleMode(DEGREES);
  
}

function draw() 
{
  background(0);
  
  drawFireworks();
  
 
}


function drawFireworks()
{
    for(let i in targets)
    {
      const target = targets[i];
      if(target.firework.isExplodedRocket == false || target.firework.isEndedExplosion == false)
      {
          target.firework.draw();
      }
      else if(target.firework.isExplodedRocket == true && target.firework.isEndedExplosion == true)
      {
        targets.splice(i,1);
      }
      
      
    }
}


function mouseClicked(e)
{
  const firework = new Firework(mouseX,mouseY,["red","blue","green","yellow","white","orange","pink","purple"]);
  
  
  targets.push({
    x: mouseX,
    y: mouseY,
    firework: firework
  });
}