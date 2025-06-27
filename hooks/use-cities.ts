import { useState, useEffect } from "react"

export const useCities = () => {
  const [cities, setCities] = useState<{id: string, name: string}[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch('https://narindia-api.vercel.app/api/v1/cityinassociation/all')
        if (!response.ok) {
          throw new Error('Failed to fetch cities')
        }
        const data = await response.json()
        setCities(data.data || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setIsLoading(false)
      }
    }

    fetchCities()
  }, [])

  return { cities, isLoading, error }
}