import { Link } from 'react-router-dom';
import { IAnimal } from 'interfaces/Animal';
import { useEffect, useState } from 'react';

interface IAnimalProps {
  animal: IAnimal;
}

const Animal = ({ animal }: IAnimalProps) => {
  const { id, name, shortDescription } = animal;
  const [isFourHoursSinceFed, setIsFourHoursSinceFed] =
    useState<boolean>(false);

  useEffect(() => {
    if (!animal) return;
    if (new Date().getTime() - new Date(animal?.lastFed).getTime() > 20_000) {
      setIsFourHoursSinceFed(true);
    }
  }, [animal]);
  return (
    <Link to={`${id}`} className="animal-link">
      <article className="animal-card">
        <h1>{name}</h1>
        <p>{shortDescription}</p>
        {isFourHoursSinceFed && (
          <p className="starving">måste matas! senast matad {animal.lastFed}</p>
        )}
      </article>
    </Link>
  );
};

export default Animal;
