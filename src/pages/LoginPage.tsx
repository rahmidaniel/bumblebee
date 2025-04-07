import type React from 'react'
import { useState } from 'react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/ui/card'
import { AlertCircle, BeakerIcon as Bee } from 'lucide-react'
import { Alert, AlertDescription } from '../components/ui/alert'
import { apiService } from '@/services/apiService.ts'

interface LoginPageProps {
  onLogin: () => void
}

const LoginPage = ({ onLogin }: LoginPageProps) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const loginSuccess = await apiService.login({ username, password })

      if (loginSuccess) {
        onLogin()
      } else {
        setError('Invalid username or password.')
      }
    } catch (err) {
      console.error(err)
      setError('Invalid username or password.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-dvh items-center justify-center bg-amber-50 p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <div className="flex items-center gap-2 text-amber-600">
            <Bee size={40} />
            <h1 className="text-3xl font-bold">Honey Shop</h1>
          </div>
        </div>

        <Card className="border-amber-200 bg-white shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-amber-800">
              Welcome back
            </CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="size-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="border-amber-200 focus:border-amber-400 focus:ring-amber-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border-amber-200 focus:border-amber-400 focus:ring-amber-400"
                />
              </div>
            </form>
          </CardContent>

          <CardFooter>
            <Button
              type="submit"
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full bg-amber-500 hover:bg-amber-600"
            >
              {isLoading ? 'Logging in...' : 'Belépés'}
            </Button>
          </CardFooter>
        </Card>

        <div className="mt-4 text-center text-sm text-amber-700">
          <p>Demo credentials: username: test1, password: test-pass</p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
