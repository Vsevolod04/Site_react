import * as React from "react"; //Импорты обязательны!!!
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";

//Боковое Меню
export class Menu extends React.Component {
  render() {
    return (
      <div className="menu">
        <section className="logo">
          <a href="index.html">.KoSo</a>
        </section>
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

//Верхняя часть мобильного меню
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

//функция выплывающего мобильного меню
function popMenu() {
  const menuToggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".menu");
  menu.classList.toggle("active");
  menuToggle.classList.toggle("active");
}

//Дефолтная кнопка
export class GenButton extends React.Component {
  render() {
    return (
      <a className="button">
        {this.props.text}
        <img src="/icon/web-app-manifest-192x192.png" alt="arrow_icon" />
      </a>
    );
  }
  DefaultProps = { text: "Button" /*, func: null*/ };
}

export class BlogCard extends React.Component {
  render() {
    return (
      <Card className="blog_block">
        <CardMedia 
            component="img"  //для адекватного отображения картинки, component указывает, какой это html элемент
            image={this.props.img}
            alt="blog_photo"
            title="blog 1"/>
        <CardContent>   
          <Typography component="p" sx={{fontSize: "1.3rem", fontStyle: "italic"}}> 
            {this.props.date}
          </Typography>
          <Typography component="p" variant="body" sx={{fontSize: "1.7rem",
                    fontWeight: "bold"}}>
            {this.props.text}
          </Typography>
        </CardContent>
      </Card>
    );
  }
}
