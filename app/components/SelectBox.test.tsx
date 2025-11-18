import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { SelectBox } from './SelectBox'

describe('SelectBox', () => {
  const defaultOptions = [
    { value: 'option1', label: 'オプション1' },
    { value: 'option2', label: 'オプション2' },
    { value: 'option3', label: 'オプション3' }
  ]

  describe('given default props', () => {
    describe('when rendering', () => {
      it('then should display the label', () => {
        // Given
        const props = {
          label: 'テストラベル',
          options: defaultOptions
        }

        // When
        render(<SelectBox {...props} />)

        // Then
        expect(screen.getByRole('combobox', { name: /テストラベル/i })).toBeInTheDocument()
      })
    })
  })

  describe('given options prop', () => {
    describe('when rendering', () => {
      it('then should render all menu items', () => {
        // Given
        const props = {
          label: 'セレクト',
          options: defaultOptions
        }

        // When
        render(<SelectBox {...props} />)
        const selectInput = screen.getByRole('combobox', { name: /セレクト/i })
        fireEvent.mouseDown(selectInput)

        // Then
        expect(screen.getByText('オプション1')).toBeInTheDocument()
        expect(screen.getByText('オプション2')).toBeInTheDocument()
        expect(screen.getByText('オプション3')).toBeInTheDocument()
      })
    })
  })

  describe('given onChange callback', () => {
    describe('when selecting an option', () => {
      it('then should call onChange with selected value', () => {
        // Given
        const handleChange = jest.fn()
        const props = {
          label: 'セレクト',
          options: defaultOptions,
          onChange: handleChange
        }

        // When
        render(<SelectBox {...props} />)
        const selectInput = screen.getByRole('combobox', { name: /セレクト/i })
        fireEvent.mouseDown(selectInput)
        const option = screen.getByText('オプション1')
        fireEvent.click(option)

        // Then
        expect(handleChange).toHaveBeenCalledWith('option1')
      })
    })
  })

  describe('given disabled prop', () => {
    describe('when rendering with disabled true', () => {
      it('then should render with disabled attribute', () => {
        // Given
        const props = {
          label: 'セレクト',
          options: defaultOptions,
          disabled: true
        }

        // When
        render(<SelectBox {...props} />)

        // Then
        const selectInput = screen.getByRole('combobox', { name: /セレクト/i })
        expect(selectInput).toHaveAttribute('aria-disabled', 'true')
      })
    })
  })

  describe('given error prop', () => {
    describe('when rendering', () => {
      it('then should render with error styles', () => {
        // Given
        const props = {
          label: 'セレクト',
          options: defaultOptions,
          error: true,
          helperText: 'エラーメッセージ'
        }

        // When
        render(<SelectBox {...props} />)

        // Then
        expect(screen.getByText('エラーメッセージ')).toBeInTheDocument()
      })
    })
  })

  describe('given placeholder prop', () => {
    describe('when rendering', () => {
      it('then should display placeholder option when menu opens', () => {
        // Given
        const props = {
          label: 'セレクト',
          options: defaultOptions,
          placeholder: '選択してください'
        }

        // When
        render(<SelectBox {...props} />)
        const selectInput = screen.getByRole('combobox', { name: /セレクト/i })
        fireEvent.mouseDown(selectInput)

        // Then
        const placeholderOptions = screen.getAllByText('選択してください')
        expect(placeholderOptions.length).toBeGreaterThan(0)
      })
    })
  })
})
