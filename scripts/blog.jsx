import * as React from "react";
import ReactDOM from "react-dom/client"; //Импорты обязательны!!!
import { Menu, MobileHeader, BlogControl} from "./Components";
import { StrictMode } from "react";

ReactDOM.createRoot(document.querySelector("header")).render(
  <div>
    <MobileHeader />
    <Menu pg="blog" />
  </div>
);

const blog = ReactDOM.createRoot(document.getElementById("blogContainer"));
blog.render(<BlogControl />);


