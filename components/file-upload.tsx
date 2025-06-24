"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Upload, File, X } from "lucide-react"

interface FileUploadProps {
  accept: string
  maxSize: number // in MB
  onFileSelected: (file: File | null) => void
  currentFile: File | null
}

export function FileUpload({ accept, maxSize, onFileSelected, currentFile }: FileUploadProps) {
  const [fileName, setFileName] = useState<string>(currentFile?.name || "")
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    setError(null)

    if (!file) {
      setFileName("")
      onFileSelected(null)
      return
    }

    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      setError(`File size exceeds ${maxSize}MB limit`)
      return
    }

    setFileName(file.name)
    onFileSelected(file)
  }

  const removeFile = () => {
    setFileName("")
    setError(null)
    onFileSelected(null)
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <div className="flex items-center border rounded-md p-2 bg-gray-50">
            {fileName ? (
              <>
                <File className="h-5 w-5 text-gray-500 mr-2" />
                <span className="text-sm truncate flex-1">{fileName}</span>
                <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={removeFile}>
                  <X className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <div className="flex items-center justify-center w-full py-2 text-gray-500">
                <Upload className="h-5 w-5 mr-2" />
                <span className="text-sm">Click here to upload or drag and drop</span>
              </div>
            )}
            <input
              type="file"
              accept={accept}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleFileChange}
            />
          </div>
        </div>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <p className="text-xs text-gray-500">
        Accepted file types: {accept.split(",").join(", ")}. Max size: {maxSize}MB
      </p>
    </div>
  )
}
