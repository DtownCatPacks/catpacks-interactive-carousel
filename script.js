const foodData = {
  breakfast: {
    limit: 2,

    items: [
      {
        name: "Breakfast Shake",
        price: 0.46,
        image: "images/Breakfast Shakes.svg"
      },
      {
        name: "Cereal Bar",
        price: 0.24,
        image: "images/Cereal Bar.svg"
      },
      {
        name: "Mini Box of Cereal",
        price: 0.62,
        image: "images/Mini Cereal.svg"
      },
      {
        name: "Oatmeal Packet",
        price: 0.19,
        image: "images/Oatmeal.svg"
      },
      {
        name: "Toaster Pastries",
        price: 0.34,
        image: "images/Toaster Pastry.svg"
      }     
      
    ]
  },


  meals: {
    limit: 4,

    items: [
      {
        name: "Beans",
        price: 0.92,
        image: "images/Beans.svg"
      },
      {
        name: "Canned Pasta",
        price: 1.18,
        image: "images/Canned Pasta.svg"
      },
      {
        name: "Chili",
        price: 2.14,
        image: "images/Chili.svg"
      },
     {
        name: "Macaroni and Cheese",
        price: 0.64,
        image: "images/Macaroni.svg"
      },
      {
        name: "Mashed Potatoes and Canned Vegetables",
        price: 1.82,
        image: "images/Mashed Potatoes and Veg.svg"
      },
      {
        name: "Pasta Sides",
        price: 1.34,
        image: "images/Pasta Sides.svg"
      },
      {
        name: "Peanut Butter",
        price: 1.98,
        image: "images/Peanut Butter.svg"
      },
      {
        name: "Plain Pasta",
        price: 1.24,
        image: "images/Pasta.svg"
      },
      {
        name: "Ramen",
        price: 0.32,
        image: "images/Ramen.svg"
      },
       {
        name: "Rice Sides",
        price: 1.34,
        image: "images/Rice Sides.svg"
      },
      {
        name: "Soup",
        price: 0.82,
        image: "images/Soup.svg"
      },
      {
        name: "Stew",
        price: 2.97,
        image: "images/Stew.svg"
      },
      {
        name: "Stuffing Mix",
        price: 0.97,
        image: "images/Stuffing.svg"
      },
      {
        name: "Tuna",
        price: 1.00,
        image: "images/Tuna.svg"
      }
      
    ]
  },


  snacks: {
    limit: 5,

    items: [
       {
        name: "Applesauce",
        price: 0.36,
        image: "images/Applesauce.svg"
      },
       {
        name: "Fruit",
        price: 0.66,
        image: "images/Fruit.svg"
      },
      {
        name: "Granola Bar",
        price: 0.16,
        image: "images/Granola Bar.svg"
      },
      {
        name: "Gummy Fruit Snacks",
        price: 0.19,
        image: "images/Fruit Snacks.svg"
      },
      {
        name: "Peanut Butter and Crackers",
        price: 0.77,
        image: "images/Peanut Butter and Crackers.svg"
      },
      {
        name: "Popcorn",
        price: 0.38,
        image: "images/Popcorn.svg"
      },
      {
        name: "Salty Snack",
        price: 0.36,
        image: "images/Salty Snacks.svg"
      },
       {
        name: "Sandwich Crackers",
        price: 0.35,
        image: "images/Sandwich Crackers.svg"
      },
      {
        name: "Sweet Snack",
        price: 0.31,
        image: "images/Sweet Snacks.svg"
      },
      {
        name: "Trail Mix",
        price: 0.52,
        image: "images/Trail Mix.svg"
      }
          
    ]
  }
};


const state = {
  breakfast: {
    index: 0,
    selected: new Set()
  },

  meals: {
    index: 0,
    selected: new Set()
  },

  snacks: {
    index: 0,
    selected: new Set()
  }
};


let isPacked = false;
let isPacking = false;


const categoryCards =
  document.querySelectorAll(".category-card");

const tabs =
  document.querySelectorAll(".category-tab");

const receiptItems =
  document.querySelector("#receipt-items");

const totalDisplay =
  document.querySelector("#total");

const packButton =
  document.querySelector("#pack-button");

const resetButton =
  document.querySelector("#reset-button");

const selectionStatus =
  document.querySelector("#selection-status");

const bag =
  document.querySelector("#bag");

const packedMessage =
  document.querySelector("#packed-message");

const mobileItemCount =
  document.querySelector("#mobile-item-count");

const mobileTotal =
  document.querySelector("#mobile-total");


function getSelectedItems() {
  const selectedItems = [];

  Object.keys(foodData).forEach((category) => {

    state[category].selected.forEach((index) => {

      const item =
        foodData[category].items[index];

      selectedItems.push({
        category,
        name: item.name,
        price: item.price,
        image: item.image
      });

    });

  });

  return selectedItems;
}


function getTotal() {
  return getSelectedItems().reduce(
    (sum, item) => sum + item.price,
    0
  );
}


function categoryComplete(category) {
  return (
    state[category].selected.size ===
    foodData[category].limit
  );
}


function allCategoriesComplete() {
  return (
    categoryComplete("breakfast") &&
    categoryComplete("meals") &&
    categoryComplete("snacks")
  );
}


function renderCategory(category) {
  const card =
    document.querySelector(
      `[data-category="${category}"]`
    );

  const data =
    foodData[category];

  const categoryState =
    state[category];

  const item =
    data.items[categoryState.index];


  const name =
    card.querySelector(".item-name");

  const price =
    card.querySelector(".item-price");

  const image =
    card.querySelector(".item-image");

  const selectButton =
    card.querySelector(".select-item");

  const previousButton =
    card.querySelector(".previous");

  const nextButton =
    card.querySelector(".next");

  const itemCard =
    card.querySelector(".item-card");

  const selectedContainer =
    card.querySelector(".selected-items");

  const counter =
    document.querySelector(
      `#${category}-count`
    );

  const tabCounter =
    document.querySelector(
      `#${category}-tab-count`
    );


  const isSelected =
    categoryState.selected.has(
      categoryState.index
    );

  const limitReached =
    categoryState.selected.size >=
    data.limit;


  name.textContent =
    item.name;

  price.textContent =
    `$${item.price.toFixed(2)}`;

  image.src =
    item.image;

  image.alt =
    item.name;


  itemCard.classList.toggle(
    "selected",
    isSelected
  );


  if (isPacked || isPacking) {

    selectButton.textContent =
      isSelected
        ? "Selected ✓"
        : "Selections Locked";

    selectButton.disabled = true;

    previousButton.disabled = true;

    nextButton.disabled = true;

  } else {

    previousButton.disabled = false;

    nextButton.disabled = false;


    if (isSelected) {

      selectButton.textContent =
        "Selected ✓";

      selectButton.disabled = false;

      selectButton.classList.add(
        "selected"
      );

    } else if (limitReached) {

      selectButton.textContent =
        "Limit Reached";

      selectButton.disabled = true;

      selectButton.classList.remove(
        "selected"
      );

    } else {

      selectButton.textContent =
        "Select";

      selectButton.disabled = false;

      selectButton.classList.remove(
        "selected"
      );

    }

  }


  const count =
    categoryState.selected.size;


  counter.textContent =
    `${count} of ${data.limit}`;

  tabCounter.textContent =
    `${count}/${data.limit}`;


  selectedContainer.innerHTML =
    "";


  categoryState.selected.forEach(
    (index) => {

      const chip =
        document.createElement("span");

      chip.classList.add(
        "selected-chip"
      );

      chip.textContent =
        data.items[index].name;

      selectedContainer.appendChild(
        chip
      );

    }
  );
}


function renderReceipt() {

  receiptItems.innerHTML = `
    <p class="receipt-placeholder">
      Your receipt will appear when you pack your Cat Pack.
    </p>
  `;

  totalDisplay.textContent =
    "$0.00";

  mobileTotal.textContent =
    "$0.00";

  mobileItemCount.textContent =
    `${getSelectedItems().length} of 11 selected`;
}


function addReceiptLine(
  container,
  item,
  animate = false
) {

  const line =
    document.createElement("div");

  line.classList.add(
    "receipt-line"
  );


  if (animate) {
    line.classList.add(
      "new-line"
    );
  }


  const itemName =
    document.createElement("span");

  itemName.textContent =
    item.name;


  const itemPrice =
    document.createElement("span");

  itemPrice.textContent =
    `$${item.price.toFixed(2)}`;


  line.appendChild(
    itemName
  );

  line.appendChild(
    itemPrice
  );


  container.appendChild(
    line
  );
}


function clearReceiptForPacking() {

  receiptItems.innerHTML =
    "";

  totalDisplay.textContent =
    "$0.00";

  mobileTotal.textContent =
    "$0.00";

  mobileItemCount.textContent =
    "Packing 0 of 11";
}


function addPackedItemToReceipt(
  item,
  packedCount,
  runningTotal
) {

  addReceiptLine(
    receiptItems,
    item,
    true
  );


  totalDisplay.textContent =
    `$${runningTotal.toFixed(2)}`;

  mobileTotal.textContent =
    `$${runningTotal.toFixed(2)}`;

  mobileItemCount.textContent =
    `Packing ${packedCount} of 11`;
}


function updatePackButton() {
  const complete =
    allCategoriesComplete();


  if (isPacking) {

    packButton.disabled =
      true;

    packButton.textContent =
      "Packing...";

    selectionStatus.textContent =
      "Packing your Cat Pack...";

    return;
  }


  if (isPacked) {

    packButton.disabled =
      true;

    packButton.textContent =
      "Cat Pack Packed";

    selectionStatus.textContent =
      "Your selections are locked.";

    return;
  }


  packButton.textContent =
    "Pack My Cat Pack";

  packButton.disabled =
    !complete;


  if (complete) {

    selectionStatus.textContent =
      "Your selections are complete. You can still make changes before packing.";

  } else {

    selectionStatus.textContent =
      `Breakfast ${
        state.breakfast.selected.size
      }/2 • Meals ${
        state.meals.selected.size
      }/4 • Snacks ${
        state.snacks.selected.size
      }/5`;

  }
}


function updateEverything() {

  renderCategory("breakfast");

  renderCategory("meals");

  renderCategory("snacks");

  renderReceipt();

  updatePackButton();
}


function updateLockedSelectionUI() {

  renderCategory("breakfast");

  renderCategory("meals");

  renderCategory("snacks");

  updatePackButton();
}


function wait(milliseconds) {

  return new Promise(
    (resolve) =>
      setTimeout(resolve, milliseconds)
  );
}


function waitForImage(image) {

  if (image.complete) {
    return Promise.resolve();
  }


  return new Promise((resolve) => {

    image.addEventListener(
      "load",
      resolve,
      { once: true }
    );

    image.addEventListener(
      "error",
      resolve,
      { once: true }
    );

  });
}


async function animateSelectedItemsIntoBag() {

  const selectedItems =
    getSelectedItems();

  let runningTotal =
    0;

  let packedCount =
    0;


  for (const item of selectedItems) {

    const bagRect =
      bag.getBoundingClientRect();


    const size =
      Math.min(
        155,
        Math.max(
          100,
          window.innerWidth * 0.21
        )
      );


    const flyingImage =
      document.createElement("img");


    flyingImage.src =
      item.image;

    flyingImage.alt =
      "";

    flyingImage.classList.add(
      "packing-copy"
    );


    flyingImage.style.width =
      `${size}px`;

    flyingImage.style.height =
      `${size}px`;


    const startX =
      bagRect.left +
      bagRect.width / 2 -
      size / 2;


    const startY =
      bagRect.top -
      size * 0.70;


    flyingImage.style.left =
      `${startX}px`;

    flyingImage.style.top =
      `${startY}px`;

    flyingImage.style.zIndex =
      "9999";


    document.body.appendChild(
      flyingImage
    );


    await waitForImage(
      flyingImage
    );


    const appearAnimation =
      flyingImage.animate(
        [
          {
            transform:
              "translateY(-12px) scale(0.9)",
            opacity: 0
          },

          {
            transform:
              "translateY(0) scale(1)",
            opacity: 1
          }
        ],
        {
          duration: 110,
          easing: "ease-out",
          fill: "forwards"
        }
      );


    await appearAnimation.finished;


    flyingImage.style.zIndex =
      "4";


    const dropDistance =
      bagRect.height * 0.50;


    const dropAnimation =
      flyingImage.animate(
        [
          {
            transform:
              "translateY(0) scale(1)",
            opacity: 1
          },

          {
            transform:
              `translateY(${dropDistance}px) scale(0.55)`,
            opacity: 0
          }
        ],
        {
          duration: 210,
          easing: "ease-in",
          fill: "forwards"
        }
      );


    await dropAnimation.finished;


    flyingImage.remove();


    packedCount += 1;

    runningTotal +=
      item.price;


    addPackedItemToReceipt(
      item,
      packedCount,
      runningTotal
    );


    await wait(25);
  }
}


categoryCards.forEach((card) => {

  const category =
    card.dataset.category;


  const previousButton =
    card.querySelector(".previous");

  const nextButton =
    card.querySelector(".next");

  const selectButton =
    card.querySelector(".select-item");


  previousButton.addEventListener(
    "click",
    () => {

      if (isPacked || isPacking) {
        return;
      }


      const itemCount =
        foodData[category].items.length;


      state[category].index =
        (
          state[category].index -
          1 +
          itemCount
        ) %
        itemCount;


      renderCategory(category);
    }
  );


  nextButton.addEventListener(
    "click",
    () => {

      if (isPacked || isPacking) {
        return;
      }


      const itemCount =
        foodData[category].items.length;


      state[category].index =
        (
          state[category].index +
          1
        ) %
        itemCount;


      renderCategory(category);
    }
  );


  selectButton.addEventListener(
    "click",
    () => {

      if (isPacked || isPacking) {
        return;
      }


      const currentIndex =
        state[category].index;


      const selected =
        state[category].selected;


      const limit =
        foodData[category].limit;


      if (
        selected.has(currentIndex)
      ) {

        selected.delete(
          currentIndex
        );

      } else if (
        selected.size < limit
      ) {

        selected.add(
          currentIndex
        );

      }


      packedMessage.hidden =
        true;


      updateEverything();
    }
  );

});


tabs.forEach((tab) => {

  tab.addEventListener(
    "click",
    () => {

      const category =
        tab.dataset.tab;


      tabs.forEach(
        (otherTab) => {

          const active =
            otherTab === tab;


          otherTab.classList.toggle(
            "active",
            active
          );


          otherTab.setAttribute(
            "aria-selected",
            active
          );

        }
      );


      categoryCards.forEach(
        (card) => {

          card.classList.toggle(
            "active",
            card.dataset.category ===
              category
          );

        }
      );

    }
  );

});


packButton.addEventListener(
  "click",
  async () => {

    if (
      !allCategoriesComplete() ||
      isPacked ||
      isPacking
    ) {
      return;
    }


    isPacking =
      true;


    resetButton.hidden =
      true;


    packedMessage.hidden =
      true;


    updateLockedSelectionUI();


    document
      .querySelector("#results")
      .scrollIntoView({
        behavior: "smooth",
        block: "center"
      });


    await wait(500);


    clearReceiptForPacking();


    await animateSelectedItemsIntoBag();


    isPacking =
      false;

    isPacked =
      true;


    bag.classList.remove(
      "packed"
    );


    void bag.offsetWidth;


    bag.classList.add(
      "packed"
    );


    packedMessage.hidden =
      false;


    resetButton.hidden =
      false;


    mobileItemCount.textContent =
      "11 of 11 selected";


    updateLockedSelectionUI();
  }
);


resetButton.addEventListener(
  "click",
  () => {

    isPacked =
      false;

    isPacking =
      false;


    resetButton.hidden =
      true;


    state.breakfast.index =
      0;

    state.meals.index =
      0;

    state.snacks.index =
      0;


    state.breakfast.selected.clear();

    state.meals.selected.clear();

    state.snacks.selected.clear();


    bag.classList.remove(
      "packed"
    );


    packedMessage.hidden =
      true;


    document
      .querySelectorAll(
        ".packing-copy"
      )
      .forEach((item) => {
        item.remove();
      });


    tabs.forEach((tab) => {

      const breakfastTab =
        tab.dataset.tab ===
        "breakfast";


      tab.classList.toggle(
        "active",
        breakfastTab
      );


      tab.setAttribute(
        "aria-selected",
        breakfastTab
      );

    });


    categoryCards.forEach(
      (card) => {

        card.classList.toggle(
          "active",
          card.dataset.category ===
            "breakfast"
        );

      }
    );


    updateEverything();
  }
);


function preloadImages() {

  const imagePaths =
    new Set();


  Object.values(foodData).forEach(
    (category) => {

      category.items.forEach(
        (item) => {

          imagePaths.add(
            item.image
          );

        }
      );

    }
  );


  imagePaths.add(
    "images/bag.svg"
  );


  imagePaths.forEach(
    (path) => {

      const image =
        new Image();

      image.src =
        path;

    }
  );
}


preloadImages();
updateEverything();
