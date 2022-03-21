import { IAnimal } from 'interfaces/Animal';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
const AnimalDetails = () => {
  const [animal, setAnimal] = useState<null | IAnimal>();
  const [animals, setAnimals] = useState<null | IAnimal[]>();
  const [nowFed, setNowFed] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  const getAnimal = () => {
    setAnimal(
      JSON.parse(localStorage.getItem('animals')!).find(
        (animal: IAnimal) => animal.id === Number(params.id)
      )
    );
  };
  const getAnimals = () => {
    setAnimals(JSON.parse(localStorage.getItem('animals')!));
  };

  const feedAnimal = () => {
    const fedAnimal = {
      ...animal,
      isFed: true,
      lastFed: new Date(),
    };
    const updatedAnimals = animals?.map((animal: IAnimal) => {
      if (animal.id === Number(params.id)) {
        return fedAnimal;
      } else {
        return animal;
      }
    });
    setAnimals(updatedAnimals);
    localStorage.setItem('animals', JSON.stringify(updatedAnimals));
    setNowFed(true);
  };
  const checkIfHungry = () => {
    if (animal) {
      if (new Date().getTime() - new Date(animal!.lastFed).getTime() > 10_000) {
        animal!.isFed = false;
      }
    }
  };

  useEffect(() => {
    getAnimal();
    getAnimals();
  }, [nowFed]);
  useEffect(() => {
    checkIfHungry();
  }, []);

  return (
    <div className="animal-details-card">
      <h1>{animal?.name}</h1>
      <img src={animal?.imageUrl} alt={animal?.name} />

      <button onClick={feedAnimal} disabled={animal?.isFed}>
        Mata {animal?.name}
      </button>
      <button onClick={() => navigate('/')}>tillbaka</button>
      {animal?.isFed && (
        <>
          <h1>
            {animal.name} matades senast {animal.lastFed}
          </h1>
          <p>
            {/* numeric separator for easier reading big numbers */}
            {new Date().getTime() - new Date(animal.lastFed).getTime() >
              10_000 && <h1>{animal.name} har inte matats på ett tag</h1>}
          </p>
        </>
      )}
    </div>
  );
};

export default AnimalDetails;
