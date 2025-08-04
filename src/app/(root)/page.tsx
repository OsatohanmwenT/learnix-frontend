import FeaturedSection from '@/components/landing/FeaturedSection'
import HeroSection from '@/components/landing/HeroSection'
import NewCoursesSection from '@/components/landing/NewCoursesSection'
import WhySection from '@/components/landing/WhySection'

import React from 'react'

const page = () => {
  return (
    <div>
        <HeroSection />
        <FeaturedSection />
        <WhySection />
        <NewCoursesSection />
    </div>
  )
}

export default page