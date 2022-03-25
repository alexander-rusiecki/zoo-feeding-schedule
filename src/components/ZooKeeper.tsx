import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IAnimal } from 'interfaces/Animal';
interface IZooKeeperProps {
  animal: IAnimal | null;
}

const ZooKeeper = ({ animal }: IZooKeeperProps) => {
  const [animals, setAnimals] = useState<IAnimal[]>([]);
  const [hasThreeHoursPassed, setHasThreeHoursPassed] =
    useState<boolean>(false);
  const [hasFourHoursPassed, setHasFourHoursPassed] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    getAnimals();
  }, [hasThreeHoursPassed, hasFourHoursPassed]);

  useEffect(() => {
    if (!animal) return;
    if (
      new Date().getTime() - new Date(animal.lastFed).getTime() >
      14_400_000
      // for testing 20 seconds: 20_000
    ) {
      setHasFourHoursPassed(true);
    } else {
      setHasFourHoursPassed(false);
    }
    if (
      new Date().getTime() - new Date(animal.lastFed).getTime() >
      10_800_000
      // for testing 10 seconds: 10_000
    ) {
      setHasThreeHoursPassed(true);
    } else {
      setHasThreeHoursPassed(false);
    }
  }, [animal]);

  const getAnimals = () => {
    setAnimals(JSON.parse(localStorage.getItem('animals')!));
  };

  const feedAnimal = () => {
    if (animal && animals) {
      const fedAnimal = {
        ...animal,
        lastFed: new Date(),
      };
      const updatedAnimals = animals.map((currentAnimal: IAnimal) => {
        if (currentAnimal.id === animal.id) {
          return fedAnimal;
        } else {
          return currentAnimal;
        }
      });
      setHasThreeHoursPassed(false);
      localStorage.setItem('animals', JSON.stringify(updatedAnimals));
      getAnimals();
    }
  };

  return (
    <div>
      {animal && (
        <div className="keeper">
          <>
            <button onClick={feedAnimal} disabled={!hasThreeHoursPassed}>
              Mata {animal.name}
            </button>
            <button onClick={() => navigate('/')}>tillbaka</button>
            {!hasThreeHoursPassed && <p>{animal.name} har nu matats</p>}
            {hasThreeHoursPassed && (
              <span>
                matad{' '}
                {animal.lastFed
                  .toString()
                  .replace('T', ' kl: ')
                  .substring(0, 20)}
              </span>
            )}
          </>
          {hasFourHoursPassed && hasThreeHoursPassed && (
            <span className="starving">
              Det har gått mer än 4 timmar sedan {animal.name} matades!
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default ZooKeeper;
