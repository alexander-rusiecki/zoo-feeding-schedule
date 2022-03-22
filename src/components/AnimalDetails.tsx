import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ZooKeeper from './ZooKeeper';
import { IAnimal } from 'interfaces/Animal';

const AnimalDetails = () => {
  const [animal, setAnimal] = useState<null | IAnimal>(null);
  const { id } = useParams();

  useEffect(() => {
    getAnimal();
  }, []);

  const getAnimal = () =>
    setAnimal(
      JSON.parse(localStorage.getItem('animals')!).find(
        (animal: IAnimal) => animal.id === Number(id)
      )
    );

  return (
    <div className="animal-details-card">
      <h1>{animal?.name}</h1>
      <img src={animal?.imageUrl} alt={animal?.name} />
      <ZooKeeper animal={animal} />
    </div>
  );
};

export default AnimalDetails;
