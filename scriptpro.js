let products = [];
    fetch('products.json')
      .then(response => response.json())
      .then(data => {
        console.log(data)
        products = data;
        renderProducts();
      })
      .catch(error => console.error('Failed to load products:', error));

    const categories = ["Whey Protein", "Creatine", "Pre Workout", "Vitamins"];

    function renderProducts() {
      const container = document.getElementById("product-sections");
      categories.forEach(category => {
        const section = document.createElement("section");
        section.className = "category-section";
        section.id = category.toLowerCase().replace(/\s+/g, '-');

        const heading = document.createElement("h3");
        heading.textContent = category;
        section.appendChild(heading);

        const grid = document.createElement("div");
        grid.className = "product-grid";

        products.filter(p => p.category === category).forEach(product => {
          const productDiv = document.createElement("div");
          productDiv.className = "product";
          productDiv.innerHTML = `
            <a href="productDetails.html" class="product-link" data-product='${JSON.stringify(product)}' style="text-decoration: none; color: inherit;">
              <img src="${product.image}" alt="${product.name}">
              <h4>${product.name}</h4>
              <p>$${product.price.toFixed(2)}</p>
            </a>
            <button class="add-to-cart" data-name="${product.name}" data-price="${product.price}">Add to Cart</button>
          `;
          grid.appendChild(productDiv);
        });

        section.appendChild(grid);
        container.appendChild(section);
      });

      // Attach click handlers to product links
      document.querySelectorAll('.product-link').forEach(link => {
        link.addEventListener('click', function () {
          const productData = this.getAttribute('data-product');
          localStorage.setItem('selectedProduct', productData);
        });
      });
    }

    document.addEventListener("DOMContentLoaded", () => {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      const cartCountElement = document.getElementById("cart-count");

      function updateCartCount() {
        let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountElement.textContent = totalItems;
      }

      document.body.addEventListener("click", event => {
        if (event.target.classList.contains("add-to-cart")) {
          const name = event.target.getAttribute("data-name");
          const price = parseFloat(event.target.getAttribute("data-price"));

          let existing = cart.find(item => item.name === name);
          if (existing) {
            existing.quantity += 1;
          } else {
            cart.push({ name, price, quantity: 1 });
          }

          localStorage.setItem("cart", JSON.stringify(cart));
          updateCartCount();
          alert(`${name} added to cart!`);
        }
      });

      updateCartCount();
    });