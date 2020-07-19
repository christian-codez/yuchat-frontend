import React from 'react';
import './search-field.style.css';

const SearchField = () => {
  return (
    <div
      className='input-field col s12'
      style={{
        marginBottom: 0,
        marginTop: 0,
        padding: 0,
        backgroundColor: '#fff',
      }}>
      <input
        onChange={() => console.log('')}
        value=''
        id='first_name2'
        type='text'
      />
      <label className='' htmlFor='first_name2'>
        Search or start a new chat
      </label>
    </div>
  );
};

export default SearchField;
