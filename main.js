//funcion para cargar el inventario desde localStorage
function loadInventory() {
  let inventory = JSON.parse(localStorage.getItem("inventory")) || [];
  let inventoryList = document.querySelector("#inventoryList");
  inventoryList.innerHTML = ""; //evita que se los items agregados anteriormente se vuelvan a repetir al ingresar un nuevo item

  inventory.forEach((item, index) => {
    let li = document.createElement("li");
    li.innerHTML = `Number: ${item.number}, Name: ${item.name} <button onclick="deleteItem(${index})">Delete</button>`;
    inventoryList.appendChild(li);
  });
}

//funcion para agregar un item al inventario
function addItem() {
  let itemNumber = document.querySelector("#itemNumber").value;
  let itemName = document.querySelector("#itemName").value;
  let messageDiv = document.querySelector("#message");

  //validacion de entrada
  if (!itemNumber || !itemName) {
    Swal.fire("Error", "Please, complete both boxes", "error");
    return;
  }

  let inventory = JSON.parse(localStorage.getItem("inventory")) || [];
  let DateTime = luxon.DateTime; //uso de Luxon para añadir fecha y hora
  let timestamp = DateTime.now().toLocaleString(DateTime.DATETIME_MED);

  inventory.push({ number: itemNumber, name: itemName, timestamp: timestamp });
  localStorage.setItem("inventory", JSON.stringify(inventory));

  //mensaje en console
  console.log(
    `Item added: Number: ${itemNumber}, Name: ${itemName}, Timestamp: ${timestamp}`
  );

  messageDiv.textContent = "Item added successfully.";
  loadInventory();

  //limpiar las cajas
  document.querySelector("#itemNumber").value = "";
  document.querySelector("#itemName").value = "";
}

//funcion para eliminar los item del inventario
function deleteItem(index) {
  let inventory = JSON.parse(localStorage.getItem("inventory")) || [];
  inventory.splice(index, 1); //elimina el item en el index especificado
  localStorage.setItem("inventory", JSON.stringify(inventory));

  Swal.fire("Deleted!", "Item has been removed.", "success");
  loadInventory();
}

//evento para el boton
document.querySelector("#addItemButton").addEventListener("click", addItem);

//cargar el inventario al iniciar la pagina
loadInventory();
