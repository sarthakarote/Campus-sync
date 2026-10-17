/* Reusable filter row built from a config array. Each config item is either
   { key, label, type: 'select', options } or
   { key, label, type: 'range', minKey, maxKey }. Values is a flat object of
   key to string. */

import FormField from './FormField.jsx'

export default function FilterPanel({ filters, values, onChange, onClear }) {
  return (
    <div className="filter-panel">
      <div className="filter-panel__row">
        {filters.map((filter) => {
          if (filter.type === 'range') {
            return (
              <div className="field" key={filter.key}>
                <span className="field__label">{filter.label}</span>
                <div className="field__row" style={{ display: 'flex', gap: 8 }}>
                  <input
                    className="field__control"
                    type="number"
                    min="0"
                    aria-label={`${filter.label} minimum`}
                    placeholder="Min"
                    value={values[filter.minKey] ?? ''}
                    onChange={(e) => onChange(filter.minKey, e.target.value)}
                  />
                  <input
                    className="field__control"
                    type="number"
                    min="0"
                    aria-label={`${filter.label} maximum`}
                    placeholder="Max"
                    value={values[filter.maxKey] ?? ''}
                    onChange={(e) => onChange(filter.maxKey, e.target.value)}
                  />
                </div>
              </div>
            )
          }
          return (
            <FormField
              key={filter.key}
              label={filter.label}
              name={`filter-${filter.key}`}
              type="select"
              options={filter.options}
              value={values[filter.key] ?? ''}
              onChange={(e) => onChange(filter.key, e.target.value)}
            />
          )
        })}
      </div>
      <button className="btn btn--ghost" onClick={onClear}>
        Clear Filters
      </button>
    </div>
  )
}