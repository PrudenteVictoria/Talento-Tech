document.addEventListener("DOMContentLoaded", () => {
    /*parse es para la conversión de json a js*/
    /*Get item se toma lo que tenga la clave carrito*/
    /*Si en el localstorage en carrito no hay nada devuelve el null, entonces se le asignará un array vacío*/
    let pedido = JSON.parse(localStorage.getItem("pedido"))|| [];
    const renderizarProductos = () =>{
        const url = "https://dummyjson.com/products/category/kitchen-accessories"
        fetch(url).then(response => response.json())
            .then((data) => {
                let contenedor = document.getElementById("contenedor");
                
                for (const elemento of data.products){
                    let cardProduct = document.createElement("article");
                    cardProduct.classList.add("card-product");
                    
                    let imgProduct = document.createElement("img");
                    imgProduct.src = elemento.images[0];
                    imgProduct.alt = elemento.description; 

                    let tituloProduct = document.createElement("h2");
                    tituloProduct.classList.add("title-product");
                    tituloProduct.textContent = elemento.title;

                    let precioProduct = document.createElement("p");
                    precioProduct.textContent = `$${elemento.price}`;

                    let agregar = document.createElement("button");
                    agregar.textContent = "Agregar";
                    agregar.addEventListener("click", () =>{
                        agregarProducto(elemento);
                        actualizarPedido();
                    });

                    cardProduct.appendChild(imgProduct);
                    cardProduct.appendChild(tituloProduct);
                    cardProduct.appendChild(precioProduct);
                    cardProduct.appendChild(agregar);

                    contenedor.appendChild(cardProduct);
                }
            })
            .catch((err) => console.error ("Error: ", err));
    };
    const agregarProducto = (producto) => {
        pedido.push(producto);
        localStorage.setItem("pedido", JSON.stringify(pedido));
    };

    const actualizarPedido = () => {
        const contador = document.getElementById("contador");
        contador.textContent = pedido.length
    };
    renderizarProductos();
    actualizarPedido();
});