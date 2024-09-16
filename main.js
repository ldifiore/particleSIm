
class Sim {

    static currentTime = 0;
    static deltaTime = 0;
    static Fps = 0;
    static lastTime = 0 ;
    static particles = [];
    static kineticEnergy = 0;   
    static potentialEnergy = 0;


//  TEST ENVIRONMENT    
    static timsecale = 500000;

//  SYSTEM INTIAL CONDITIONS
    static InitSimulation(){

//  PARTICLE SETUP
        //  Sim.particles.push(position (Picometre 10e-12) ,velocity (m/s) ,acceleration (m/s^2) ,force (N) ,mass,charge (fundamental charge 1.602176634e-19 C),size (M),color){
/*
        for (let y = -5 ; y < 5 ; y++){
            for (let x = -5 ; x < 5 ; x++){
                Sim.particles.push(new Particle('custom',new Vector2((x * .1) + .05 ,(y * .1) + .05),new Vector2(0,0),9.1093837e-31,-1,.006,`rgba(120, 174, 225, 1)`));

            }
        }
*/

        //Sim.particles.push(new Particle(new Vector2(0,0),new Vector2(0,0),new Vector2(0,0),new Vector2(0,0),1.67262192e-27,1,.003,`rgba(255, 88, 73, 1)`))
        //Sim.particles.push(new Particle('custom',new Vector2(.01,.01),new Vector2(0,0),9.1093837e-31,-1,.0003,`rgba(120, 174, 225, 1)`));
        //Sim.particles.push(new Particle('custom',new Vector2(-.1,.01),new Vector2(100,0),9.1093837e-31,-1,.0003,`rgba(120, 174, 225, 1)`));
        //Sim.particles.push(new Particle(new Vector2(.17,.08),new Vector2(0,0),new Vector2(0,0),new Vector2(0,0),1.67262192e-27,1.602176634e-19,.003,`rgba(255, 88, 73, 1)`))
        //Sim.particles.push(new Particle(new Vector2(.14,.08),new Vector2(0,92),new Vector2(0,0),new Vector2(0,0),9.1093837e-31,-1.602176634e-19,.0003,`rgba(120, 174, 225, 1)`));    
        //Sim.particles.push(new Particle('custom',new Vector2(-0.001,0),new Vector2(0,0),9.1093837e-31,-1,.0003,`rgba(120, 174, 225, 1)`));
        Sim.particles.push(new Particle('custom',new Vector2(0.001,0),new Vector2(1000,0),9.1093837e-31,-1,.0003,`rgba(120, 174, 225, 1)`));



//  CIRCLE OF ORBITING PARTICLES (FOR SPRING FORCE)
/*
        for (let i  = 0 ; i < 250 ; i++ ){

            let theta = Math.random()*Math.PI*2;
            let radiusRand = Math.sqrt(Math.random());
        //DISTRUBUTION FUNCTION
            radiusRand = radiusRand;  

            let x = Math.cos(theta)*radiusRand;
            let y = Math.sin(theta)*radiusRand;
        //RADIUS
            x *= .01;
            y *= .01;
        //NEW PARTICLE
        Sim.particles.push(new Particle('custom',new Vector2(x,y),new Vector2(0,0),9.1093837e-31,-1,.0006,`rgba(120, 174, 225, 1)`));
        }
*/
/*
        //  CIRCLE OF ORBITING PARTICLES (FOR SPRING FORCE)
        for (let i  = 0 ; i < 250 ; i++ ){

            let theta = Math.random()*Math.PI*2;
            let radiusRand = Math.sqrt(Math.random());
        //DISTRUBUTION FUNCTION
            radiusRand = radiusRand;  

            let x = Math.cos(theta)*radiusRand;
            let y = Math.sin(theta)*radiusRand;
        //RADIUS
            x *= .01;
            y *= .01;
        //NEW PARTICLE
        Sim.particles.push(new Particle('custom',new Vector2(x + .07,y),new Vector2(-y*100000000000,x*100000000000-10000000000),9.1093837e-31,-1,.0003,`rgba(255, 174, 120, 1)`));
        }
*/


        c.fillStyle = 'rgba(0, 0, 0, 1)';
        c.fillRect(0,0,canvas.width,canvas.height);
    }




//  UPDATE SIMULATION
    static Update(){

        Sim.currentTime = performance.now() / 1000;
        Sim.deltaTime = Sim.currentTime - Sim.lastTime;
        Sim.Fps = 1/Sim.deltaTime;
        Sim.deltaTime /= Sim.timsecale;
        Sim.lastTime = Sim.currentTime;

        let num_particles = Sim.particles.length;

        for(let p = 0; p < num_particles; p++){
            Sim.particles[p].PrepForCalcs();
        }

        
        Sim.potentialEnergy = 0;
        for(let p1 = 0; p1 < num_particles; p1++){

            let particle1 = Sim.particles[p1];

            for(let p2 = p1+1; p2 < num_particles; p2++){
                let particle2 = Sim.particles[p2];
                Particle.RunCalc(particle1, particle2);               //calculations
                            //Sim.potentialEnergy += Particle.addPotentialEnergy(particle1, particle2);
            }
        }

        for(let p = 0; p < num_particles; p++){
            Sim.particles[p].ApplyCalcs();
        }

        Sim.kineticEnergy = 0;
        for(let p = 0; p < num_particles; p++){
            
            Sim.particles[p].Update(Sim.deltaTime);
                        //Sim.kineticEnergy += Sim.particles[p].addKineticEnergy();
        }

        Sim.Draw();

    }
    

//  DRAW SIMULATION FRAME
    static Draw(){
        c.fillStyle = 'rgba(0, 0, 0, 1)';
        c.fillRect(0,0,canvas.width,canvas.height);

        DrawUtillsMeter.drawAxes('rgba(100, 100, 100, 1)');
        //sDrawUtillsMeter.drawLine(new Vector2(.1,.1),new Vector2(.1,-.1),'red')

        let num_particles = Sim.particles.length;
        for(let p = 0; p < num_particles; p++){
            let particle = Sim.particles[p];
            particle.Draw();
            
        }


        DrawUtillsMeter.drawText(new Vector2(-.16,-.07),20,'white','wheelDragStartPosition: [' + wheelDragStartPosition[0] + ', ' + wheelDragStartPosition[1] + ']');
        DrawUtillsMeter.drawText(new Vector2(-.16,-.06),20,'white','wheelDragDelta: [' + wheelDragDelta[0] + ', ' + wheelDragDelta[1] + ']');
        DrawUtillsMeter.drawText(new Vector2(-.16,-.05),20,'white','lastWheelDragDelta: [' + lastWheelDragDelta[0] + ', ' + lastWheelDragDelta[1] + ']');
        DrawUtillsMeter.drawText(new Vector2(-.16,-.04),20,'white','totalWheelDragDelta: [' + totalWheelDragDelta[0] + ', ' + totalWheelDragDelta[1] + ']');
        DrawUtillsMeter.drawText(new Vector2(-.16,-.03),20,'white','mouseButtons: [' + mouseButtons[0] + ', ' + mouseButtons[1] + ', ' + mouseButtons[2] + ', ' + mouseButtons[3] + ', ' + mouseButtons[4] +']');
        DrawUtillsMeter.drawText(new Vector2(-.16,-.02),20,'white','FPS: ' + Sim.Fps.toFixed(2));

    }
}




