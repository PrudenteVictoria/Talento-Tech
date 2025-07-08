document.addEventListener("DOMContentLoaded", () => {
     const renderizarProd = () => {
        let pedido = JSON.parse(localStorage.getItem("pedido")) || [];
        prodEnPedido(pedido);
        let seccionProd = document.getElementById("contenedor");
        /*Para que se borre el producto del carrito y se actualice con los productos restantes*/
        seccionProd.innerHTML = "" 
        if (!pedido.length){
            let mensajePedido = document.createElement("p");
            mensajePedido.classList.add("mensaje-vacío");
            mensajePedido.textContent = "Vacío. No se encuentra un pedido para mostrar."
            seccionProd.appendChild(mensajePedido);

            /*Renderizado*/
        }else{
            pedido.forEach((elemento, index) => {
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

                let eliminar = document.createElement("button");
                eliminar.textContent = "Eliminar";
                eliminar.addEventListener("click", ()=>{
                    eliminarProd(index)
                });

                cardProduct.appendChild(imgProduct);
                cardProduct.appendChild(tituloProduct);
                cardProduct.appendChild(precioProduct);
                cardProduct.appendChild(eliminar);

                seccionProd.appendChild(cardProduct);
            });
        }
        renderizarBtn();
        resumenPedido();
    };

    const resumenPedido = (indice) => {
        const pedido = JSON.parse(localStorage.getItem("pedido")) || [];
        const resumen = document.getElementById("resume");
        resumen.innerHTML = ""
        if (pedido.length === 0) return;

        /*total*/
        const cantProd = pedido.length;
        const totalImp = pedido.reduce((acc, producto) => acc + producto.price, 0)
        
        /*crear elemento*/
        const cant = document.createElement("p");
        cant.textContent = `Cantidad de inflables: ${cantProd}`;

        const total = document.createElement("p");
        total.textContent = `Total: $${totalImp.toFixed(2)}` 
        
        resumen.appendChild(cant);
        resumen.appendChild(total);
    }

    const renderizarBtn = () => {
        let pedido = JSON.parse(localStorage.getItem("pedido")) || [];
        let acciones = document.getElementById("actions");
        acciones.innerHTML= ""
        if (pedido.length){
            let vaciar = document.createElement("button")
            vaciar.textContent ="Restaurar pedido"

            vaciar.addEventListener("click", () =>{
                restaurarPedido()
            });
            let finalizar = document.createElement("button")
            finalizar.textContent = "Confirmar pedido"
            finalizar.addEventListener("click", () => {
                let confirmar = confirm("¿Desea confirmar el pedido?");
                if (confirmar){
                    alert("Pedido realizado con éxito.")
                    localStorage.removeItem("pedido");
                    window.location.href = "index.html"
                };
            });

            acciones.appendChild(vaciar)
            acciones.appendChild(finalizar)
        };
    };



    const prodEnPedido = (pedido) => {
        let contadorProd = document.getElementById("contador");
        contadorProd.textContent = pedido.length;
    };

    const eliminarProd = (indice) => {
        let pedido = JSON.parse(localStorage.getItem("pedido")) || [];
        pedido.splice(indice, 1);
        localStorage.setItem("pedido", JSON.stringify(pedido));
        renderizarProd();
    };

    const restaurarPedido = () => {
        let confirmar = confirm("¿Desea restaurar el pedido?");
        if (confirmar){
            localStorage.removeItem("pedido");
            alert("Pedido restaurado.");
            renderizarProd();
        };
    };
    renderizarProd()
});