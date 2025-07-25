// * FREECODECAMP LAB SCRIPT
let fortune1 =
  "Ah… this card speaks of a great change on the horizon. Something you've been resisting will soon knock at your door. You must be ready to embrace it.";
let fortune2 =
  "You've drawn the symbol of deep reflection. Someone from your past still lingers in your present… perhaps it's time to confront what remains unresolved.";
let fortune3 =
  "This card reveals a quiet strength within you. Others may not see it, but soon, you'll be called to lead in a way only you can.";
let fortune4 =
  "You are standing at a crossroads. Two paths diverge, both uncertain. Trust your instinct and not your logic for one leads to fulfillment, the other to delay.";
let fortune5 =
  "Hmm… this card brings a warning. There's something hidden in plain sight around you. A truth, perhaps, or a person's true intentions. Pay attention to the small signs.";
let randomNumber = Math.floor(Math.random() * 5 + 1);
let selectedFortune;
switch (randomNumber) {
  case 1:
    selectedFortune = fortune1;
    break;
  case 2:
    selectedFortune = fortune2;
    break;
  case 3:
    selectedFortune = fortune3;
    break;
  case 4:
    selectedFortune = fortune4;
    break;
  case 5:
    selectedFortune = fortune5;
    break;
  default:
    selectedFortune = "";
}
console.log(selectedFortune);

// * TAROT READING SCRIPT INSPIRED FROM THE FORTUNE TELLING FREECODECAMP LAB SCRIPT
const cardData = await getCardData();
let cardIndices = getCardIndices();
let card1 = {};
let card2 = {};
let card3 = {};
let isAudioUnlocked = false;

window.addEventListener("click", unlockAllAudio, { once: true });
window.addEventListener("keydown", unlockAllAudio, { once: true });

// * OKAY
function unlockAllAudio() {
  const windWhistle = document.querySelector(".header__wind-whistle-sfx");
  const dealAll = document.querySelector(".cards__deal-all-sfx");
  const shuffleOut = document.querySelector(".cards__shuffle-out-sfx");
  const shuffleIn = document.querySelector(".cards__shuffle-in-sfx");
  const slide = document.querySelector(".cards__slide-sfx");
  const deal = document.querySelector(".cards__deal-sfx");
  const flip = document.querySelector(".cards__flip-sfx");
  const chime1 = document.querySelector(".cards__chime1-sfx");
  const chime2 = document.querySelector(".cards__chime2-sfx");
  const chime3 = document.querySelector(".cards__chime3-sfx");
  const swoosh = document.querySelector(".cards__swoosh-sfx");
  const piano = document.querySelector(".reveal__piano-sfx");

  if (isAudioUnlocked) return;

  windWhistle.play();
  windWhistle.pause();

  dealAll.play();
  dealAll.pause();

  shuffleOut.play();
  shuffleOut.pause();

  shuffleIn.play();
  shuffleIn.pause();

  slide.play();
  slide.pause();

  deal.play();
  deal.pause();

  flip.play();
  flip.pause();

  chime1.play();
  chime1.pause();

  chime2.play();
  chime2.pause();

  chime3.play();
  chime3.pause();

  swoosh.play();
  swoosh.pause();

  piano.play();
  piano.pause();

  isAudioUnlocked = true;

  window.removeEventListener("click", unlockAllAudio);
  window.removeEventListener("keydown", unlockAllAudio);
}

// * OKAY
async function getCardData() {
  const response = await fetch("./assets/data/card_data.json");
  const promisedData = await response.json();
  return promisedData;
}

// * OKAY
function randomCardIndex() {
  const index = Math.floor(Math.random() * 78);
  return index;
}

// * OKAY
function isSameIndex(index1, index2, index3) {
  return index1 === index2 || index2 === index3 || index1 === index3;
}

// * OKAY
function getCardIndices() {
  let index1 = randomCardIndex();
  let index2 = randomCardIndex();
  let index3 = randomCardIndex();

  while (isSameIndex(index1, index2, index3)) {
    index1 = randomCardIndex();
    index2 = randomCardIndex();
    index3 = randomCardIndex();
  }

  return [index1, index2, index3];
}

// * OKAY
function getCardName(cardIndex) {
  const cardName = cardData.cards[cardIndex].name;
  return cardName;
}

// * OKAY
function getStatus() {
  const coinFlip = Math.round(Math.random());
  if (coinFlip === 1) {
    return "upright";
  } else {
    return "reverse";
  }
}

// * OKAY
function getPosition(n) {
  switch (n) {
    case 1:
      return "past";
    case 2:
      return "present";
    case 3:
      return "future";
    default:
      return null;
  }
}

// * OKAY
function getCardIntro(cardIndex, status) {
  const intro =
    cardData.cards[cardIndex][
      `interpretation_${status === "upright" ? "up" : "rev"}_intro`
    ];
  return intro;
}

// * OKAY
function getCardInterpretation(cardIndex, status, cardPosition) {
  const interpretation =
    cardData.cards[cardIndex][
      `interpretation_${status === "upright" ? "up" : "rev"}_${cardPosition}`
    ];
  return interpretation;
}

//  * OKAY
function getRandomThemeNumber() {
  const randomThemeNumber = Math.floor(Math.random() * 5 + 1);
  return randomThemeNumber;
}

// * OKAY
function getThemeName(themeNumber) {
  let themeName = "";
  switch (themeNumber) {
    case 1:
      return (themeName = "love");
    case 2:
      return (themeName = "career");
    case 3:
      return (themeName = "finances");
    case 4:
      return (themeName = "feelings");
    case 5:
      return (themeName = "actions");
    default:
      return (themeName = null);
  }
}

// * OKAY
function getTheme(status, cardPosition, cardIndex, themeName) {
  const theme =
    cardData.cards[cardIndex][
      `${themeName}_${status === "upright" ? "up" : "rev"}_${cardPosition}`
    ];
  return theme;
}

// * OKAY
function getCardImage(cardIndex) {
  const imageSource = cardData.cards[cardIndex].card_image;
  return imageSource;
}

// * OKAY
function pickCard(n) {
  const status = getStatus();
  const cardIndex = cardIndices[n - 1];
  const cardPosition = getPosition(n);
  const cardName = getCardName(cardIndex);
  const intro = getCardIntro(cardIndex, status);
  const interpretation = getCardInterpretation(cardIndex, status, cardPosition);
  const themeNumber = getRandomThemeNumber();
  const themeName = getThemeName(themeNumber);
  const theme = getTheme(status, cardPosition, cardIndex, themeName);
  const cardImage = getCardImage(cardIndex);

  return {
    cardName: cardName,
    status: status,
    cardIndex: cardIndex,
    cardPosition: cardPosition,
    intro: intro,
    interpretation: interpretation,
    themeName: themeName,
    theme: theme,
    cardImage: cardImage,
  };
}

// * OKAY
function addFadeOutToHeader(header) {
  header.classList.add("fade-out");
}

// * OKAY
function addHiddenToHeader(header) {
  header.classList.add("hidden");
}

// * OKAY
function removeHiddenFromMain(main) {
  main.classList.remove("hidden");
}

// * OKAY
function addFadeInToMain(main) {
  main.classList.add("fade-in");
}

// * OKAY
function createCards() {
  const cardStack = document.querySelector(".cards");
  for (let i = 0; i < 78; i++) {
    let card = document.createElement("div");
    card.classList.add("card");
    cardStack.appendChild(card);
  }
}

createCards();

// * OKAY
function disableCardsButtons() {
  const shuffle = document.querySelector(".cards__shuffle");
  const reveal = document.querySelector(".cards__reveal");

  shuffle.style.pointerEvents = "none";
  reveal.style.pointerEvents = "none";
}

// * OKAY
function enableCardsButtons() {
  const shuffle = document.querySelector(".cards__shuffle");
  const reveal = document.querySelector(".cards__reveal");

  shuffle.style.pointerEvents = "auto";
  reveal.style.pointerEvents = "auto";
}

// * OKAY
function revealCardsButtons() {
  const buttons = document.querySelector(".cards__buttons");

  buttons.classList.remove("hidden");
  buttons.classList.add("fade-in");
}

// * OKAY
function dealCards() {
  const cards = document.querySelectorAll(".card");

  disableCardsButtons();

  dealCardsSFX();

  cards.forEach((card, index) => {
    setTimeout(() => {
      card.style.top = `50%`;
      card.style.left = `50%`;
    }, index * 20);
  });

  setTimeout(() => {
    revealCardsButtons();
    enableCardsButtons();
  }, 2540);
}

// * OKAY
function dealCardsSFX() {
  const dealAll = document.querySelector(".cards__deal-all-sfx");

  dealAll.currentTime = 0;
  dealAll.play();
}

// * OKAY
function animateShuffleCards() {
  const cards = document.querySelectorAll(".card");

  cards.forEach((card, index) => {
    let cut = Math.ceil(Math.random() * 77);
    if (index >= cut) {
      card.style.transform = `translate(calc(-50% + 25px), -160%)`;
      card.style.zIndex = 0;
      shuffleOutSFX();

      setTimeout(() => {
        card.style.zIndex = -1;
        card.style.transform = `translate(-50%, -50%)`;
        shuffleInSFX();
      }, 500);
    }
  });
}

// * OKAY
function shuffleOutSFX() {
  const shuffleOut = document.querySelector(".cards__shuffle-out-sfx");
  shuffleOut.currentTime = 0;
  shuffleOut.play();
}

// * OKAY
function shuffleInSFX() {
  const shuffleIn = document.querySelector(".cards__shuffle-in-sfx");
  shuffleIn.currentTime = 0;
  shuffleIn.play();
}

// * OKAY
function shuffleCards() {
  document.querySelector(".cards__shuffle").addEventListener("click", () => {
    animateShuffleCards();
    cardIndices = getCardIndices();
  });
}

// * OKAY
function revealMain() {
  const button = document.querySelector(".header__cta");
  const header = document.querySelector(".header");
  const main = document.getElementById("main");

  button.addEventListener("click", (e) => {
    e.preventDefault();

    addFadeOutToHeader(header);

    setTimeout(() => {
      windWhistleSFX();
    }, 250);

    setTimeout(() => {
      addHiddenToHeader(header);
      removeHiddenFromMain(main);
      addFadeInToMain(main);
    }, 1000);

    setTimeout(() => {
      dealCards();
      shuffleCards();
    }, 2000);
  });
}

// * OKAY
function windWhistleSFX() {
  const windWhistle = document.querySelector(".header__wind-whistle-sfx");
  windWhistle.currentTime = 0;
  windWhistle.play();
}

revealMain();

// * OKAY
function moveCardsAside() {
  const cards = document.querySelectorAll(".card");

  slideCardsSFX();

  cards.forEach((card, index) => {
    card.style.top = "-25%";
  });
}

// * OKAY
function slideCardsSFX() {
  const slide = document.querySelector(".cards__slide-sfx");

  slide.currentTime = 0;
  slide.play();
}

// * OKAY
function fadeOutCards() {
  const cards = document.querySelector(".cards");
  cards.classList.add("fade-out");
}

// * OKAY
function hideCardsSection() {
  const cards = document.querySelector(".cards");
  cards.style.display = "none";
}

// * OKAY
function showRevealSection() {
  document.querySelector(".reveal").classList.remove("hidden");
}

// * OKAY
function isReverse(cardStatus) {
  if (cardStatus === "reverse") {
    return true;
  } else {
    return false;
  }
}

// * OKAY
function reverseImage(pastStatus, presentStatus, futureStatus) {
  const pastCard = document
    .querySelector(".reveal__past")
    .querySelector(".reveal__card-front");
  const presentCard = document
    .querySelector(".reveal__present")
    .querySelector(".reveal__card-front");
  const futureCard = document
    .querySelector(".reveal__future")
    .querySelector(".reveal__card-front");

  if (isReverse(pastStatus)) {
    pastCard.classList.remove("rotate-180");
    pastCard.classList.add("reverse-rotate-180");
  }

  if (isReverse(presentStatus)) {
    presentCard.classList.remove("rotate-180");
    presentCard.classList.add("reverse-rotate-180");
  }

  if (isReverse(futureStatus)) {
    futureCard.classList.remove("rotate-180");
    futureCard.classList.add("reverse-rotate-180");
  }
}

// * OKAY
function dealFutureCard() {
  const card = document.querySelector(".reveal__future");
  dealCardSFX();
  card.style.zIndex = 1;
  card.style.top = "50%";
  card.style.left = "40%";
}

// * OKAY
function dealPresentCard() {
  const card = document.querySelector(".reveal__present");
  dealCardSFX();
  card.style.zIndex = 2;
  card.style.top = "50%";
}

// * OKAY
function dealPastCard() {
  const card = document.querySelector(".reveal__past");
  dealCardSFX();
  card.style.zIndex = 3;
  card.style.top = "50%";
  card.style.left = "60%";
}

// * OKAY
function dealCardSFX() {
  const deal = document.querySelector(".cards__deal-sfx");
  deal.currentTime = 0;
  deal.play();
}

// * OKAY
function dealThreeCards() {
  const threeCards = document.querySelectorAll(".reveal__three-cards");
  document.querySelector(".cards__reveal").addEventListener("click", () => {
    card1 = pickCard(1);
    card2 = pickCard(2);
    card3 = pickCard(3);

    const pastStatus = card1.status;
    const presentStatus = card2.status;
    const futureStatus = card3.status;

    moveCardsAside();

    setTimeout(() => {
      fadeOutCards();
    }, 1000);

    setTimeout(() => {
      hideCardsSection();
      showRevealSection();
      reverseImage(pastStatus, presentStatus, futureStatus);
    }, 2000);

    setTimeout(() => {
      dealFutureCard();
    }, 2500);

    setTimeout(() => {
      dealPresentCard();
    }, 3000);

    setTimeout(() => {
      dealPastCard();
    }, 3500);

    setTimeout(() => {
      slideCardsSFX();

      threeCards.forEach((card) => {
        card.style.left = "50%";
      });
    }, 4500);

    setTimeout(() => {
      flipPastCard();
    }, 5500);
  });
}

dealThreeCards();

// * OKAY
function resetFades(element) {
  setTimeout(() => {
    element.classList.remove("fade-in");
    element.classList.remove("fade-out");
    void element.offsetWidth;
  }, 1000);
}

// * OKAY
function revealTitlePast() {
  const time = document.querySelector(".reveal__time");
  const name = document.querySelector(".reveal__name");

  time.style.display = "block";
  time.innerHTML = card1.cardPosition;
  time.classList.add("fade-in");
  resetFades(time);

  name.style.display = "block";
  name.innerHTML = `— ${card1.cardName}`;
  name.classList.add("fade-in");
  resetFades(name);
}

// * OKAY
function revealTitlePresent() {
  const time = document.querySelector(".reveal__time");
  const name = document.querySelector(".reveal__name");

  time.style.display = "block";
  time.innerHTML = card2.cardPosition;
  time.classList.add("fade-in");
  resetFades(time);

  name.style.display = "block";
  name.innerHTML = `— ${card2.cardName}`;
  name.classList.add("fade-in");
  resetFades(name);
}

// * OKAY
function revealTitleFuture() {
  const time = document.querySelector(".reveal__time");
  const name = document.querySelector(".reveal__name");

  time.style.display = "block";
  time.innerHTML = card3.cardPosition;
  time.classList.add("fade-in");
  resetFades(time);

  name.style.display = "block";
  name.innerHTML = `— ${card3.cardName}`;
  name.classList.add("fade-in");
  resetFades(name);
}

// * OKAY
function hideTitle() {
  const time = document.querySelector(".reveal__time");
  const name = document.querySelector(".reveal__name");

  time.classList.add("fade-out");
  name.classList.add("fade-out");

  resetFades(time);
  resetFades(name);

  setTimeout(() => {
    time.style.display = "none";
    name.style.display = "none";
  }, 1000);
}

// * OKAY
function rotateCard(card) {
  card.style.transform = `translate(-50%, -50%) rotateZ(180deg)`;
}

// * OKAY
function rotateBackCard(card) {
  card.style.transform = `translate(-50%, -50%) rotateZ(0deg)`;
}

// * OKAY
function flipPastCard() {
  const card = document.querySelector(".reveal__past");
  const cardFront = card.querySelector(".reveal__card-front");
  const cardBack = card.querySelector(".reveal__card-back");
  const cardImage = card1.cardImage;
  cardFront.style.backgroundImage = cardImage;
  const cardStatus = card1.status;

  card.addEventListener(
    "click",
    () => {
      cardBack.classList.add("rotate-180");
      flipCardSFX();

      if (isReverse(cardStatus)) {
        cardFront.classList.remove("reverse-rotate-180");
        cardFront.classList.add("reverse-rotate-0");
      } else {
        cardFront.classList.remove("rotate-180");
        cardFront.classList.add("rotate-0");
      }

      card.addEventListener("click", () => {
        if (isReverse(cardStatus)) {
          slideCardsSFX();
          rotateCard(card);
          card.addEventListener("mouseout", () => {
            rotateBackCard(card);
            slideCardsSFX();
          });
        }
      });

      setTimeout(() => {
        cardFront.style.boxShadow = `var(--BOX-SHADOW-REVEAL-CARD-FRONT)`;

        chime1SFX();
        revealTitlePast();
        showReadCardButton();
      }, 500);
    },
    { once: true }
  );
}

// * OKAY
function flipPresentCard() {
  const card = document.querySelector(".reveal__present");
  const cardFront = card.querySelector(".reveal__card-front");
  const cardBack = card.querySelector(".reveal__card-back");
  const cardImage = card2.cardImage;
  cardFront.style.backgroundImage = cardImage;
  const cardStatus = card2.status;

  card.addEventListener(
    "click",
    () => {
      cardBack.classList.add("rotate-180");
      flipCardSFX();

      if (isReverse(cardStatus)) {
        cardFront.classList.remove("reverse-rotate-180");
        cardFront.classList.add("reverse-rotate-0");
      } else {
        cardFront.classList.remove("rotate-180");
        cardFront.classList.add("rotate-0");
      }

      card.addEventListener("click", () => {
        if (isReverse(cardStatus)) {
          slideCardsSFX();
          rotateCard(card);
          card.addEventListener("mouseout", () => {
            slideCardsSFX();
            rotateBackCard(card);
          });
        }
      });

      setTimeout(() => {
        cardFront.style.boxShadow = `var(--BOX-SHADOW-REVEAL-CARD-FRONT)`;

        chime2SFX();
        revealTitlePresent();
        showReadCardButton();
      }, 500);
    },
    { once: true }
  );
}

// * OKAY
function flipFutureCard() {
  const card = document.querySelector(".reveal__future");
  const cardFront = card.querySelector(".reveal__card-front");
  const cardBack = card.querySelector(".reveal__card-back");
  const cardImage = card3.cardImage;
  cardFront.style.backgroundImage = cardImage;
  const cardStatus = card3.status;

  card.addEventListener(
    "click",
    () => {
      cardBack.classList.add("rotate-180");
      flipCardSFX();

      if (isReverse(cardStatus)) {
        cardFront.classList.remove("reverse-rotate-180");
        cardFront.classList.add("reverse-rotate-0");
      } else {
        cardFront.classList.remove("rotate-180");
        cardFront.classList.add("rotate-0");
      }

      card.addEventListener("click", () => {
        if (isReverse(cardStatus)) {
          slideCardsSFX();
          rotateCard(card);
          card.addEventListener("mouseout", () => {
            slideCardsSFX();
            rotateBackCard(card);
          });
        }
      });

      setTimeout(() => {
        cardFront.style.boxShadow = `var(--BOX-SHADOW-REVEAL-CARD-FRONT)`;

        chime3SFX();
        revealTitleFuture();
        showReadCardButton();
      }, 500);
    },
    { once: true }
  );
}

// * OKAY
function flipCardSFX() {
  const flip = document.querySelector(".cards__flip-sfx");
  flip.currentTime = 0;
  flip.play();
}

// * OKAY
function chime1SFX() {
  const chime1 = document.querySelector(".cards__chime1-sfx");
  chime1.currentTime = 0;
  chime1.play();
}

// * OKAY
function chime2SFX() {
  const chime2 = document.querySelector(".cards__chime2-sfx");
  chime2.currentTime = 0;
  chime2.play();
}

// * OKAY
function chime3SFX() {
  const chime3 = document.querySelector(".cards__chime3-sfx");
  chime3.currentTime = 0;
  chime3.play();
}

// * OKAY
function showReadCardButton() {
  const button = document.querySelector(".reveal__button");

  button.style.display = "block";
  button.style.pointerEvents = "auto";
  button.classList.add("fade-in");
  resetFades(button);
}

// * OKAY
function hideReadCardButton() {
  const button = document.querySelector(".reveal__button");

  button.style.pointerEvents = "none";
  button.classList.add("fade-out");
  resetFades(button);

  setTimeout(() => {
    button.style.display = "none";
  }, 1000);
}

// * OKAY
function getCardPosition() {
  const time = document.querySelector(".reveal__time").textContent;
  return time;
}

// * OKAY
function discardCard() {
  const time = document.querySelector(".reveal__time").textContent;
  const card = document.querySelector(`.reveal__${time}`);

  card.style.top = "-50%";
  card.style.left = "60%";
  slideCardsSFX();
}

// * OKAY
function readCardIntro() {
  const text = document.querySelector(".reveal__content");
  const time = getCardPosition();
  text.style.display = "block";

  switch (time) {
    case "past":
      text.innerHTML = card1.intro;
      text.classList.add("fade-in");
      resetFades(text);
      break;
    case "present":
      text.innerHTML = card2.intro;
      text.classList.add("fade-in");
      resetFades(text);
      break;
    case "future":
      text.innerHTML = card3.intro;
      text.classList.add("fade-in");
      resetFades(text);
      break;
    default:
      text.innerHTML = "";
  }
}

// * OKAY
function modalClick() {
  const modal = document.querySelector(".reveal__interpretation");
  const text = document.querySelector(".reveal__content");
  const button = document.querySelector(".reveal__button");
  const time = getCardPosition();
  let counter = 0;

  modal.addEventListener("click", () => {
    text.classList.add("fade-out");
    resetFades(text);
    swooshSFX();
    counter++;

    setTimeout(() => {
      if (counter === 1) {
        switch (time) {
          case "past":
            text.innerHTML = card1.interpretation;
            text.classList.add("fade-in");
            resetFades(text);
            break;
          case "present":
            text.innerHTML = card2.interpretation;
            text.classList.add("fade-in");
            resetFades(text);
            break;
          case "future":
            text.innerHTML = card3.interpretation;
            text.classList.add("fade-in");
            resetFades(text);
            break;
          default:
            text.innerHTML = "";
        }
      } else if (counter === 2) {
        switch (time) {
          case "past":
            text.innerHTML = `I see that this card echoes something from your past... something deeply connected to your <span class="highlight">${card1.themeName}</span>...`;
            text.classList.add("fade-in");
            resetFades(text);
            break;
          case "present":
            text.innerHTML = `I sense a strong link in this moment... your present is shaped by your current <span class="highlight">${card2.themeName}</span>...`;
            text.classList.add("fade-in");
            resetFades(text);
            break;
          case "future":
            text.innerHTML = `I see a glimpse of what lies ahead... this card calls upon your future <span class="highlight">${card3.themeName}</span>...`;
            text.classList.add("fade-in");
            resetFades(text);
            break;
          default:
            text.innerHTML = "";
        }
      } else if (counter === 3) {
        switch (time) {
          case "past":
            text.innerHTML = card1.theme;
            text.classList.add("fade-in");
            resetFades(text);
            break;
          case "present":
            text.innerHTML = card2.theme;
            text.classList.add("fade-in");
            resetFades(text);
            break;
          case "future":
            text.innerHTML = card3.theme;
            text.classList.add("fade-in");
            resetFades(text);
            break;
          default:
            text.innerHTML = "";
        }
      } else {
        text.style.display = "none";
        closeModal();
        setTimeout(() => {
          discardCard();
          hideTitle();
          hideReadCardButton();
          counter = 0;
          setTimeout(() => {
            if (time === "past" && button.style.display === "none") {
              flipPresentCard();
            }
            if (time === "present" && button.style.display === "none") {
              flipFutureCard();
            }
          }, 1100);

          if (time === "future") {
            revealRestartButton();
            pianoSFX();
            setTimeout(() => {
              restartButton();
            }, 1000);
          }
        }, 1000);
      }
    }, 1000);
  });
}

// * OKAY
function swooshSFX() {
  const swoosh = document.querySelector(".cards__swoosh-sfx");
  swoosh.currentTime = 0;
  swoosh.play();
}

// * OKAY
function pianoSFX() {
  const piano = document.querySelector(".reveal__piano-sfx");
  piano.currentTime = 0;
  piano.loop = true;
  piano.play();
}

// * OKAY
function openModal() {
  const modal = document.querySelector(".reveal__interpretation");

  document.querySelector(".reveal__button").addEventListener("click", () => {
    modal.style.display = "flex";
    modal.classList.add("fade-in");
    resetFades(modal);

    windWhistleSFX();

    readCardIntro();

    setTimeout(() => {
      modalClick();
    }, 1000);
  });
}

openModal();

// * OKAY
function closeModal() {
  const modal = document.querySelector(".reveal__interpretation");

  modal.classList.add("fade-out");
  resetFades(modal);

  setTimeout(() => {
    modal.style.display = "none";
  }, 1000);
}

// * OKAY
function revealRestartButton() {
  const restart = document.querySelector(".reveal__restart");
  restart.style.display = "block";
  restart.classList.add("fade-in");
  resetFades(restart);
}

// * OKAY
function restartButton() {
  document.querySelector(".reveal__restart").addEventListener("click", () => {
    window.location.reload();
  });
}

// * THEME-TOGGLE SCRIPT
function showIconLight() {
  const iconLight = document.querySelector(".theme__icon--light");
  iconLight.classList.remove("hidden");
}

function hideIconLight() {
  const iconLight = document.querySelector(".theme__icon--light");
  iconLight.classList.add("hidden");
}

function showIconDark() {
  const iconDark = document.querySelector(".theme__icon--dark");
  iconDark.classList.remove("hidden");
}

function hideIconDark() {
  const iconDark = document.querySelector(".theme__icon--dark");
  iconDark.classList.add("hidden");
}

function addActiveTheme() {
  const button = document.querySelector(".theme__button");
  button.classList.add("active");
}

function removeActiveTheme() {
  const button = document.querySelector(".theme__button");
  button.classList.remove("active");
}

function addDarkTheme() {
  const html = document.querySelector("html");
  html.classList.add("dark");
}

function toggleDarkTheme() {
  const html = document.querySelector("html");
  html.classList.toggle("dark");
}

function savedTheme() {
  return localStorage.getItem("theme");
}

function prefersDark() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

preLoadDarkTheme();
function preLoadDarkTheme() {
  if (savedTheme() === "dark" || (savedTheme() === null && prefersDark())) {
    addDarkTheme();
    addActiveTheme();
    hideIconLight();
    showIconDark();
  }
}

function isDarkTheme() {
  const html = document.querySelector("html");
  return html.classList.contains("dark");
}

function savePreferredTheme() {
  localStorage.setItem("theme", isDarkTheme() ? "dark" : "light");
}

toggleTheme();
function toggleTheme() {
  const button = document.querySelector(".theme__button");

  button.addEventListener("click", () => {
    toggleDarkTheme();

    if (isDarkTheme()) {
      addActiveTheme();
      hideIconLight();
      showIconDark();
    } else {
      removeActiveTheme();
      showIconLight();
      hideIconDark();
    }

    savePreferredTheme();
  });
}
