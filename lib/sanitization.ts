export const sanitizeFormData = (formData: any) => {
    // Create a deep copy of the form data
    const sanitized = JSON.parse(JSON.stringify(formData))
    
    // Trim all string fields
    Object.keys(sanitized).forEach(key => {
      if (typeof sanitized[key] === 'string') {
        sanitized[key] = sanitized[key].trim()
      }
    })
  
    // Handle nested objects (like competencies)
    if (sanitized.competencies) {
      Object.keys(sanitized.competencies).forEach(key => {
        sanitized.competencies[key] = Boolean(sanitized.competencies[key])
      })
    }
  
    // Remove otherCity if not needed
    if (sanitized.city !== "other" && sanitized.city !== "OTHER") {
      sanitized.otherCity = ""
    }
  
    return sanitized
  }