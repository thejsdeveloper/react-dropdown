import React, { useState, useEffect } from "react";
import "./App.scss";
import Dropdown from "./dropdown/Dropdown";

function App() {
  const [countries, setCountries] = useState([]);
  const [storedCountries, setStoredCountries] = useState([]);

  useEffect(() => {
    fetch("https://restcountries.eu/rest/v2/all?fields=name;flag")
      .then((response) => response.json())
      .then((countries) => {
        const mappedCountries = countries.map((country) => ({
          value: country.name,
          id: country.name,
          flag: country.flag,
        }));
        setStoredCountries(mappedCountries);
        setCountries(mappedCountries);
      })
      .catch((error) => {
        console.error(error);
        return [];
      });
  }, [setCountries, setStoredCountries]);

  function handleSearch(value) {
    if (!!value) {
      const filteredCountries = storedCountries.filter((country) =>
        country.value.toLowerCase().includes(value.toLowerCase())
      );
      setCountries(filteredCountries);
    } else {
      setCountries(storedCountries);
    }
  }

  function handleAdd(country) {
    const sortedCountries = [...storedCountries, country].sort((a, b) =>
      a.value.toLowerCase() > b.value.toLowerCase() ? 1 : -1
    );

    setStoredCountries(sortedCountries);
    setCountries(sortedCountries);
  }

  function handleSelection(selections) {
    console.log(selections);
  }

  return (
    <>
      <div className="container">
        <h1 style={{ textAlign: "center" }}>
          Select Countries (With add permission)
        </h1>
        <Dropdown
          title="Search Countries"
          items={countries}
          onSelection={handleSelection}
          hasAddPermission={true}
          onSearchChange={handleSearch}
          onAddClick={handleAdd}
          multiSelect
        />
      </div>
    </>
  );
}

export default App;
