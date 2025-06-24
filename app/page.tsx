import { RegistrationForm } from "@/components/registration-form"
import { Header } from "@/components/header"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "NAR India Member Registration Form",
  description:
    "Register as a member of National Association of Realtors India. Complete your membership application online.",
  openGraph: {
    title: "NAR Member Registration Form",
    description:
      "Register as a member of National Association of Realtors India. Complete your membership application online.",
    images: [
      {
        url: "/images/narmetaimage.png",
        width: 1200,
        height: 630,
        alt: "NAR India Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NAR India Member Registration Form",
    description:
      "Register as a member of National Association of Realtors India. Complete your membership application online.",
    images: ["/images/narmetaimage.png"],
  },
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[rgb(0_154_204/8%)]">
      <Header />
      <div className="container mx-auto py-8 px-4 !pt-0 md:px-6 md:!pt-[8px]">
        <RegistrationForm />
      </div>
    </main>
  )
}
