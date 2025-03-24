import ReactDOM from "react-dom/client"; //Импорты обязательны!!!
import { Menu, MobileHeader } from "./Components";
import Button from "@mui/material/Button";

ReactDOM.createRoot(document.querySelector("header")).render(
  <div>
    <MobileHeader />
    <Menu pg="contact" />
  </div>
);

ReactDOM.createRoot(document.getElementById("social_networks")).render(
  <div>
    <Button variant="text" href="#">TELEGRAM</Button>
    <Button variant="text" href="#">INSTAGRAM</Button>
    <Button variant="text" href="#">FACEBOOK</Button>
    <Button variant="text" href="#">LINKEDIN</Button>
  </div>
);
