import ReactDOM from "react-dom/client"; //Импорты обязательны!!!
import { Menu, MobileHeader, GenButton, BlogCard } from "./Components";
import { StrictMode } from "react";

ReactDOM.createRoot(document.querySelector("header")).render(
  <div>
    <MobileHeader />
    <Menu pg="blog"/>
  </div>
);


ReactDOM.createRoot(document.getElementById("blog")).render(
  <div className="blog">
    <BlogCard className="blog_block" date="10 Февраля, 2025"
      text="10 примеров сайтов-портфолио" img="/assets/photos/blog1.png"/>
    <BlogCard className="blog_block" date="1 Февраля, 2025" 
      text="5 советов, как работать в команде" img="/assets/photos/blog2.png"/>
    <BlogCard className="blog_block" date="20 Января, 2025" 
      text="Защита сайтов от кибер-атак" img="/assets/photos/blog3.png"/>
  </div>
);




