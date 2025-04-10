import ReactDOM from "react-dom/client"; //Импорты обязательны!!!
import { Menu, MobileHeader, BlogCard } from "./Components";
import { StrictMode } from "react";
import { flushSync } from "react-dom";

ReactDOM.createRoot(document.querySelector("header")).render(
  <div>
    <MobileHeader />
    <Menu pg="blog" />
  </div>
);

const blog = ReactDOM.createRoot(document.getElementById("blogContainer"));
flushSync(() => {
  blog.render(
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" , gap: "2vh" }}>
      <button type="button" id="openModalButton" >
        Добавить новую карточку
      </button>

      <div id="modal" className="modal">
        <div className="modal-content">
          <span className="close">&times;</span>
          <h2>Добавить новую карточку</h2>
          <form id="addCardForm">
            <label htmlFor="imageInput">Выберите фото:</label>
            <input type="file" id="imageInput" accept="image/*" required />
            <label htmlFor="captionInput">Подпись:</label>
            <input
              type="text"
              id="captionInput"
              maxLength="50"
              placeholder="Введите подпись"
              required
            />
            <label htmlFor="dateInput">
              Дата (от 2000-01-01 до 2200-01-01):
            </label>
            <input
              type="date"
              id="dateInput"
              min="2000-01-01"
              max="2200-01-01"
              title="от 2000-01-01 до 2200-01-01"
              required
            />
            <button type="submit">ОК</button>
            <button type="button" id="closeModalButton">
              Отмена
            </button>
          </form>
        </div>
      </div>

      <div className="blog" id="blogReact">
        <BlogCard
          className="blog_block"
          date="10 Февраля, 2025"
          text="10 примеров сайтов-портфолио"
          img="/assets/photos/blog1.png"
        />
        <BlogCard
          className="blog_block"
          date="1 Февраля, 2025"
          text="5 советов, как работать в команде"
          img="/assets/photos/blog2.png"
        />
        <BlogCard
          className="blog_block"
          date="20 Января, 2025"
          text="Защита сайтов от кибер-атак"
          img="/assets/photos/blog3.png"
        />
      </div>

      <div className="pagination">
        <button id="prevButton">Назад</button>
        <span id="pageInfo"></span>
        <button id="nextButton">Вперед</button>
      </div>
    </div>
  );
});

const fun = function () {
  document.getElementById("captionInput").addEventListener("blur", function () {
    // Удаляем пробелы в начале и в конце
    this.value = this.value.trim();
  });

  // Модальное окно
  const modal = document.getElementById("modal");
  const openModalButton = document.getElementById("openModalButton");
  const closeModalButton = document.getElementById("closeModalButton");
  const closeModalSymbol = document.querySelector(".close");
  const addCardForm = document.getElementById("addCardForm");
  const blogReact = document.getElementById("blogReact");

  // Открытие модального окна
  openModalButton.addEventListener("click", function () {
    modal.style.display = "block";
  });

  // Закрытие модального окна
  closeModalSymbol.addEventListener("click", function () {
    modal.style.display = "none";
  });


  // Закрытие модального окна при клике вне его
  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  // Обработка формы добавления карточки
  addCardForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Получаем данные из формы
    const imageFile = document.getElementById("imageInput").files[0];
    const caption = document.getElementById("captionInput").value;
    const date = document.getElementById("dateInput").value;

    //Форматирование даты
    let regexp = new RegExp("(\\d{4})-(\\d{2})-(\\d{2})");
    let parse = regexp.exec(date);
    let months = [
      "Января",
      "Февраля",
      "Марта",
      "Апреля",
      "Мая",
      "Июня",
      "Июля",
      "Августа",
      "Сентября",
      "Октября",
      "Ноября",
      "Декабря",
    ];
    const formattedDate =
      parse[3] + " " + months[Number(parse[2]) - 1] + ", " + parse[1];

    /*
        // Создаем новый элемент карточки
        const newCard = document.createElement("div");
        newCard.classList.add("blog_block");
  
        // Добавляем изображение
        const image = document.createElement("img");
        image.src = URL.createObjectURL(imageFile);
        image.alt = "blog_photo";
        newCard.appendChild(image);
  
        // Добавляем дату
        const dateElement = document.createElement("p");
        dateElement.innerHTML = `<i>${formattedDate}</i>`;
        newCard.appendChild(dateElement);
  
        // Добавляем подпись
        const captionElement = document.createElement("p");
        captionElement.textContent = caption;
        newCard.appendChild(captionElement);
  
        // Добавляем горизонтальную линию
        const line = document.createElement("img");
        line.src = "../assets/svg/horizontal_line.svg";
        line.alt = "horizontal_line";
        newCard.appendChild(line);
  
        // Добавляем карточку в блог
        blogReact.appendChild(newCard);
  
        // Закрываем модальное окно
        modal.style.display = "none";
  
        // Очищаем форму
        addCardForm.reset();
  
        updatePagination();
      */
  });

  const prevButton = document.getElementById("prevButton");
  const nextButton = document.getElementById("nextButton");
  const pageInfo = document.getElementById("pageInfo");

  let currentPage = 1;
  const cardsPerPage = 2;

  // Функция для отображения карточек на текущей странице
  function showCards(page) {
    const cards = blogReact.querySelectorAll(".blog_block");
    cards.forEach((card, index) => {
      if (index >= (page - 1) * cardsPerPage && index < page * cardsPerPage) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  }

  // Функция для обновления информации о странице
  function updatePagination() {
    const cards = blogReact.querySelectorAll(".blog_block");
    const totalPages = Math.ceil(cards.length / cardsPerPage);

    if (currentPage > totalPages) {
      currentPage = totalPages;
    }

    showCards(currentPage);
    pageInfo.textContent = `Страница ${currentPage} из ${totalPages}`;
  }

  // Кнопка "Назад"
  prevButton.addEventListener("click", function () {
    if (currentPage > 1) {
      currentPage--;
      updatePagination();
    } else {
      const cards = blogReact.querySelectorAll(".blog_block");
      const totalPages = Math.ceil(cards.length / cardsPerPage);

      currentPage = totalPages;
      updatePagination();
    }
  });

  // Кнопка "Вперед"
  nextButton.addEventListener("click", function () {
    const cards = blogReact.querySelectorAll(".blog_block");
    const totalPages = Math.ceil(cards.length / cardsPerPage);

    if (currentPage < totalPages) {
      currentPage++;
      updatePagination();
    } else {
      currentPage = 1;
      updatePagination();
    }
  });

  // Инициализация пагинации
  updatePagination();
};

fun();
