const API_URL =
  "https://6727e4c3270bd0b97553d39a.mockapi.io/inventory-api/v1/inventory";

//funcion para cargar el inventario desde el server
async function loadInventory() {
  let response = await fetch(API_URL);
  let inventory = await response.json();
  let inventoryList = document.querySelector("#inventoryList");
  inventoryList.innerHTML = ""; //evita que se los items agregados anteriormente se vuelvan a repetir al ingresar un nuevo item

  inventory.forEach((item) => {
    let li = document.createElement("li");
    li.innerHTML = `Number: ${item.number}, Name: ${item.name}, Added: ${item.timestamp} <button onclick="deleteItem(${item.id})">Delete</button>`;
    inventoryList.appendChild(li);
  });
}

//funcion para agregar un item al servidor
async function addItem() {
  let itemNumber = document.querySelector("#itemNumber").value;
  let itemName = document.querySelector("#itemName").value;
  let messageDiv = document.querySelector("#message");

  //validacion de entrada
  if (!itemNumber || !itemName) {
    Swal.fire("Error", "Please, complete both boxes", "error");
    return;
  }

  let DateTime = luxon.DateTime; //uso de Luxon para añadir fecha y hora
  let timestamp = DateTime.now().toLocaleString(DateTime.DATETIME_MED);

  let newItem = { number: itemNumber, name: itemName, timestamp: timestamp };

  let response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newItem),
  });

  //mensaje en console
  if (response.ok) {
    console.log(
      `Item added: Number: ${itemNumber}, Name: ${itemName}, Timestamp: ${timestamp}`
    );
    messageDiv.textContent = "Item added successfully.";
    loadInventory();
  } else {
    messageDiv.textContent = "Failed to add item.";
  }

  //limpiar las cajas
  document.querySelector("#itemNumber").value = "";
  document.querySelector("#itemName").value = "";
}

//funcion para eliminar los item del servidor
async function deleteItem(id) {
  let response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    console.log("Item removed.");
    Swal.fire("Success", "Item removed successfully", "success");
    loadInventory();
  } else {
    console.log("Failed to remove item");
    Swal.fire("Error", "Failed to remove item", "error");
  }
}

//evento para el boton
document.querySelector("#addItemButton").addEventListener("click", addItem);

//cargar el inventario al iniciar la pagina
loadInventory();
