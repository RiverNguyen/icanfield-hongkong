'use client'
import 'leaflet/dist/leaflet.css'
import './style.css'
import {useState, useEffect} from 'react'
import customGeoJson from './canada.geo.json'
import customGeoJsonAmerica from '@/sections/EB5/pioneering-values/usa.geo.json'
import customGeoJsonAstralia from './australian.geo.json'
import customGeoJsonEurope from './eu.geo.json'
import customGeoJsonCaribe from './caribe.geo.json'
import {FeatureCollection} from 'geojson'
import {LeafletMapPrograms} from '@/components/LeafletMapProgram'
import ImageV2 from '@/components/image/ImageV2'
import PopupCountry from '@/sections/immigration/map/PopupCountry'
import {ICountry} from '@/components/LeafletMap'
import {ImageHeader} from '@/types/dataHeader.interface'
export interface Data {
  sub_title: string
  title: string
  description: string
  information: InfomationItem[]
  province_info: ProvinceInfoItem[][]
}
export interface InfomationItem {
  icon: ImageHeader
  title: string
  label: string
}
export interface ProvinceInfoItem {
  name: string
  label: string
  details: DetailItem
}
export interface DetailItem {
  gallery_image: ImageHeader[]
  description: string
  metropolis: string
  population: string
  acreage: string
  link: string
}
const CanadaMap = ({data, slug}: {data: Data; slug: string}) => {
  // State lưu trữ GeoJSON data
  const [dataGeoJson, setDataGeoJson] = useState<FeatureCollection | null>(null)
  const [center, setCenter] = useState<[number, number]>([0, 0])
  const [zoom, setZoom] = useState(2.9)
  const [zoomMobile, setZoomMobile] = useState(2)
  const [openPopup, setOpenPopup] = useState(false)
  const [countrySelected, setCountrySelected] = useState<string | null>(null)
  const [dataProvince, setDataProvince] = useState<ProvinceInfoItem | null>(
    null,
  )
  const handleClickCountry = (country: ICountry) => {
    setCountrySelected(country.label ? country.label : country.name)
    const province = data.province_info.find(
      (item) => item[0].name === country.name,
    )
    if (province) {
      setDataProvince(province[0])
    }
    setOpenPopup(true)
  }

  // Load GeoJSON data dựa vào slug
  useEffect(() => {
    switch (slug) {
      case 'canada':
        setDataGeoJson(customGeoJson as FeatureCollection)
        setCenter([73.1304, -90.3468]) // Canada
        setZoom(2.7)
        setZoomMobile(2.5)
        break
      case 'america':
        setDataGeoJson(customGeoJsonAmerica as FeatureCollection)
        setCenter([37.0902, -95.7129]) // America
        setZoom(3.5)
        setZoomMobile(3)
        break
      case 'australia':
        setDataGeoJson(customGeoJsonAstralia as FeatureCollection)
        setCenter([-25.2744, 133.7751]) // Australia
        setZoom(3.5)
        setZoomMobile(3)
        break
      case 'europe':
        setDataGeoJson(customGeoJsonEurope as FeatureCollection)
        setCenter([54.526, 15.2551]) // Europe
        setZoom(4)
        setZoomMobile(3)
        break
      case 'caribe':
        setDataGeoJson(customGeoJsonCaribe as FeatureCollection)
        setCenter([18.2208, -66.5901]) // Caribbean
        setZoom(5.3)
        setZoomMobile(3.5)
        break
      default:
        setDataGeoJson(null)
        setCenter([0, 0])
        setZoom(2.9)
        setZoomMobile(2)
        break
    }
  }, [slug])

  return (
    <section className='relative bg-background'>
      <div className='flex space-x-[6.69rem] pt-[4rem] section-container xsm:flex-col-reverse xsm:space-x-0'>
        <div className='w-[41.5rem] xsm:mt-[2.56rem] xsm:w-full'>
          <span className='mb-[0.38rem] text-[1rem] font-semibold uppercase leading-[1.5] text-greyscaletext-body opacity-70 xsm:text-[0.75rem] xsm:font-medium'>
            {data.sub_title}
          </span>
          <h2 className='mb-[1.5rem] font-optima text-[3rem] font-semibold leading-[1.2] tracking-[-0.06rem] text-Phase-1-Brown xsm:text-[1.5rem] xsm:tracking-[-0.045rem]'>
            {data.title}
          </h2>
          <p className='text-[1rem] leading-[1.55] text-greyscaletext-body xsm:text-[0.875rem]'>
            {data.description}
          </p>
          <div className='mt-[1.5rem] flex flex-col space-y-[1.5rem] xsm:space-y-3'>
            {data.information &&
              data.information?.map((item, index) => (
                <div
                  className='flex items-center space-x-4'
                  key={index}
                >
                  <div className='flex w-fit items-center justify-center rounded-[0.75rem] bg-[rgba(117,117,117,0.08)] p-[1.25rem] xsm:p-4'>
                    <ImageV2
                      src={item.icon.url}
                      alt={'icon'}
                      width={50}
                      height={50}
                      className='size-[1.45831rem] object-contain'
                    />
                  </div>
                  <div className='flex flex-col'>
                    <span className='text-[1.125rem] font-semibold leading-[1.5] text-[#767676] xsm:text-[0.875rem]'>
                      {item.label}
                    </span>
                    <span className='text-[1.5rem] font-bold leading-[1.33] text-Phase-1-Brown xsm:text-[1rem]'>
                      {item.title}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className='relative h-[36.25rem] w-[27.86819rem] xsm:h-[22.125rem] xsm:w-full xsm:bg-white'>
          {data.province_info && dataGeoJson && (
            <LeafletMapPrograms
              countries={data.province_info}
              mapJson={dataGeoJson}
              className='!absolute !z-[1] !h-full !w-full !overflow-hidden !bg-transparent'
              borderCountries='#D7B57899'
              zoomDesktop={zoom}
              onClick={handleClickCountry}
              zoomMobile={zoomMobile}
              isZoomClick={true}
              center={center}
              centerMobile={center}
              fillColor='#DED6D2'
            />
          )}
        </div>
      </div>
      <div
        className={`fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50 ${openPopup ? 'block' : 'hidden'}`}
      >
        <div
          className='absolute left-0 top-0 z-0 h-full w-full'
          onClick={() => {
            setOpenPopup(false)
          }}
        ></div>
        <PopupCountry
          open={openPopup}
          setOpen={setOpenPopup}
          countrySelected={countrySelected}
          dataProvince={dataProvince as ProvinceInfoItem}
        />
      </div>
    </section>
  )
}
export default CanadaMap
