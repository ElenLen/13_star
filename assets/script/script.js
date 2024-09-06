"use strict";

// поле ввода имени
const nameImput = document.getElementById("name");
// поле ввода ссылки на аватар
const avaInput = document.getElementById("avatar");
// поле ввода коммента
const commentImput = document.getElementById("comment");
let labelnam = document.querySelector(".labelnam");

// радио кнопка отображения ника
const fieldset = document.querySelector("fieldset");
const radioYes = document.getElementById("yes");
const radioNo = document.getElementById("no");

// радиокнопки показа блока имели
fieldset.addEventListener("click", (e) => {
  if (e.target.type === "radio") {
    if (e.target.id === radioYes.id) {
      radioNo.checked = null;
      // скрываем label
      labelnam.style.display = "inline-block";
      // отображаем поле нейм
      nameImput.type = "text";
      nameImput.value === "";
    } else {
      radioYes.checked = null;
      // скрываем label
      labelnam.style.display = "none";
      // скрываем поле нейм
      nameImput.type = "hidden";
    }
  }
});

// кнопка Отправить
const btn = document.getElementById("button");

// блок-родитель, куда добавляются новый блок div с комментами
const taskList = document.getElementById("main__chat-list");

// антиспам
const checkSpam = (str) => {
  return str.replace(/viagra|XXX/gi, "***");
};

// обработка введенных данных
btn.addEventListener("click", () => {
  // проверка на заполнение полей ввода
  if (nameImput.value === "" && radioNo.checked === false) {
    alert("Введите имя!");
    return;
  } else if (nameImput.value === "" && radioYes.checked === false) {
    nameImput.value = "username";
  }

  let img = [
    "./assets/img/1.png",
    "./assets/img/2.png",
    "./assets/img/3.png",
    "./assets/img/4.png",
    "./assets/img/5.png",
    "./assets/img/6.png",
    "./assets/img/7.png",
  ];

  // проверка, что введена корректная ссылка
  if (avaInput.value === "") {
    function imgRand(imgArr) {
      avaInput.value = imgArr[Math.floor(Math.random() * imgArr.length)];
    }
    console.log(imgRand(img));
  } else if (avaInput.value.indexOf("http://") === 0) {
    // alert("Не корректная ссылка!");
    // return;
  } else if (avaInput.value.indexOf("https://") === 0) {
    // alert("Не корректная ссылка!");
    // return;
  } else {
    alert("Не корректная ссылка!");
    return;
  }

  // антиспам функцию checkSpam(str), заменяющую 'viagra' или 'XXX' на *** ;
  commentImput.value = checkSpam(commentImput.value);

  // получение значений из полей
  // имя, удаление пробелов, все мал буквы
  let nameChat = nameImput.value.trim().toLowerCase();
  // отсутствие заглавных букв, кроме первой
  nameChat = nameChat[0].toUpperCase() + nameChat.slice(1);

  // аватар
  const avaChat = avaInput.value;

  // комент
  const commentChat = commentImput.value;

  // создаем новый элемент div
  let newDiv = document.createElement("div");
  // присваиваем ему класс
  newDiv.className = "main__chat-lenta";

  // создаем 2 блока div
  // 1 под аву+ник
  let newDivAva = document.createElement("div");
  // присваиваем ему класс
  newDivAva.className = "chat__img-Ava";

  // 2 под время+комменит
  let newDivCom = document.createElement("div");
  // присваиваем ему класс
  newDivCom.className = "chat__time-Comment";

  //  создаем новый элемент img-Avatar
  const newAva = document.createElement("img");
  // задаем ему параметры
  newAva.className = "chat__avatar";
  newAva.src = avaChat;
  newAva.alt = "avatar";

  //  создаем новый элемент p-Name
  let newName = document.createElement("p");
  newName.className = "chat__name";

  // заполняем текст внутри нов элемента
  newName.textContent = nameChat;

  // кладем img + ava в 1 блок div
  newDivAva.append(newAva);
  newDivAva.append(newName);

  // добавляем дату\время сообщения
  const newDat = document.createElement("p");
  newDat.className = "chat__dat";

  let dat = new Date();
  // формат даты Fri, 06 Sep 2024 18:03:39 GMT
  newDat.textContent = dat.toUTCString();

  // создаем новый элемент p-Comment
  const newComment = document.createElement("p");
  newComment.className = "chat__comment";

  // заполняем текст внутри нов элемента
  newComment.textContent = commentChat;

  // кладем dat + comment во 2 блок div
  newDivCom.append(newDat);
  newDivCom.append(newComment);

  // добавляем в родителя main__chat-lenta созданный блок
  newDiv.append(newDivAva);
  newDiv.append(newDivCom);

  // добавляем в родителя main__chat-list созданный блок
  taskList.append(newDiv);

  // чистим поля ввода
  nameImput.value = "";
  avaInput.value = "";
  commentImput.value = "";
});
