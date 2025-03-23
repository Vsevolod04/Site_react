import ReactDOM from "react-dom/client"; //Импорты обязательны!!!
import { Menu, MobileHeader } from "./Components";

ReactDOM.createRoot(document.querySelector("header")).render(
  <div>
    <MobileHeader />
    <Menu pg="services"/>
  </div>
);





