"use client"
import { useState, SyntheticEvent } from 'react'
import { useField } from 'formik'
import { Autocomplete, TextField } from '@mui/material'

interface DataType {
  id: string;
  title: string;
}

export const InputAutoComplete = ({ ...props }) => {
  const [val, setVal] = useState<DataType | null>(null)
  const [inputValue, setInputValue] = useState<string>('')
  const [field, meta, { setValue }] = useField(props.name)
  const defaultProps = {
    options: props.data,
    getOptionLabel: (option: DataType) => option.title || ''
  }

  return (
    <Autocomplete
      {...field}
      {...props}
      {...defaultProps}
      inputValue={inputValue}
      onInputChange={(_, newInputValue: string) => {
        setInputValue(newInputValue);
      }}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      onChange={(
        event: SyntheticEvent,
        newValue: any,
      ) => {
        setValue(newValue)
        setVal(newValue)
      }
      }
      renderInput={(params) => (
        <TextField
          {...params}
          label={props.label}
          placeholder={props.label}
          error={meta.touched && !!meta.error}
          helperText={meta.touched && meta.error}
        />
      )}
    />
  )
}
