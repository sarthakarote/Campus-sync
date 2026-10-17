/* Optional image upload with preview and size/type validation. Images larger
   than 200 KB are kept in memory only; the parent decides how many bytes to
   persist (section 7, A4). */

import { useEffect, useRef, useState } from 'react'
import { validateImage } from '../utils/validators.js'

export default function ImageUpload({ onSelect, label = 'Image (optional)' }) {
  const inputRef = useRef(null)
  const [previewUrl, setPreviewUrl] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl)
    }
  }, [previewUrl])

  const handleChange = (event) => {
    const file = event.target.files[0]
    const message = validateImage(file)
    if (message) {
      setError(message)
      if (previewUrl) URL.revokeObjectURL(previewUrl)
      setPreviewUrl('')
      onSelect(null)
      return
    }
    if (!file) {
      setError('')
      setPreviewUrl('')
      onSelect(null)
      return
    }
    setError('')
    if (previewUrl) URL.revokeObjectURL(previewUrl)
    setPreviewUrl(URL.createObjectURL(file))
    onSelect(file)
  }

  const handleRemove = () => {
    if (inputRef.current) inputRef.current.value = ''
    if (previewUrl) URL.revokeObjectURL(previewUrl)
    setPreviewUrl('')
    setError('')
    onSelect(null)
  }

  return (
    <div className="field">
      <span className="field__label">{label}</span>
      {previewUrl ? (
        <div
          className="field"
          style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
        >
          <img src={previewUrl} alt="Selected image preview" style={{ maxHeight: 160, borderRadius: 8 }} />
          <button className="btn btn--ghost" onClick={handleRemove} type="button">
            Remove image
          </button>
        </div>
      ) : (
        <label className="btn btn--secondary" htmlFor="image-upload">
          Choose image
        </label>
      )}
      <input
        ref={inputRef}
        id="image-upload"
        className="visually-hidden"
        type="file"
        accept="image/png,image/jpeg"
        onChange={handleChange}
        aria-describedby={error ? 'image-upload-error' : undefined}
      />
      {error && (
        <p className="field__error" id="image-upload-error">
          {error}
        </p>
      )}
    </div>
  )
}