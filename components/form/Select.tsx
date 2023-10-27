import { SelectHTMLAttributes } from 'react'

export const Select = ({ label, optionalLabel, value, options, onChange }: SelectProps) => {
  return (
    <div className="mb-4">
      <label htmlFor={label} className="mb-2 block font-medium text-white">
        {label}
      </label>
      <select
        id={label}
        value={value}
        onChange={onChange}
        className="block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-white placeholder-gray-400 focus:border-gray-400 focus:ring-gray-400"
      >
        {optionalLabel && <option value="">{optionalLabel}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

type SelectProps = SelectHTMLAttributes<any> & {
  label: string
  optionalLabel?: string
  options: Option[]
}

type Option = {
  label: string
  value: string
}
