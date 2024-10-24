const currency = document.querySelectorAll(".currency");
const btn = document.getElementById("btn");

//taxas de conversão
const taxas = {
  real: { nome: "Real", valor: 1, simbolo: "R$", img: "real.svg" },
  dolar: { nome: "Dolár", valor: 5.71, simbolo: "$", img: "dolar.svg" },
  euro: { nome: "Euro", valor: 6.16, simbolo: "€", img: "euro.svg" },
  libras: { nome: "Libra", valor: 7.39, simbolo: "£", img: "libra.svg" },
  kwanzas: { nome: "kwanzas", valor: 0.0063, simbolo: "Kz", img: "kz.webp" },
  bitcoin: { nome: "Bitcoin", valor: 384393.40, simbolo: "₿", img: "bitcoin.svg" }
};

//evneto de mudança de moeda
currency.forEach((moeda) => {
  moeda.addEventListener("change", (e) => {
    alterarMoeda(e.target);
  });
});

//evento para converter o valor
btn.addEventListener("click", (e) => {
  const moedaOriginal = document.getElementById("moeda-original").value;
  const moedaDestino = document.getElementById("moeda-destino").value;
  const valor = document.getElementById("valor")
  console.log(valor.value)
  conversor(valor, moedaOriginal, moedaDestino);
});

//função para alterar a imagem da moeda
function alterarMoeda(select) {
  const moeda = taxas[select.value];
  const id_img =
    select.id === "moeda-original"
      ? "img-currency-original"
      : "img-currency-convert";

  //alterar a imagem da moeda
  const img = document.getElementById(id_img);
  img.src = `assets/${moeda.img}`;

  //alterar o texto da moeda
  const currencyBox = img.parentElement;
  const text = currencyBox.querySelector(".currency-text");
  text.innerHTML = moeda.nome;

  //alterar o valor da moeda
  const valor = currencyBox.querySelector(".currency-value");
  valor.innerHTML = moeda.simbolo + " 0.00";
}

//função para converter o valor
const conversor = (valor, taxaOriginal, taxaDestino) => {
  taxaDestino = taxas[taxaDestino];
  taxaOriginal = taxas[taxaOriginal];
  console.log(taxaOriginal, taxaDestino);

  //calcular o valor convertido
  let valorConvertido = (valor.value * taxaOriginal.valor) / taxaDestino.valor;
  
  //arredondar o valor
  console.log(taxaDestino)
  const  arredondarValorConvertido = taxaDestino.nome === "Bitcoin" ? valorConvertido.toFixed(7) : valorConvertido.toFixed(2);
  const arredondarValorOriginal =  taxaOriginal.nome === "Bitcoin" ? Number(valor.value).toFixed(7) :Number(valor.value).toFixed(2);
 
    //mostrar o valor original
  document.getElementById(
    "original"
  ).innerHTML = `${taxaOriginal.simbolo} ${arredondarValorOriginal}`;

//mostrar o valor convertido
  document.getElementById("destino").innerHTML = `${
    taxaDestino.simbolo
  } ${arredondarValorConvertido}`;
};
