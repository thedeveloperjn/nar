import { useCallback } from "react"

export const useFormValidation = () => {
  const validateStep = useCallback((step: number, formData: any): string | null => {
    switch (step) {
      case 0: // Personal Details
        if (!formData.name.trim()) return "Name is required"
        if (!formData.email_id?.trim()) return "Email is required"
        if (!/^\S+@\S+\.\S+$/.test(formData.email_id)) return "Invalid email format"
        if (!formData.primary_contact_no?.trim()) return "Primary contact is required"
        if (!formData.gender) return "Gender is required"
        if (!formData.dob) return "Date of birth is required"
        
        if (formData.city === "other" && !formData.otherCity?.trim()) {
          return "Please specify your city"
        }
        return null
        
      case 1: // Formal Information
        if (!formData.company_name?.trim()) return "Company name is required"
        if (!formData.company_designation?.trim()) return "Designation is required"
        if (!formData.company_email?.trim()) return "Company email is required"
        if (!/^\S+@\S+\.\S+$/.test(formData.company_email)) return "Invalid company email format"
        if (!formData.rera_no?.trim()) return "RERA number is required"
        if (!formData.gst_no?.trim()) return "GST number is required"
        return null
        
      case 3: // Documents
        if (!formData.profile) return "Profile photo is required"
        if (!formData.adharCard) return "Aadhar card is required"
        return null
        
      case 4: // Checklist
        if (!formData.codeOfConduct) return "You must agree to the Code of Conduct"
        if (!formData.codeOfEthics) return "You must agree to the Code of Ethics"
        if (!formData.termsAndConditions) return "You must agree to the Terms and Conditions"
        return null
        
      default:
        return null
    }
  }, [])

  return { validateStep }
}