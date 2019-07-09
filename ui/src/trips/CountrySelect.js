import React from 'react';
import PropTypes from 'prop-types';
import { Select } from '@blueprintjs/select';
import { Button, MenuItem } from '@blueprintjs/core';

function escapeRegExpChars(text) {
  return text.replace(/([.*+?^=!:${}()|[\]/\\])/g, '\\$1');
}

function highlightText(text, query) {
  let lastIndex = 0;
  const words = query
    .split(/\s+/)
    .filter(word => word.length > 0)
    .map(escapeRegExpChars);
  if (words.length === 0) {
    return [text];
  }
  const regexp = new RegExp(words.join('|'), 'gi');
  const tokens = [];
  while (true) {
    const match = regexp.exec(text);
    if (!match) {
      break;
    }
    const length = match[0].length;
    const before = text.slice(lastIndex, regexp.lastIndex - length);
    if (before.length > 0) {
      tokens.push(before);
    }
    lastIndex = regexp.lastIndex;
    tokens.push(<strong key={lastIndex}>{match[0]}</strong>);
  }
  const rest = text.slice(lastIndex);
  if (rest.length > 0) {
    tokens.push(rest);
  }
  return tokens;
}

export function CountrySelect({ id, value, countries, onChange }) {
  return (
    <Select
      id={id}
      filterable={true}
      itemRenderer={(item, { handleClick, modifiers, query }) => {
        if (!modifiers.matchesPredicate) {
          return null;
        } else {
          return (
            <MenuItem
              key={item.code}
              active={modifiers.active}
              label={item.icon}
              onClick={handleClick}
              text={highlightText(item.name, query)}
            />
          );
        }
      }}
      itemPredicate={(query, item, _index, exactMatch) => {
        // allow filtering for country name and country code
        const normalizedName = item.name.toLowerCase();
        const normalizedCode = item.code.toLowerCase();
        const normalizedQuery = query.toLowerCase();

        if (exactMatch) {
          return (
            normalizedName === normalizedQuery ||
            normalizedCode === normalizedQuery
          );
        } else {
          return (
            normalizedName.includes(normalizedQuery) ||
            normalizedCode.includes(normalizedQuery)
          );
        }
      }}
      allowCreate={false}
      items={countries}
      itemsEqual={(countryA, countryB) => countryA.code === countryB.code}
      popoverProps={{ minimal: false }}
      noResults={<MenuItem disabled text="No country found..." />}
      onItemSelect={country => {
        onChange(country);
      }}
    >
      <Button rightIcon="caret-down" data-testid="select-country">
        {value && value.icon} {value && value.name}
      </Button>
    </Select>
  );
}

const Country = PropTypes.shape({
  code: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
});

CountrySelect.propTypes = {
  id: PropTypes.string.isRequired,
  value: Country.isRequired,
  countries: PropTypes.arrayOf(Country).isRequired,
  onChange: PropTypes.func.isRequired
};
