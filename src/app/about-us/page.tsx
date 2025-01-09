import fetchDataACF from "@/fetch/fetchDataACF"
import IndexAboutUs from "@/pages/about-us/IndexAboutUs"

const  page = async () => {
  const [dataAcf] = await Promise.all([
    fetchDataACF({
      api: '/pages/101?acf_format=standard',
      option: {
        revalidate: 10,
      },
    }),
  ])
  return <IndexAboutUs dataAcf={dataAcf?.acf} />
}

export default page
