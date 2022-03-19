import { Link } from 'react-router-dom';
import { IAnimal } from 'interfaces/Animal';

interface IAnimalProps {
  animal: IAnimal;
}

const Animal = ({ animal }: IAnimalProps) => {
  const { id, name, shortDescription } = animal;

  return (
    <Link to={`animals/${id}`}>
      <article className="animal-card">
        <h1>{name}</h1>
        <p>{shortDescription}</p>
      </article>
    </Link>
  );
};

export default Animal;
