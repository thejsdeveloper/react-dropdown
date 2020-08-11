import React, { useState, useRef, useEffect } from "react";

import { FaAngleUp, FaAngleDown, FaSearch } from "react-icons/fa";
import { useOnClickOutside } from "../useOnClickOutside";
import { Subject } from "rxjs";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { DropdownOptions } from "./DropdownOptions";
/***
 * features:
 * Title: 'Select Items' by default
 * Limit: 5 is default
 * multSelect: false by default
 * enableSearch: true by default
 * hasAddPermission: false by default
 */
const Dropdown = ({
  title = "Select Items..",
  limit = 5,
  hasAddPermission = false,
  multiSelect = false,
  enableSearch = true,
  items,
  onSelection,
  onSearchChange, // need to move in here
  onAddClick, // move here
}) => {
  const [open, setOpen] = useState(false);
  const [selection, setSelection] = useState([]);
  const [searchText, setSearchText] = useState("");
  const toggle = () => setOpen(!open);
  const ref = useRef();
  const inputRef = useRef();

  useOnClickOutside(ref, () => {
    setSearchText("");
    onSearchChange("");
    setOpen(false);
  });

  useEffect(() => {
    inputRef.current = new Subject();
    const subscription = inputRef.current
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe(onSearchChange);
    return () => {
      subscription.unsubscribe();
    };
  }, [onSearchChange]);

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

    onAddClick(country);
    handleOnClick(country);
    setOpen(false);
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
