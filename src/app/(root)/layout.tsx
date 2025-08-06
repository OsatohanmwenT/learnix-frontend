import Footer from '@/components/shared/Footer'
import Navbar from '@/components/shared/Navbar'
import { UserContextProvider } from '@/context/UserContext'
import { getAccessTokenWithRefresh, getSession } from '@/lib/actions/session'
import React, { ReactNode } from 'react'

const layout = async ({children}: {children: ReactNode}) => {
  const session = await getSession()
  console.log("Layout Access Token:", session.user)

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