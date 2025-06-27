import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface ThankYouProps {
  formData: any
}

export function ThankYou({ formData }: ThankYouProps) {
  return (
    <div className="max-w-4xl mx-auto mt-8">
      <div className="bg-white  rounded-lg shadow-lg p-8 py-16 md:py-24 text-center">
        <div className="flex justify-center">
          <div className="rounded-full bg-[#009acc]/10 p-4 sm:p-6">
            <CheckCircle className="h-14 w-14 sm:h-16 sm:w-16 text-[#009acc]" />
          </div>
        </div>

        <h1 className="mt-6 text-xl md:text-3xl font-bold text-gray-900">Registration Successful!</h1>

        <p className="mt-4 text-md sm:text-lg text-gray-600">Thank you, {formData.name}, for registering with NAR India!</p>

      

      </div>
    </div>
  )
}
