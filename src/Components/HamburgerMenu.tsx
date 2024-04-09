import { useProductDisplayContext } from "../Context/ProductDisplayContext";

const HamburgerMenu = () => {
  const { theme } = useProductDisplayContext();
  //Toggle Function for Hamburger Menu Onclick
  const classToggle = () => {
    const spans = document.querySelectorAll(
      ".spans"
    ) as NodeListOf<HTMLSpanElement>;
    const sidebar =
      theme === "dark"
        ? (document.querySelector(".sidebar-dark") as HTMLDivElement)
        : (document.querySelector(".sidebar-light") as HTMLDivElement);
    spans.forEach((span) => span.classList.toggle("active"));
    sidebar.classList.toggle("active");
  };
  //Hamburger Menu HTML Return
  const content = (
    <div
      onClick={() => classToggle()}
      className="hamburger-menu"
    >
      <span className="spans"></span>
      <span className="spans"></span>
      <span className="spans"></span>
    </div>
  );

  return content;
};

export default HamburgerMenu;
