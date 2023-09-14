import { Dispatch } from 'react';
import { Person } from './PersonComponent';
import { Button, TextField } from '@navikt/ds-react';
import { MonthPickerWrapper } from './MonthPickerWrapper';

export const Modal = ({
  person,
  setPerson,
  setIsOpen,
  isOpen,
  onSave,
  onClose,
}: {
  person: Person;
  setPerson: Dispatch<Person>;
  setIsOpen: Dispatch<boolean>;
  isOpen: boolean;
  onSave: (person: Person) => void;
  onClose: () => void;
}) => {
  return (
    <dialog open={isOpen}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', rowGap: '1rem' }}>
        {JSON.stringify(person)}

        <TextField
          label={'name'}
          value={person?.name || ''}
          onChange={(e) => setPerson({ ...person, name: e.target.value })}
        />

        <TextField
          label={'Alder'}
          value={person?.age || ''}
          onChange={(e) => setPerson({ ...person, age: e.target.value })}
        />

        <MonthPickerWrapper
          id={'birthdate'}
          label={'Fødselsdato'}
          selectedDate={person.birthDate}
          onChange={(e) => setPerson({ ...person, birthDate: e })}
        />

        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <Button
            onClick={() => {
              onSave(person);
              setIsOpen(false);
            }}
          >
            Save
          </Button>
          <Button variant={'secondary'} onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </dialog>
  );
};
