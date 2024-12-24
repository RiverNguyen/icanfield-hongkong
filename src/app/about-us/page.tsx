import dynamic from 'next/dynamic'
const IndexMap = dynamic(() => import('@/sections/about-us/map/IndexMap'), {
  ssr: false,
})
const AboutUs = () => {
  return (
    <>
      <IndexMap />
      <div className='h-screen w-full'>AboutUs</div>
    </>
  )
}

export default AboutUs
