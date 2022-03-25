import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IAnimal } from 'interfaces/Animal';

interface IAnimalProps {
  animal: IAnimal;
}

const Animal = ({ animal }: IAnimalProps) => {
  const { id, name, shortDescription, lastFed } = animal;
  const [hasFourHoursPassed, setHasFourHoursPassed] = useState<boolean>(false);

  useEffect(() => {
    if (!animal) return;
    new Date().getTime() - new Date(animal.lastFed).getTime() > 14_400_000 &&
      // for testing 20 seconds: 20000
      setHasFourHoursPassed(true);
  }, [animal]);
  return (
    <Link to={`${id}`} className="animal-link">
      <article className="animal-card">
        <h1>{name}</h1>
        <p>{shortDescription}</p>
        {hasFourHoursPassed && (
          <>
            <span>
              senast matad{' '}
              {lastFed.toString().replace('T', ' ').substring(0, 19)}
            </span>
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
