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
      lastFed: new Date().toISOString(),
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
    <div>
      <h1>{animal?.name}</h1>
      <button onClick={feedAnimal}>feed</button>
      <button onClick={() => navigate('/')}>tillbaka</button>
      {animal?.isFed && <h1>matad</h1>}
    </div>
  );
};

export default AnimalDetails;
