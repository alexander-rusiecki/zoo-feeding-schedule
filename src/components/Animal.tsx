import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IAnimal } from 'interfaces/Animal';

interface IAnimalProps {
  animal: IAnimal;
}

const Animal = ({ animal }: IAnimalProps) => {
  const { id, name, shortDescription, lastFed } = animal;
  const [isNowFed, setIsNowFed] = useState<boolean>(false);

  useEffect(() => {
    if (!animal) return;
    new Date().getTime() - new Date(animal.lastFed).getTime() > 20_000 &&
      setIsNowFed(true);
  }, [animal]);
  // TODO: change milliseconds
  return (
    <Link to={`${id}`} className="animal-link">
      <article className="animal-card">
        <h1>{name}</h1>
        <p>{shortDescription}</p>
        {isNowFed && (
          <>
            <span>senast matad {lastFed}</span>
            <span className="starving">
              Det har gått mer än 4 timmar sedan {name} matades!
            </span>
          </>
        )}
      </article>
    </Link>
  );
};

export default Animal;
