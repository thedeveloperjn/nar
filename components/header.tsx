import Image from "next/image"

export function Header() {
  return (
    <header>
      <div className="container mx-auto py-4 px-4 pb-0 md:pb-4 md:px-6">
        <div className="flex justify-center">
          <Image
            src="/images/narbanner.png"
            alt="NAR India Membership Registration"
            width={1200}
            height={300}
            className="w-full max-w-4xl h-auto object-contain rounded-lg"
            priority
          />
        </div>
      </div>
    </header>
  )
}
