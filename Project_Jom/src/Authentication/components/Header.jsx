import Logo from "./Logo";

function Header() {
  return (
    <header className="header">
      <div className="header-red-line"></div>

      <div className="header-content">
        <Logo />
      </div>
    </header>
  );
}

export default Header;