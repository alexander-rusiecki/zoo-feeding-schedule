import { useState, useEffect } from 'react';
import axios from 'axios';
import { IAnimal } from 'interfaces/Animal';
import Animal from 'components/Animal';

const AnimalList = () => {
  const [animals, setAnimals] = useState<[] | IAnimal[]>([]);

  useEffect(() => {
    localStorage.getItem('animals') === null
      ? getAnimals()
      : setAnimals(JSON.parse(localStorage.getItem('animals')!));
  }, []);
  const getAnimals = async () => {
    try {
      const response = await axios.get<IAnimal[]>(
        'https://animals.azurewebsites.net/api/animals'
      );
      setAnimals(await response.data);
      localStorage.setItem('animals', JSON.stringify(await response.data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {animals &&
        animals.map((animal: IAnimal) => (
          <Animal animal={animal} key={animal.id} />
        ))}
    </>
  );
};

export default AnimalList;
