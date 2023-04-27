const items = [
  { name: "Delina Exclusif", img: "images/Delina.jpg", price: 201.99 },
  {
    name: "Killian's Love Don't Be Shy",
    img: "images/killian.jpg",
    price: 5.99,
  },
  { name: "Bacarat Rouge 540 Extract", price: 7.99 },
  { name: "Christian Dior Poison", price: 12.99 },
  { name: "Replica By The Fireplace", price: 8.99 },
  { name: "Gucci Guilty", price: 6.99 },
  { name: "Tom Ford Lost Cherry", price: 14.99 },
  { name: "Yves St. Laurent Libre Intense", price: 9.99 },
  { name: "Item 9", price: 11.99 },
  { name: "Item 10", price: 13.99 },
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
        <img src=${item.img}>
          <div class="item-name">${item.name}</div>
          <div class="item-price">$${item.price.toFixed(2)}</div>
          <button class="add-to-cart" onclick="addToCart(${i})">Add to Cart</button>
        `;
    itemsContainer.appendChild(itemDiv);
  }
}

// Define the function to add an item to the cart
function addToCart(itemIndex) {
  const item = items[itemIndex];
  const cart = document.getElementById("cart");
  const cartItem = document.createElement("div");
  cartItem.classList.add("cart-item");
  cartItem.innerHTML = `
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">$${item.price.toFixed(2)}</div>
      `;
  cart.appendChild(cartItem);
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

// Call the displayItems function to display the items on page load
displayItems();
