import { useState, useEffect } from 'react'
import { getRegistrations } from '../services/registrationService.js'

export function useRegistrations() {
  const [registrations, setRegistrations] = useState([])
  const [loading, setLoading]             = useState(true)

  useEffect(() => {
    getRegistrations().then(data => { setRegistrations(data); setLoading(false) })
  }, [])

  return { registrations, loading }
}
