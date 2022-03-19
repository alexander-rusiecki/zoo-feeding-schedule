import { IAnimal } from 'interfaces/Animal';

interface IAnimalProps {
  animal: IAnimal;
}

const Animal = ({ animal }: IAnimalProps) => {
  const { name, shortDescription } = animal;
  return (
    <>
      <h1>{name}</h1>
      <p>{shortDescription}</p>
    </>
  );
};

export default Animal;
