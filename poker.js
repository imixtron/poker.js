// poker.js

const Hand = require('pokersolver').Hand;
const Chance = require('chance');

winningHands =
  {
    'Royal Flush': 9,
    'Straight Flush': 8,
    'Four of a Kind': 7,
    'Full House': 6,
    'Flush': 5,
    'Straight': 4,
    'Three of a Kind': 3,
    'Two Pair': 2,
    'Pair': 1,
    'High Card': 0,
  };

function generator(_count) {
  chance = new Chance();
  suites = ['h', 's', 'd', 'c'];
  cards = ['A', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K'];
  
  // royalHand = ['Qc', 'Ac', 'Kc', 'Jc', 'Tc'];

  let hand = []; //['3h', '5c', '4d', 'Qh', '6c'];
  for (let i = 0; i < 5; i++) {
    card = null;
    do {
      card = generateCard();
      card = hand.indexOf(card) >= 0 ? null : card;
    } while (!card);

    hand.push(card);
  }

  if (checkRoyalFlush(hand)) {
    solved = 'Royal Flush';
  } else {
    solved = Hand.solve(hand).name;
  }

  hand.push(winningHands[solved]);
  console.log(hand, solved);

  return normaliseHandForDataSet(hand);

}

function generateCard() {
  suiteIn = chance.integer({ min: 0, max: 3 });
  cardIn = chance.integer({ min: 0, max: 12 });
  suite = suites[suiteIn];
  card = cards[cardIn];

  return `${card}${suite}`;
}

function normaliseHandForDataSet(hand) {
  retHand = [];
  hand
    .forEach(card => {
      if (typeof card === 'string') {
        retHand.push(suites.indexOf(card[1]) + 1);
        retHand.push(cards.indexOf(card[0]) + 1);
      } else {
        retHand.push(card);
      }
    });
  return retHand;
}

function checkRoyalFlush(hand) {
  sameSuit = true;
  flushHand = ['A', 'T', 'J', 'Q', 'K'];
  sortedHand = hand
    .sort((card1, card2) => {
      sameSuit = card1[1] === card2[1];
      return cards.indexOf(card1[0]) - cards.indexOf(card2[0])
    })

  if (!sameSuit) return false;

  royalFam = !sortedHand
    .some((card, i) => !(card[0] === flushHand[i]));

  return royalFam;

}

function init() {
  arr = "S1,C1,S2,C2,S3,C3,S4,C4,S5,C5,Class\n";
  for (let i = 0; i < 10000; i++) {
    card = generator();
    arr += card.join(',') + '\n';
  }
  const fs = require('fs');
  fs.writeFile("test.csv", arr, function (err) {
    if (err) {
      return console.log(err);
    }

    console.log("The file was saved!");
  });
}; 
init();
// console.log( generator() );

