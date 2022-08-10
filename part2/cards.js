const cardsApiUrl = "http://deckofcardsapi.com/api/deck/"
const $container = $(`#container`)
$drawBtn = $(`#draw`)
//1
const draw = $.getJSON(cardsApiUrl + `new/draw`).then(data => {
    const {value, suit } = data.cards[0]
    console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`)
});

//2
let twoCards = []

for(let i=0; i < 2; i++){
    twoCards.push($.getJSON(`${cardsApiUrl}new/draw`));
}

Promise.all(twoCards).then(cards => {
    for(let card of cards){
        const {value, suit } = card.cards[0]
       console.log(`${value} of ${suit}`)
}})

//3
const deck = $.getJSON(cardsApiUrl + `new/shuffle`).then(data => {
   const deckId = data.deck_id
   $container.attr("data-id", deckId)
   $drawBtn.on('click', drawCard)
});

function drawCard(){
    $container.empty()
   const deckId = $container.attr('data-id')
    $.getJSON(`${cardsApiUrl}/${deckId}/draw`).then(data => {
        const {image} = data.cards[0]
        $container.append(`<img src="${image}">`)
        $container.append(`<p>CARDS LEFT: ${data.remaining}</p>`)
        if(data.remaining === 0){
            $drawBtn.remove()
            $container.prepend(`<p>NO MORE CARDS</p>`)
        }
    });  
}

