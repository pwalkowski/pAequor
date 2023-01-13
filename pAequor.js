// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)] 
}

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
}

// create pAequor object
function pAequorFactory(number, dna) {

  return {
    specimenNum: number,
    dna: dna,
  
    // method to mutate a random base 
    mutate() {

    index = Math.floor(Math.random() * 15);
    let randomBase = dna[index];
    let newRandomBase = '';
    
    do {
      newRandomBase = returnRandBase();
    } while (newRandomBase === randomBase);

    dna[index] = newRandomBase;
  },

    // method to compare DNA strands
    compareDNA(obj) {

      let match = 0;

      for (let i = 0; i < 15; i++) {
    
          if (this.dna[i] === obj.dna[i]) match++;
        
      }

      percentage = Math.round((match / 15) * 100);

      message = `Specimen ${this.specimenNum} and specimen ${obj.specimenNum} have ${percentage}% DNA in common.`;
      console.log(message);

      return percentage; // needed for relation comparison later on
    },

    // method to check if pAequor is likely to survive
    willLikelySurvive() {

      let match = '';

      for (let i = 0; i < 15; i++) if (this.dna[i] === 'C' || this.dna[j] === 'G') match++;

      if (match >= 9) return true; // (9 is 60% of 15)
      else return false;
    },

    // method to create a complementary strand
    complementStrand() {

      let complementaryStrand = [];

      for (let i = 0; i < 15; i++) {

        switch (this.dna[i]) {

          case 'A': complementaryStrand[i] = 'T'; break;
          case 'T': complementaryStrand[i] = 'A'; break;
          case 'C': complementaryStrand[i] = 'G'; break;
          case 'G': complementaryStrand[i] = 'C'; break;

        }
       
      }

      return complementaryStrand;
    }

  }

} 

// function to creat 30 instances of pAequor with random strands
function createpAequorInstances() {

  const instancesArray = [];

  for (let i = 0; i < 30; i++) {

    instancesArray.push(pAequorFactory(i, mockUpStrand()));
  }

  return instancesArray;
}

const pAequorInstances = createpAequorInstances();

// function to find 2 most related instances
function mostRelated(pAequorArray) {

  // create an object of relation
  function createRelation(specimenNum1, specimenNum2, relationPercentage) {
  
  const relationObj = {

    specimenNum1,     // the number of first specimen
    specimenNum2,     // the number of second specimen
    relationPercentage  // percentage of matching DNA

  }

  return relationObj;
  }

  const relationsArray = []; // this array will store relation objects
  let n = 0; // iterator for relationsArray;

  // function for sorting relations object array
  function compareRelations(element1, element2) {

      if (element1.relationPercentage < element2.relationPercentage) return -1;
      else if (element1.relationPercentage > element2.relationPercentage) return 1;
      else if (element1.relationPercentage === element2.relationPercentage) return 0;
  }

  // iterating through the pAequorArray, comparing the instances' DNA and creating the relations array
  for (let i = 0; i < 30; i++) {

    for (let j = 0; j < 30; j++) {

      if (i === j) continue; // skip checking the same instances
      
      relationsArray[n] = createRelation(pAequorArray[i].specimenNum, pAequorArray[j].specimenNum, pAequorArray[i].compareDNA(pAequorArray[j]));
      n++;
    }
  }

  // sort the array and reverse, the highrst percentages will be at the beginning of the array
  relationsArray.sort (compareRelations);
  relationsArray.reverse();

  return relationsArray;
}

// create relations array
const relations = mostRelated(pAequorInstances);

console.log(`Two most related instances of pAequor are specimen ${relations[0].specimenNum1} and specimen ${relations[0].specimenNum2}`);
