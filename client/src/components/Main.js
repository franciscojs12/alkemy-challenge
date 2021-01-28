const Main = ({ balance }) => {
  return (
    <main className="c-balance">
      <div className="container c-balance__container">
        <h3 className="c-balance__title">Balance actual:</h3>
        <h1 className={`c-balance__amount ${balanceColor(balance)}`}>
          $ <span className="c-balance__number">{balance}</span>
        </h1>
      </div>
    </main>
  );
};

Main.defaultProps = {
  balance: 0,
};

const balanceColor = (number) => {
  if (number >= 0) {
    return 'balance-positive';
  } else {
    return 'balance-negative';
  }
};

export default Main;
