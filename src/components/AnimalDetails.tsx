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
    <section className="animal-details-card">
      {animal && (
        <>
          <img src={animal.imageUrl} alt={animal.name} />
          <ZooKeeper animal={animal} />
          <h1>Namn: {animal.name}</h1>
          <h3>Latinskt namn: {animal.latinName}</h3>
          <h3>Födelseår: {animal.yearOfBirth}</h3>
          <h3>Mer om mig: {animal.longDescription}</h3>
        </>
      )}
    </section>
  );
};

export default AnimalDetails;
