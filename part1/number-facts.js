const numbersApiUrl = "http://numbersapi.com/";
const favorite = 7;
const $factList = $(`#facts`);


//1 with axios...this doesn't return what question is looking for
// let response = axios.get(numbersApiUrl + `${favorite}?json`);

// response
//   .then(data => console.log(data))
  
//1 with jquery method

  $.getJSON(numbersApiUrl + `${favorite}?json`).then(data => {
    console.log(data)});

  //2 

  const numbers = [23, 1, 4, 51342];
  $.getJSON(numbersApiUrl + `${numbers}?json`).then(data => {
    console.log(data);
  });

  //3
function addFacts(fact){
    $factList.append(`<li>${fact.text}</li>`)
}

let fourFacts = [];

for(let i = 0; i < 4; i++){
 fourFacts.push($.getJSON(numbersApiUrl + `${favorite}?json`));
}

Promise.all(fourFacts).then(facts => {
  for(let fact of facts){
    addFacts(fact)
}
})