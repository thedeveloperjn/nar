"use client"

import { useCallback } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface CoreCompetenciesProps {
  formData: any
  updateFormData: (data: any) => void
}

export function CoreCompetencies({ formData, updateFormData }: CoreCompetenciesProps) {
  const handleCompetencyChange = useCallback((competency: string, checked: boolean) => {
    updateFormData({
      [competency]: checked,
    })
  }, [updateFormData])

  const competencies = [
    { id: "residential_primary_sales", label: "Residential Primary Sales" },
    { id: "residential_secondary_sales", label: "Residential Secondary Sales" },
    { id: "residential_rental", label: "Residential Rental" },
    { id: "residential", label: "Residential" },
    { id: "commercial_leasing", label: "Commercial Leasing" },
    { id: "commercial_retail", label: "Commercial Retail" },
    { id: "commercial_sales", label: "Commercial Sales" },
    { id: "commercial_resales", label: "Commercial Resales" },
    { id: "commercial_coworking", label: "Commercial Coworking" },
    { id: "commercial_fraction_sales", label: "Commercial Fraction Sales" },
    { id: "commercial", label: "Commercial" },
    { id: "land_sales", label: "Land Sales" },
    { id: "land_join_development", label: "Land Joint Development" },
    { id: "joint_development", label: "Joint Development" },
    { id: "land_joint_venture", label: "Land Joint Venture" },
    { id: "industrial_real_estate", label: "Industrial Real Estate" },
    { id: "industrial_warehousing", label: "Industrial Warehousing" },
    { id: "industrial", label: "Industrial" },
    { id: "property_management_service", label: "Property Management Service" },
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Core Competencies</h2>
      <p className="text-gray-600">Select all applicable competencies</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {competencies.map((competency) => (
          <div key={competency.id} className="flex items-center space-x-2">
            <Checkbox
              id={competency.id}
              checked={formData[competency.id]}
              onCheckedChange={(checked) => handleCompetencyChange(competency.id, checked as boolean)}
            />
            <Label
              htmlFor={competency.id}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {competency.label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  )
}