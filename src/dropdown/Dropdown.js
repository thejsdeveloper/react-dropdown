import React, { useState, useRef, useEffect } from "react";

import { FaAngleUp, FaAngleDown, FaSearch } from "react-icons/fa";
import { useOnClickOutside } from "../useOnClickOutside";
import { Subject } from "rxjs";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { DropdownOptions } from "./DropdownOptions";
/***
 * features:
 * title: This is to set empty state titile 'Select Items' by default
 * options: Pass local data in options
 * limit: To limit the dropdown options
 * multSelect: To enable nultiselect pass true , false by default
 * enableSearch: To enable search pass true, true by default
 * hasAddPermission: To allow users to add new option if not available in select, false by default
 * dataUrl: Pass url for remote api to fetch data from there,
 *          Note that if data url and option both are provided options are ignored
 * onSelection: Emits the array of selected records as soon as user selects
 */
const Dropdown = ({
  title = "Select Items..",
  limit,
  hasAddPermission = false,
  multiSelect = false,
  enableSearch = true,
  options = [],
  onSelection,
  dataUrl,
}) => {
  const [items, setItems] = useState(options);
  const [storedItems, setStoredItems] = useState(options);
  const [open, setOpen] = useState(false);
  const [selection, setSelection] = useState([]);
  const [searchText, setSearchText] = useState("");
  const toggle = () => setOpen(!open);
  const ref = useRef();
  const inputRef = useRef();

  useEffect(() => {
    if (!!dataUrl) {
      fetch(dataUrl)
        .then((response) => response.json())
        .then((records) => {
          const mappedRecords = records.map((record) => ({
            value: record.name,
            id: record.name,
            icon: record.flag,
          }));
          setStoredItems(mappedRecords);
          setItems(mappedRecords);
        })
        .catch((error) => {
          console.error(error);
          return [];
        });
    }
  }, [setItems, setStoredItems, dataUrl]);

  useOnClickOutside(ref, () => {
    setSearchText("");
    setOpen(false);
  });

  useEffect(() => {
    inputRef.current = new Subject();
    const subscription = inputRef.current
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((value) => {
        if (!!value) {
          const filteredItems = storedItems.filter((country) =>
            country.value.toLowerCase().includes(value.toLowerCase())
          );
          setItems(filteredItems);
        } else {
          setItems(storedItems);
        }
      });
    return () => {
      subscription.unsubscribe();
    };
  }, [storedItems]);

  function handleOnClick(item) {
    if (!selection.some((current) => current.id === item.id)) {
      if (!multiSelect) {
        setSelection([item]);
        onSelection([item]);
      } else if (multiSelect) {
        const itemsAfterAdd = [...selection, item];
        setSelection(itemsAfterAdd);
        onSelection(itemsAfterAdd);
      }
    } else {
      let selectionAfterRemoval = selection;
      selectionAfterRemoval = selectionAfterRemoval.filter(
        (current) => current.id !== item.id
      );
      setSelection([...selectionAfterRemoval]);
      onSelection([...selectionAfterRemoval]);
    }
  }

  function isItemInSelection(item) {
    return selection.some((curr) => curr.id === item.id);
  }

  function handleSearch(value) {
    setSearchText(value.trim());
    inputRef.current.next(value);
  }

  function handleAdd() {
    const [firstChar, ...rest] = searchText;
    const capitalisedValue = firstChar.toUpperCase() + rest.join("");
    const country = {
      id: capitalisedValue,
      value: capitalisedValue,
    };

    const sortedCountries = [...storedItems, country].sort((a, b) =>
      a.value.toLowerCase() > b.value.toLowerCase() ? 1 : -1
    );
    setStoredItems(sortedCountries);
    setItems(sortedCountries);
    handleOnClick(country);
    setSearchText("");
  }

  return (
    <div className="dd-wrapper" ref={ref}>
      <div
        className="dd-header"
        onKeyPress={() => toggle()}
        onClick={() => toggle()}
      >
        <div className="dd-header__title">
          {selection.length === 0 ? (
            <p className="dd-header__title--bold">{title}</p>
          ) : selection.length === 1 ? (
            <p className="dd-header__title--bold">{selection[0].value}</p>
          ) : (
            <p className="dd-header__title--bold">
              {selection.length} Items selected
            </p>
          )}
        </div>
        <div className="dd-header__action">
          <p>{open ? <FaAngleUp /> : <FaAngleDown />} </p>
        </div>
      </div>

      {open && (
        <>
          {enableSearch && (
            <div className="dd-search">
              <span className="dd-search__icon">
                <FaSearch color="#00B0FF" />
              </span>
              <input
                type="text"
                placeholder="Filter Countries"
                value={searchText}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
          )}
          <DropdownOptions
            options={items}
            limit={limit}
            handleOnClick={handleOnClick}
            isItemInSelection={isItemInSelection}
            searchText={searchText}
            hasAddPermission={hasAddPermission}
            handleAdd={handleAdd}
          />
        </>
      )}
    </div>
  );
};
export default Dropdown;
