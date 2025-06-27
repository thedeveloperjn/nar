"use client"

import { useState, useCallback, useEffect } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { format, parse, isValid } from "date-fns"
import { CalendarIcon } from "lucide-react"
import CustomDatepicker from "../ui/custom-datepicker"
import React from "react";

interface PersonalDetailsProps {
  formData: any
  updateFormData: (data: any) => void
}

interface City {
  _id: string
  city_name: string
  city_status: string
}

export function PersonalDetails({ formData, updateFormData }: PersonalDetailsProps) {
  const [date, setDate] = useState<Date | undefined>(formData.dob ? new Date(formData.dob) : undefined)
  const [dateInput, setDateInput] = useState<string>(formData.dob ? format(new Date(formData.dob), "yyyy-MM-dd") : "")
  const [showCalendar, setShowCalendar] = useState(false)
  const [cities, setCities] = useState<City[]>([])
  const [isLoadingCities, setIsLoadingCities] = useState(true)
  const [citiesError, setCitiesError] = useState<string | null>(null)

  // Fetch cities from API
  const fetchCities = useCallback(async () => {
    try {
      const response = await fetch('https://narindia-api.vercel.app/api/v1/cityinassociation/all')
      if (!response.ok) {
        throw new Error('Failed to fetch cities')
      }
      const data = await response.json()
      if (data.status && data.city) {
        setCities(data.city.filter((city: City) => city.city_status === 'Active'))
      }
    } catch (err) {
      setCitiesError(err instanceof Error ? err.message : 'Failed to load cities')
    } finally {
      setIsLoadingCities(false)
    }
  }, [])

  useEffect(() => {
    fetchCities()
  }, [fetchCities])

  const handleDateChange = useCallback((date: Date | undefined) => {
    setDate(date)
    if (date) {
      const formattedDate = format(date, "yyyy-MM-dd")
      setDateInput(formattedDate)
      updateFormData({ dob: date.toISOString() })
    }
  }, [updateFormData])

  const handleDateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric
    if (value.length > 8) value = value.slice(0, 8);

    // Extract year, month, day
    let year = value.slice(0, 4);
    let month = value.slice(4, 6);
    let day = value.slice(6, 8);

    // Clamp month
    if (month) {
      let mm = parseInt(month, 10);
      if (mm > 12) mm = 12;
      month = mm.toString().padStart(2, '0');
    }

    // Clamp day
    if (year && month && day) {
      let yyyy = parseInt(year, 10);
      let mm = parseInt(month, 10);
      let dd = parseInt(day, 10);
      // Get max day for month/year
      let maxDay = 31;
      if (mm > 0 && yyyy > 0) {
        maxDay = new Date(yyyy, mm, 0).getDate();
      }
      if (dd > maxDay) dd = maxDay;
      day = dd.toString().padStart(2, '0');
    }

    // Rebuild value with dashes
    let formatted = year;
    if (month) formatted += '-' + month;
    if (day) formatted += '-' + day;
    setDateInput(formatted);

    if (formatted.length === 10) { // When full date is entered (yyyy-MM-dd)
      try {
        const parsedDate = parse(formatted, "yyyy-MM-dd", new Date());
        if (isValid(parsedDate)) {
          setDate(parsedDate);
          updateFormData({ dob: parsedDate.toISOString() });
        }
      } catch (err) {
        console.error("Invalid date format");
      }
    }
  }

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    updateFormData({ [name]: value })
  }, [updateFormData])

  const handleSelectChange = useCallback((name: string, value: string) => {
    console.log('City select value:', value);
    // Always set 'OTHER' (all caps) if user selects the 'OTHER' option
    if (name === 'city' && (value === 'other' || value === 'OTHER')) {
      updateFormData({ city: 'OTHER' })
    } else {
      updateFormData({ [name]: value })
    }
    // Clear otherCity if not selecting 'OTHER'
    if (name === 'city' && value !== 'other' && value !== 'OTHER') {
      updateFormData({ otherCity: '' })
    }
  }, [updateFormData])

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]

  // Sync date input when formData changes externally
  useEffect(() => {
    if (formData.dob) {
      const formattedDate = format(new Date(formData.dob), "yyyy-MM-dd")
      setDateInput(formattedDate)
    }
  }, [formData.dob])

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Personal Details</h2>

      {citiesError && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-800">{citiesError}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="name">Name *</Label>
          <Input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter your full name"
            required
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email_id">Email *</Label>
          <Input
            id="email_id"
            name="email_id"
            type="email"
            value={formData.email_id}
            onChange={handleInputChange}
            placeholder="Enter your email address"
            required
          />
        </div>

        {/* Primary Contact */}
        <div className="space-y-2">
          <Label htmlFor="primary_contact_no">Primary Contact No. *</Label>
          <Input
            id="primary_contact_no"
            name="primary_contact_no"
            value={formData.primary_contact_no}
            onChange={handleInputChange}
            placeholder="Enter your primary contact number"
            required
          />
        </div>

        {/* Secondary Contact */}
        <div className="space-y-2">
          <Label htmlFor="secondaryContact">Secondary Contact No.</Label>
          <Input
            id="secondary_contact_no"
            name="secondary_contact_no"
            value={formData.secondary_contact_no}
            onChange={handleInputChange}
            placeholder="Enter your secondary contact number"
          />
        </div>

        {/* City */}
        <div className="space-y-2 md:col-span-1">
          <Label htmlFor="city">City *</Label>
          <Select 
            value={formData.city} 
            onValueChange={(value) => handleSelectChange("city", value)}
            disabled={isLoadingCities}
          >
            <SelectTrigger id="city">
              <SelectValue placeholder={isLoadingCities ? "Loading cities..." : "Select city"} />
            </SelectTrigger>
            <SelectContent>
              {cities.map((city) => (
                <SelectItem key={city._id} value={city._id}>
                  {city.city_name}
                </SelectItem>
              ))}
              <SelectItem value="OTHER">OTHER</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Other City (conditionally rendered) */}
        {formData.city === "OTHER" && (
          <div className="space-y-2 md:col-span-1">
            <Label htmlFor="otherCity">Other City</Label>
            <Input
              id="otherCity"
              name="otherCity"
              value={formData.otherCity}
              onChange={handleInputChange}
              placeholder="Enter your city name"
            />
          </div>
        )}

        {/* Country (always after City/Other City) */}
        <div className="space-y-2 md:col-span-1">
          <Label htmlFor="country">Country *</Label>
          <Input
            id="country"
            name="country"
            type="text"
            value={formData.country}
            onChange={handleInputChange}
            placeholder="Enter your country"
            required
          />
        </div>

        {/* Gender */}
        <div className="space-y-2 md:col-span-1">
          <Label htmlFor="gender">Gender *</Label>
          <Select value={formData.gender} onValueChange={(value) => handleSelectChange("gender", value)}>
            <SelectTrigger id="gender">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Date of Birth - Using CustomDatepicker */}
        <div className="space-y-2 md:col-span-1">
          <Label htmlFor="dob">Date of Birth *</Label>
          <CustomDatepicker
            selectedDate={date}
            onChange={(date) => {
              setDate(date);
              setDateInput(date ? format(date, "yyyy-MM-dd") : "");
              updateFormData({ dob: date ? date.toISOString() : "" });
            }}
            label={undefined}
            placeholder="Select date"
            minYear={1900}
            maxYear={new Date().getFullYear()}
          />
        </div>

        {/* Blood Group */}
        <div className="space-y-2 md:col-span-1">
          <Label htmlFor="bloodGroup">Blood Group</Label>
          <Select value={formData.blood_group} onValueChange={(value) => handleSelectChange("blood_group", value)}>
            <SelectTrigger id="blood_group">
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

      {/* Address */}
      <div className="space-y-2">
        <Label htmlFor="address">Address *</Label>
        <Textarea
          id="address"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          placeholder="Enter your full address"
          className="min-h-[100px]"
          required
        />
      </div>
    </div>
  )
}