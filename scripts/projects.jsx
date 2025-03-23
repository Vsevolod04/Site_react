import ReactDOM from "react-dom/client"; //Импорты обязательны!!!
import { Menu, MobileHeader, GenButton } from "./Components";

ReactDOM.createRoot(document.querySelector("header")).render(
  <div>
    <MobileHeader />
    <Menu pg="projects"/>
  </div>
);

ReactDOM.createRoot(document.getElementById("load_link")).render(
  <GenButton text="Загрузить больше"/>
);



