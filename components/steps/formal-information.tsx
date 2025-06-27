"use client"

import { useCallback } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface FormalInformationProps {
  formData: any
  updateFormData: (data: any) => void
}

export function FormalInformation({ formData, updateFormData }: FormalInformationProps) {
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    updateFormData({ [name]: value })
  }, [updateFormData])

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Formal Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Company Name */}
        <div className="space-y-2">
          <Label htmlFor="company_name">Company Name *</Label>
          <Input
            id="company_name"
            name="company_name"
            value={formData.company_name}
            onChange={handleInputChange}
            placeholder="Enter your company name"
            required
          />
        </div>

        {/* Designation */}
        <div className="space-y-2">
          <Label htmlFor="company_designation">Designation In Company *</Label>
          <Input
            id="company_designation"
            name="company_designation"
            value={formData.company_designation}
            onChange={handleInputChange}
            placeholder="Enter your designation"
            required
          />
        </div>

        {/* Company Website */}
        <div className="space-y-2">
          <Label htmlFor="company_website">Company Website</Label>
          <Input
            id="company_website"
            name="company_website"
            type="url"
            value={formData.company_website}
            onChange={handleInputChange}
            placeholder="Enter your company website"
          />
        </div>

        {/* Company Email */}
        <div className="space-y-2">
          <Label htmlFor="company_email">Company Email Id *</Label>
          <Input
            id="company_email"
            name="company_email"
            type="email"
            value={formData.company_email}
            onChange={handleInputChange}
            placeholder="Enter your company email"
            required
          />
        </div>

        {/* RERA No */}
        <div className="space-y-2">
          <Label htmlFor="rera_no">RERA No. *</Label>
          <Input
            id="rera_no"
            name="rera_no"
            value={formData.rera_no}
            onChange={handleInputChange}
            placeholder="Enter your RERA number"
            required
          />
        </div>

        {/* GST No */}
        <div className="space-y-2">
          <Label htmlFor="gst_no">GST No. *</Label>
          <Input
            id="gst_no"
            name="gst_no"
            value={formData.gst_no}
            onChange={handleInputChange}
            placeholder="Enter your GST number"
            required
          />
        </div>
      </div>

      {/* Company Address */}
      <div className="space-y-2">
        <Label htmlFor="company_address">Company Address *</Label>
        <Textarea
          id="company_address"
          name="company_address"
          value={formData.company_address}
          onChange={handleInputChange}
          placeholder="Enter your company address"
          className="min-h-[100px]"
          required
        />
      </div>
    </div>
  )
}