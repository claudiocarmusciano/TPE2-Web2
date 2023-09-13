"use strict"

// AddEventListener del boton Menú hamburguesa
document.querySelector(".btn-hamburguesa").addEventListener("click", toggleMenu);

function toggleMenu() {
    document.querySelector(".navigation").classList.toggle("show");
}


// Guardamos en la variable tablaCarrito la tabla carrito de compras
let tablaCarrito = document.getElementById("tabla-carrito");

// AddEventListener del boton Agregar (al carrito)
document.getElementById("btn-agregar").addEventListener("click", agregar);

// Declaramos arreglo para guardar todos los items del carrito
let items = [];

// AddEventListener del boton Combo Oferta
let nodoBtnCombo = document.getElementById("btn-combo");
nodoBtnCombo.addEventListener("click",cargarX3);

// AddEventListener del Boton Limpiar Carrito
document.getElementById("btn-limpiarCarrito").addEventListener("click", limpiarCarrito);

// declaramos un arreglo Json para tener precargados 10 artículos
let select = document.getElementById("select-articulo");
let arrArticulo = [     {"articulo":"Pc Gamer", "precio": 120000},
                        {"articulo":"Notebook HP","precio": 90000}, 
                        {"articulo":"Mouse inalambrico", "precio": 1100},
                        {"articulo":"Teclado gamer", "precio": 2000},
                        {"articulo":"Mousepad RGB", "precio": 2100},
                        {"articulo":"Monitor 24 FHD", "precio": 15000},
                        {"articulo":"Auriculares RGB", "precio": 3200},
                        {"articulo":"Gabinete gamer", "precio": 10000},
                        {"articulo":"Memoria DDR4 8gb", "precio": 8400},
                        {"articulo":"Disco rígido 2tb", "precio": 9200}      
                ];

// cargamos un artículo al azar en la tabla
articuloAzar();

function articuloAzar () {  
    let random = Math.floor (Math.random()*arrArticulo.length);
    arrArticulo[random].cantidad = 1;
    arrArticulo[random].total = arrArticulo[random].cantidad * arrArticulo[random].precio;

    let html = `<tr> <td>${arrArticulo[random].articulo}</td> 
                        <td>${arrArticulo[random].cantidad}</td> 
                        <td>${arrArticulo[random].precio}</td> 
                        <td>${arrArticulo[random].total}</td> 
                        <td> <button class="botonBorrar">Borrar</button> </td> 
                        </tr>`;
    tablaCarrito.innerHTML += html;
    
    let item = {
        articulo: arrArticulo[random].articulo,
        cantidad: arrArticulo[random].cantidad,
        precio: arrArticulo[random].precio,
        total: arrArticulo[random].total,
    }
    items.push(item);

    cargarArregloBtnBorrar();
} 

// cargamos el select de la página del carrito con el arreglo de los artículos precargados
for (let i=0; i<arrArticulo.length; i++) {

    let art = arrArticulo[i].articulo;

    let nodo = document.createElement("option");
    nodo.textContent = art;
    nodo.value = art;
    select.appendChild(nodo);  
}  

// Función que responde al boton Combo OFERTA (carga tres articulos al azar)
function cargarX3() {
    for (let i=1; i<=3; i++) {
        articuloAzar();
    }
}


// JSON Boton agregar al carrito
function agregar() {
    
    let seguir = true;
    let i = 0;
    let preValue = 0;
    let artValue = document.getElementById("select-articulo").value;
    let cantValue = document.getElementById("cantArticulo").value;
    
    if (artValue != "Seleccione un artículo") {
        // Con este WHILE buscamos en el arreglo precargado, el articulo que seleccionamos 
        // en el Select y nos cargamos el precio
        while ((i<arrArticulo.length)&&(seguir)) {
            if (artValue==arrArticulo[i].articulo) {
                preValue = arrArticulo[i].precio;
                seguir=false;
            }
            i++;
        }
        let totValue = cantValue * preValue;

        // Acá cargamos el item para poder agregarlo al arrego Json (items)
        let item = {
            articulo: artValue,
            cantidad: cantValue,
            precio: preValue,
            total: totValue
        }

        items.push(item);

        limpiarInputs();
        mostrar();
    }
}

function limpiarInputs() {
    document.getElementById("cantArticulo").value=1;
    document.getElementById("select-articulo").value="Seleccione un artículo";
}


// Función para mostrar la tabla del carrito
function mostrar() {
    let tablaCarrito = document.getElementById("tabla-carrito");

    limpiarTabla();

    for (let i=0; i<items.length; i++) {
        let item = items[i];
        let html = `<tr> <td>${item.articulo}</td> 
                         <td>${item.cantidad}</td> 
                         <td>${item.precio}</td> 
                         <td>${item.total}</td>
                         <td> <button class="botonBorrar">Borrar</button> </td> </tr>`;
        tablaCarrito.innerHTML += html;
    }

    cargarArregloBtnBorrar();
}

// Función para limpiar la tabla del carrito
function limpiarTabla () {
    let tablaCarrito = document.getElementById("tabla-carrito");
    tablaCarrito.innerHTML ='';

    tablaCarrito.innerHTML =    `<thead>
                                    <tr>
                                        <th class="th-articulo">Artículo</th>
                                        <th class="th-cantidad">Cant.</th>
                                        <th class="th-precio">Precio unit.</th>
                                        <th class="th-total">Precio total</th>
                                        <th class="th-borrar">Borrar</th>
                                    </tr>
                                </thead>`;
}

// Función para hacer un arreglo de todos los botones Borrar
function cargarArregloBtnBorrar() {
    let btnsBorrar = document.querySelectorAll(".botonBorrar");
    let largoArreglo = items.length;
    for(let i = 0; i < largoArreglo; i++) {
        btnsBorrar[i].addEventListener('click', function(e){
            borrarItem(i)
        });
    } 
     
}

// Función para limpiar todo el carrito
function limpiarCarrito() {
    let arregloTotal= items.length;
    items.splice(0,arregloTotal);
    mostrar();
}

// Función para borrar un item del carrito
function borrarItem(i) {
    items.splice(i,1);
    mostrar();
}
