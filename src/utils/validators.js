/* Shared validation functions. Every form uses these so the wording and
   limits are identical across modules. Each returns '' when valid. */

function textOf(value) {
  return (value ?? '').trim()
}

export function validateText(value, min, max, label) {
  const text = textOf(value)
  if (!text) return `Enter ${label.toLowerCase()}`
  if (text.length < min) return `${label} must be at least ${min} characters`
  if (text.length > max) return `${label} must be at most ${max} characters`
  return ''
}

export function validateTitle(value) {
  return validateText(value, 5, 100, 'Title')
}

export function validateName(value) {
  return validateText(value, 5, 100, 'Name')
}

export function validateItemName(value) {
  return validateText(value, 3, 80, 'Item name')
}

export function validateDescription(value) {
  return validateText(value, 20, 500, 'Description')
}

export function validateMessage(value) {
  return validateText(value, 20, 300, 'Message')
}

export function validateResponse(value) {
  const text = textOf(value)
  if (!text) return 'Enter a response of 10 to 300 characters'
  if (text.length < 10) return 'Enter a response of 10 to 300 characters'
  if (text.length > 300) return 'Response must be at most 300 characters'
  return ''
}

export function validateSelect(value, label) {
  return value ? '' : `Select a ${label.toLowerCase()}`
}

export function validatePrice(value) {
  const text = textOf(value)
  const number = Number(text)
  const pattern = /^\d+(\.\d{1,2})?$/
  if (!text || !pattern.test(text) || !Number.isFinite(number)) {
    return 'Enter a price between 1 and 100000'
  }
  if (number < 1 || number > 100000) {
    return 'Enter a price between 1 and 100000'
  }
  return ''
}

export function validatePriceRange(min, max) {
  if (min !== '' && max !== '' && Number(min) > Number(max)) {
    return 'Minimum price cannot exceed maximum'
  }
  return ''
}

export function validateNotFuture(value) {
  if (!value) return ''
  const day = new Date(value)
  const endOfToday = new Date()
  endOfToday.setHours(23, 59, 59, 999)
  if (day > endOfToday) return 'Date cannot be in the future'
  return ''
}

export function validateImage(file) {
  if (!file) return ''
  if (file.size > 2 * 1024 * 1024) {
    return 'Image must be a JPG or PNG of 2 MB or less'
  }
  if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
    return 'Image must be a JPG or PNG of 2 MB or less'
  }
  return ''
}