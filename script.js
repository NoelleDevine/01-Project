const shoppingBag = document.querySelector(".bag-shopping");
const checkOut = document.querySelector(".checkOut");

const items = [
  { name: "Delina Exclusif", img: "images/Delina.jpg", price: 201.99 },
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
          <button class="add-to-cart" onclick="addToCart(${i})">Add to Cart</button>
        `;
    itemsContainer.appendChild(itemDiv);
  }
}

// Define the function to add an item to the cart
function addToCart(itemIndex) {
  const item = items[itemIndex]; //an array of what we have selected to put in the cart
  //const cart = document.getElementById("cart");
  const cartItem = document.createElement("div");
  cartItem.classList.add("cart-item");
  cartItem.innerHTML = `<img height="75px" src=${item.img}>
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">$${item.price.toFixed(2)}</div>
      `;
  checkOut.appendChild(cartItem);
  updateCartTotal();
}

// Define the function to update the cart total
function updateCartTotal() {
  const cartItems = document.getElementsByClassName("cart-item");
  let cartTotal = 0;
  for (let i = 0; i < cartItems.length; i++) {
    const cartItem = cartItems[i];
    const cartItemPrice = parseFloat(
      cartItem
        .getElementsByClassName("cart-item-price")[0]
        .textContent.replace("$", "")
    );
    cartTotal += cartItemPrice;
  }
  const cartTotalElement = document.getElementById("cart-total");
  cartTotalElement.textContent = `$${cartTotal.toFixed(2)}`;
}

shoppingBag.addEventListener("click", (e) => {
  checkOut.classList.add("popUp");
});

checkOut.addEventListener("click", (e) => {
  if (e.target.classList.contains("keepShopping")) {
    checkOut.classList.add("formDoNotDisplay");
  }
  //pay cash

  //pay with CC -> clear this form or show another???
});

// Call the displayItems function to display the items on page load
displayItems();
