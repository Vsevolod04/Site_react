import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

// Боковое Меню
export class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginOpen: false,
      username: "",
      password: "",
      emailError: "",
      passwordError: "",
      isAuth: localStorage.getItem("isAuth") === "true",
    };
  }

  handleLoginOpen = () => {
    this.setState({
      loginOpen: true,
      emailError: "",
      passwordError: "",
    });
  };

  handleLoginClose = () => {
    this.setState({ loginOpen: false, username: "", password: "" });
  };

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      emailError: e.target.name === "username" ? "" : this.state.emailError,
      passwordError:
        e.target.name === "password" ? "" : this.state.passwordError,
    });
  };

  validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  validatePassword = (password) => {
    let flag = true;
    const re1 = /.*[a-zа-я]+.*/;
    const re2 = /.*[A-ZА-Я]+.*/;
    const re3 = /.*\d+.*/;
    const re4 = /.*[^A-ZА-Яa-zа-я\d]+.*/;
    if (
      !(
        password.length >= 8 &&
        re1.test(password) &&
        re2.test(password) &&
        re3.test(password) &&
        re4.test(password)
      )
    )
      flag = false;
    return flag;
  };

  handleLoginSubmit = async (e) => {
    e.preventDefault();

    this.setState({
      emailError: "",
      passwordError: "",
    });

    let hasError = false;
    const newState = {};

    if (!this.state.username) {
      newState.emailError = "Email обязателен";
      hasError = true;
    } else if (!this.validateEmail(this.state.username)) {
      newState.emailError = "Введите корректный email";
      hasError = true;
    }

    if (!this.state.password) {
      newState.passwordError = "Пароль обязателен";
      hasError = true;
    } else if (!this.validatePassword(this.state.password)) {
      newState.passwordError =
        "Пароль должен содержать минимум 8 символов, содержать хотя бы 1 заглавную и строчную букву и спецсимвол";
      hasError = true;
    }

    if (hasError) {
      this.setState(newState);
      return;
    }

    const hashedPassword = await this.hashPassword(this.state.password);

    console.log("Login attempt:", this.state.username, hashedPassword);

    try {
      const response = await fetch("http://localhost:5129/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: this.state.username,
          password: hashedPassword,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        localStorage.setItem("isAuth", "false");
        throw new Error(errorData.message || "Ошибка авторизации");
      }

      const data = await response.json();
      console.log("Успешный вход:", data);

      localStorage.setItem("isAuth", "true");
      this.setState({
        isAuth: true,
        loginOpen: false,
      });

      this.handleLoginClose();
    } catch (error) {
      console.error("Ошибка при входе:", error);
      this.setState({
        emailError: "",
        passwordError: "Неверный email или пароль",
      });
    }
  };

  hashPassword = async (password) => {
    // Простое хеширование для примера (в реальном приложении используйте более надежные методы)
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    return hashHex;
  };

  handleLogout = () => {
    localStorage.setItem("isAuth", "false");
    this.setState({ isAuth: false });
  };

  render() {
    return (
      <div className="menu">
        <section className="logo">
          <a href="index.html">.KoSo</a>
        </section>

        {this.state.isAuth ? (
          <Button
            sx={{
              color: "rgb(255, 197, 52)",
              fontFamily: "main",
              fontWeight: 500,
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.3)",
              },
            }}
            className="logout-button"
            onClick={this.handleLogout}
          >
            Выйти
          </Button>
        ) : (
          <Button
            sx={{
              color: "rgb(255, 197, 52)",
              fontFamily: "main",
              fontWeight: 500,
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.3)",
              },
            }}
            className="login-button"
            onClick={this.handleLoginOpen}
          >
            Войти
          </Button>
        )}

        {/* Модальное окно входа */}
        <Dialog
          open={this.state.loginOpen} //диалог открыт, если loginOpen = true
          onClose={this.handleLoginClose}
          maxWidth="sm"
        >
          <DialogTitle>
            Вход в аккаунт
            <IconButton
              aria-label="close"
              onClick={this.handleLoginClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <form onSubmit={this.handleLoginSubmit}>
            <DialogContent dividers>
              <TextField
                slotProps={{ htmlInput: { maxLength: 100 } }}
                autoFocus
                margin="dense"
                name="username"
                label="Email"
                type="email"
                fullWidth
                variant="outlined"
                value={this.state.username}
                onChange={this.handleInputChange}
                onKeyDown={(e) => {
                  if ("\"' ".includes(e.key) || e.key === "Dead") {
                    e.preventDefault();
                  }
                }}
                error={this.state.emailError}
                helperText={this.state.emailError}
                required
              />
              <TextField
                slotProps={{ htmlInput: { maxLength: 100 } }}
                margin="dense"
                name="password"
                label="Пароль"
                type="password"
                fullWidth
                variant="outlined"
                value={this.state.password}
                onChange={this.handleInputChange}
                onKeyDown={(e) => {
                  if ("\"'".includes(e.key) || e.key === "Dead") {
                    e.preventDefault();
                  }
                }}
                error={this.state.passwordError}
                helperText={this.state.passwordError}
                required
              />
            </DialogContent>
            <DialogActions sx={{ padding: "16px 24px" }}>
              <Button
                onClick={this.handleLoginClose}
                sx={{ color: "text.secondary" }}
              >
                Отмена
              </Button>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                sx={{ borderRadius: "4px" }}
              >
                Войти
              </Button>
            </DialogActions>
          </form>
        </Dialog>

        <nav className="navbar">
          <a
            href="index.html"
            className={this.props.pg == "index" ? "active" : ""}
          >
            Главная
          </a>
          <a
            href="/pages/about.html"
            className={this.props.pg == "about" ? "active" : ""}
          >
            О нас
          </a>
          <a
            href="/pages/services.html"
            className={this.props.pg == "services" ? "active" : ""}
          >
            Услуги
          </a>
          <a
            href="/pages/blog.html"
            className={this.props.pg == "blog" ? "active" : ""}
          >
            Блог
          </a>
          <a
            href="/pages/projects.html"
            className={this.props.pg == "projects" ? "active" : ""}
          >
            Проекты
          </a>
          <a
            href="/pages/contact.html"
            className={this.props.pg == "contact" ? "active" : ""}
          >
            Контакты
          </a>
        </nav>
        <section className="links">
          <a href="#">
            <img src="/assets/svg/inst.svg" alt="inst" />
          </a>
          <a href="#">
            <img src="/assets/svg/tg.svg" alt="tg" />
          </a>
          <a href="#">
            <img src="/assets/svg/linkedin.svg" alt="linkedin" />
          </a>
        </section>
        <section className="copyright">
          Copyright &copy;2025 Sorkin and Kovsher. All rights reserved.
        </section>
      </div>
    );
  }
}

// Верхняя часть мобильного меню
export class MobileHeader extends React.Component {
  // Функция выплывающего мобильного меню
  popMenu = () => {
    const menuToggle = document.querySelector(".menu-toggle");
    const menu = document.querySelector(".menu");
    menu.classList.toggle("active");
    menuToggle.classList.toggle("active");
  };

  render() {
    return (
      <div className="mobile-header">
        <div className="logo">.KoSo</div>
        <div className="menu-toggle" onClick={this.popMenu}>
          &#9776;
        </div>
      </div>
    );
  }
}

// Дефолтная кнопка
export function GenButton({ text = "button" }) {
  return (
    <a className="button">
      {text}
      <img src="/icon/web-app-manifest-192x192.png" alt="arrow_icon" />
    </a>
  );
}

// Карточка блога
function BlogCard(props) {
  return (
    <Card className="blog_block">
      <CardMedia
        component="img"
        image={props.img}
        alt="blog_photo"
        title="blog"
      />
      <CardContent>
        <Typography
          component="p"
          sx={{ fontSize: "1.3rem", fontStyle: "italic" }}
        >
          {props.date}
        </Typography>
        <Typography
          component="p"
          variant="body"
          sx={{
            fontSize: "1.7rem",
            fontWeight: "bold",
          }}
        >
          {props.text}
        </Typography>
      </CardContent>
    </Card>
  );
}

export class BlogControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [
        <BlogCard
          className="blog_block"
          date="10 Февраля, 2025"
          text="10 примеров сайтов-портфолио"
          img="/assets/photos/blog1.png"
          key={1}
        />,

        <BlogCard
          className="blog_block"
          date="1 Февраля, 2025"
          text="5 советов, как работать в команде"
          img="/assets/photos/blog2.png"
          key={2}
        />,

        <BlogCard
          className="blog_block"
          date="20 Января, 2025"
          text="Защита сайтов от кибер-атак"
          img="/assets/photos/blog3.png"
          key={3}
        />,
      ],

      title: "",
      date: "",
      files: [],
      currentPage: 1,
      cardsPerPage: 2,
      cardsCount: 3,
      pageInfo: "",

      imgText: "", //для очистки формы при выходе
    };
    this.ref = React.createRef();
  }

  handleClickOutside = (event) => {
    const modal = document.getElementById("modal");
    //console.log(event.target);
    if (event.target === modal) {
      this.closeModal();
    }
  };

  trimTitle = () => {
    const newVal = this.state.title.trim();
    this.setState({ title: newVal });
  };

  openModal = () => {
    const modal = document.getElementById("modal");
    modal.style.display = "block";
  };

  closeModal = () => {
    const modal = document.getElementById("modal");
    this.setState({ title: "", date: "", files: [], imgText: "" });
    modal.style.display = "none";
  };

  handleInputChange = (e) => {
    if (e.target.name == "files") {
      this.setState({
        [e.target.name]: e.target.files,
        imgText: e.target.value,
      });
    } else {
      this.setState({
        [e.target.name]: e.target.value,
      });
    }
  };

  addCard = (e) => {
    e.preventDefault();

    // Получаем данные из формы
    const file = this.state.files[0];
    const img = URL.createObjectURL(file);
    const title = this.state.title;
    const date = this.state.date;

    //Форматирование даты
    let regexp = new RegExp("(\\d{4})-(\\d{2})-(\\d{2})");
    let parse = regexp.exec(date);
    const months = [
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

    const newCount = this.state.cardsCount + 1;

    const newCard = (
      <BlogCard
        className="blog_block"
        date={formattedDate}
        text={title}
        img={img}
        key={newCount}
      />
    );
    const newCards = this.state.cards.slice();
    newCards.push(newCard);

    const lastPage = Math.ceil(newCount / this.state.cardsPerPage);
    this.setState({
      cardsCount: newCount,
      cards: newCards,
      currentPage: lastPage,
    });

    // Закрываем модальное окно
    this.closeModal();

    this.updatePagination();
  };

  // Функция для отображения карточек на текущей странице
  showCards = (page) => {
    const cardsPerPage = this.state.cardsPerPage;
    const cards = blogReact.querySelectorAll(".blog_block");
    cards.forEach((card, index) => {
      if (index >= (page - 1) * cardsPerPage && index < page * cardsPerPage) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  };

  // Функция для обновления информации о странице
  updatePagination = () => {
    const currentPage = this.state.currentPage;
    const cardsPerPage = this.state.cardsPerPage;
    const totalPages = Math.ceil(this.state.cardsCount / cardsPerPage);

    this.showCards(currentPage);
    const text = `Страница ${currentPage} из ${totalPages}`;
    this.setState({ pageInfo: text });
  };

  // Кнопка "Назад"
  prev = () => {
    let currentPage = this.state.currentPage;
    if (currentPage > 1) {
      currentPage--;
      this.setState({ currentPage: currentPage });
    } else {
      const totalPages = Math.ceil(
        this.state.cardsCount / this.state.cardsPerPage
      );
      currentPage = totalPages;
      this.setState({ currentPage: currentPage });
    }
    this.updatePagination();
  };

  // Кнопка "Вперед"
  next = () => {
    const totalPages = Math.ceil(
      this.state.cardsCount / this.state.cardsPerPage
    );
    let currentPage = this.state.currentPage;
    if (currentPage < totalPages) {
      currentPage++;
      this.setState({ currentPage: currentPage });
    } else {
      currentPage = 1;
      this.setState({ currentPage: currentPage });
    }
    this.updatePagination();
  };

  componentDidMount() {
    this.updatePagination();
    document.addEventListener("click", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  }

  /*componentDidUpdate(){
    this.updatePagination();
  }*/

  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "2vh",
        }}
      >
        <button type="button" id="openModalButton" onClick={this.openModal}>
          Добавить новую карточку
        </button>

        <div id="modal" className="modal">
          <div className="modal-content">
            <span className="close" onClick={this.closeModal}>
              &times;
            </span>
            <h2>Добавить новую карточку</h2>
            <form id="addCardForm" onSubmit={this.addCard}>
              <label htmlFor="imageInput">Выберите фото:</label>
              <input
                type="file"
                id="imageInput"
                accept="image/*"
                name="files"
                value={this.state.imgText}
                onChange={this.handleInputChange}
                required
              />
              <label htmlFor="captionInput">Подпись:</label>
              <input
                type="text"
                id="captionInput"
                name="title"
                maxLength="50"
                placeholder="Введите подпись"
                value={this.state.title}
                onBlur={this.trimTitle}
                onChange={this.handleInputChange}
                required
              />
              <label htmlFor="dateInput">
                Дата (от 2000-01-01 до 2200-01-01):
              </label>
              <input
                type="date"
                name="date"
                id="dateInput"
                value={this.state.date}
                min="2000-01-01"
                max="2200-01-01"
                title="от 2000-01-01 до 2200-01-01"
                onChange={this.handleInputChange}
                required
              />
              <button type="submit">ОК</button>
              <button
                type="button"
                id="closeModalButton"
                onClick={this.closeModal}
              >
                Отмена
              </button>
            </form>
          </div>
        </div>

        <div className="blog" id="blogReact">
          {this.state.cards}
        </div>

        <div className="pagination">
          <button id="prevButton" onClick={this.prev}>
            Назад
          </button>
          <span id="pageInfo">{this.state.pageInfo}</span>
          <button id="nextButton" onClick={this.next}>
            Вперед
          </button>
        </div>
      </div>
    );
  }
}
