import React from "react";  //Импорты обязательны!!!

//Боковое Меню
export class Menu extends React.Component{
    render(){
        return (<div className="menu">
        <section className="logo"><a href="index.html">.KoSo</a></section>
        <nav className="navbar">
            <a href="index.html" className={this.props.pg == "index" ? "active" : ""}>Главная</a>
            <a href="/pages/about.html" className={this.props.pg == "about" ? "active" : ""}>О нас</a>
            <a href="/pages/services.html" className={this.props.pg == "services" ? "active" : ""}>Услуги</a>
            <a href="/pages/blog.html" className={this.props.pg == "blog" ? "active" : ""}>Блог</a>
            <a href="/pages/projects.html" className={this.props.pg == "projects" ? "active" : ""}>Проекты</a>
            <a href="/pages/contact.html" className={this.props.pg == "contact" ? "active" : ""}>Контакты</a>
        </nav>
        <section className="links">
            <a href="#"><img src="/assets/svg/inst.svg" alt="inst"/></a>
            <a href="#"><img src="/assets/svg/tg.svg" alt="tg"/></a>
            <a href="#"><img src="/assets/svg/linkedin.svg" alt="linkedin"/></a>
        </section>
        <section className="copyright">
            Copyright &copy;2025 Sorkin and Kovsher. All rights reserved.
        </section>
    </div>);
    }
}

//Верхняя часть мобильного меню
export class MobileHeader extends React.Component{
    render(){
        return (<div className="mobile-header">
        <div className="logo">.KoSo</div>
        <div className="menu-toggle" onClick={popMenu}>&#9776;</div>
    </div>);
    }
}

//функция выплывающего мобильного меню
function popMenu () {
        const menuToggle = document.querySelector(".menu-toggle");
        const menu = document.querySelector(".menu");
        menu.classList.toggle("active");
        menuToggle.classList.toggle("active");
    };


//Дефолтная кнопка
export class GenButton extends React.Component{
    render(){
        return  <a className="button">
            {this.props.text}
            <img src="/icon/web-app-manifest-192x192.png" alt="arrow_icon"/>
        </a>
    }
    DefaultProps = {text: "Button", func: null}
}



