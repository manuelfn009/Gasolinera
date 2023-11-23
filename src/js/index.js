let API = "";
const container = document.querySelector(".container");
let select = document.querySelector(".gasofa");

const APIGOB = "https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/FiltroMunicipio/";

let id = "";

select.addEventListener("change", getPetrolStations);

// Obtener el valor actual de select al iniciar la aplicación
switch (select.value) {
    case "merida":
        id = 712;
        break;
    case "badajoz":
        id = 644;
        break;
    case "caceres":
        id = 1579;
        break;
}

// Configurar el valor de API al iniciar la aplicación
API = APIGOB + id;

// Llamar a la función getPetrolStations al iniciar la aplicación
getPetrolStations();

async function getPetrolStations() {
    container.innerHTML = "";

    // Obtener el valor actual de select dentro de la función
    switch (select.value) {
        case "merida":
            id = 712;
            break;
        case "badajoz":
            id = 644;
            break;
        case "caceres":
            id = 1579;
            break;
    }
    API = APIGOB + id;

    // Configurar el valor de API dentro de la función
    console.log(API);

    let res = await fetch(API);
    let data = await res.json();
    let gasofas = [];

    let gasolineras = data.ListaEESSPrecio;

    gasolineras.forEach(gasolinera => {
        let price = gasolinera["Precio Gasolina 95 E5"];
        let direction = gasolinera["Dirección"];
        if (price == "") {
            return;
        }

        let priceParsed = parseFloat(price.replace(/,/g, "."));
        let obj = { "price": priceParsed, "direction": direction };
        gasofas.push(obj);
    });

    gasofas.sort((a, b) => a.price - b.price);

    gasofas.forEach(gasolinera => {
        let li = document.createElement("li");
        let newPrice = gasolinera.price;

        switch (true) {
            case (newPrice < 1.55):
                li.classList.add("verde");
                break;
            case (newPrice >= 1.55 && newPrice < 1.57):
                li.classList.add("naranja");
                break;
            case (newPrice >= 1.57):
                li.classList.add("rojo");
                break;
        }

        li.innerText = ` ${gasolinera.direction}: ${gasolinera.price}€/l `;
        container.appendChild(li);

    });
}
