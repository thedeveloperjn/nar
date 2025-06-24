"use client"

import type React from "react"

import { useState } from "react"
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

const steps = ["Personal Details", "Formal Information", "Core Competencies", "Documents", "Checklist"]

export function RegistrationForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    // Personal Details
    name: "",
    email: "",
    primaryContact: "",
    secondaryContact: "",
    userType: "",
    city: "",
    country: "",
    gender: "",
    dateOfBirth: "",
    bloodGroup: "",
    address: "",

    // Formal Information
    companyName: "",
    designation: "",
    companyWebsite: "",
    companyEmail: "",
    reraNo: "",
    gstNo: "",
    companyAddress: "",

    // Core Competencies
    competencies: {
      commercial: false,
      leasing: false,
      retail: false,
      sales: false,
      resale: false,
      coworking: false,
      fractionSales: false,
      residential: false,
      primarySales: false,
      secondarySales: false,
      rental: false,
      landSales: false,
      jointDevelopment: false,
      jointVenture: false,
      industrial: false,
      industrialWarehousing: false,
      industrialRealEstate: false,
      propertyManagement: false,
    },

    // Documents
    photo: null,
    aadharCardFile: null,

    // Checklist
    codeOfConduct: false,
    codeOfEthics: false,
    termsAndConditions: false,
  })

  const updateFormData = (data: any) => {
    setFormData({ ...formData, ...data })
  }

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (currentStep === steps.length - 1) {
      // Submit the form
      console.log("Form submitted:", formData)
      setIsSubmitted(true)
    } else {
      nextStep()
    }
  }

  if (isSubmitted) {
    return <ThankYou formData={formData} />
  }

  return (
    <div className="max-w-4xl mx-auto">
      <FormProgress currentStep={currentStep} steps={steps} />

      <Card className="mt-6 p-6 rounded-lg shadow-sm">
        <form onSubmit={handleSubmit}>
          {renderStep()}

          <div className="mt-8 flex justify-between">
            {currentStep > 0 && (
              <Button type="button" variant="outline" onClick={prevStep}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Previous
              </Button>
            )}

            <div className="ml-auto">
              <Button type="submit" className="bg-[rgb(0_154_204)] hover:bg-[#007aa3]">
                {currentStep === steps.length - 1 ? "Submit Registration" : "Next"}
                {currentStep !== steps.length - 1 && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </div>
          </div>
        </form>
      </Card>
    </div>
  )
}
