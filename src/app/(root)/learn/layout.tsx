import SideNavbar from '@/components/shared/SideNavbar'
import React from 'react'

const layout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className='flex relative bg-[#f7f8fa] h-screen'>
        <SideNavbar />
        <main className="w-full pt-17 h-screen overflow-y-auto">
        {children}
      </main>
    </div>
  )
}

export default layout