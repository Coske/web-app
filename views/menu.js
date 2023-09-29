const cart = [];
document.addEventListener("DOMContentLoaded", () => {
    fetch("/api/menu")
        .then((response) => response.json())
        .then((data) => {
            const menuList = document.getElementById("menu-list");
            data.forEach((item) => {
                const listItem = document.createElement("div");
                listItem.className = "menu-item";
                listItem.innerHTML = `
                    <img src="${item.image}">
                        <h2>${item.name}</h2>
                        <div class="menu-content">
                        <input type="number" id="quantity-${
                            item._id
                        }" value="1" min="1" max="10">
                        <button class="add-to-cart-button" data-id="${
                            item._id
                        }" data-price="${item.price.toFixed(2)}">Add</button>
                    <div class="info-button">
                        <span>i</span>
                        </div>
                        <div class="tooltip">
                            <p>Calories: ${item.calories}kcal</p>
                            <p>Protein: ${item.protein}g</p>
                            <p>Sugar: ${item.sugar}g</p>
                            <p>Fats: ${item.fats}g</p>
                            <p>Salt: ${item.salt}g</p>
                        </div>
                    </div>
                `;
                menuList.appendChild(listItem);

                const addToCartButton = listItem.querySelector(
                    ".add-to-cart-button"
                );
                addToCartButton.addEventListener("click", () => {
                    const quantityInput = document.getElementById(
                        `quantity-${item._id}`
                    );
                    const quantity = parseInt(quantityInput.value);
                    const totalPrice =
                        quantity *
                        parseFloat(addToCartButton.getAttribute("data-price"));

                    console.log(
                        `Added ${quantity} ${
                            item.name
                        } to cart. Total price: $${totalPrice.toFixed(2)}`
                    );

                    const existingCartItem = cart.find(
                        (cartItem) => cartItem.itemName === item.name
                    );

                    if (existingCartItem) {
                        existingCartItem.quantity += quantity;
                    } else {
                        const cartItem = {
                            itemName: item.name,
                            itemImage: item.image,
                            itemPrice: item.price,
                            itemDesc: item.description,
                            quantity: quantity,
                        };
                        cart.push(cartItem);
                    }
                    console.log(cart);
                    sessionStorage.setItem("cart", JSON.stringify(cart));
                    quantity = 1;
                });

                const infoButton = listItem.querySelector(".info-button");
                const tooltip = listItem.querySelector(".tooltip");

                infoButton.addEventListener("mouseenter", () => {
                    tooltip.style.display = "block";
                });

                infoButton.addEventListener("mouseleave", () => {
                    tooltip.style.display = "none";
                });
            });
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
});

//export { cart };
