export function sum(a: number, b: number): number {
  return a + b;
}

sum(33, 26);

let uploadStatus: 'loading' | 'success' | 'error';

let textFormat: 'uppercase' | 'lowercase' | 'capitalize';

interface IUser {
  name: string;
  surName: string;
  age?: number;
  city: string;
}

let user1: IUser = {
  name: 'Adam',
  surName: 'Serbiev',
  city: 'Grozny'
}

let user2: IUser = {
  name: 'Said',
  surName: 'Serbiev',
  age: 28,
  city: 'Almaty'
}

interface IUserInfo extends IUser {
  job: string;
}

let user3: IUserInfo = {
  name: 'Abibakr',
  surName: 'Serbiev',
  age: 26,
  city: 'Almaty',
  job: 'Frontend Developer'
}

function formatText(text: string, format: 'uppercase' | 'lowercase' | 'capitalize'): string {
  if (format === 'uppercase') {
    return text.toUpperCase();
  }
  else if (format === 'lowercase') {
    return text.toLowerCase();
  }
  else {
    return text[0].toUpperCase() + text.toLowerCase().slice(1);
  }
}

function removeChar(text: string, char: string): string {
  return text.replaceAll(char, '');
}

const users: IUser[] = [
  {
    name: 'Abubakr',
    surName: 'Serbiev',
    age: 26,
    city: 'Almaty'
  },
  {
    name: 'Said',
    surName: 'Serbiev',
    age: 28,
    city: 'Almaty'
  },
  {
    name: 'Adam',
    surName: 'Serbiev',
    city: 'Grozny'
  }
];

const filteredUsers: IUser[] = users.filter((user: IUser) => {
  return user.city === 'Almaty';
});

console.log(filteredUsers);