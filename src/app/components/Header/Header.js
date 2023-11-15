import { AppBar, Toolbar, Box } from "@mui/material";
import Link from "next/link";
import { Roboto } from "next/font/google";
import "./style.css";

const linkStyle = {
  margin: "0 10px",
  textDecoration: "none",
  color: "black",
};

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const Header = () => {
  return (
    <AppBar
      position="static"
      style={{ backgroundColor: "white" }}
      className={roboto.className}
    >
      <Toolbar>
        <Box style={{ marginLeft: "auto" }}>
          <Link href="/" passHref style={linkStyle} className="header-link">
            Home
          </Link>
          <Link href="/Products" style={linkStyle} className="header-link">
            {" "}
            Products
          </Link>
          {/* <Link href="/about" style={linkStyle} className="header-link">
            About
          </Link>
          <Link href="/contact" style={linkStyle} className="header-link">
            Contact
          </Link> */}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
