//funcion para cargar el inventario desde localStorage
function loadInventory() {
  let inventory = JSON.parse(localStorage.getItem("inventory")) || [];
  let inventoryList = document.querySelector("#inventoryList");
  inventoryList.innerHTML = ""; //evita que se los items agregados anteriormente se vuelvan a repetir al ingresar un nuevo item

  inventory.forEach((item) => {
    let li = document.createElement("li");
    li.textContent = `Number: ${item.number}, Name: ${item.name}`;
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
    messageDiv.textContent = "Please, complete both boxes";
    return;
  }

  let inventory = JSON.parse(localStorage.getItem("inventory")) || [];
  inventory.push({ number: itemNumber, name: itemName });
  localStorage.setItem("inventory", JSON.stringify(inventory));

  //mensaje en consola
  console.log(`Item added: Number: ${itemNumber}, Name: ${itemName}`);

  messageDiv.textContent = "Item added successfully.";
  loadInventory();

  //limpiar las cajas
  document.querySelector("#itemNumber").value = "";
  document.querySelector("#itemName").value = "";
}

//evento para el boton
document.querySelector("#addItemButton").addEventListener("click", addItem);

//cargar el inventario al iniciar la pagina
loadInventory();
