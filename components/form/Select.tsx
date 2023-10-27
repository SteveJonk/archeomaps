import { SelectHTMLAttributes } from 'react'

export const Select = ({ label, value, options, onChange }: SelectProps) => {
  return (
    <>
      <label htmlFor={label} className="mb-2 block text-sm font-medium text-white">
        {label}
      </label>
      <select
        id={label}
        value={value}
        onChange={onChange}
        className="block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-sm text-white placeholder-gray-400 focus:border-gray-400 focus:ring-gray-400"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  )
}

type SelectProps = SelectHTMLAttributes<any> & {
  label: string
  options: Option[]
}

type Option = {
  label: string
  value: string
}
