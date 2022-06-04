let url = 'https://product-app-josue99.herokuapp.com/products/get/{id}?id=';

function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

const id = getParameterByName('id');

url += id;


const detallesProducto = async () => {

    const container = document.querySelector('#Detalles');
    let contentHTML = '';

    await fetch(url).then((response) => {
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
                        </div>`;

        container.innerHTML = contentHTML;

    });


}

detallesProducto();