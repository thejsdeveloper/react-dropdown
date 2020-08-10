import React, { useState, useEffect } from "react";
import "./App.scss";
import Dropdown from "./Dropdown";

function App() {
  const [countries, setCountries] = useState([]);
  const [storedCountries, setStoredCountries] = useState([]);
  const [title, setTitle] = useState("Select Country..");

  useEffect(() => {
    fetch("https://restcountries.eu/rest/v2/all?fields=name")
      .then((response) => response.json())
      .then((countries) => {
        const mappedCountries = countries.map((country) => ({
          value: country.name,
          id: country.name,
        }));
        setStoredCountries(mappedCountries);
        setCountries(mappedCountries);
      })
      .catch((error) => {
        console.error(error);
        return [];
      });
  }, [setCountries, setStoredCountries]);

  function handleSelection(value) {
    if (!!value) {
      setTitle(value);
    } else {
      setTitle("Select Country..");
    }
  }

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

  return (
    <>
      <div className="container">
        <h1 style={{ textAlign: "center" }}>Select Countries </h1>
        <Dropdown
          title={title}
          items={countries}
          onSelection={handleSelection}
          onSearchChange={handleSearch}
          onAddClick={handleAdd}
        />
      </div>

      <div className="container">
        <h1 style={{ textAlign: "center" }}>
          Select Countries (With add permission)
        </h1>
        <Dropdown
          title={title}
          items={countries}
          onSelection={handleSelection}
          hasAddPermission={true}
          onSearchChange={handleSearch}
          onAddClick={handleAdd}
        />
      </div>
    </>
  );
}

export default App;
