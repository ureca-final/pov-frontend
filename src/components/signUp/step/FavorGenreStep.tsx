import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { Button } from 'pov-design-system';

import SignUpStep from '@/components/signUp/step/SignUpStep';
import GenreSelect from '@/components/common/GenreSelect/GenreSelect';
import { ButtonContainer } from '@/components/signUp/step/SignUpStep.style';
import { SIGN_UP_HEADER_TEXTS } from '@/constants/texts';
import type { User } from '@/types/user';

interface FavorGenreStepProps {
  onSubmit: (data: User) => Promise<void>;
  onPrev: (prevStep: string) => void;
}

const FavorGenreStep = ({ onSubmit, onPrev }: FavorGenreStepProps) => {
  const [initButtonDisabled, setInitButtonDisabled] = useState<'init' | 'false' | 'true'>('init');
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const handleButtonDisabled = (selectedGenrse: string[]) => {
    if (selectedGenrse.length === 0) {
      setInitButtonDisabled('true');
    } else {
      setInitButtonDisabled('false');
    }
  };

  return (
    <SignUpStep
      firstLine={{ keyword: SIGN_UP_HEADER_TEXTS.favorGenre.title.firstLine[0], particle: SIGN_UP_HEADER_TEXTS.favorGenre.title.firstLine[1] }}
      secondLine={SIGN_UP_HEADER_TEXTS.favorGenre.title.secondLine}
      description={SIGN_UP_HEADER_TEXTS.favorGenre.description}
      onPrev={onPrev}
    >
      <Controller
        name="favorGenres"
        control={control}
        render={({ field }) => (
          <GenreSelect
            value={field.value || []} // favorGenres 필드의 value 전달
            onChange={(selectedGenres) => {
              field.onChange(selectedGenres);
              handleButtonDisabled(selectedGenres);
            }}
          />
        )}
      />
      <ButtonContainer>
        <Button
          css={{ width: '100%' }}
          size="large"
          onClick={onSubmit}
          disabled={initButtonDisabled === 'true' || initButtonDisabled === 'init' || !!errors.favorGenre}
        >
          다음으로
        </Button>
      </ButtonContainer>
    </SignUpStep>
  );
};

export default FavorGenreStep;
