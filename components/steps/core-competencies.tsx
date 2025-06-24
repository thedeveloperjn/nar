import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface CoreCompetenciesProps {
  formData: any
  updateFormData: (data: any) => void
}

export function CoreCompetencies({ formData, updateFormData }: CoreCompetenciesProps) {
  const handleCompetencyChange = (competency: string, checked: boolean) => {
    updateFormData({
      competencies: {
        ...formData.competencies,
        [competency]: checked,
      },
    })
  }

  const competencies = [
    { id: "commercial", label: "Commercial" },
    { id: "leasing", label: "Leasing" },
    { id: "retail", label: "Retail" },
    { id: "sales", label: "Sales" },
    { id: "resale", label: "Resale" },
    { id: "coworking", label: "Coworking" },
    { id: "fractionSales", label: "Fraction Sales" },
    { id: "residential", label: "Residential" },
    { id: "primarySales", label: "Primary Sales" },
    { id: "secondarySales", label: "Secondary Sales" },
    { id: "rental", label: "Rental" },
    { id: "landSales", label: "Land Sales" },
    { id: "jointDevelopment", label: "Joint Development" },
    { id: "jointVenture", label: "Joint Venture" },
    { id: "industrial", label: "Industrial" },
    { id: "industrialWarehousing", label: "Industrial Warehousing" },
    { id: "industrialRealEstate", label: "Industrial Real Estate" },
    { id: "propertyManagement", label: "Property Management" },
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Core Competencies</h2>
      <p className="text-gray-600">Select applicable competencies</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {competencies.map((competency) => (
          <div key={competency.id} className="flex items-center space-x-2">
            <Checkbox
              id={competency.id}
              checked={formData.competencies[competency.id]}
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
