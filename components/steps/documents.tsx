"use client"

import { useState, useCallback } from "react"
import { Label } from "@/components/ui/label"
import { Upload } from "lucide-react"
import { FilePreview } from "../ui/file-preview" // Create this component

interface DocumentsProps {
  formData: any
  updateFormData: (data: any) => void
}

export function Documents({ formData, updateFormData }: DocumentsProps) {
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [aadharPreview, setAadharPreview] = useState<string | null>(null)

  const handleFileChange = useCallback(
    (field: "profile" | "adharCard", e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (!file) return

      // Validate file type
      const validImageTypes = ["image/jpeg", "image/png", "image/gif"]
      const isValidType = validImageTypes.includes(file.type)

      if (!isValidType) {
        alert("Please upload a valid image (JPEG, PNG, GIF)")
        return
      }

      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size should not exceed 5MB")
        return
      }

      updateFormData({ [field]: file })

      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        if (field === "profile") {
          setPhotoPreview(reader.result as string)
        } else {
          setAadharPreview(reader.result as string)
        }
      }
      reader.readAsDataURL(file)
    },
    [updateFormData]
  )

  const removeFile = useCallback(
    (field: "profile" | "adharCard") => {
      updateFormData({ [field]: null })
      if (field === "profile") {
        setPhotoPreview(null)
      } else {
        setAadharPreview(null)
      }
    },
    [updateFormData]
  )

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Documents</h2>
      <p className="text-gray-600">Please upload your profile photo and Aadhar card</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="photo">Profile Photo</Label>
          <FilePreview
            id="photo"
            preview={photoPreview}
            accept=".jpeg,.jpg,.png,.gif"
            onChange={(e) => handleFileChange("profile", e)}
            onRemove={() => removeFile("profile")}
            placeholderText="Upload Profile Photo"
            helperText="JPG, PNG, GIF"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="aadharCard">Aadhar Card</Label>
          <FilePreview
            id="aadharCard"
            preview={aadharPreview}
            accept=".jpeg,.jpg,.png,.gif"
            onChange={(e) => handleFileChange("adharCard", e)}
            onRemove={() => removeFile("adharCard")}
            placeholderText="Upload Aadhar Card"
            helperText="JPG, PNG, GIF"
          />
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