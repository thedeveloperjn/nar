"use client"

import { FileText, Image } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FilePreviewProps {
  id: string
  preview: string | null
  accept: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onRemove: () => void
  placeholderText: string
  helperText: string
  isDocument?: boolean
}

export function FilePreview({
  id,
  preview,
  accept,
  onChange,
  onRemove,
  placeholderText,
  helperText,
  isDocument = false
}: FilePreviewProps) {
  return (
    <div className="relative aspect-square border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center bg-gray-50 overflow-hidden">
      {preview ? (
        <>
          {isDocument ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
              <FileText className="w-16 h-16 text-gray-400 mb-2" />
              <p className="text-sm font-medium text-center text-gray-900 truncate w-full px-2">
                {placeholderText}
              </p>
            </div>
          ) : (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          )}
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="absolute bottom-2 right-2"
            onClick={(e) => {
              e.stopPropagation()
              onRemove()
            }}
          >
            Remove
          </Button>
        </>
      ) : (
        <>
          {isDocument ? <FileText className="w-8 h-8 text-gray-400 mb-2" /> : <Image className="w-8 h-8 text-gray-400 mb-2" />}
          <p className="text-sm text-gray-500">{placeholderText}</p>
          <p className="text-xs text-gray-400 mt-1">{helperText}</p>
        </>
      )}
      <input
        id={id}
        type="file"
        accept={accept}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        onChange={onChange}
      />
    </div>
  )
}