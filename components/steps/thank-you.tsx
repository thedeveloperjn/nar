import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface ThankYouProps {
  formData: any
}

export function ThankYou({ formData }: ThankYouProps) {
  return (
    <div className="max-w-4xl mx-auto mt-8">
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="flex justify-center">
          <div className="rounded-full bg-green-100 p-6">
            <CheckCircle className="h-16 w-16 text-green-600" />
          </div>
        </div>

        <h1 className="mt-6 text-3xl font-bold text-gray-900">Registration Successful!</h1>

        <p className="mt-4 text-lg text-gray-600">Thank you, {formData.name}, for registering with NAR India!</p>

        <div className="mt-6 bg-blue-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-blue-800">What's Next?</h2>
          <p className="mt-2 text-blue-700">
            Your registration has been submitted successfully. Our team will review your application and contact you
            within 2-3 business days at {formData.email} or {formData.primaryprimary_contact_noContact}.
          </p>
        </div>

        <div className="mt-8 p-6 border border-gray-200 rounded-lg">
          <h3 className="text-lg font-medium text-gray-800">Registration Details</h3>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            <div>
              <p className="text-sm text-gray-500">Registration ID</p>
              <p className="font-medium">NAR-{Math.floor(100000 + Math.random() * 900000)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Date</p>
              <p className="font-medium">{new Date().toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="font-medium">{formData.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{formData.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
