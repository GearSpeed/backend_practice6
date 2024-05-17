/**
 *  1. Registrar un nuevo koder [add]
 *  2. Listar todos los koders [ls]
 *  3. Eliminar koders por nombre [rm]
 *  4. Eliminar todos los koders [reset]
 */
const fs = require("fs");
const dbFile = "kodersdb.json";

main();

//Inicializamos programa
function init() {
  const fileExists = fs.existsSync(dbFile);
  if (!fileExists) {
    fs.writeFileSync(dbFile, JSON.stringify({ koders: [] }));
  }
}

// función para obtener los koders
function getKoders() {
  const content = fs.readFileSync(dbFile, "utf8");
  return JSON.parse(content).koders;
}

// función para actualizar archivo JSON
function updateKoders(koders) {
  const newKoders = { koders: koders };
  const newKodersAsString = JSON.stringify(newKoders);
  fs.writeFileSync(dbFile, newKodersAsString);
}

// 1. funcion para agregar, requiere un parametro que trae el nombre del koder
function add(koder) {
  const koders = getKoders();

  if (!koders.length) {
    koders.push(koder);
    updateKoders(koders);
    console.log("Koder added c:");
  } else {
    for (let i = 0; i < koders.length; i++) {
      if (koders[i] === koder) {
        console.log("Existing koder.");
        i = koders.length;
      } else if (i === koders.length - 1 && koders[i] != koder) {
        koders.push(koder);
        updateKoders(koders);
        console.log("Koder added c:");
        i = koders.length;
      }
    }
  }
}

// 2. Función para listar todos los koders
function ls() {
  const koders = getKoders();
  if (!koders.length) {
    console.log("[EMPTY]");
    process.exit();
  }
  koders.forEach((koder) => {
    console.log("-", koder);
  });
}

// 3. Función para eliminar koder por nombre
function rm(koder) {
  const koders = getKoders();
  for (let i = 0; i < koders.length; i++) {
    if (koders[i] === koder) {
      koders.splice(i, 1);
      console.log("Koder removed.");
    } else if (i === koders.length - 1 && koders[i] != koder) {
      console.log("Koder NOT found.");
    }
  }

  updateKoders(koders);
}

// 4. Función para eliminar todos los koders
function reset() {
  updateKoders([]);
}

function main() {
  const command = process.argv[2];
  const arg = process.argv[3];
  init();
  switch (command) {
    case "add":
      if (!arg) {
        console.error("Name koder needed");
        process.exit(1);
      }
      add(arg);
      ls();
      break;
    case "ls":
      ls();
      break;
    case "rm":
      if (!arg) {
        console.error("Name koder needed");
        process.exit(1);
      }
      rm(arg);
      ls();
      break;
    case "reset":
      reset();
      break;
    default:
      console.error("Invalid command: ", command);
      process.exit(1);
      break;
  }
}
