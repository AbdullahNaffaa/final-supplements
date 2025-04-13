document.addEventListener("DOMContentLoaded", () => {
    let addToCartButtons = document.querySelectorAll(".add-to-cart");

    addToCartButtons.forEach(button => {
        button.addEventListener("click", () => {
            alert("Item added to cart!");
        });
    });

    document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault();
    alert("Message sent! We'll get back to you soon.");
    this.reset();
    });

});
document.addEventListener("DOMContentLoaded", () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartCountElement = document.getElementById("cart-count");

    // Function to update cart count in the navbar
    function updateCartCount() {
        let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountElement.textContent = totalItems;
    }

    // Add to Cart Functionality
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", () => {
            let productName = button.getAttribute("data-name");
            let productPrice = parseFloat(button.getAttribute("data-price"));

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
