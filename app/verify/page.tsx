'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Button } from "@/components/ui/button"
import Link from 'next/link'

export default function VerifyEmail() {
  const [verificationStatus, setVerificationStatus] = useState<'verifying' | 'success' | 'error'>('verifying')
  const router = useRouter()
  const searchParams = useSearchParams()
  
  useEffect(() => {
    const token = searchParams?.get('token')
    const type = searchParams?.get('type')
    
    if (token && type === 'email') {
      verifyEmail(token)
    } else {
      setVerificationStatus('error')
    }
  }, [searchParams])

  const verifyEmail = async (token: string) => {
    try {
      const { error } = await supabase.auth.verifyOtp({
        token_hash: token,
        type: 'email',
      })

      if (error) {
        throw error
      }

      setVerificationStatus('success')
      // Redirect to login after 3 seconds
      setTimeout(() => {
        router.push('/login')
      }, 3000)
    } catch (error) {
      console.error('Error verifying email:', error)
      setVerificationStatus('error')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full p-6 text-center">
        {verificationStatus === 'verifying' && (
          <div>
            <h1 className="text-2xl font-bold mb-4">Verifying your email...</h1>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          </div>
        )}
        
        {verificationStatus === 'success' && (
          <div>
            <h1 className="text-2xl font-bold mb-4 text-green-600">Email Verified!</h1>
            <p className="mb-4">Your email has been successfully verified. Redirecting to login...</p>
            <Button asChild>
              <Link href="/login">Go to Login</Link>
            </Button>
          </div>
        )}
        
        {verificationStatus === 'error' && (
          <div>
            <h1 className="text-2xl font-bold mb-4 text-red-600">Verification Failed</h1>
            <p className="mb-4">There was an error verifying your email. Please try again or contact support.</p>
            <Button asChild>
              <Link href="/login">Return to Login</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

