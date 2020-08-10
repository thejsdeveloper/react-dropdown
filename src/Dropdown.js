import React, { useState, useRef, useEffect } from "react";

import { FaCheck, FaAngleUp, FaAngleDown, FaSearch } from "react-icons/fa";
import { useOnClickOutside } from "./useOnClickOutside";
import { Subject } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  tap,
} from "rxjs/operators";

const Dropdown = ({
  title = "Select Items..",
  items,
  limit = 5,
  hasAddPermission = false,
  onSelection,
  onSearchChange,
  onAddClick,
}) => {
  const [open, setOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
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
    if (selection.length) {
      onSelection(selection[0].value);
    } else {
      onSelection("");
    }
  }, [selection, onSelection]);

  useEffect(() => {
    inputRef.current = new Subject();
    const subscription = inputRef.current
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        filter((input) => input.trim().length > 1),
        tap(console.log)
      )
      .subscribe((value) => onSearchChange(value));
    return () => {
      subscription.unsubscribe();
    };
  }, [onSearchChange]);

  function handleOnClick(item) {
    if (!selection.some((curr) => curr.id === item.id)) {
      setSelection([item]);
    } else {
      setSelection([]);
    }
  }

  function isItemInSelection(item) {
    return selection.some((curr) => curr.id === item.id);
  }

  function handleShowAll(isShowAll) {
    setShowAll(isShowAll);
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
          <p className="dd-header__title--bold">{title}</p>
        </div>
        <div className="dd-header__action">
          <p>{open ? <FaAngleUp /> : <FaAngleDown />} </p>
        </div>
      </div>

      {open && (
        <>
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

          <ul className="dd-list">
            {!showAll
              ? items.slice(0, limit).map((item) => (
                  <li className="dd-list-item" key={item.id}>
                    <button
                      type="button"
                      onClick={() => handleOnClick(item)}
                      className={isItemInSelection(item) ? "selected" : ""}
                    >
                      <span>{item.value}</span>
                      <span>
                        {isItemInSelection(item) && <FaCheck color="green" />}
                      </span>
                    </button>
                  </li>
                ))
              : items.map((item) => (
                  <li className="dd-list-item" key={item.id}>
                    <button
                      type="button"
                      onClick={() => handleOnClick(item)}
                      className={isItemInSelection(item) ? "selected" : ""}
                    >
                      <span>{item.value}</span>
                      <span>
                        {isItemInSelection(item) && <FaCheck color="green" />}
                      </span>
                    </button>
                  </li>
                ))}

            {items.length - limit > 0 && (
              <li className="dd-list-item">
                {!showAll ? (
                  <button type="button" onClick={() => handleShowAll(true)}>
                    <span>{""}</span>
                    <span>{items.length - limit} more.. </span>
                  </button>
                ) : (
                  <button type="button" onClick={() => handleShowAll(false)}>
                    <span>{""}</span>
                    <span>Show less</span>
                  </button>
                )}
              </li>
            )}

            {items.length === 0 && !!searchText.trim() && (
              <>
                <li className="dd-list-item">
                  <button type="button">
                    <span>
                      "<strong>{searchText}</strong>" not found{" "}
                    </span>
                    {hasAddPermission && (
                      <span className="button__action" onClick={handleAdd}>
                        Add & Select{" "}
                      </span>
                    )}
                  </button>
                </li>
              </>
            )}
          </ul>
        </>
      )}
    </div>
  );
};
export default Dropdown;
