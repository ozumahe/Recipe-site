// Id getter
function __id(id) {
  return document.getElementById(id);
}

// Elements Getters
// ========Element ===========
const mealSection_A = __id("meal-section-a");
const filter_A = __id("filter-a");
const filter_A_showfull_length_Btn = __id("filter-a-showfull-length-btn");
const filter_A_showfull_length_Btn_Icon = document.querySelector(
  "#filter-a-showfull-length-btn .fas"
);
const popUpContainer = __id("pop-up-container");
const cancleBtn = __id("cancle-btn");
const popUp = __id("pop-up");
const searchInput = __id("search-input");
const searchBtn = __id("search-btn");
const alphaContainer = __id("alpha-container");
const alphaContainerDivs = document.querySelectorAll("#alpha-container div");

// =X=======Elements Getters==========X=

var typed = new Typed(".auto-input", {
  // Waits 1000ms after typing "First"
  strings: ["Delicious", "Good For Your Health", "Have a Good Taste"],
  typeSpeed: 100,
  backSpeed: 70,
  loop: true,
});

//============== Humbuger menuBtn event listner==============
const menuBtn = document.querySelector(".menu-btn");

menuBtn.addEventListener("click", () => {
  if (!menuBtn.classList.contains("open")) {
    menuBtn.classList.add("open");
    alphaContainer.classList.add("show");
  } else {
    menuBtn.classList.remove("open");
    alphaContainer.classList.remove("show");
  }
});
//=X============= Humbuger menuBtn event listner=============X=

//================== load random MEALS==================
loadMeal_A();
async function loadMeal_A() {
  const alpha = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "X",
    "Y",
  ];
  const num = Math.floor(Math.random() * alpha.length);
  console.log(alpha[num]);

  const res = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?f=" + alpha[num]
  );
  const result = await res.json();
  // console.log(result.meals);
  meal(result.meals);
}

// filling in the meal elements
function meal(mealsData) {
  mealSection_A.innerHTML = "";
  mealsData.forEach((mealData) => {
    const meal_A = document.createElement("div");
    meal_A.classList.add("meal");
    meal_A.innerHTML = `
     <div class="mealImg-container">
          <img src=${mealData.strMealThumb} alt=${mealData.strMeal} />
        </div>
        <h4>${mealData.strMeal}</h4>`;
    // console.log(mealData);
    mealSection_A.appendChild(meal_A);

    meal_A.addEventListener("click", () => {
      console.log(mealData);
      mealDetails(mealData);
    });
  });
}

// meal details function....
function mealDetails(mealData) {
  popUp.innerHTML = "";
  const aboutMeal = document.createElement("div");
  const ingredients = [];

  // get ingredients and measures
  for (let i = 1; i <= 20; i++) {
    if (mealData["strIngredient" + i]) {
      ingredients.push(
        `${mealData["strIngredient" + i]} - ${mealData["strMeasure" + i]}`
      );
    } else {
      break;
    }
  }
  // filling in the meal element
  aboutMeal.innerHTML = `
  <div class="meal-details-container">
      <h1 class="meal-details-name">How To Make: <span>${
        mealData.strMeal
      }</span></h1>
      <img
        class="meal-details-img"
        src=${mealData.strMealThumb}
        alt=${mealData.strMeal}
      />
      <h4>ingredients:</h4>
       <ul>
            ${ingredients
              .map(
                (ing) => `
            <li>${ing}</li>`
              )
              .join("")}
        </ul>
      <h4>Instructions:</h4>
      <p>
        ${mealData.strInstructions}
      </p>
          <h3>YouTube Video</h3>
      <a class="youtube-link" href=${mealData.strYoutube}>
        <div class="youtube-container">
          <img src=${mealData.strMealThumb} alt="restorant" />
          <div class="youtube"><i class="icon fab fa-youtube"></i></div>
        </div>
      </a>
    </div>`;

  popUp.appendChild(aboutMeal);
  if (!popUpContainer.classList.contains("active")) {
    popUpContainer.classList.add("active");
  }
}

// getting meals by searched term
async function serachedTerm() {
  console.log(searchInput.value);
  const termRes = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s=" + searchInput.value
  );
  const termResult = await termRes.json();
  meal(termResult.meals);
  searchInput.value = "";
}

alphaContainerDivs.forEach((div) => {
  div.addEventListener("click", () => {
    console.log(div.dataset.id);
    alphaFilter(div.dataset.id);

    // Hiding the Alpha container when clicked
    if (!menuBtn.classList.contains("open")) {
      menuBtn.classList.add("open");
      alphaContainer.classList.add("show");
    } else {
      menuBtn.classList.remove("open");
      alphaContainer.classList.remove("show");
    }
  });
});

// Getting meals by alpha
async function alphaFilter(alpha) {
  const res = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?f=" + alpha
  );
  const result = await res.json();
  // console.log(result.meals);
  meal(result.meals);
}

// Add event listeners
// Hide meal details
cancleBtn.addEventListener("click", () => {
  if (popUpContainer.classList.contains("active")) {
    popUpContainer.classList.remove("active");
  }
});

// search Btn
searchBtn.addEventListener("click", () => {
  serachedTerm();
});
