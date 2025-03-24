import ReactDOM from "react-dom/client"; //Импорты обязательны!!!
import { Menu, MobileHeader, GenButton, BlogCard } from "./Components";
import { StrictMode } from "react";

ReactDOM.createRoot(document.querySelector("header")).render(
  <div>
    <MobileHeader />
    <Menu pg="blog"/>
  </div>
);

ReactDOM.createRoot(document.getElementById("blog_link")).render(
  <GenButton text="Загрузить больше"/>
);

//ReactDOM.createRoot(document.getElementById("blog")).render(
 //   <BlogCard className="blog_block"/>
//);




