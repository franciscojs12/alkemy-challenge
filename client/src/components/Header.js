const Header = () => {
  return (
    <header className="c-header">
      <div className="c-header__logo">PPAdmin</div>
      <div className="c-header__user">
        <img
          src={process.env.PUBLIC_URL + '/icons/awesome-user-circle.svg'}
          alt="Usuario"
        ></img>
      </div>
    </header>
  );
};

export default Header;
