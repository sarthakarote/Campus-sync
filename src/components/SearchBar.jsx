/* Labelled search input with a clear button that empties the field. */

export default function SearchBar({ value, onChange, label }) {
  return (
    <div className="search-bar">
      <label className="field__label" htmlFor="search">
        {label}
      </label>
      <div className="search-bar__box">
        <input
          id="search"
          className="field__control search-bar__input"
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          autoComplete="off"
        />
        {value && (
          <button
            className="btn btn--ghost search-bar__clear"
            onClick={() => onChange('')}
            aria-label="Clear search"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  )
}