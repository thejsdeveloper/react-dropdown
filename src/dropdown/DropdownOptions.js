import React, { useState, useEffect } from "react";
import { FaCheck, FaFlagCheckered } from "react-icons/fa";

export const DropdownOptions = ({
  options,
  limit = -1,
  handleOnClick,
  isItemInSelection,
  searchText,
  hasAddPermission,
  handleAdd,
}) => {
  const [dropdownOptions, setDropdownOption] = useState(
    options.slice(0, limit)
  );
  const [showAll, setShowAll] = useState(false);

  function handleShowAll(isShowAll) {
    setShowAll(isShowAll);
  }

  useEffect(() => {
    if (limit > -1 && !showAll) {
      setDropdownOption(options.slice(0, limit));
    } else {
      setDropdownOption(options);
    }
  }, [showAll, limit, options]);

  return (
    <ul className="dd-list">
      {dropdownOptions.map((item) => (
        <li className="dd-list-item" key={item.id}>
          <button
            type="button"
            onClick={() => handleOnClick(item)}
            className={isItemInSelection(item) ? "selected" : ""}
          >
            {item.flag ? (
              <img src={item.flag} alt="{item.value} flag" />
            ) : (
              <span className="dd-list-item__placeholder_flag">
                <FaFlagCheckered color="green" />
              </span>
            )}
            <span>{item.value}</span>
            <span>{isItemInSelection(item) && <FaCheck color="green" />}</span>
          </button>
        </li>
      ))}

      {limit > 0 && options.length - limit > 0 && (
        <li className="dd-list-item">
          {!showAll ? (
            <button type="button" onClick={() => handleShowAll(true)}>
              <span>{""}</span>
              <span>{options.length - limit} more.. </span>
            </button>
          ) : (
            <button type="button" onClick={() => handleShowAll(false)}>
              <span>{""}</span>
              <span>Show less</span>
            </button>
          )}
        </li>
      )}

      {options.length === 0 && !!searchText.trim() && (
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
  );
};
