import { Link } from 'react-router-dom';
import { IAnimal } from 'interfaces/Animal';

interface IAnimalProps {
  animal: IAnimal;
}

const Animal = ({ animal }: IAnimalProps) => {
  const { id, name, shortDescription, isFed } = animal;
  return (
    <Link to={`${id}`} className="animal-link">
      <article className="animal-card">
        <h1>{name}</h1>
        <p>{shortDescription}</p>
        {!isFed && <p className="starving">måste matas</p>}
      </article>
    </Link>
  );
};

export default Animal;
