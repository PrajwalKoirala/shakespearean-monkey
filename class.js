DNA = function(){
  this.data=[];
  this.fitness=0;
  for(let i=0;i<target.length;i++){
    this.data[i]=String.fromCharCode(randomfloor());
  }
}

DNA.prototype.calcfitness = function(){
  var count=0;
  for(let i=0;i<this.data.length;i++){
    if(this.data[i]==target[i]){
      count++;
    }
  }
  this.fitness= (count/this.data.length);
}
function randomfloor(){
  let p = floor(random(65,123));
  if(p==95) p=32;
  if(p==96) p=46;
  return p;
}
