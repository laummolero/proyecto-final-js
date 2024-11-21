//funcion para cargar el inventario desde el localstorage
function loadInventory() {
  let inventory = JSON.parse(localStorage.getItem("inventory")) || [];
  let inventoryList = document.querySelector("#inventoryList");
  inventoryList.innerHTML = ""; //evita que se los items agregados anteriormente se vuelvan a repetir al ingresar un nuevo item

  let searchQuery = document.querySelector("#searchBox").value.toLowerCase();
  let filteredInventory = inventory.filter((item) =>
    item.name.toLowerCase().includes(searchQuery)
  );

  filteredInventory.forEach((item, index) => {
    let timestamp = Number(item.timestamp);

    let row = document.createElement("tr");
    row.innerHTML = `
    <td>${item.number}</td>
    <td>${item.name}</td>
    <td>${item.price}</td>
    <td>${luxon.DateTime.fromMillis(Number(item.timestamp)).toLocaleString(
      luxon.DateTime.DATETIME_MED
    )}</td>
    <td><button onclick="deleteItem(${index})">Delete</button></td>
    `;
    inventoryList.appendChild(row);
  });
}

//funcion para agregar un item al inventario
function addItem() {
  let itemNumber = document.querySelector("#itemNumber").value;
  let itemName = document.querySelector("#itemName").value;
  let itemPrice = document.querySelector("#itemPrice").value;
  let messageDiv = document.querySelector("#message");

  //validacion de entrada
  if (!itemNumber || !itemName || !itemPrice) {
    Swal.fire("Error", "Please, complete all boxes", "error");
    return;
  }

  if (itemNumber <= 0) {
    Swal.fire("Error", "Item number must be positive", "error");
    return;
  }

  let inventory = JSON.parse(localStorage.getItem("inventory")) || [];
  if (inventory.some((item) => item.number == itemNumber)) {
    Swal.fire("Error", "Item number must be unique", "error");
    return;
  }
  let DateTime = luxon.DateTime; //uso de Luxon para añadir fecha y hora
  let timestamp = DateTime.now().toMillis();

  inventory.push({
    number: itemNumber,
    name: itemName,
    price: itemPrice,
    timestamp: timestamp,
  });
  localStorage.setItem("inventory", JSON.stringify(inventory));

  //mensaje en console
  console.log(
    `Item added: Number: ${itemNumber}, Name: ${itemName}, Price: ${itemPrice}, Timestamp: ${luxon.DateTime.fromMillis(
      timestamp
    ).toLocaleString(luxon.DateTime.DATETIME_MED)}`
  );
  messageDiv.textContent = "Item added successfully.";
  loadInventory();

  //limpiar las cajas
  document.querySelector("#itemNumber").value = "";
  document.querySelector("#itemName").value = "";
  document.querySelector("#itemPrice").value = "";
}

//funcion para eliminar los item del inventario
function deleteItem(index) {
  let inventory = JSON.parse(localStorage.getItem("inventory")) || [];
  inventory.splice(index, 1); //elimina el item en el index especificado
  localStorage.setItem("inventory", JSON.stringify(inventory));

  console.log("Item removed.");
  Swal.fire("Success", "Item removed successfully", "success");
  loadInventory();
}

//funcion para ordenar los items del inventario
function sortBy(attribute) {
  console.log("Sorting by: " + attribute); //debugging

  let inventory = JSON.parse(localStorage.getItem("inventory")) || [];

  inventory.sort((a, b) => {
    //ordena por numero
    if (attribute === "number") {
      return a.number - b.number;
    }
    //ordena por nombre
    if (attribute === "name") {
      return a.name.localeCompare(b.name);
    }
    //ordena por precio
    if (attribute === "price") {
      return parseFloat(a.price) - parseFloat(b.price);
    }
    //ordena por fecha
    if (attribute === "timestamp") {
      return a.timestamp - b.timestamp;
    }
    return 0; //si ningun attributo concuerda
  });
  localStorage.setItem("inventory", JSON.stringify(inventory)); //actualiza la tabla con los items ordenados
  loadInventory();
}

function searchItems() {
  loadInventory();
}

//evento para el boton de añadir
document.querySelector("#addItemButton").addEventListener("click", addItem);

//evento para los botones de sorting
document
  .querySelector("#sortByNumber")
  .addEventListener("click", () => sortBy("number"));
document
  .querySelector("#sortByName")
  .addEventListener("click", () => sortBy("name"));
document
  .querySelector("#sortByPrice")
  .addEventListener("click", () => sortBy("price"));
document
  .querySelector("#sortByDate")
  .addEventListener("click", () => sortBy("timestamp"));

//cargar el inventario al iniciar la pagina
document.addEventListener("DOMContentLoaded", () => {
  loadInventory();
  let searchBox = document.querySelector("#searchBox");
  if (searchBox) {
    searchBox.addEventListener("input", searchItems);
  } else {
    console.error("Seach box not found.");
  }
});
