import ReactDOM from "react-dom/client"; //Импорты обязательны!!!
import { Menu, MobileHeader, GenButton } from "./Components";

ReactDOM.createRoot(document.querySelector("header")).render(
  <div>
    <MobileHeader />
    <Menu pg="about"/>
  </div>
);

ReactDOM.createRoot(document.getElementById("CV")).render(
  <GenButton text="Скачать резюме"/>
);



