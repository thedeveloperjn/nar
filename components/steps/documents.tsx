"use client"

import type React from "react"
import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Upload } from "lucide-react"

interface DocumentsProps {
  formData: any
  updateFormData: (data: any) => void
}

export function Documents({ formData, updateFormData }: DocumentsProps) {
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [aadharPreview, setAadharPreview] = useState<string | null>(null)

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      updateFormData({ photo: file })
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAadharChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      updateFormData({ aadharCardFile: file })
      const reader = new FileReader()
      reader.onloadend = () => {
        setAadharPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Documents</h2>
      <p className="text-gray-600">Please upload your profile photo and Aadhar card</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="photo">Profile Photo</Label>
          <div className="relative aspect-square border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center bg-gray-50 overflow-hidden">
            {photoPreview ? (
              <img
                src={photoPreview || "/placeholder.svg"}
                alt="Profile Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <>
                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">Upload Profile Photo</p>
                <p className="text-xs text-gray-400 mt-1">JPG, PNG, GIF</p>
              </>
            )}
            <input
              id="photo"
              type="file"
              accept=".jpeg,.jpg,.png,.gif"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handlePhotoChange}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="aadharCard">Aadhar Card</Label>
          <div className="relative aspect-square border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center bg-gray-50 overflow-hidden">
            {aadharPreview ? (
              <img
                src={aadharPreview || "/placeholder.svg"}
                alt="Aadhar Card Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <>
                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">Upload Aadhar Card</p>
                <p className="text-xs text-gray-400 mt-1">JPG, PNG, PDF</p>
              </>
            )}
            <input
              id="aadharCard"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleAadharChange}
            />
          </div>
        </div>
      </div>

      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md mt-4">
        <p className="text-sm text-yellow-800">
          <strong>Note:</strong> Please ensure that your profile photo is clear and your Aadhar card is legible. Both
          documents are required for verification.
        </p>
      </div>
    </div>
  )
}
