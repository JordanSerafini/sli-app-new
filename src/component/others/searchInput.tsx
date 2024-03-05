import { useState } from 'react';

type OnSearchFunction = (value: string) => void;

interface SearchInputProps {
  onSearch: OnSearchFunction;
}

const SearchInput = ({ onSearch }: SearchInputProps) => {

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (value: string) => {
    setSearchTerm(value); 
    onSearch(value); 
  };

  return (
    <div className="w-10/10 h-2/10 flex flex-row justify-between ">
      <input
        type="text"
        placeholder="Rechercher un produit"
        className="w-9/10 h-8 border-1 border-blue-900 rounded-full"
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)} 
      />
    </div>
  );
};

export default SearchInput;
