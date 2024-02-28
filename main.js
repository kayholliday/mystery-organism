// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum,
    dna,
    mutate() { //randomly select a DNA base and changes current base to different base and then returns object's new DNA
      let randomBase = Math.floor(Math.random()*this.dna.length); //randomly selects a base in dna
      let newBase = returnRandBase(); //uses previous function to return a random DNA base
        while (newBase === this.dna[randomBase]) { //loops through dna while the new base is the same as one in dna
          newBase = returnRandBase();
        }
        this.dna[randomBase] = newBase;
        return this.dna; //returns new base to dna
    },
    compare(arr) {
      let matches = [];//new array of matching bases from compared dna
      for (let i = 0; i < this.dna.length; i++){ //iterate through this list of bases
          if (arr.dna[i] === this.dna[i]){ //if entered object has the same base at the same index put the base into a new array 
            matches.push(arr.dna[i]);
          }
      }
      //console.log(matches);
      let percentage = ((matches.length/this.dna.length)*100).toFixed(1);//calculate % bases in common
      console.log(`Specimen ${this.specimenNum} and Specimen ${arr.specimenNum} have ${percentage}% DNA in common`);
    },
    willLikelySurvive() {// if the dna strand contains 60% C or G bases the pAquoer is more likely to survive
      let inCommon = 0;
      for (let i = 0; i < this.dna.length; i++) { //iterate through dna looking for C and G, push these into a new array
        if (this.dna[i] === 'C' || this.dna[i] === 'G'){
          inCommon++;
        }
      }
      if (inCommon/this.dna.length >= 0.6) { //returns true if .6 of dna is C and G
        return true;
      } else {
        return false;
      }
    }
  }
}

const survivors = [];
let specimanNumCounter = 1;

while (survivors.length < 30){
  let pAaequor = pAequorFactory(specimanNumCounter, mockUpStrand());
  if (pAaequor.willLikelySurvive()) {
    survivors.push(pAaequor);
  }
  specimanNumCounter++;
}

console.log(survivors);