import Footer from '@/components/shared/Footer'
import Navbar from '@/components/shared/Navbar'
import { UserContextProvider } from '@/context/UserContext'
import { getSession } from '@/lib/actions/session'
import React, { ReactNode } from 'react'

const layout = async ({children}: {children: ReactNode}) => {
  const session = await getSession()

  return (
    <div className='relative'>
      <UserContextProvider initialUser={session.user}>
        <Navbar />
        {children}
        <Footer />
      </UserContextProvider>
    </div>
  )
}

export default layout