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
    <Button
      sx={{
        color: "black",
        fontFamily: "main",
        fontWeight: 500,
        "&:hover": {
          backgroundColor: "rgba(0, 0, 0, 0.1)", // цвет кнопки при наведении
        },
      }}
      variant="text"
      href="#"
    >
      TELEGRAM
    </Button>
    <Button
      sx={{
        color: "black",
        fontFamily: "main",
        fontWeight: 500,
        "&:hover": {
          backgroundColor: "rgba(0, 0, 0, 0.1)",
        },
      }}
      variant="text"
      href="#"
    >
      INSTAGRAM
    </Button>
    <Button
      sx={{
        color: "black",
        fontFamily: "main",
        fontWeight: 500,
        "&:hover": {
          backgroundColor: "rgba(0, 0, 0, 0.1)",
        },
      }}
      variant="text"
      href="#"
    >
      FACEBOOK
    </Button>
    <Button
      sx={{
        color: "black",
        fontFamily: "main",
        fontWeight: 500,
        "&:hover": {
          backgroundColor: "rgba(0, 0, 0, 0.1)",
        },
      }}
      variant="text"
      href="#"
    >
      LINKEDIN
    </Button>
  </div>
);
