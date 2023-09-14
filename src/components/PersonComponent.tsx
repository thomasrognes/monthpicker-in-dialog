import { useState } from 'react';

import { v4 as uuid4 } from 'uuid';
import { Modal } from './Modal';

export interface Person {
  id?: string;
  name?: string;
  age?: string;
  birthDate?: Date;
}

const initialPerson: Person = {
  id: uuid4(),
  name: 'Fred',
  age: '65',
  birthDate: new Date(),
};

export const PersonComponent = () => {
  const [person, setPerson] = useState<Person>({});
  const [persons, setPersons] = useState<Person[]>([initialPerson]);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {persons?.map((person) => {
        return (
          <div key={person.id}>
            <span>{person.name}</span>
            <button
              onClick={() => {
                setPerson(person);
                setIsOpen(true);
              }}
            >
              Rediger meg
            </button>
          </div>
        );
      })}
      <button
        onClick={() => {
          setPerson({});
          setIsOpen(true);
        }}
      >
        Legg til ny
      </button>
      <Modal
        person={person}
        setPerson={setPerson}
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        onSave={(updatedPerson: Person) => {
          if (person.id === undefined) {
            setPersons([...persons, { ...updatedPerson, id: uuid4() }]);
          } else {
            setPersons(persons.map((person) => (person.id === updatedPerson.id ? updatedPerson : person)));
          }
        }}
        onClose={() => {
          setPerson({});
          setIsOpen(false);
        }}
      />
    </div>
  );
};
