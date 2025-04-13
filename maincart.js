document.addEventListener("DOMContentLoaded", () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotalElement = document.getElementById("cart-total");
    const cartCountElement = document.getElementById("cart-count");
    const cartButton = document.getElementById("cart-button");
    const cartModal = document.getElementById("cart-modal");
    const closeCartButton = document.querySelector(".close-cart");

    function updateCartDisplay() {
        cartItemsContainer.innerHTML = "";
        let total = 0;
        let itemCount = 0;

        cart.forEach((item, index) => {
            let itemTotal = item.price * item.quantity;
            total += itemTotal;
            itemCount += item.quantity;

            let row = `
                <tr>
                    <td>${item.name}</td>
                    <td>$${item.price.toFixed(2)}</td>
                    <td>${item.quantity}</td>
                    <td>$${itemTotal.toFixed(2)}</td>
                    <td>
                        <button class="remove-btn" data-index="${index}">Remove</button>
                    </td>
                </tr>
            `;
            cartItemsContainer.innerHTML += row;
        });

        cartTotalElement.textContent = total.toFixed(2);
        cartCountElement.textContent = itemCount;

        document.querySelectorAll(".remove-btn").forEach(button => {
            button.addEventListener("click", (e) => {
                let index = e.target.getAttribute("data-index");
                cart.splice(index, 1);
                localStorage.setItem("cart", JSON.stringify(cart));
                updateCartDisplay();
            });
        });
    }

    // Show the cart modal when clicking the cart button
    cartButton.addEventListener("click", () => {
        cartModal.style.display = "flex";
        updateCartDisplay();
    });

    // Hide the cart modal when clicking the close button
    closeCartButton.addEventListener("click", () => {
        cartModal.style.display = "none";
    });

    // Close the cart modal when clicking outside the cart content
    window.addEventListener("click", (event) => {
        if (event.target === cartModal) {
            cartModal.style.display = "none";
        }
    });

    updateCartDisplay();

    document.querySelector(".checkout-btn").addEventListener("click", () => {
        if (cart.length === 0) {
            alert("Your cart is empty!");
        } else {
            alert("Proceeding to checkout...");
            localStorage.removeItem("cart");
            updateCartDisplay();
            cartModal.style.display = "none";
        }
    });
});
document.addEventListener("DOMContentLoaded", () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartCountElement = document.getElementById("cart-count");

    // Function to update cart count in the navbar
    function updateCartCount() {
        let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountElement.textContent = totalItems;
    }

    // Add to Cart Functionality
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", () => {
            const productName = button.getAttribute("data-name");
            const productPrice = parseFloat(button.getAttribute("data-price"));

            // Check if item is already in cart
            let existingProduct = cart.find(item => item.name === productName);

            if (existingProduct) {
                existingProduct.quantity += 1; // Increase quantity if already exists
            } else {
                cart.push({ name: productName, price: productPrice, quantity: 1 });
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartCount();
            alert(`${productName} added to cart!`);
        });
    });

    updateCartCount();
});
document.addEventListener("DOMContentLoaded", () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotalElement = document.getElementById("cart-total");
    const cartCountElement = document.getElementById("cart-count");

    // Function to update the cart display
    function updateCartDisplay() {
        cartItemsContainer.innerHTML = "";
        let total = 0;
        let itemCount = 0;

        cart.forEach((item, index) => {
            let itemTotal = item.price * item.quantity;
            total += itemTotal;
            itemCount += item.quantity;

            let row = `
                <tr>
                    <td>${item.name}</td>
                    <td>$${item.price.toFixed(2)}</td>
                    <td>
                        <button class="decrease-qty" data-index="${index}">-</button>
                        ${item.quantity}
                        <button class="increase-qty" data-index="${index}">+</button>
                    </td>
                    <td>$${itemTotal.toFixed(2)}</td>
                    <td>
                        <button class="remove-btn" data-index="${index}">Remove</button>
                    </td>
                </tr>
            `;
            cartItemsContainer.innerHTML += row;
        });

        cartTotalElement.textContent = total.toFixed(2);
        cartCountElement.textContent = itemCount;

        // Attach event listeners for quantity buttons
        document.querySelectorAll(".increase-qty").forEach(button => {
            button.addEventListener("click", (e) => {
                let index = e.target.getAttribute("data-index");
                cart[index].quantity += 1;
                localStorage.setItem("cart", JSON.stringify(cart));
                updateCartDisplay();
            });
        });

        document.querySelectorAll(".decrease-qty").forEach(button => {
            button.addEventListener("click", (e) => {
                let index = e.target.getAttribute("data-index");
                if (cart[index].quantity > 1) {
                    cart[index].quantity -= 1;
                } else {
                    cart.splice(index, 1); // Remove if quantity is 1
                }
                localStorage.setItem("cart", JSON.stringify(cart));
                updateCartDisplay();
            });
        });

        // Attach event listeners for remove buttons
        document.querySelectorAll(".remove-btn").forEach(button => {
            button.addEventListener("click", (e) => {
                let index = e.target.getAttribute("data-index");
                cart.splice(index, 1);
                localStorage.setItem("cart", JSON.stringify(cart));
                updateCartDisplay();
            });
        });
    }

    // Checkout Button
    document.querySelector(".checkout-btn").addEventListener("click", () => {
        if (cart.length === 0) {
            alert("Your cart is empty!");
        } else {
            alert("Proceeding to checkout...");
            localStorage.removeItem("cart");
            updateCartDisplay();
        }
    });

    updateCartDisplay();
});

