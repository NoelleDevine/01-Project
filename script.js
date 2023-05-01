const shoppingBag = document.querySelector(".bag-shopping");
const checkOut = document.querySelector(".checkOut");
const payCash = document.querySelector(".payWithCash");
const payCC = document.querySelector(".payWithCC");
const receiptView = document.querySelector(".ReceiptView");
const creditCardForm = document.querySelector(".creditCardForm");
let cartTotal = 0;
let salesTax = 0;
let totalPlusTax = 0;

let itemsInCart = []; //an array of what we have selected to put in the cart

const items = [
  {
    name: "Delina Exclusif",
    img: "images/Delina.jpg",
    price: 201.99,
  },
  {
    name: "Killian's Love Don't Be Shy",
    img: "images/killian.jpg",
    price: 199.99,
  },
  {
    name: "Bacarat Rouge 540 Extract",
    img: "images/baccarat.png",
    price: 325.0,
  },
  {
    name: "Christian Dior Poison",
    img: "images/diorPoison.png",
    price: 69.95,
  },
  {
    name: "Replica By The Fireplace",
    img: "images/replica.png",
    price: 125,
  },
  {
    name: "Gucci Guilty",
    img: "images/gucci.png",
    price: 103,
  },
  {
    name: "Tom Ford Lost Cherry",
    img: "images/TomFord.png",
    price: 250,
  },
  {
    name: "Yves St. Laurent Libre Intense",
    img: "images/yves.png",
    price: 250,
  },
  {
    name: "Acqua di Gioia",
    img: "images/aqua.png",
    price: 105,
  },
  {
    name: "Chanel No 5",
    img: "images/chanel.png",
    price: 160,
  },
];

// Define the function to display the items
function displayItems() {
  const itemsContainer = document.getElementById("items-container");
  itemsContainer.innerHTML = "";
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("item");
    itemDiv.innerHTML = `
        <img height="200px" src=${item.img}>
          <div class="item-name">${item.name}</div>
          <div class="item-price">$${item.price.toFixed(2)}</div>
          <button class="add-to-cart" onclick="addToCart(${i})">Add to Cart</button>`;
    itemsContainer.appendChild(itemDiv);
  }
}

// Define the function to add an item to the cart
function addToCart(index) {
  const cart = document.getElementById("cart");
  const cartItem = document.createElement("div");
  cartItem.classList.add("cart-item");
  itemsInCart.push({
    name: items[index].name,
    img: items[index].img,
    price: items[index].price,
  });
  const newIndex = itemsInCart.length - 1;

  // if (itemsInCart.length > 0) {
  //   console.log("cart is not empty");
  // cartItem.innerHTML = `<img height="75px" src=${itemsInCart[index].img}>
  //        <div class="cart-item-name">${itemsInCart[index].name}</div>
  //        <div class="cart-item-price">$${itemsInCart[index].price.toFixed(
  //          2
  //        )}</div>`;
  // } else {

  cartItem.innerHTML = `<img height="50px" src=${itemsInCart[newIndex].img}>
         <div class="cart-item-name">${itemsInCart[newIndex].name}</div>
         <div class="cart-item-price">$${itemsInCart[newIndex].price.toFixed(
           2
         )}</div>`;
  // }
  checkOut.appendChild(cartItem);

  // console.log(itemsInCart);

  updateCartTotal();
}

// Define the function to update the cart total
function updateCartTotal() {
  //console.log(itemsInCart);
  //let lastItemAdded = itemsInCart.length - 1;
  // let lastPrice = itemsInCart[lastItemAdded].price.toFixed(2);
  cartTotal = 0;
  for (let i = 0; i < itemsInCart.length; i++) {
    cartTotal += +itemsInCart[i].price.toFixed(2);
    //console.log(cartTotal);
  }
  salesTax = cartTotal * 0.06;
  totalPlusTax = cartTotal + salesTax;
  //console.log(cartTotal);
  //console.log("Sales Tax: " + salesTax.toFixed(2));
  //console.log("Total Plus Tax: " + totalPlusTax.toFixed(2));
  const cartTotalElement = document.getElementById("cart-total");
  cartTotalElement.textContent = `$${cartTotal.toFixed(2)}`;
  const cartTotalElementCash = document.getElementById("cart-total-cash");
  cartTotalElementCash.textContent = `$${cartTotal.toFixed(2)}`;
  const totalTax = document.getElementById("total-tax");
  totalTax.textContent = `$${salesTax.toFixed(2)}`;
  const displayTotalTax = document.getElementById("total");
  displayTotalTax.textContent = `$${totalPlusTax.toFixed(2)}`;
  //display cart total on credit card view
  //const cartTotalElement = document.getElementById("cart-total-receipt");
  //cartTotalElement.textContent = `$${cartTotal.toFixed(2)}`;
  //display cart total on receipt
  const receiptTotalElement = document.getElementById("cart-total-receipt");
  receiptTotalElement.textContent = `$${cartTotal.toFixed(2)}`;
  const totalTaxReceipt = document.getElementById("total-tax-receipt");
  totalTaxReceipt.textContent = `$${salesTax.toFixed(2)}`;
  const totalReceipt = document.getElementById("total-receipt");
  totalReceipt.textContent = `$${totalPlusTax.toFixed(2)}`;
}

shoppingBag.addEventListener("click", (e) => {
  checkOut.classList.add("popUp");
  checkOut.classList.remove("DoNotDisplay");
});

checkOut.addEventListener("click", (e) => {
  if (e.target.classList.contains("keepShopping")) {
    checkOut.classList.add("DoNotDisplay");
  } else if (e.target.classList.contains("payCashButton")) {
    payCash.classList.add("popUp");
    payCash.classList.remove("DoNotDisplay");
    updateCartTotal();
  } else if (e.target.classList.contains("payCCButton")) {
    payCC.classList.add("popUp");
    payCC.classList.remove("DoNotDisplay");
    updateCartTotal();
  }
});
payCash.addEventListener("click", (e) => {
  e.preventDefault();
  const userEnteredCash = document.getElementById("amountOfCash");
  const tendered = document.getElementById("amount-given");
  const changeTag = document.getElementById("return-change");
  let change = 0;

  if (e.target.classList.contains("PrintReceipt")) {
    if (userEnteredCash.value < totalPlusTax) {
      alert("Ask Sugar Daddy/Momma for More Money");
    } else {
      tendered.textContent = userEnteredCash.value;
      change = userEnteredCash.value - totalPlusTax;
      changeTag.textContent = change.toFixed(2);
      const purchasedItems = document.getElementById("purchased-items");
      // console.dir(purchasedItems);

      for (let i = 0; i < itemsInCart.length; i++) {
        const purchasedItemsList = document.createElement("div");

        purchasedItemsList.innerHTML = `
  <div class="cart-item-name">${itemsInCart[i].name}</div>
  <div class="cart-item-price">$${itemsInCart[i].price.toFixed(2)}</div>`;
        // console.log(purchasedItemsList);
        purchasedItems.append(purchasedItemsList);
      }
      // console.log("puppies");
      receiptView.classList.remove("DoNotDisplay");
      receiptView.classList.add("popUp");

      //<p>Amount Tendered: <span id="amount-given">$0.00</span></p>
      //  <p class="ChangeOnOff">
      //// Change Returned: <span id="return-change">$0.00</span>
      //  </p>
    }
  }
});

creditCardForm.addEventListener("submit", (e) => {
  e.preventDefault();
  payCC.classList.remove("popUp");
  payCC.classList.add("DoNotDisplay");

  receiptView.setAttribute("class", "popUp");
  console.dir(e);
  // if (e.target.classList.contains("PrintReceipt")) {
  //   console.log("puppies");
  //   receiptView.classList.remove("DoNotDisplay");
  //   receiptView.classList.add("popUp");

  const amountGiven = document.getElementById("amount-given");
  amountGiven.textContent = `$${totalPlusTax.toFixed(2)}`;

  const creditcardChange = document.querySelector(".ChangeOnOff");
  creditcardChange.remove();
  const purchasedItems = document.getElementById("purchased-items");
  console.dir(purchasedItems);

  for (let i = 0; i < itemsInCart.length; i++) {
    const purchasedItemsList = document.createElement("div");

    purchasedItemsList.innerHTML = `
  <div class="cart-item-name">${itemsInCart[i].name}</div>
  <div class="cart-item-price">$${itemsInCart[i].price.toFixed(2)}</div>`;
    //console.log(purchasedItemsList);
    purchasedItems.append(purchasedItemsList);
  }
});

// "PrintReceipt"
//pay cash
// Define the items and prices
//   const items = [
//     { name: "Item 1", price: 10 },
//     { name: "Item 2", price: 20 },
//     { name: "Item 3", price: 15 },
//   ];
//   // Calculate the total price
//   const totalPrice = items.reduce((acc, item) => acc + item.price, 0);
//   // Define the amount tendered
//   const amountTendered = 50;
//   // Calculate the change needed
//   const change = amountTendered - totalPrice;
//   // Generate the receipt HTML
//   const receiptHTML = `   <h1>Receipt</h1>
//     <ul>     ${items
//       .map(
//         (item) => `
//     <li>${item.name}: $${item.price.toFixed(2)}</li>`
//       )
//       .join("")}
//     </ul>   <p>Total: $${totalPrice.toFixed(2)}</p>
//     <p>Amount Tendered: $${amountTendered.toFixed(2)}</p>
//     <p>Change: $${change.toFixed(2)}</p> `; // Display the receipt
//   document.body.innerHTML = receiptHTML;

//   //pay with CC -> clear this form or show another???
// });

// Call the displayItems function to display the items on page load
displayItems();
