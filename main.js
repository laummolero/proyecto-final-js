//funcion para cargar el inventario desde el localstorage
function loadInventory() {
  let inventory = JSON.parse(localStorage.getItem("inventory")) || [];
  let inventoryList = document.querySelector("#inventoryList");
  inventoryList.innerHTML = ""; //evita que se los items agregados anteriormente se vuelvan a repetir al ingresar un nuevo item

  inventory.forEach((item, index) => {
    let li = document.createElement("li");
    li.innerHTML = `Number: ${item.number}, Name: ${item.name}, Price: ${item.price}, Added: ${item.timestamp} <button onclick="deleteItem(${index})">Delete</button>`;
    inventoryList.appendChild(li);
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
  let timestamp = DateTime.now().toLocaleString(DateTime.DATETIME_MED);

  inventory.push({
    number: itemNumber,
    name: itemName,
    price: itemPrice,
    timestamp: timestamp,
  });
  localStorage.setItem("inventory", JSON.stringify(inventory));

  //mensaje en console
  console.log(
    `Item added: Number: ${itemNumber}, Name: ${itemName}, Price: ${itemPrice}, Timestamp: ${timestamp}`
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

//evento para el boton
document.querySelector("#addItemButton").addEventListener("click", addItem);

//cargar el inventario al iniciar la pagina
loadInventory();
