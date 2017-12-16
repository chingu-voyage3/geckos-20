import uuid from 'uuid/v4';

export default [
  {
    id: '1',
    title: 'Card one title',
    color: '#5D6818',
    description:
      'Card detailed description. more info at [Github](https://github.com/chingu-voyage3/geckos-20)',
    status: 'todo',
    tasks: [
      { id: uuid(), name: 'Task one', done: true },
      { id: uuid(), name: 'Task two', done: false },
      { id: uuid(), name: 'Task three', done: false },
    ],
  },
  {
    id: '2',
    title: 'Write some code',
    description: 'Code **code** code _code_ code',
    color: '#80D415',
    status: 'todo',
    tasks: [
      { id: uuid(), name: 'Board Example', done: true },
      { id: uuid(), name: 'Column Example', done: false },
      { id: uuid(), name: 'Some experiments', done: false },
    ],
  },
  {
    id: '3',
    color: '#17517A',
    title: 'Card Two title',
    description: 'Card detailed description',
    status: 'in-progress',
    tasks: [],
  },
  {
    id: '4',
    title: 'Read the Book',
    color: '#A26620',
    description: 'I should read the **whole** book',
    status: 'in-progress',
    tasks: [],
  },
  {
    id: '5',
    title: 'Card Three title',
    color: '#69AD80',
    description: 'Card detailed description',
    status: 'done',
    tasks: [],
  },
];
