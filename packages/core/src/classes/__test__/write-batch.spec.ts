import {User, UserPrimaryKey} from '@typedorm/core/__mocks__/user';
import {WriteBatch} from '../batch/write-batch';

test('creates a write batch', () => {
  const user = new User();
  user.name = 'user1';

  const user2 = new User();
  user2.name = 'user2';

  const user3 = new User();
  user3.name = 'user3';

  const writeBatch = new WriteBatch()
    .addCreateItem(user)
    .addCreateItem(user2)
    .addCreateItem(user3, {overwriteIfExists: true})
    .addDeleteItem<User, UserPrimaryKey>(User, {
      id: '3',
    });
  expect(writeBatch.items).toEqual([
    {
      create: {
        item: {
          name: 'user1',
        },
      },
    },
    {
      create: {
        item: {
          name: 'user2',
        },
      },
    },
    {
      create: {
        item: {
          name: 'user3',
        },
        options: {
          overwriteIfExists: true,
        },
      },
    },
    {
      delete: {
        item: User,
        primaryKey: {
          id: '3',
        },
      },
    },
  ]);
});

test('creates batch from bulk input', () => {
  const user = new User();
  user.name = 'user1';

  const user2 = new User();
  user2.name = 'user2';

  const user3 = new User();
  user3.name = 'user3';

  const writeBatchFromDump = new WriteBatch().add([
    {
      create: {
        item: user,
      },
    },
    {
      create: {
        item: user2,
      },
    },
    {
      create: {
        item: user3,
        options: {
          overwriteIfExists: true,
        },
      },
    },
  ]);

  expect(writeBatchFromDump.items).toEqual([
    {
      create: {
        item: {
          name: 'user1',
        },
      },
    },
    {
      create: {
        item: {
          name: 'user2',
        },
      },
    },
    {
      create: {
        item: {
          name: 'user3',
        },
        options: {
          overwriteIfExists: true,
        },
      },
    },
  ]);
});
