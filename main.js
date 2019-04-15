var target ="shakespearean monkey";
var population =[];
var generation=0;
var populationcount=200;
var mutationrate=0.01;
var matingpool=[];
var bestever=null;
var bestofthisgen=[];
function setup(){
  createCanvas(600,600);
  target=target.split("");
  for(let i=0;i<populationcount;i++){
    population[i] = new DNA();
  }
}

function draw(){
  //evaluation of fitness
  for(let i=0;i<population.length;i++){
    population[i].calcfitness();
    let n= population[i].fitness*100;
    if(i==0){
      bestofthisgen.push(population[i]);
    }
    else{ if((n/100)>bestofthisgen[generation].fitness){
      bestofthisgen.splice(generation,1,population[i]);
      }
    }
    for(let j=0; j<n;j++){
      matingpool.push(population[i]);
    }
  }
  if(generation==0){
    bestever=bestofthisgen[generation];
  }
  else{ if(bestofthisgen[generation].fitness > bestever.fitness){
    bestever=bestofthisgen[generation];
    }
  }
  //reproduction
  for(let i=0; i<populationcount;i++){
    let m = floor(random(matingpool.length));
    let n = floor(random(matingpool.length));
    var child=reproduce(matingpool[m],matingpool[n]);
    population.splice(i,1,child);
  }

  showinfo();
  //if target is reached
  if(bestever.fitness==1){
    noLoop();
  }
  generation++;
  matingpool.splice(0,matingpool.length);
}

function reproduce(a,b){
  //crossover
  var child = new DNA;
  for(let i=0;i<target.length;i++){
    let p=random(1);
    if(p<0.5){
      child.data.splice(i,1,a.data[i]);
    } else{
      child.data.splice(i,1,b.data[i]);
    }
  }
  //mutation
  for(let i=0;i<target.length;i++){
    let p= random(1);
    if(p<mutationrate){
      child.data.splice(i,1,String.fromCharCode(randomfloor()));
    }
  }
  return child;
}

function showinfo(){
  //console.log(bestofthisgen[generation].data.join(""));
    background(255);
    noFill();
    stroke(0);
    rect(0,0,width-2,height-2);
    fill(0);
    textSize(10);
    for(let i=generation;i>=0;i-=1){
      text(bestofthisgen[i].data.join(""),400,570-12*(generation-i));
    }
    textSize(14);
    text("Target Phrase : "+target.join(""),10,200)
    text("Best Phrase : "+bestever.data.join(""),10,230)
    text("Population : "+populationcount,10,260)
    text("Generations : "+generation,10,290)
    text("Mutation : "+mutationrate,10,320)


}
