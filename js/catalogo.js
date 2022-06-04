const url = 'https://product-app-josue99.herokuapp.com/products/all';

const btn = document.getElementById('btnRefresh');



btn.onclick = () => {
  location.reload();

}


const cargarCatalogo = async () => {

  const container = document.querySelector('#portafolio');
  let contentHTML = '';

  contentHTML += `<div class="col-md-4">
                        <img src="images/glow-3d.jpg" class="img-thumbnail imgCatalogo">
                        <h5 class="title mt-3">SKU: Único</h5>
                        <h5 class="title mt-3">Producto: Personalizado en PLA fosforesente</h5>
                        <h5 class="title mt-3">Descripción: La mejor figura es la que tú personalizas</h5>
                        <h5 class="title mt-3">Precio: $ incalculable</h5>
                        <button type="button" class="btn btn-outline-light btnImprimirCatalogo" >Imprimir</button>
                    </div>`;

  contentHTML += `<div class="col-md-4">
                        <img src="images/resina-catalogo.jpg" class="img-thumbnail imgCatalogo">
                        <h5 class="title mt-3">SKU: Único</h5>
                        <h5 class="title mt-3">Producto: Personalizado en  resina hiper-realista</h5>
                        <h5 class="title mt-3">Descripción: La mejor figura es la que tú personalizas</h5>
                        <h5 class="title mt-3">Precio: $ incalculable</h5>
                        <button type="button" class="btn btn-outline-light btnImprimirCatalogo" >Imprimir</button>
                    </div>`;

  contentHTML += `<div class="col-md-4">
                        <img src="images/pla-cristal.webp" class="img-thumbnail imgCatalogo">
                        <h5 class="title mt-3">SKU: Único</h5>
                        <h5 class="title mt-3">Producto: Personalizado en PLA transparente</h5>
                        <h5 class="title mt-3">Descripción: La mejor figura es la que tú personalizas</h5>
                        <h5 class="title mt-3">Precio: $ incalculable</h5>
                        <button type="button" class="btn btn-outline-light btnImprimirCatalogo" >Imprimir</button>
                    </div>`;

  contentHTML += `<div class="col-md-4">
                        <img src="images/pla-tipos.jpg" class="img-thumbnail imgCatalogo">
                        <h5 class="title mt-3">SKU: Único</h5>
                        <h5 class="title mt-3">Producto: Personalizado en PLA calidad ajustable</h5>
                        <h5 class="title mt-3">Descripción: La mejor figura es la que tú personalizas</h5>
                        <h5 class="title mt-3">Precio: $ incalculable</h5>
                        <button type="button" class="btn btn-outline-light btnImprimirCatalogo" >Imprimir</button>
                    </div>`;




  await fetch(url).then((response) => {
    return response.json();
  }).then((productos) => {



    for (let product of productos) {

      const image = product.image;
      const tittle = product.title;
      const description = product.description;
      const precio = product.precio;
      const id = product.id;

      contentHTML += `
              <div class="col-md-4 mt-3">
                    <img src="${image}" class="img-thumbnail imgCatalogo">
                    <h5 class="title mt-3">SKU: ${id}</h5>
                    <h5 class="title mt-3">Producto: ${tittle}</h5>
                    <h5 class="title mt-3">Descripción: ${description}</h5>
                    <h5 class="title mt-3">Precio: $ ${precio}</h5>
                    <button  data-bs-toggle="modal" data-bs-target="#exampleModalDetalles" type="button" onclick="detallesProducto(${id})" class="btn btn-outline-light btnImprimirCatalogo" >Detalles</button>
              </div>`;
    }
  }).catch(err => {
    console.log("Error Reading data " + err);
  });

  container.innerHTML = contentHTML;

}

cargarCatalogo();

let urlDetalles = 'https://product-app-josue99.herokuapp.com/products/get/{id}?id=';

async function detallesProducto(id) {

  const container = document.querySelector('#modalDetalles');
  let contentHTML = '';

  await fetch(urlDetalles + id).then((response) => {
    return response.json();
  }).then((product) => {

    const image = product.image;
    const tittle = product.title;
    const description = product.description;
    const precio = product.precio;
    const id = product.id;

    contentHTML += `
                      <div class="col-md-6 my-3">
                            <img src="${image}" class="img-thumbnail imgCatalogo">
                      </div>

                      <div class="col-md-6 mt-3">
                            <h5 class="title mt-3">SKU: ${id}</h5>
                            <h5 class="title mt-3">Producto: ${tittle}</h5>
                            <h5 class="title mt-3">Descripción: ${description}</h5>
                            <h5 class="title mt-3">Precio: $ ${precio}</h5>
                            <button type="button" onclick="imprimir(${id})" class="btn btn-outline-light" >Imprimir</button>
                      </div>`;

    container.innerHTML = contentHTML;

  });


}

async function imprimir(id) {

  window.location.href = "imprimir.html?id=" + id;
}