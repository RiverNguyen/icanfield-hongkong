import dynamic from 'next/dynamic'
const IndexMap = dynamic(() => import('@/sections/about-us/map/IndexMap'), {
  ssr: false,
})
import IndexAboutUs from '@/pages/about-us/IndexAboutUs'

const page = () => {
  return (
    <>
      <IndexMap />
      <IndexAboutUs />
    </>
  )
}

export default page

