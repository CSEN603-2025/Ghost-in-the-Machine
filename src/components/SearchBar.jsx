import React from 'react';

function SearchBar({value, onChange, placeHolder = "Search..."}) {
    return (
        <input 
        type = "text"
        placeholder={placeHolder}
        value={value}
        onChange={onChange}
        className="w-full p-2 rounded-lg border border-gray-300 shadow-sm"
        />
      );
}

export default SearchBar;