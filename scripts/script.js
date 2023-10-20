const smoothScrollTo = (elementId) => {
  document.getElementById(elementId).scrollIntoView({ behavior: "smooth" });
};

// плавный переход к секции с id=products при клике по кнопке "Смотреть меню"
document.getElementById("main-action-button").onclick = function () {
  // передаем id элемента, к которому будет совершен переход
  smoothScrollTo("products");
};

// находим все ссылки, которые находятся в блоках menu-item
let links = document.querySelectorAll(".menu-item > a");

// плавный переход к нужной секции при клике по соответствующему пункту меню
for (let i = 0; i < links.length; i++) {
  links[i].onclick = function () {
    // значение data-link должно быть равно значению id элемента, к которому будет совершен переход
    smoothScrollTo(links[i].getAttribute("data-link"));
  };
}

// находим все кнопки "Заказать"
let buttons = document.getElementsByClassName("products-button");

// плавный переход к форме для оформления заказа при клике по любой кнопке "Заказать"
for (let i = 0; i < buttons.length; i++) {
  buttons[i].onclick = function () {
    smoothScrollTo("order");
  };
}

// валидация формы
let inputs = Array.from(document.getElementsByTagName("input"));

document.getElementById("order-action").onclick = function (event) {
  event.preventDefault();

  let hasError = false;

  inputs.forEach((item) => {
    //  если какое-то поле формы не заполнено, то меняем цвет рамки на красный
    if (!item.value) {
      item.parentElement.style.background = "red";
      hasError = true;
    } else {
      // иначе используем цвет, который изначально задан в css
      item.parentElement.style.background = "";
    }
  });

  // если все поля формы заполнены, очищаем поля и выводим alert
  if (!hasError) {
    inputs.forEach((item) => {
      item.value = "";
    });

    alert("Спасибо за заказ! Мы скоро свяжемся с вами!");
  }
};

// переключение валют
let prices = document.getElementsByClassName("products-item-price");

document.getElementById("change-currency").onclick = function (event) {
  let currentCurrency = event.target.innerText;

  let newCurrency = "$";
  let coefficient = 1;

  if (currentCurrency === "$") {
    newCurrency = "₽";
    coefficient = 80;
  } else if (currentCurrency === "₽") {
    newCurrency = "BYN";
    coefficient = 3;
  } else if (currentCurrency === "BYN") {
    newCurrency = "€";
    coefficient = 0.9;
  } else if (currentCurrency === "€") {
    newCurrency = "¥";
    coefficient = 6.9;
  }

  // меняем знак валюты внутри кнопки для переключения валют на знак текущей валюты
  event.target.innerText = newCurrency;

  // меняем цены для каждого бургера
  for (let i = 0; i < prices.length; i++) {
    let newPrice = Number(
      prices[i].getAttribute("data-base-price") * coefficient
    ).toFixed();

    prices[i].innerText = newPrice + " " + newCurrency;
  }
};
