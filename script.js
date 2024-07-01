function range(start, end) {
  var ans = [];
  for (let i = start; i <= end; i++) {
    ans.push(i);
  }
  return ans;
}
var objectsPerCardInput = document.getElementById("objects-per-card");
var cardQuantityOutput = document.getElementById("card-quantity");
var imagesInput = document.getElementById("images-input");
var listOfCardsOutput = document.getElementById("list-of-cards-output");
var objectsPerCardOutput = document.getElementById("objects-per-card-output");
var imagesOnList = document.getElementById("images-on-list");

imagesInput.addEventListener("input",(event)=>{
  let imagesList = event.target.value.split(",")
  imagesOnList.innerHTML = imagesList.length;
});
function generateCards() {
    var n = parseInt(objectsPerCardInput.value) - 1;
    var cardQuantity = (n * n) + n + 1;
    let imagesList = imagesInput.value.split(",")

    if (imagesList.length <= cardQuantity) {
      alert(`lista de itens deve ser maior que a quantidade de cartas, no caso de ${objectsPerCardInput.value} imagens por carta, deve ter pelo menos ${cardQuantity+1} imagens no campo de lista de imagens`)
    } else {
    objectsPerCardOutput.innerHTML = objectsPerCardInput;
    cardQuantityOutput.innerHTML = cardQuantity;

    // The number of symbols on a card has to be a prime number + 1
    //const numberOfSymbolsOnCard = numberOfCards; // (7 + 1)
    const shuffleSymbolsOnCard = false;
    const cards = [];

    // Add the first set of n+1 cards (e.g., 8 cards)
    for (let i = 0; i <= n; i++) {
      // Add a new card with the first symbol
      cards.push([1]);
      // Add n+1 symbols on the card (e.g., 8 symbols)
      for (let j = 0; j < n; j++) {
        cards[i].push((j + 1) + (i * n) + 1);
      }
    }

    // Add n sets of n cards
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        // Append a new card with 1 symbol
        cards.push([i + 2]);
        // Add n symbols on the card (e.g., 7 symbols)
        for (let k = 0; k < n; k++) {
          const val = (n + 1 + n * k + (i * k + j) % n) + 1;
          cards[cards.length - 1].push(val);
        }
      }
    }

    // Shuffle symbols on each card
    if (shuffleSymbolsOnCard) {
      for (const card of cards) {
        card.sort(() => Math.random() - 0.5);
      }
    }

    // Output all cards
    let i = 0;
    listOfCardsOutput.innerHTML = "";
    for (const card of cards) {
      i++;
      let line = `${i} - [`;
      for (const number of card) {
        line = `${line}${imagesList[number]},`;
      }
      line = line.slice(0, -2) + "]";
      listOfCardsOutput.innerHTML += "<b>" + line + "</b><br>"
    }
  }
}