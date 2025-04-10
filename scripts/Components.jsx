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
    const re4 = /.*[^A-ZА-Яa-zа-я\d]+.*/
    if (!(password.length >= 8 && re1.test(password) && re2.test(password)
       && re3.test(password) && re4.test(password)))
      flag = false;
    return flag;
  };

  handleLoginSubmit = (e) => {
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
      newState.passwordError = "Пароль должен содержать минимум 8 символов, содержать хотя бы 1 заглавную и строчную букву и спецсимвол";
      hasError = true;
    }

    if (hasError) {
      this.setState(newState);
      return;
    }

    console.log("Login attempt:", this.state.username, this.state.password);
    this.handleLoginClose();
  };

  render() {
    return (
      <div className="menu">
        <section className="logo">
          <a href="index.html">.KoSo</a>
        </section>

        <Button
          sx={{
            color: "rgb(255, 197, 52)",
            fontFamily: "main",
            fontWeight: 500,
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.3)", // цвет кнопки при наведении
            },
          }}
          className="login-button"
          onClick={this.handleLoginOpen}
        >
          Войти
        </Button>

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
  render() {
    return (
      <div className="mobile-header">
        <div className="logo">.KoSo</div>
        <div className="menu-toggle" onClick={popMenu}>
          &#9776;
        </div>
      </div>
    );
  }
}

// Функция выплывающего мобильного меню
function popMenu() {
  const menuToggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".menu");
  menu.classList.toggle("active");
  menuToggle.classList.toggle("active");
}

// Дефолтная кнопка
export class GenButton extends React.Component {
  render() {
    return (
      <a className="button">
        {this.props.text}
        <img src="/icon/web-app-manifest-192x192.png" alt="arrow_icon" />
      </a>
    );
  }
  DefaultProps = { text: "Button" };
}

// Карточка блога
export class BlogCard extends React.Component {
  render() {
    return (
      <Card className="blog_block">
        <CardMedia
          component="img"
          image={this.props.img}
          alt="blog_photo"
          title="blog"
        />
        <CardContent>
          <Typography
            component="p"
            sx={{ fontSize: "1.3rem", fontStyle: "italic" }}
          >
            {this.props.date}
          </Typography>
          <Typography
            component="p"
            variant="body"
            sx={{
              fontSize: "1.7rem",
              fontWeight: "bold",
            }}
          >
            {this.props.text}
          </Typography>
        </CardContent>
      </Card>
    );
  }
}


