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

// Funcion para obtener productos de la api y mostrar descripcion ampliada
let products = []; 

const fetchProductsFromAPI = async () => {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const apiProducts = await response.json();

    products = apiProducts; 

//Lista de productos disponibles 
    apiProducts.forEach((product) => {
        console.log(`ID: ${product.id}, Título: ${product.title}, Precio: $${product.price}`);
        });
//

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


  addEventListenersToButtons();
};


const addEventListenersToButtons = () => {
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
            background: '#fff', 
            color: '#000',
            padding: '1rem', 
        });
    }
};

fetchProductsFromAPI();


