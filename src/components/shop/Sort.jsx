import React from 'react';

export const Sort = ({options, defaultValue}) => {
  return (
    <select>
        <option disabled value="">{defaultValue}</option>
        {options.map(option => 
            <option key={option.value} value={option.value}>
                {option.name}
            </option>
            )}
    </select>
  )
}
