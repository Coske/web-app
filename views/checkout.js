const storedCart = sessionStorage.getItem("cart");
const cart = storedCart ? JSON.parse(storedCart) : [];
console.log(cart);

populateCheckout(cart);

function populateCheckout(cart) {
    const cartItemsContainer = document.getElementById("cart-items");
    let Total = 0;
    if (cart.length === 0) {
        const emptyCartMessage = document.createElement("p");
        emptyCartMessage.textContent =
            "Cart is empty, try adding something from the Menu";
        cartItemsContainer.appendChild(emptyCartMessage);
        const formContainer = document.getElementById("form-container");
        if (formContainer) {
            cartItemsContainer.removeChild(formContainer);
        }
    } else {
        cart.forEach((item, index) => {
            Total += item.quantity * item.itemPrice;
            const cartItem = document.createElement("div");
            cartItem.className = "cart-item";
            cartItem.innerHTML = `
        <div class="cart-content">
        <button class="delete-button" data-index="${index}">Remove</button>
            <div class="cart-item">
                <img src="${item.itemImage}">
                <div class="cart-item-desc">
                    <h2>${item.quantity} x ${item.itemName}</h2> 
                    <h2>${item.itemDesc}</h2>
                </div>
            </div>
            <div>
                <p>*price per ${item.itemName}: ${item.itemPrice.toFixed(
                2
            )}$</p>
            <hr>
            </div>
        </div>
                `;
            cartItemsContainer.appendChild(cartItem);
        });

        const deleteButtons = document.querySelectorAll(".delete-button");
        deleteButtons.forEach((button) => {
            button.addEventListener("click", function () {
                const indexToDelete = this.getAttribute("data-index");
                cart.splice(indexToDelete, 1);
                sessionStorage.setItem("cart", JSON.stringify(cart));
                updateCart();
                populateCheckout(cart);
            });
        });

        const totalPrice = document.createElement("h2");
        totalPrice.innerHTML = `Total price of your order is ${Total.toFixed(
            2
        )}$`;
        cartItemsContainer.appendChild(totalPrice);
    }
}

function clearCart() {
    const storedCart = sessionStorage.getItem("cart");
    if (storedCart) {
        sessionStorage.removeItem("cart");
    }
}

function updateCart() {
    const cartItemsContainer = document.getElementById("cart-items");
    cartItemsContainer.innerHTML = "";
}

function generateForm() {
    const formContainer = document.getElementById("form-container");
    const form = document.createElement("form");

    if (!cart || cart.length === 0) {
        const emptyCartMessage = document.createElement("p");
        emptyCartMessage.textContent = "";
        formContainer.appendChild(emptyCartMessage);
        return;
    }
    form.innerHTML = `
        <div class="form-group">
            <label for="additionalInfo">Additional Information</label>
            <textarea id="additionalInfo" name="additionalInfo" rows="4" cols="50"></textarea>
        </div>
        <button type="submit" id="submitOrder">Buy</button>
    `;

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        clearCart();
        updateCart();
        const thankYouMessage = document.createElement("p");
        thankYouMessage.textContent =
            "Thank you for your order, we will call you once the order is ready.";
        formContainer.innerHTML = "";
        formContainer.appendChild(thankYouMessage);
    });

    formContainer.appendChild(form);
}

generateForm();
