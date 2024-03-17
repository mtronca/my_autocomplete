import React, { useState, useEffect } from 'react';
import { useDebounce } from '../../hooks/useDebounce';
import Icon from '../Icon/Icon';
import './styles.css';

export interface Option {
    id: number;
    value: string;
}
  
interface AutoCompleteProps {
    fetchData: (term: string) => Promise<Option[]>;
}

const Autocomplete: React.FC<AutoCompleteProps> = ({ fetchData }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [inputValue, setInputValue] = useState<string>('');
    const [options, setOptions] = useState<Option[]>([]);

    const debouncedValue = useDebounce(searchTerm, 300);

    useEffect(() => {
      let isCancelled = false;
      async function fetchOptions () {
        if (debouncedValue) {
          setLoading(true);
          const query = debouncedValue.trim();
          try{
            const data = await fetchData(query);
            if (!isCancelled) {
              setOptions(data);
            }
          } catch (error) {
            console.error('Error fetching data:', error);
          } finally {
            if (!isCancelled) {
              setLoading(false);
            }
          }
        } else {
          setOptions([]);
          return;
        }
      }

      fetchOptions();

      return () => {
        isCancelled = true;
      };
    }, [debouncedValue]);

    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
        setInputValue(value);
    };

    const handleClick = (value: string) => {
      setSearchTerm('');
      setOptions([]);
      setInputValue(value);
    }

    const handleClear = () => {
      setInputValue('');
      setSearchTerm('');
    };
    
    return (
        <div className="autocomplete">
          <Icon type="search"/>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Type something..."
          />
          {loading && <Icon type="loading"/>}
          {inputValue && <Icon data-testid="clear" onClick={handleClear} className="close" type="cancel"/>}

          <span />
          
          {!loading && searchTerm && debouncedValue && 
            <ul className="options">
              {options.map(option => (
                <li key={option.id} onClick={() => handleClick(option.value)}>
                  {option.value.split(new RegExp(`(${debouncedValue})`, 'gi')).map((part, index) => (
                    <span key={index} className={part.toLowerCase() === debouncedValue.toLowerCase() ? 'highlight' : ''}>
                      {part}
                    </span>
                  ))}
                </li>
              ))}
              {options.length === 0 && debouncedValue && <li className="noOptions">No options found.</li>}
            </ul>
          }
        </div>
    );
};

export default Autocomplete;