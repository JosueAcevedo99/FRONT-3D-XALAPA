const btn = document.getElementById('btn');
const btnUpdate = document.getElementById('btnUpdate');

btnUpdate.disabled = true;

btn.onclick = () => {
  cargarProductos();
  location.reload();

}


btnUpdate.onclick = () => {
  let id = document.getElementById('txtId').innerHTML;
  modificar(id);
  cargarProductos();
  location.reload();

}

const btnCrear = document.getElementById('btnCrear');

btnCrear.onclick = () => {
  agregarProducto();
  location.reload();

}

const urlGetAll = 'https://product-app-josue99.herokuapp.com/products/all';

const cargarProductos = async () => {

  await fetch(urlGetAll).then((response) => {
    return response.json();
  }).then((productos) => {


    let listadoHtml = '';

    for (let product of productos) {
      let botonEliminar = '<a href="#" onclick="eliminarProducto(' + product.id + ')" class="btn btn-danger btn-circle btn-sm"><i class="bi bi-trash"></i></a>';
      let botonUpdate = '<a href="#" onclick="llenarformulario(' + product.id + ')" class="btn btn-danger btn-circle btn-sm"><i class="bi bi-pencil"></i></a>';

      let productoHtml = '<tr><td>' + product.id + '</td><td>' + product.title + '</td><td>' + product.description + '</td><td>' + product.precio + '</td><td>' + product.image + '</td><td>' + botonEliminar + '</td><td>' + botonUpdate + '</td></tr>';
      listadoHtml += productoHtml;
    }

    document.querySelector('#productos tbody').outerHTML = listadoHtml;
  })
}

cargarProductos();


const urlDelete = 'https://product-app-josue99.herokuapp.com/products/delete/';

async function eliminarProducto(id) {

  if (!confirm('¿Desea eliminar este producto?')) {
    return;
  }

  const request = await fetch(urlDelete + id, {
    method: 'DELETE'
  });

  btn.click();
}

const urlCreate = 'https://product-app-josue99.herokuapp.com/products/create';

async function agregarProducto() {

  let datos = {};
  datos.description = document.getElementById('txtDescription').value;
  datos.id = "";
  datos.title = document.getElementById('txtTitle').value;
  datos.image = document.getElementById('txtImage').value;
  datos.precio = document.getElementById('txtPrecio').value;


  const request = await fetch(urlCreate, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datos)
  });
  alert("el producto fue creado con exito!");
  btn.click();

}


async function modificar(id) {



  let datos = {};
  datos.description = document.getElementById('txtDescription').value;
  datos.id = id;
  datos.title = document.getElementById('txtTitle').value;
  datos.image = document.getElementById('txtImage').value;
  datos.precio = document.getElementById('txtPrecio').value;


  if (!confirm('¿Desea modificar este producto?')) {
    return;
  }

  const request = await fetch(urlCreate, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datos)
  });
  alert("El producto fue modificado con exito!");
  btn.click();

}

const urlGet = 'https://product-app-josue99.herokuapp.com/products/get/{id}?id=';

async function llenarformulario(id) {

  if (!confirm('¿Desea modificar este producto?')) {
    return;
  }

  await fetch(urlGet + id).then((response) => {
    return response.json();
  }).then((product) => {
    document.getElementById('txtDescription').value = product.description;
    document.getElementById('txtId').innerHTML = product.id;
    document.getElementById('txtTitle').value = product.title;
    document.getElementById('txtImage').value = product.image;
    document.getElementById('txtPrecio').value = product.precio;

  });

  let btnUpdate = document.getElementById('btnUpdate');

  btnUpdate.disabled = false;

}


