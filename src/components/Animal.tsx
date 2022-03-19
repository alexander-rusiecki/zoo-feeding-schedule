import { IAnimal } from 'interfaces/Animal';

interface IAnimalProps {
  animal: IAnimal;
}

const Animal = ({ animal }: IAnimalProps) => {
  const { name, shortDescription } = animal;
  return (
    <article className="animal-card">
      <h1>{name}</h1>
      <p>{shortDescription}</p>
    </article>
  );
};

export default Animal;
