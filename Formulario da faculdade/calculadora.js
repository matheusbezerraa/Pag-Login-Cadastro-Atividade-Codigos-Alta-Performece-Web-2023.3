setTimeout(() => {
  alert("Faça seus calculos!!")
},1500);

// seleciona o input de display
var display = document.getElementById("display");

// insere um valor no display
function insert(value) {
  display.value += value;
}

// limpa o display
function clearDisplay() {
  display.value = "";
}

// calcula o resultado da expressão no display
function calculate() {
  var result = eval(display.value);
  display.value = result;
}