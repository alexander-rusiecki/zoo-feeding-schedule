import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IAnimal } from 'interfaces/Animal';
interface IZooKeeperProps {
  animal: IAnimal | null;
}

const ZooKeeper = ({ animal }: IZooKeeperProps) => {
  const [animals, setAnimals] = useState<IAnimal[]>([]);
  const [isNowFed, setIsNowFed] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    getAnimals();
  }, []);

  useEffect(() => {
    if (!animal) return;
    if (new Date().getTime() - new Date(animal?.lastFed).getTime() > 10_000) {
      setIsNowFed(false);
    } else {
      setIsNowFed(true);
    }
  }, [animal]);
  // TODO: change milliseconds

  const getAnimals = () => {
    setAnimals(JSON.parse(localStorage.getItem('animals')!));
  };

  const feedAnimal = () => {
    if (animal) {
      const fedAnimal = {
        ...animal,
        lastFed: new Date(),
      };
      const updatedAnimals = animals?.map((currentAnimal: IAnimal) => {
        if (currentAnimal.id === animal?.id) {
          return fedAnimal;
        } else {
          return currentAnimal;
        }
      });
      setIsNowFed(true);
      localStorage.setItem('animals', JSON.stringify(updatedAnimals));
      setAnimals(JSON.parse(localStorage.getItem('animals')!));
    }
  };

  return (
    <div>
      {animal && (
        <>
          <button onClick={feedAnimal} disabled={isNowFed}>
            Mata {animal.name}
          </button>
          <button onClick={() => navigate('/')}>tillbaka</button>
          {!isNowFed && (
            <span className="starving">
              Det har gått mer än 3 timmar sedan {animal.name}
              matades!
              {animal.lastFed}
            </span>
          )}
        </>
      )}
    </div>
  );
};

export default ZooKeeper;
// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { IAnimal } from 'interfaces/Animal';

// interface IZooKeeperProps {
//   animal: IAnimal | null;
// }

// const ZooKeeper = ({ animal }: IZooKeeperProps) => {
//   const [animals, setAnimals] = useState<IAnimal[]>([]);
//   const [isThreeHoursSinceFed, setIsThreeHoursSinceFed] =
//     useState<boolean>(false);
//   const [nowFed, setNowFed] = useState<boolean>(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     getAnimals();
//   }, []);

//   useEffect(() => {
//     if (animal) {
//       if (new Date().getTime() - new Date(animal?.lastFed).getTime() > 10_000) {
//         setIsThreeHoursSinceFed(true);
//       } else {
//         setIsThreeHoursSinceFed(false);
//       }
//     }
//   }, [animal, isThreeHoursSinceFed, nowFed]);

//   useEffect(() => {
//     if (animal?.isFed) {
//       setNowFed(true);
//     }
//   }, [animal]);

//   const getAnimals = () => {
//     setAnimals(JSON.parse(localStorage.getItem('animals')!));
//   };

//   const feedAnimal = () => {
//     if (animal) {
//       const fedAnimal = {
//         ...animal,
//         isFed: true,
//         lastFed: new Date(),
//       };
//       const updatedAnimals = animals?.map((currentAnimal: IAnimal) => {
//         if (currentAnimal.id === animal?.id) {
//           return fedAnimal;
//         } else {
//           return currentAnimal;
//         }
//       });
//       setNowFed(true);
//       setIsThreeHoursSinceFed(false);
//       localStorage.setItem('animals', JSON.stringify(updatedAnimals));
//       setAnimals(JSON.parse(localStorage.getItem('animals')!));
//     }
//   };

//   return (
//     <div>
//       {
//         <>
//           <button onClick={feedAnimal} disabled={nowFed}>
//             Mata {animal?.name}
//           </button>
//           <button onClick={() => navigate('/')}>tillbaka</button>
//           {nowFed ? <h1>{animal?.name} är nu matad</h1> : <h1>Länge sen</h1>}
//           {/* {isThreeHoursSinceFed && <h1>länge sen</h1>} */}
//         </>
//       }
//     </div>
//   );
// };

// export default ZooKeeper;
