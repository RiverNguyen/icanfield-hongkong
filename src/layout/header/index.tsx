import React from 'react'
import ImageV2 from '@/components/image/ImageV2'
const Header = () => {
  return <header>
    <div className='header-top section-container bg-[linear-gradient(118deg,#2E1506_69.75%,#95502F_142.7%,#F5C178_182.76%)] flex items-center justify-between'>
      <div>
        <ImageV2 src='/icons' alt='logo' width={100} height={100} />
      </div>
      <div></div>
    </div>
    <div className='header-bottom'>
      bottom
    </div>
  </header>
}

export default Header
