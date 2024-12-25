import dynamic from 'next/dynamic'
const IndexMap = dynamic(() => import('@/sections/about-us/map/IndexMap'), {
  ssr: false,
})
const IndexAboutUs = dynamic(
  () => import('@/pages/aboutUs'),
  {
    ssr: false,
  },
)

const page = () => {
  return (
    <>
      <IndexMap />
      <IndexAboutUs />
    </>
  )
}

export default page
