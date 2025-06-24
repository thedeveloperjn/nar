"use client"

import type React from "react"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { format } from "date-fns"
import { CalendarIcon, Check, ChevronsUpDown, CreditCard, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { cn } from "@/lib/utils"

const formSchema = z.object({
  // Personal Details
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  gender: z.string(),
  dateOfBirth: z.date(),
  primaryContact: z.string().min(10, { message: "Please enter a valid contact number." }),
  secondaryContact: z.string().optional(),
  email: z.string().email({ message: "Please enter a valid email address." }),
  city: z.string(),
  address: z.string().min(5, { message: "Address must be at least 5 characters." }),
  bloodGroup: z.string(),
  aadharCardNo: z.string().min(12, { message: "Aadhar Card number must be 12 digits." }).max(12),

  // Formal Information  { message: "Aadhar Card number must be 12 digits." }).max(12),

  // Formal Information
  companyName: z.string().min(2, { message: "Company name must be at least 2 characters." }),
  designation: z.string(),
  companyWebsite: z.string().url({ message: "Please enter a valid URL." }).optional(),
  companyEmail: z.string().email({ message: "Please enter a valid email address." }),
  reraNo: z.string(),
  gstNo: z.string(),
  companyAddress: z.string().min(5, { message: "Company address must be at least 5 characters." }),

  // Core Competencies
  competencies: z.array(z.string()).min(1, { message: "Please select at least one competency." }),

  // Checklist
  codeOfConduct: z.boolean().refine((val) => val === true, { message: "You must agree to the Code of Conduct" }),
  codeOfEthics: z.boolean().refine((val) => val === true, { message: "You must agree to the Code of Ethics" }),
  termsAndConditions: z
    .boolean()
    .refine((val) => val === true, { message: "You must agree to the Terms and Conditions" }),
})

const genders = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Other", value: "other" },
]

const bloodGroups = [
  { label: "A+", value: "A+" },
  { label: "A-", value: "A-" },
  { label: "B+", value: "B+" },
  { label: "B-", value: "B-" },
  { label: "AB+", value: "AB+" },
  { label: "AB-", value: "AB-" },
  { label: "O+", value: "O+" },
  { label: "O-", value: "O-" },
]

const cities = [
  { label: "Mumbai", value: "mumbai" },
  { label: "Delhi", value: "delhi" },
  { label: "Bangalore", value: "bangalore" },
  { label: "Hyderabad", value: "hyderabad" },
  { label: "Chennai", value: "chennai" },
  { label: "Kolkata", value: "kolkata" },
  { label: "Pune", value: "pune" },
  { label: "Ahmedabad", value: "ahmedabad" },
  { label: "Jaipur", value: "jaipur" },
  { label: "Lucknow", value: "lucknow" },
]

const competenciesList = [
  { id: "commercial", label: "Commercial" },
  { id: "leasing", label: "Leasing" },
  { id: "retail", label: "Retail" },
  { id: "sales", label: "Sales" },
  { id: "resale", label: "Resale" },
  { id: "coworking", label: "Coworking" },
  { id: "fractionSales", label: "Fraction Sales" },
  { id: "residential", label: "Residential" },
  { id: "primarySales", label: "Primary Sales" },
  { id: "secondarySales", label: "Secondary Sales" },
  { id: "rental", label: "Rental" },
  { id: "landSales", label: "Land Sales" },
  { id: "jointDevelopment", label: "Joint Development" },
  { id: "jointVenture", label: "Joint Venture" },
  { id: "industrial", label: "Industrial" },
  { id: "industrialWarehousing", label: "Industrial Warehousing" },
  { id: "industrialRealEstate", label: "Industrial Real Estate" },
  { id: "propertyManagement", label: "Property Management Service" },
]

export default function RealEstateForm() {
  const [activeTab, setActiveTab] = useState("personal")
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [paymentProcessing, setPaymentProcessing] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      gender: "",
      primaryContact: "",
      secondaryContact: "",
      email: "",
      city: "",
      address: "",
      bloodGroup: "",
      aadharCardNo: "",
      companyName: "",
      designation: "",
      companyWebsite: "",
      companyEmail: "",
      reraNo: "",
      gstNo: "",
      companyAddress: "",
      competencies: [],
      codeOfConduct: false,
      codeOfEthics: false,
      termsAndConditions: false,
    },
  })

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setProfileImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const processPayment = () => {
    setPaymentProcessing(true)
    // Simulate payment processing
    setTimeout(() => {
      setPaymentProcessing(false)
      alert("Payment of ₹4999 processed successfully!")
      form.handleSubmit(onSubmit)()
    }, 2000)
  }

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log({ ...data, profileImage })
    // Handle form submission here
    alert("Form submitted successfully!")
  }

  const nextTab = () => {
    if (activeTab === "personal") setActiveTab("formal")
    else if (activeTab === "formal") setActiveTab("competencies")
    else if (activeTab === "competencies") setActiveTab("checklist")
  }

  const prevTab = () => {
    if (activeTab === "checklist") setActiveTab("competencies")
    else if (activeTab === "competencies") setActiveTab("formal")
    else if (activeTab === "formal") setActiveTab("personal")
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="border-0 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-t-lg">
          <CardTitle className="text-2xl font-bold">Real Estate Professional Profile</CardTitle>
          <CardDescription className="text-emerald-50">
            Please fill out the form below to complete your profile
          </CardDescription>
        </CardHeader>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 w-full rounded-none">
            <TabsTrigger value="personal">Personal Details</TabsTrigger>
            <TabsTrigger value="formal">Formal Information</TabsTrigger>
            <TabsTrigger value="competencies">Core Competencies</TabsTrigger>
            <TabsTrigger value="checklist">Checklist & Payment</TabsTrigger>
          </TabsList>

          <form onSubmit={form.handleSubmit(onSubmit)}>
            <TabsContent value="personal" className="p-0">
              <CardContent className="space-y-6 pt-6">
                <div className="flex flex-col items-center mb-6">
                  <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-emerald-100 mb-4">
                    {profileImage ? (
                      <img
                        src={profileImage || "/placeholder.svg"}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-emerald-50 flex items-center justify-center text-emerald-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="64"
                          height="64"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                      </div>
                    )}
                  </div>
                  <Label htmlFor="profile-upload" className="cursor-pointer">
                    <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-md hover:bg-emerald-100 transition-colors">
                      <Upload size={16} />
                      <span>Upload Photo</span>
                    </div>
                    <Input
                      id="profile-upload"
                      type="file"
                      accept=".jpeg,.jpg,.png,.gif"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </Label>
                  <p className="text-xs text-muted-foreground mt-2">Allowed formats: *.jpeg, *.jpg, *.png, *.gif</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" {...form.register("name")} placeholder="Enter your full name" />
                    {form.formState.errors.name && (
                      <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" role="combobox" className="w-full justify-between">
                          {form.watch("gender")
                            ? genders.find((g) => g.value === form.watch("gender"))?.label
                            : "Select Gender"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput placeholder="Search gender..." />
                          <CommandList>
                            <CommandEmpty>No gender found.</CommandEmpty>
                            <CommandGroup>
                              {genders.map((gender) => (
                                <CommandItem
                                  key={gender.value}
                                  value={gender.value}
                                  onSelect={() => {
                                    form.setValue("gender", gender.value)
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      form.watch("gender") === gender.value ? "opacity-100" : "opacity-0",
                                    )}
                                  />
                                  {gender.label}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !form.watch("dateOfBirth") && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {form.watch("dateOfBirth") ? (
                            format(form.watch("dateOfBirth"), "PPP")
                          ) : (
                            <span>MM/DD/YYYY</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={form.watch("dateOfBirth")}
                          onSelect={(date) => form.setValue("dateOfBirth", date as Date)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="primaryContact">Primary Contact No.</Label>
                    <Input
                      id="primaryContact"
                      {...form.register("primaryContact")}
                      placeholder="Enter your primary contact number"
                    />
                    {form.formState.errors.primaryContact && (
                      <p className="text-sm text-red-500">{form.formState.errors.primaryContact.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="secondaryContact">Secondary Contact No.</Label>
                    <Input
                      id="secondaryContact"
                      {...form.register("secondaryContact")}
                      placeholder="Enter your secondary contact number (optional)"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" {...form.register("email")} placeholder="Enter your email address" />
                    {form.formState.errors.email && (
                      <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" role="combobox" className="w-full justify-between">
                          {form.watch("city")
                            ? cities.find((c) => c.value === form.watch("city"))?.label
                            : "Select City"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput placeholder="Search city..." />
                          <CommandList>
                            <CommandEmpty>No city found.</CommandEmpty>
                            <CommandGroup className="max-h-60 overflow-y-auto">
                              {cities.map((city) => (
                                <CommandItem
                                  key={city.value}
                                  value={city.value}
                                  onSelect={() => {
                                    form.setValue("city", city.value)
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      form.watch("city") === city.value ? "opacity-100" : "opacity-0",
                                    )}
                                  />
                                  {city.label}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bloodGroup">Blood Group</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" role="combobox" className="w-full justify-between">
                          {form.watch("bloodGroup")
                            ? bloodGroups.find((bg) => bg.value === form.watch("bloodGroup"))?.label
                            : "Select Blood Group"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput placeholder="Search blood group..." />
                          <CommandList>
                            <CommandEmpty>No blood group found.</CommandEmpty>
                            <CommandGroup>
                              {bloodGroups.map((bloodGroup) => (
                                <CommandItem
                                  key={bloodGroup.value}
                                  value={bloodGroup.value}
                                  onSelect={() => {
                                    form.setValue("bloodGroup", bloodGroup.value)
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      form.watch("bloodGroup") === bloodGroup.value ? "opacity-100" : "opacity-0",
                                    )}
                                  />
                                  {bloodGroup.label}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="aadharCardNo">Aadhar Card No.</Label>
                    <Input
                      id="aadharCardNo"
                      {...form.register("aadharCardNo")}
                      placeholder="Enter your 12-digit Aadhar number"
                      maxLength={12}
                    />
                    {form.formState.errors.aadharCardNo && (
                      <p className="text-sm text-red-500">{form.formState.errors.aadharCardNo.message}</p>
                    )}
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Textarea
                      id="address"
                      {...form.register("address")}
                      placeholder="Enter your full address"
                      className="min-h-[100px]"
                    />
                    {form.formState.errors.address && (
                      <p className="text-sm text-red-500">{form.formState.errors.address.message}</p>
                    )}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button type="button" onClick={nextTab} className="bg-emerald-600 hover:bg-emerald-700">
                  Next
                </Button>
              </CardFooter>
            </TabsContent>

            <TabsContent value="formal" className="p-0">
              <CardContent className="space-y-6 pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input id="companyName" {...form.register("companyName")} placeholder="Enter your company name" />
                    {form.formState.errors.companyName && (
                      <p className="text-sm text-red-500">{form.formState.errors.companyName.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="designation">Designation In Company</Label>
                    <Input id="designation" {...form.register("designation")} placeholder="Enter your designation" />
                    {form.formState.errors.designation && (
                      <p className="text-sm text-red-500">{form.formState.errors.designation.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="companyWebsite">Company Website</Label>
                    <Input
                      id="companyWebsite"
                      {...form.register("companyWebsite")}
                      placeholder="https://www.example.com"
                    />
                    {form.formState.errors.companyWebsite && (
                      <p className="text-sm text-red-500">{form.formState.errors.companyWebsite.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="companyEmail">Company Email Id</Label>
                    <Input
                      id="companyEmail"
                      type="email"
                      {...form.register("companyEmail")}
                      placeholder="company@example.com"
                    />
                    {form.formState.errors.companyEmail && (
                      <p className="text-sm text-red-500">{form.formState.errors.companyEmail.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reraNo">RERA No.</Label>
                    <Input id="reraNo" {...form.register("reraNo")} placeholder="Enter RERA registration number" />
                    {form.formState.errors.reraNo && (
                      <p className="text-sm text-red-500">{form.formState.errors.reraNo.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gstNo">GST No.</Label>
                    <Input id="gstNo" {...form.register("gstNo")} placeholder="Enter GST number" />
                    {form.formState.errors.gstNo && (
                      <p className="text-sm text-red-500">{form.formState.errors.gstNo.message}</p>
                    )}
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="companyAddress">Company Address</Label>
                    <Textarea
                      id="companyAddress"
                      {...form.register("companyAddress")}
                      placeholder="Enter company address"
                      className="min-h-[100px]"
                    />
                    {form.formState.errors.companyAddress && (
                      <p className="text-sm text-red-500">{form.formState.errors.companyAddress.message}</p>
                    )}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button type="button" variant="outline" onClick={prevTab}>
                  Previous
                </Button>
                <Button type="button" onClick={nextTab} className="bg-emerald-600 hover:bg-emerald-700">
                  Next
                </Button>
              </CardFooter>
            </TabsContent>

            <TabsContent value="competencies" className="p-0">
              <CardContent className="space-y-6 pt-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Core Competencies</h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Select applicable competencies that best describe your expertise in real estate.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {competenciesList.map((competency) => (
                      <div key={competency.id} className="flex items-start space-x-2">
                        <Checkbox
                          id={competency.id}
                          checked={form.watch("competencies").includes(competency.id)}
                          onCheckedChange={(checked) => {
                            const currentCompetencies = form.watch("competencies")
                            if (checked) {
                              form.setValue("competencies", [...currentCompetencies, competency.id])
                            } else {
                              form.setValue(
                                "competencies",
                                currentCompetencies.filter((id) => id !== competency.id),
                              )
                            }
                          }}
                        />
                        <Label
                          htmlFor={competency.id}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                        >
                          {competency.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                  {form.formState.errors.competencies && (
                    <p className="text-sm text-red-500 mt-2">{form.formState.errors.competencies.message}</p>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button type="button" variant="outline" onClick={prevTab}>
                  Previous
                </Button>
                <Button type="button" onClick={nextTab} className="bg-emerald-600 hover:bg-emerald-700">
                  Next
                </Button>
              </CardFooter>
            </TabsContent>

            <TabsContent value="checklist" className="p-0">
              <CardContent className="space-y-6 pt-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Document Checklist</h3>
                    <p className="text-sm text-muted-foreground mb-6">
                      Please review and agree to the following before submission:
                    </p>

                    <div className="space-y-4">
                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="codeOfConduct"
                          checked={form.watch("codeOfConduct")}
                          onCheckedChange={(checked) => {
                            form.setValue("codeOfConduct", checked as boolean)
                          }}
                        />
                        <div className="space-y-1">
                          <Label
                            htmlFor="codeOfConduct"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                          >
                            Code of Conduct
                          </Label>
                          <p className="text-xs text-muted-foreground">
                            I agree to abide by the professional Code of Conduct for real estate professionals.
                          </p>
                        </div>
                      </div>
                      {form.formState.errors.codeOfConduct && (
                        <p className="text-sm text-red-500">{form.formState.errors.codeOfConduct.message}</p>
                      )}

                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="codeOfEthics"
                          checked={form.watch("codeOfEthics")}
                          onCheckedChange={(checked) => {
                            form.setValue("codeOfEthics", checked as boolean)
                          }}
                        />
                        <div className="space-y-1">
                          <Label
                            htmlFor="codeOfEthics"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                          >
                            Code of Ethics
                          </Label>
                          <p className="text-xs text-muted-foreground">
                            I agree to uphold the ethical standards required in the real estate profession.
                          </p>
                        </div>
                      </div>
                      {form.formState.errors.codeOfEthics && (
                        <p className="text-sm text-red-500">{form.formState.errors.codeOfEthics.message}</p>
                      )}

                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="termsAndConditions"
                          checked={form.watch("termsAndConditions")}
                          onCheckedChange={(checked) => {
                            form.setValue("termsAndConditions", checked as boolean)
                          }}
                        />
                        <div className="space-y-1">
                          <Label
                            htmlFor="termsAndConditions"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                          >
                            Terms and Conditions
                          </Label>
                          <p className="text-xs text-muted-foreground">
                            I have read and agree to the Terms and Conditions of registration.
                          </p>
                        </div>
                      </div>
                      {form.formState.errors.termsAndConditions && (
                        <p className="text-sm text-red-500">{form.formState.errors.termsAndConditions.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="text-lg font-medium mb-4">Payment Information</h3>
                    <div className="bg-emerald-50 p-6 rounded-lg border border-emerald-100">
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <p className="font-medium">Registration Fee</p>
                          <p className="text-sm text-muted-foreground">One-time payment</p>
                        </div>
                        <p className="text-xl font-bold">₹4,999</p>
                      </div>
                      <div className="bg-white p-4 rounded-md border border-gray-200 mb-4">
                        <div className="flex items-center space-x-2">
                          <CreditCard className="h-5 w-5 text-emerald-600" />
                          <p className="text-sm font-medium">Payment will be processed via Razorpay</p>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mb-4">
                        By clicking "Pay & Submit", you agree to make a payment of ₹4,999 as a registration fee. This
                        amount is non-refundable once the registration is complete.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button type="button" variant="outline" onClick={prevTab}>
                  Previous
                </Button>
                <Button
                  type="button"
                  onClick={processPayment}
                  className="bg-emerald-600 hover:bg-emerald-700"
                  disabled={paymentProcessing}
                >
                  {paymentProcessing ? "Processing..." : "Pay & Submit"}
                </Button>
              </CardFooter>
            </TabsContent>
          </form>
        </Tabs>
      </Card>
    </div>
  )
}
