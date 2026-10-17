/* Labelled input, select or textarea with a required marker and inline error
   linked through aria-describedby. Labels are always visible above the field. */

export default function FormField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error = '',
  options = [],
  required = false,
  hint,
}) {
  const errorId = `${name}-error`
  const describedBy = error ? errorId : undefined

  const controlProps = {
    id: name,
    className: 'field__control',
    value,
    onChange,
    'aria-invalid': error ? 'true' : undefined,
    'aria-describedby': describedBy,
  }

  return (
    <div className="field">
      <label className="field__label" htmlFor={name}>
        {label}{' '}
        {required && (
          <span className="field__required-mark">(Required)</span>
        )}
      </label>

      {type === 'select' ? (
        <select {...controlProps}>
          <option value="">Select a {label.toLowerCase()}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : type === 'textarea' ? (
        <textarea {...controlProps} />
      ) : (
        <input type={type} {...controlProps} />
      )}

      {hint && !error && <p className="field__hint">{hint}</p>}
      {error && <p className="field__error" id={errorId}>{error}</p>}
    </div>
  )
}