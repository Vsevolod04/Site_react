import ReactDOM from "react-dom/client"; //Импорты обязательны!!!
import { Menu, MobileHeader, GenButton } from "./Components";

ReactDOM.createRoot(document.querySelector("header")).render(
  <div>
    <MobileHeader />
    <Menu pg="index"/>
  </div>
);

ReactDOM.createRoot(document.getElementById("linkBtn")).render(
  <GenButton text="Связаться с нами"/>
);




