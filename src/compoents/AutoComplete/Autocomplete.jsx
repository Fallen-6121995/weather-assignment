import React, { useState, useCallback, useEffect } from 'react';
import { getCitySuggestions } from '../../services/weatherApi';
import { useDebounce } from '../../hooks/useDebounce';
import { FaSearch } from "react-icons/fa";
import './Autocomplete.css'; // Add this for custom styling

function Autocomplete({ onSelect,selectedCity }) {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [suggestionClicked, setSuggestionClicked] = useState(false);

  const debouncedInput = useDebounce(input, 1000);

  useEffect(() => {
    if(selectedCity){
      setInput(selectedCity);
    }
  },[selectedCity])

  const fetchSuggestions = useCallback(async (query) => {
    setLoading(true);
    setNoResults(false);
    try {
      const results = await getCitySuggestions(query);
      if (results.length > 0) {
        setSuggestions(results);
        setNoResults(false);
      } else {
        setNoResults(true);
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!suggestionClicked && debouncedInput.length > 2) {
      fetchSuggestions(debouncedInput);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
      setSuggestions([]);
    }
  }, [debouncedInput, fetchSuggestions]);

  const handleChange = async (e) => {
    e.preventDefault();
    setInput(e.target.value);
    setSuggestionClicked(false);
  };

  const handleClick = (suggestion) => {
    setInput(suggestion.name);
    setShowSuggestions(false);
    setSuggestions([]);
    setSuggestionClicked(true);
    onSelect(suggestion.name);
  };

  const addToFavorites = () => {
    console.log("add>>>>>>")
  }

  const suggestionList = showSuggestions && debouncedInput && suggestions.length ? (
    <ul className="suggestions">
      {suggestions.map((suggestion, index) =>  (
        <li className='suggestion-list-item' key={index} onClick={() => handleClick(suggestion)}>
          {suggestion.name}, {suggestion.country}
        </li>
      ))}
    </ul>
  ) : null;

  return (
    <div className='search-section'>
      <form className='search-form' role="search">
        <input
          className='search-city'
          type="text"
          onChange={handleChange}
          value={input}
          placeholder="Enter a city or country"
        />
        <button className='search-icon' type="submit" disabled={loading}>
          <FaSearch />
        </button>
      </form>
      {noResults && !loading && <p>No cities found</p>}
      {loading && <p>Loading...</p>}
      {suggestionList}
    </div>
  );
}

export default Autocomplete;