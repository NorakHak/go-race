import { CarI } from '../interfaces/carI';
import { randomId } from './randomId';

const getRandomColor = (): string => {

  const letters = '0123456789ABCDEF';
  let color = '#';

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
};

const getRandomName = (): string => {

  const brandsAndModels: [string, string[]][] = [
    ['Ford', ['Escort', 'GT40', 'Model T', 'GT']],
    ['BMW', ['Series 2', 'Series 5', 'X5', 'Series 8M']],
    ['Ferrari', ['Stradale', 'Portofino', 'Spider', 'Pista']],
    ['Lexus', ['LC', 'RC', 'LS', 'LX']],
  ];

  let random = Math.floor(Math.random() * brandsAndModels.length);
  let brand = brandsAndModels[random][0];
  let models = brandsAndModels[random][1];
  let model = models[Math.floor(Math.random() * models.length)];

  return `${brand} ${model}`;
};

export const generateCars = (count: number): CarI[] => {

  if (!count) {
    count = 0
  }

  const Cars: CarI[] = [];

  for (let i = 0; i <= count; i++) {
    Cars.push({
      name: getRandomName(),
      color: getRandomColor(),
      id: randomId().toString(),
    });
  }
  return Cars;
};
