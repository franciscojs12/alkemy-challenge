const EntitySchema = require('typeorm').EntitySchema; //
const Operation = require('../model/Operation').Operation;

module.exports = new EntitySchema({
  name: 'Operation',
  target: Operation,
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    description: {
      type: 'text',
    },
    amount: {
      type: 'float',
      precision: 10,
      scale: 2,
    },
    operationType: {
      type: 'enum',
      enum: ['expense', 'income'],
      default: 'expense',
    },
    date: {
      type: 'date',
    },
  },
});
