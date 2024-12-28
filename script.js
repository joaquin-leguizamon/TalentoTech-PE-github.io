// Verifica que los datos del formulario estan completos
document.addEventListener("DOMContentLoaded", function () {
    if (window.location.pathname.includes("contacto.html")) {
        console.log("Página de contacto detectada.");

        const form = document.querySelector(".contacto-form");
        if (form) {
            console.log("Formulario encontrado.");

            form.addEventListener("submit", function (event) {
                event.preventDefault();
                console.log("Evento submit detectado.");
                let name = document.getElementById("name").value;
                let email = document.getElementById("email").value;

                if (name && email) {
                console.log("Formulario completado con éxito.");
                this.submit();
                } else {
                console.log("Faltan campos por llenar, por favor complétalos.");
                }
            });
        } else {
            console.log("Formulario no encontrado.");
        }
    } else {
        console.log("No estás en la página de contacto.");
    }
});

// Funcion para obtener productos de la API y mostrar descripción ampliada
let products = [];
let cart = JSON.parse(localStorage.getItem('cart')) || [];

/** Función para obtener productos de la API */ 
const fetchProductsFromAPI = async () => {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const apiProducts = await response.json();
    products = apiProducts.filter(product =>
      product.category === "men's clothing" || product.category === "women's clothing"
    );


  // Lista de productos disponibles
  apiProducts.forEach((product) => {
    console.log(`ID: ${product.id}, Título: ${product.title}, Precio: $${product.price}`);
  });

    renderProducts(products);
  } catch (error) {
    console.error("Error al obtener productos:", error);
  }
};


const renderProducts = (products) => {
  const apiContainer = document.querySelector(".productos");
  apiContainer.innerHTML = "";

  products.forEach(product => {
    const card = document.createElement("div");
    card.classList.add("producto-card");
    card.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <h3>${product.title}</h3>
      <p class="precio">$${product.price}</p>
      <button class="view-description btn" data-id="${product.id}">Ver descripción</button>
      <button class="shop-button btn" data-id="${product.id}">Agregar al carrito</button>
    `;
    apiContainer.appendChild(card);
  });


  document.querySelectorAll(".view-description").forEach(button => {
    button.addEventListener("click", (e) => {
      const productId = e.target.dataset.id;
      showProductDescription(productId);
    });
  });

  document.querySelectorAll(".shop-button").forEach(button => {
    button.addEventListener("click", (e) => {
      const productId = e.target.dataset.id;
      addToCart(productId);
    });
  });
};

/** Descripción ampliada del producto */ 
const showProductDescription = (productId) => {
  const product = products.find(p => p.id == productId);
  if (product) {
    Swal.fire({
      title: product.title,
      text: product.description,
      imageUrl: product.image, 
      imageWidth: 200,
      imageHeight: 200,
      imageAlt: product.title,
      confirmButtonText: 'Cerrar',
    });
  }
};


document.addEventListener("DOMContentLoaded", fetchProductsFromAPI);

/**Agregar producto al carrito */ 
const addToCart = (productId) => {
  const product = products.find(p => p.id == productId);
  const existingProduct = cart.find(p => p.id == productId);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart();

  Swal.fire({
    icon: 'success',
    title: 'Producto agregado al carrito',
    text: `${product.title} se agregó al carrito`,
    showConfirmButton: false,
    timer: 1500,
  });
};

const saveCart = () => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const renderCart = () => {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const checkoutButton = document.getElementById("checkout-button");

  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    const row = document.createElement("tr");
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    row.innerHTML = `
      <td><div class="product-cart"> <img src="${item.image}" class="d-block w-100" alt="${item.title}"/>
      <h2>${item.title}</h2>
      </div></td>
      <td>$${item.price}</td>
      <td>
        <input type="number" value="${item.quantity}" min="1" data-id="${item.id}" class="form-control text-center">
      </td>
      <td>$${itemTotal.toFixed(2)}</td>
       <td> <button class="btn btn-danger remove-button" data-id="${item.id}"><i class="fas fa-trash"></i></button></td>
    `;

    cartItems.appendChild(row);
  });

  cartTotal.textContent = total.toFixed(2);
  checkoutButton.disabled = cart.length === 0;


  document.querySelectorAll(".form-control").forEach(input => {
    input.addEventListener("change", (e) => {
      const productId = e.target.dataset.id;
      const newQuantity = parseInt(e.target.value);
      updateCartQuantity(productId, newQuantity);
    });
  });

  document.querySelectorAll(".remove-button").forEach(button => {
    button.addEventListener("click", (e) => {
      const productId = e.currentTarget.dataset.id;
      removeFromCart(productId);
    });
  });
};


const updateCartQuantity = (productId, quantity) => {
  const product = cart.find(p => p.id == productId);
  if (quantity <= 0) {
    removeFromCart(productId);
  } else {
    product.quantity = quantity;
    saveCart();
    renderCart();
  }
};


const removeFromCart = (productId) => {
  cart = cart.filter(p => p.id != productId);
  saveCart();
  renderCart();
};


document.getElementById("checkout-button")?.addEventListener("click", () => {
  if (cart.length > 0) {
    cart = [];
    saveCart();


    Swal.fire({
      icon: 'success',
      title: 'Su compra se realizó con éxito',
      text: 'Gracias por tu compra',
    });

    renderCart();
  }
});


if (document.querySelector(".api-products-container")) {
  fetchProductsFromAPI();
}
if (document.getElementById("cart-items")) {
  renderCart();
}
