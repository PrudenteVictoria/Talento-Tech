document.addEventListener("DOMContentLoaded", () => {
    /*parse es para la conversión de json a js*/
    /*Get item se toma lo que tenga la clave carrito*/
    /*Si en el localstorage en carrito no hay nada devuelve el null, entonces se le asignará un array vacío*/
    let carrito = JSON.parse(localStorage.gerItem("carrito"))|| [];
    const renderizarProductos =() =>{
        url = "https://dummyjson.com/products/category/furnitures"
        fetch(url).then(response => response.json)
        .then((data) => )




        .catch((err) => console.error ("Error: ", err))
    };




});