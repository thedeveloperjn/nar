import { CreditCard } from "lucide-react"

interface PaymentProps {
  formData: any
}

export function Payment({ formData }: PaymentProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Payment</h2>

      <div className="border rounded-md p-6 bg-white">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="w-16 h-16 bg-[#0099cc] rounded-full flex items-center justify-center">
            <CreditCard className="h-8 w-8 text-white" />
          </div>

          <h3 className="text-xl font-semibold">Registration Fee</h3>

          <div className="text-3xl font-bold">₹4,999</div>

          <p className="text-gray-500 text-center max-w-md">
            Please complete the payment to finalize your NAR India registration. You will be redirected to Razorpay to
            complete the secure payment.
          </p>

          <div className="w-full max-w-xs mt-4">
            <div className="bg-[#0099cc] text-white py-3 px-4 rounded-md text-center font-medium cursor-pointer hover:bg-[#007aa3] transition-colors">
              Proceed to Payment
            </div>
          </div>

          <div className="flex items-center justify-center space-x-4 mt-4">
            <img src="/placeholder.svg?height=30&width=50" alt="Visa" className="h-8" />
            <img src="/placeholder.svg?height=30&width=50" alt="Mastercard" className="h-8" />
            <img src="/placeholder.svg?height=30&width=50" alt="RuPay" className="h-8" />
            <img src="/placeholder.svg?height=30&width=50" alt="UPI" className="h-8" />
          </div>
        </div>
      </div>

      <div className="p-4 bg-gray-50 border rounded-md">
        <h4 className="font-medium mb-2">Payment Summary</h4>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Registration Fee</span>
            <span>₹4,999</span>
          </div>
          <div className="flex justify-between font-medium">
            <span>Total Amount</span>
            <span>₹4,999</span>
          </div>
        </div>
      </div>
    </div>
  )
}
