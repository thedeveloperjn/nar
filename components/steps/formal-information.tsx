"use client"

import type React from "react"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface FormalInformationProps {
  formData: any
  updateFormData: (data: any) => void
}

export function FormalInformation({ formData, updateFormData }: FormalInformationProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    updateFormData({ [name]: value })
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Formal Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="companyName">Company Name</Label>
          <Input
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleInputChange}
            placeholder="Enter your company name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="designation">Designation In Company</Label>
          <Input
            id="designation"
            name="designation"
            value={formData.designation}
            onChange={handleInputChange}
            placeholder="Enter your designation"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="companyWebsite">Company Website</Label>
          <Input
            id="companyWebsite"
            name="companyWebsite"
            type="url"
            value={formData.companyWebsite}
            onChange={handleInputChange}
            placeholder="Enter your company website"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="companyEmail">Company Email Id</Label>
          <Input
            id="companyEmail"
            name="companyEmail"
            type="email"
            value={formData.companyEmail}
            onChange={handleInputChange}
            placeholder="Enter your company email"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="reraNo">RERA No.</Label>
          <Input
            id="reraNo"
            name="reraNo"
            value={formData.reraNo}
            onChange={handleInputChange}
            placeholder="Enter your RERA number"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="gstNo">GST No.</Label>
          <Input
            id="gstNo"
            name="gstNo"
            value={formData.gstNo}
            onChange={handleInputChange}
            placeholder="Enter your GST number"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="companyAddress">Company Address</Label>
        <Textarea
          id="companyAddress"
          name="companyAddress"
          value={formData.companyAddress}
          onChange={handleInputChange}
          placeholder="Enter your company address"
          className="min-h-[100px]"
        />
      </div>
    </div>
  )
}
