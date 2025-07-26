import PaymentPage from "@/components/features/public/Payment/PaymentPage"
import { Suspense } from "react"

function PaymentPageWrapper() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-rose-600 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <PaymentPage />
    </Suspense>
  )
}

export default PaymentPageWrapper
