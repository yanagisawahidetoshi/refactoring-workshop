'use client'

import React, { useState } from 'react'
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Box,
  Typography
} from '@mui/material'

export interface SelectOption {
  value: string
  label: string
}

interface Props {
  label: string
  options: SelectOption[]
  value?: string
  placeholder?: string
  disabled?: boolean
  error?: boolean
  helperText?: string
  fullWidth?: boolean
  onChange?: (value: string) => void
}

export const SelectBox = ({
  label,
  options,
  value = '',
  placeholder,
  disabled = false,
  error = false,
  helperText,
  fullWidth = false,
  onChange
}: Props) => {
  const [selectedValue, setSelectedValue] = useState<string>(value)

  const handleChange = (event: SelectChangeEvent<string>) => {
    const newValue = event.target.value
    setSelectedValue(newValue)
    onChange?.(newValue)
  }

  return (
    <Box sx={{ minWidth: 200, maxWidth: fullWidth ? '100%' : 300 }}>
      <FormControl
        fullWidth={fullWidth}
        error={error}
        disabled={disabled}
        variant="outlined"
      >
        <InputLabel id={`${label}-select-label`}>
          {label}
        </InputLabel>
        <Select
          labelId={`${label}-select-label`}
          id={`${label}-select`}
          value={selectedValue}
          label={label}
          onChange={handleChange}
          displayEmpty={!!placeholder}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: error ? '#d32f2f' : 'rgba(0, 0, 0, 0.23)',
              },
              '&:hover fieldset': {
                borderColor: error ? '#d32f2f' : 'rgba(0, 0, 0, 0.87)',
              },
              '&.Mui-focused fieldset': {
                borderColor: error ? '#d32f2f' : '#1976d2',
              },
            },
          }}
        >
          {placeholder && (
            <MenuItem value="" disabled>
              <Typography color="text.secondary">
                {placeholder}
              </Typography>
            </MenuItem>
          )}
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        {helperText && (
          <Typography
            variant="caption"
            color={error ? 'error' : 'text.secondary'}
            sx={{ mt: 0.5, ml: 1.5 }}
          >
            {helperText}
          </Typography>
        )}
      </FormControl>
    </Box>
  )
}