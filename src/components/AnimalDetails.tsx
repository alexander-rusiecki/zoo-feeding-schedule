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
      lastFed: new Date().toLocaleString(),
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

  useEffect(() => {
    getAnimal();
    getAnimals();
  }, [nowFed]);

  return (
    <div className="animal-details-card">
      <h1>{animal?.name}</h1>
      <img src={animal?.imageUrl} alt={animal?.name} />
      <button onClick={feedAnimal} disabled={nowFed}>
        Mata {animal?.name}
      </button>
      <button onClick={() => navigate('/')}>tillbaka</button>
      {animal?.isFed && <h1>matades senast {animal.lastFed}</h1>}
    </div>
  );
};

export default AnimalDetails;
