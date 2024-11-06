import Image from 'next/image'
import { Button } from '../_components/ui/button'
import { LogInIcon } from 'lucide-react'
import { SignInButton } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

const LoginPage = () => {
  const { userId } = auth()
  if (userId) {
    redirect('/')
  }

  return (
    <div className="grid grid-cols-2 h-full">
      <div className="mx-auto flex flex-col h-full justify-center p-12 max-w-[550]">
        <Image
          src="/logo.svg"
          width={173}
          height={39}
          alt="Logo"
          className="mb-8"
        />
        <h1 className="text-4xl font-bold mb-3">Bem-vindo</h1>
        <p className="text-muted-foreground mb-8">
          A Finance AI é uma plataforma de gestão financeira que utiliza IA para
          monitorar suas movimentações, e oferecer insights personalizados,
          facilitando o controle do seu orçamento.
        </p>
        <SignInButton>
          <Button variant={'outline'}>
            <LogInIcon className="mr-2" />
            Fazer Login ou criar conta
          </Button>
        </SignInButton>
      </div>
      <div className="relative h-full v-full">
        <Image
          src="/login.png"
          alt="Faça Login"
          fill
          className="object-cover"
        />
      </div>
    </div>
  )
}

export default LoginPage
