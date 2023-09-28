'use client'

import { useState, useEffect, SyntheticEvent } from 'react'
import { useField, useFormikContext } from 'formik'
import { Autocomplete, FormControl, TextField } from '@mui/material'
import { useAppDispatch } from '@/hooks/useRedux'

type DataType = {
  title: string;
  id: string;
};

export const AutoCompleteAsync = ({ ...props }) => {
  const dispatch = useAppDispatch()
  // @ts-ignore
  const { values: { state } } = useFormikContext()

  const [options, setOptions] = useState<DataType[]>([])
  const [inputValue, setInputValue] = useState<string>('')
  const [field, meta, { setValue }] = useField(props.name)

  useEffect(() => {
    if (inputValue === '') {
      setOptions(props.data)
    }
  }, [props.data, inputValue])

  return (
    <FormControl fullWidth sx={{ mt: 2 }}>
      <Autocomplete
        {...field}
        {...props}
        autoComplete
        options={options}
        includeInputInList
        filterSelectedOptions
        filterOptions={x => x}
        noOptionsText='Sem resultados'
        inputValue={inputValue}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        getOptionLabel={option => option.title || ''}
        onChange={(event: SyntheticEvent, newValue: any) => {
          setValue(newValue)
        }}
        onInputChange={(_, newInputValue: string) => {
          // setValue(newInputValue)
          setInputValue(newInputValue)
          dispatch(props.handleapi(state.id, newInputValue))
            // @ts-ignore
            .then(response => {
              setOptions(
                response?.result.map(
                  ({ id, name }: { id: string; name: string }) => ({
                    title: name,
                    id: id
                  })
                )
              )
            })
        }}
        renderInput={params => (
          <TextField
            {...props}
            {...params}
            error={meta.touched && !!meta.error}
            helperText={meta.touched && meta.error}
            InputProps={{
              ...params.InputProps,
              type: 'search'
            }}
          />
        )}
      />
    </FormControl>
  )
}
