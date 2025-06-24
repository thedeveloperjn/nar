"use client"

import type React from "react"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

interface PersonalDetailsProps {
  formData: any
  updateFormData: (data: any) => void
}

export function PersonalDetails({ formData, updateFormData }: PersonalDetailsProps) {
  const [date, setDate] = useState<Date | undefined>(formData.dateOfBirth ? new Date(formData.dateOfBirth) : undefined)

  const handleDateChange = (date: Date | undefined) => {
    setDate(date)
    if (date) {
      updateFormData({ dateOfBirth: date.toISOString() })
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    updateFormData({ [name]: value })
  }

  const handleSelectChange = (name: string, value: string) => {
    updateFormData({ [name]: value })
  }

  // Sample data for dropdowns
  const cities = [
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Hyderabad",
    "Chennai",
    "Kolkata",
    "Pune",
    "Ahmedabad",
    "Jaipur",
    "Lucknow",
  ]

  const countries = [
    "India",
    "United States",
    "United Kingdom",
    "Canada",
    "Australia",
    "Singapore",
    "UAE",
    "Malaysia",
    "Germany",
    "France",
  ]

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Personal Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter your full name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email address"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="primaryContact">Primary Contact No.</Label>
          <Input
            id="primaryContact"
            name="primaryContact"
            value={formData.primaryContact}
            onChange={handleInputChange}
            placeholder="Enter your primary contact number"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="secondaryContact">Secondary Contact No.</Label>
          <Input
            id="secondaryContact"
            name="secondaryContact"
            value={formData.secondaryContact}
            onChange={handleInputChange}
            placeholder="Enter your secondary contact number"
          />
        </div>

       

        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Select value={formData.city} onValueChange={(value) => handleSelectChange("city", value)}>
            <SelectTrigger id="city">
              <SelectValue placeholder="Select city" />
            </SelectTrigger>
            <SelectContent>
              {cities.map((city) => (
                <SelectItem key={city} value={city.toLowerCase()}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        

        <div className="space-y-2">
          <Label htmlFor="gender">Gender</Label>
          <Select value={formData.gender} onValueChange={(value) => handleSelectChange("gender", value)}>
            <SelectTrigger id="gender">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="dateOfBirth">Date of Birth</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={date} onSelect={handleDateChange} initialFocus />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label htmlFor="bloodGroup">Blood Group</Label>
          <Select value={formData.bloodGroup} onValueChange={(value) => handleSelectChange("bloodGroup", value)}>
            <SelectTrigger id="bloodGroup">
              <SelectValue placeholder="Select blood group" />
            </SelectTrigger>
            <SelectContent>
              {bloodGroups.map((group) => (
                <SelectItem key={group} value={group}>
                  {group}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Textarea
          id="address"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          placeholder="Enter your full address"
          className="min-h-[100px]"
        />
      </div>
    </div>
  )
}
