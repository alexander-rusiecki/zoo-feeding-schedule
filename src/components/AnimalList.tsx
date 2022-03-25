import { useState, useEffect } from 'react';
import axios from 'axios';
import Animal from 'components/Animal';
import { IAnimal } from 'interfaces/Animal';

const AnimalList = () => {
  const [animals, setAnimals] = useState<IAnimal[]>([]);

  useEffect(() => {
    localStorage.getItem('animals') === null
      ? getAnimals()
      : setAnimals(JSON.parse(localStorage.getItem('animals')!));
  }, []);

  const getAnimals = async () => {
    try {
      const { data } = await axios.get<IAnimal[]>(
        'https://animals.azurewebsites.net/api/animals'
      );
      setAnimals(await data);
      localStorage.setItem('animals', JSON.stringify(await data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="list-container">
      {animals &&
        animals.map((animal: IAnimal) => (
          <Animal animal={animal} key={animal.id} />
        ))}
    </section>
  );
};

export default AnimalList;
