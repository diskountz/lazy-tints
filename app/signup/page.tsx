'use client'

import { useState } from 'react'
import { signUp } from '../../utils/supabaseUtils'
import { useRouter } from 'next/navigation'
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { useToast } from "../../components/ui/use-toast"
import Link from 'next/link'
import { UserPlus, Mail } from 'lucide-react'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isEmailSent, setIsEmailSent] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const { error } = await signUp(email, password)
      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        })
      } else {
        setIsEmailSent(true)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isEmailSent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg text-center">
          <Mail className="mx-auto h-12 w-12 mb-4 text-blue-600" />
          <h1 className="text-2xl font-bold mb-4 text-gray-900">
            Check Your Email
          </h1>
          <p className="mb-4 text-gray-600">
            We've sent a verification link to <strong>{email}</strong>. Please check your email and click the link to verify your account.
          </p>
          <p className="text-sm mb-6 text-gray-500">
            Don't see the email? Check your spam folder.
          </p>
          <Button 
            asChild
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            <Link href="/login">Return to Login</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center mb-8">
          <Link 
            href="/" 
            className="text-3xl font-bold tracking-tight inline-block text-gray-900"
          >
            LazyTints
          </Link>
        </div>
        
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-900">
          Create Your Account
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-2 text-gray-700">
              Email
            </label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isSubmitting}
              className="w-full"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block mb-2 text-gray-700">
              Password
            </label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isSubmitting}
              className="w-full"
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-blue-600 text-white hover:bg-blue-700"
            disabled={isSubmitting}
          >
            <UserPlus className="mr-2 h-4 w-4" />
            {isSubmitting ? 'Creating Account...' : 'Create Account'}
          </Button>
        </form>
        
        <p className="mt-6 text-center text-gray-600">
          Already have an account?{' '}
          <Link 
            href="/login" 
            className="text-blue-600 hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}

