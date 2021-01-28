/*export */ class Operation {
  constructor(id, description, amount, operationType, date) {
    this.id = id;
    this.description = description;
    this.amount = amount;
    this.operationType = operationType;
    this.date = date;
  }
}

module.exports = {
  Operation: Operation,
};
