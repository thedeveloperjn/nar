"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { PersonalDetails } from "@/components/steps/personal-details"
import { FormalInformation } from "@/components/steps/formal-information"
import { CoreCompetencies } from "@/components/steps/core-competencies"
import { Documents } from "@/components/steps/documents"
import { Checklist } from "@/components/steps/checklist"
import { ThankYou } from "@/components/steps/thank-you"
import { FormProgress } from "@/components/form-progress"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { useFormValidation } from "@/hooks/use-form-validation"
import { sanitizeFormData } from "@/lib/sanitization"
import { Label } from "@/components/ui/label"
import { SelectItem } from "@/components/ui/select"

const steps = ["Personal Details", "Formal Information", "Core Competencies", "Documents", "Checklist"]

export function RegistrationForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const [formData, setFormData] = useState({
    // Personal Details
    name: "",
    email_id: "",
    primary_contact_no: "",
    secondary_contact_no: "",
    userType: "",
    city: "",
    country: "",
    gender: "",
    dob: "",
    blood_group: "",
    address: "",
    otherCity: "",

    // Formal Information
    company_name: "",
    company_designation: "",
    company_website: "",
    company_email: "",
    rera_no: "",
    gst_no: "",
    company_address: "",
    industry: "",
    profession: "",

    
      residential_primary_sales: false,
      residential_secondary_sales: false,
      residential_rental: false,
      residential: false,
      commercial_leasing: false,
      commercial_retail: false,
      commercial_sales: false,
      commercial_resales: false,
      commercial_coworking: false,
      commercial_fraction_sales: false,
      commercial: false,
      land_sales: false,
      land_join_development: false,
      joint_development: false,
      land_joint_venture: false,
      industrial_real_estate: false,
      industrial_warehousing: false,
      industrial: false,
      property_management_service: false,
 

    // Documents
    profile: null as File | null,
    adharCard: null as File | null,

    // Checklist
    codeOfConduct: false,
    codeOfEthics: false,
    termsAndConditions: false,
  })

  const { validateStep } = useFormValidation()

  const updateFormData = useCallback((data: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...data }))
  }, [])

  const nextStep = useCallback(() => {
    const validationError = validateStep(currentStep, formData)
    if (validationError) {
      setError(validationError)
      return
    }
    setError(null)
    setCurrentStep(prev => Math.min(prev + 1, steps.length - 1))
  }, [currentStep, formData, validateStep])

  const prevStep = useCallback(() => {
    setCurrentStep(prev => Math.max(prev - 1, 0))
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (currentStep === steps.length - 1) {
      try {
        setIsLoading(true)
        setError(null)
        
        // Final validation
        const validationError = validateStep(currentStep, formData)
        if (validationError) {
          setError(validationError)
          setIsLoading(false)
          return
        }

        // Sanitize data before submission
        const sanitizedData = sanitizeFormData(formData)
        
        // Prepare FormData for multipart upload
        const formDataToSend = new FormData()

        // Append all fields except files, city, and competencies
        Object.entries(sanitizedData).forEach(([key, value]) => {
          if (key === "profile" || key === "adharCard" || key === "city" || key === "competencies") return;
          if (value !== null && value !== undefined) {
            if (value instanceof File) {
              // handled below
            } else {
              formDataToSend.append(key, String(value))
            }
          }
        })

        // Append competencies as separate fields
        if (sanitizedData.competencies && typeof sanitizedData.competencies === 'object') {
          Object.entries(sanitizedData.competencies).forEach(([compKey, compValue]) => {
            formDataToSend.append(compKey, String(compValue));
          });
        }

        // Append city: if 'other' or 'OTHER', send 'OTHER', else send city ID
        if (sanitizedData.city === 'OTHER') {
          formDataToSend.append('city', 'OTHER');
        } else {
          formDataToSend.append('city', sanitizedData.city);
        }

        // Append files with correct backend keys
        if (formData.adharCard) {
          formDataToSend.append('adharCard', formData.adharCard);
        }
        if (formData.profile) {
          formDataToSend.append('profile', formData.profile);
        }

        // Submit to API
        const response = await fetch('https://narindia-api.vercel.app/api/v1/membership/registration', {
          method: 'POST',
          body: formDataToSend,
        })

        if (!response.ok) {
          throw new Error(`Submission failed: ${response.statusText}`)
        }

        setIsSubmitted(true)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred')
      } finally {
        setIsLoading(false)
      }
    } else {
      nextStep()
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <PersonalDetails formData={formData} updateFormData={updateFormData} />
      case 1:
        return <FormalInformation formData={formData} updateFormData={updateFormData} />
      case 2:
        return <CoreCompetencies formData={formData} updateFormData={updateFormData} />
      case 3:
        return <Documents formData={formData} updateFormData={updateFormData} />
      case 4:
        return <Checklist formData={formData} updateFormData={updateFormData} />
      default:
        return <PersonalDetails formData={formData} updateFormData={updateFormData} />
    }
  }

  if (isSubmitted) {
    return <ThankYou formData={formData} />
  }

  return (
    <div className="max-w-4xl mx-auto">
      <FormProgress currentStep={currentStep} steps={steps} />

      <Card className="mt-6 p-6 rounded-lg shadow-sm">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {renderStep()}

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          <div className="mt-8 flex justify-between">
            {currentStep > 0 && (
              <Button 
                type="button" 
                variant="outline" 
                onClick={prevStep}
                disabled={isLoading}
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Previous
              </Button>
            )}

            <div className="ml-auto">
              <Button 
                type="submit" 
                className="bg-[rgb(0_154_204)] hover:bg-[#007aa3]"
                disabled={isLoading}
              >
                {isLoading ? (
                  "Processing..."
                ) : (
                  <>
                    {currentStep === steps.length - 1 ? "Submit Registration" : "Next"}
                    {currentStep !== steps.length - 1 && <ArrowRight className="ml-2 h-4 w-4" />}
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
      </Card>
    </div>
  )
}