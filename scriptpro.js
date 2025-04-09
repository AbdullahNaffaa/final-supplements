document.addEventListener("DOMContentLoaded", () => {
    const product = JSON.parse(localStorage.getItem("selectedProduct"));
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let quantity = 1;

    const cartCountElement = document.getElementById("cart-count");
    const container = document.getElementById("product-container");
    const similarContainer = document.getElementById("similar-list");

    if (!product) {
      container.innerHTML = `<p style="color: #ccc;">No product selected.</p>`;
      return;
    }

    renderMainProduct(product);
    updateCartCount();
    fetchSimilarProducts(product);

    function renderMainProduct(product) {
      container.innerHTML = `
        <div class="product-image">
          <img src="${product.image}" alt="${product.name}" />
        </div>
        <div class="product-info">
          <h1>${product.name}</h1>
          <div class="price">$${product.price.toFixed(2)}</div>
          <p class="description">${product.description || 'No description available.'}</p>
          <div class="quantity-selector">
            <button id="decrease-qty">-</button>
            <span id="quantity">1</span>
            <button id="increase-qty">+</button>
          </div>
          <button class="add-to-cart-btn" id="add-to-cart-btn">Add to Cart</button>
        </div>
      `;

      // Quantity controls
      document.getElementById("increase-qty").addEventListener("click", () => {
        quantity++;
        document.getElementById("quantity").textContent = quantity;
      });

      document.getElementById("decrease-qty").addEventListener("click", () => {
        if (quantity > 1) quantity--;
        document.getElementById("quantity").textContent = quantity;
      });

      // Add to Cart
      document.getElementById("add-to-cart-btn").addEventListener("click", () => {
        const existing = cart.find(item => item.name === product.name);
        if (existing) {
          existing.quantity += quantity;
        } else {
          cart.push({ name: product.name, price: product.price, quantity });
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
        alert("Added to cart!");
      });
    }

    function fetchSimilarProducts(product) {
      fetch('products.json')
        .then(res => res.json())
        .then(allProducts => {
          const filtered = allProducts.filter(p =>
            p.category === product.category && p.name !== product.name
          );

          renderSimilarProducts(filtered);
        })
        .catch(err => {
          console.error("Error loading products.json:", err);
          similarContainer.innerHTML = `<p style="color: #999;">Failed to load similar products.</p>`;
        });
    }

    function renderSimilarProducts(products) {
      similarContainer.innerHTML = products.map(p => `
        <div class="product">
          <img src="${p.image}" alt="${p.name}" />
          <h3>${p.name}</h3>
          <p>$${p.price.toFixed(2)}</p>
        </div>
      `).join('');
    }

    function updateCartCount() {
      const total = cart.reduce((sum, item) => sum + item.quantity, 0);
      cartCountElement.textContent = total;
    }
  });