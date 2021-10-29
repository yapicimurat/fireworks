class Firework
{
   constructor(targetX,targetY,colors)
   {
      
      this.colors = colors;
      this.targetX = targetX;
      this.targetY = targetY;
      
      this.speed = 7;
       
      this.height = random(25,50);
      this.bottomX = random(10, width - 11);
      this.bottomY = height - 10;
     
      this.topX = this.bottomX;
      this.topEffectX = this.bottomX;
      this.topY = this.bottomY - this.height;
      this.targetAngle = atan2(this.topY - this.targetY,this.topX - this.targetX);
       
      this.isExplodedRocket = false;
      this.isEndedExplosion = false;
     
      this.rocketParticles = [];
     
      this.explosionParticles = null;
      this.explosionParticlesDisplay = 20;
      this.init();
     
   }
  
   init()
   {
      for(let i = 1;i <= 5;i++)
      {
        
          this.rocketParticles.push({
            x: 0,
            y: 0,
            vx: cos(ceil(random(-181,180)) * 1),
            vy: sin(ceil(random(-181,180)) * 1),
            color: ["orange","red","yellow"][ceil(random(-1,1)) * 1],
            speed: 3,
            angle: ceil(random(-1,360)) * 1,
            r: ceil(random(2,5)) * 1
          });
      }
     this.explosionParticles = [];
     
     for(let i = 0;i < 3;i++)
     {
       this.explosionParticles.push({
        x: this.targetX + (i * - 30) + (cos(-180) * 10),
        y: this.targetY,
        angle: -180,
        angleType: "cos",
        color: this.colors[ceil(random(-1,this.colors.length - 1)) * 1]
     });
         
     this.explosionParticles.push({
        x: this.targetX + (i * + 30) + (cos(0) * 10),
        y: this.targetY,
        angle: 0,
        angleType: "cos",
        color: this.colors[ceil(random(-1,this.colors.length - 1)) * 1]
     });
     this.explosionParticles.push({
        x: this.targetX,
        y: this.targetY + (i * - 30) + (sin(-90) * 10),
        angle: -90,
        angleType: "sin",
        color: this.colors[ceil(random(-1,this.colors.length - 1)) * 1]
     });

     this.explosionParticles.push({
        x: this.targetX,
        y: this.targetY + (i * + 30) + (sin(90) * 10),
        angle: 90,
        angleType: "sin",
        color: this.colors[ceil(random(-1,this.colors.length - 1)) * 1]
     });

     this.explosionParticles.push({
        x: this.targetX + (cos(-45) * i * 30),
        y: this.targetY + (sin(-45) * i * 30),
        angle: -45,
        angleType: "cossin",
        color: this.colors[ceil(random(-1,this.colors.length - 1)) * 1]
     });
     this.explosionParticles.push({
        x: this.targetX + (cos(-135) * i * 30),
        y: this.targetY + (sin(-135) * i * 30),
        angle: -135,
        angleType: "cossin",
        color: this.colors[ceil(random(-1,this.colors.length - 1)) * 1]
     });
     this.explosionParticles.push({
        x: this.targetX + (cos(45) * i * 30),
        y: this.targetY + (sin(45) * i * 30),
        angle: 45,
        angleType: "cossin",
        color: this.colors[ceil(random(-1,this.colors.length - 1)) * 1]
     });
     this.explosionParticles.push({
        x: this.targetX + (cos(135) * i * 30),
        y: this.targetY + (sin(135) * i * 30),
        angle: 135,
        angleType: "cossin",
        color: this.colors[ceil(random(-1,this.colors.length - 1)) * 1]
     });
     }
     
     
   }
    
  
   draw()
   {
     
     const distToTarget = dist(this.topX,this.topY,this.targetX,this.targetY);
     
     if(distToTarget <= this.speed)
     {
       this.isExplodedRocket = true;
       this.drawExplosion();
       
     }
     else
     {
         const angleForBottom = atan2(this.bottomY - this.topY,this.bottomX - this.topX);
         
         this.bottomX += cos(angleForBottom) * this.speed * -1;
         this.bottomY += sin(angleForBottom) * this.speed * -1;
        
         
       
         this.topX += cos(this.targetAngle) * this.speed * -1;
         this.topY += sin(this.targetAngle) * this.speed * -1;
         
         push();
         stroke(255);
         strokeWeight(3);
         line(this.bottomX,this.bottomY,this.topX,this.topY);
         pop();
       
         this.drawRocketEffect();
       
     }
     

   }
  
   drawRocketEffect()
   {
       
     
       for(let i in this.rocketParticles)
       {
           push();
           const particle = this.rocketParticles[i];
         
           particle.angle += 55;
         
           particle.x = this.bottomX;
           particle.y = this.bottomY;
           
           
           particle.x += cos(particle.angle) * 3;
           particle.y += sin(particle.angle) * 3;
          
           
           noStroke();
           fill(particle.color);
           circle(particle.x,particle.y,particle.r);
           
         
           pop();
       }
     
   }
  
  drawExplosion()
  {
    if(Array.isArray(this.explosionParticles))
    {
      
      for(let i in this.explosionParticles)
      {
          push();
          
          const particle = this.explosionParticles[i];
          const particleAngle = particle.angle;
          const particleAngleType = particle.angleType;
        
          switch(particleAngleType)
          {
            case "cos":
              particle.x += cos(particleAngle) * 5;
              break;
            case "sin":
              particle.y += sin(particleAngle) * 5;
              
              break;
            case "cossin":
              
               particle.x += cos(particleAngle) * 5;
               particle.y += sin(particleAngle) * 5;
              break;
            
          }
          fill(particle.color);
          circle(particle.x,particle.y,5);          
        
          pop();
      }
      
      
      
    }
    
    if(Array.isArray(this.explosionParticles) && this.explosionParticlesDisplay-- == 0)
    {
       this.isEndedExplosion = true;
            
    }
    
  }
               
}
