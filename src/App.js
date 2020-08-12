import React from "react";
import "./App.scss";
import Dropdown from "./dropdown/Dropdown";
const options = [
  {
    flag: "https://restcountries.eu/data/afg.svg",
    value: "Afghanistan",
    id: "Afghanistan",
  },
  {
    flag: "https://restcountries.eu/data/ala.svg",
    value: "Åland Islands",
    id: "Åland Islands",
  },
  {
    flag: "https://restcountries.eu/data/alb.svg",
    value: "Albania",
    id: "Albania",
  },
  {
    flag: "https://restcountries.eu/data/dza.svg",
    value: "Algeria",
    id: "Algeria",
  },
  {
    flag: "https://restcountries.eu/data/asm.svg",
    value: "American Samoa",
    id: "American Samoa",
  },
  {
    flag: "https://restcountries.eu/data/and.svg",
    value: "Andorra",
    id: "Andorra",
  },
  {
    flag: "https://restcountries.eu/data/ago.svg",
    value: "Angola",
    id: "Angola",
  },
  {
    flag: "https://restcountries.eu/data/aia.svg",
    value: "Anguilla",
    id: "Anguilla",
  },
];

function App() {
  const dataUrl = `https://restcountries.eu/rest/v2/all?fields=name;flag`;

  function handleSelection(selections) {
    console.log(selections);
  }

  return (
    <>
      <div className="container">
        <h1 style={{ textAlign: "center" }}>Select Countries</h1>
        <p>
          <strong>Features:</strong> Remote Data, Multi Select, List Limit, With
          Add permission Search
        </p>
        <Dropdown
          title="Search Countries"
          onSelection={handleSelection}
          hasAddPermission={true}
          dataUrl={dataUrl}
          multiSelect
          limit={5}
        />
      </div>

      <div className="container">
        <h1 style={{ textAlign: "center" }}>Select Countries</h1>
        <p>
          <strong>Features:</strong> Remote Data, Single Select, No search, No
          limit on records, No add permission
        </p>
        <Dropdown
          title="Search Countries"
          onSelection={handleSelection}
          dataUrl={dataUrl}
          enableSearch={false}
        />
      </div>

      <div className="container">
        <h1 style={{ textAlign: "center" }}>Select Countries</h1>
        <p>
          <strong>Features:</strong> Local Data, Multi Select, With Add
          permission Search
        </p>
        <Dropdown
          title="Search Countries"
          onSelection={handleSelection}
          hasAddPermission={true}
          options={options}
          multiSelect
        />
      </div>
    </>
  );
}

export default App;
