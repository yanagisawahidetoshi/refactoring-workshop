'use client';

import { Button } from '@mui/material';

interface Props {
  primaryText: string;
  primaryOnClick: () => void;
  primaryVariant?: 'text' | 'outlined' | 'contained';
  primaryColor?: 'primary' | 'secondary' | 'error';

  secondaryText: string;
  secondaryOnClick: () => void;
  secondaryVariant?: 'text' | 'outlined' | 'contained';
  secondaryColor?: 'primary' | 'secondary' | 'error';

  spacing?: number;
}

export const ButtonGroup = ({
  primaryText,
  primaryOnClick,
  primaryVariant = 'contained',
  primaryColor = 'primary',
  secondaryText,
  secondaryOnClick,
  secondaryVariant = 'outlined',
  secondaryColor = 'primary',
  spacing = 8,
}: Props) => {
  return (
    <div style={{ display: 'flex', gap: spacing }}>
      <Button
        variant={primaryVariant}
        color={primaryColor}
        onClick={primaryOnClick}
      >
        {primaryText}
      </Button>
      <Button
        variant={secondaryVariant}
        color={secondaryColor}
        onClick={secondaryOnClick}
      >
        {secondaryText}
      </Button>
    </div>
  );
};