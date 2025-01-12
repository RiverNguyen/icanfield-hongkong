'use client'
import 'leaflet/dist/leaflet.css'
import './style.css'
import {useState} from 'react'
import customGeoJson from './canada.geo.json'
import {canadianCities} from './constants'
import {FeatureCollection} from 'geojson'
import {LeafletMapPrograms} from '@/components/LeafletMapProgram'
import ImageV2 from '@/components/image/ImageV2'
import PopupCountry from '@/sections/immigration/map/PopupCountry'
import {ICountry} from '@/components/LeafletMap'

const CanadaMap = () => {
  const [openPopup, setOpenPopup] = useState(false)
  const [countrySelected, setCountrySelected] = useState<string | null>(null)
  const handleClickCountry = (country: ICountry) => {
    setCountrySelected(country.label ? country.label : country.name)
    setOpenPopup(true)
  }
  return (
    <section className='relative bg-background'>
      <div className='flex space-x-[6.69rem] pt-[4rem] section-container xsm:flex-col-reverse xsm:space-x-0'>
        <div className='w-[41.5rem] xsm:mt-[2.56rem] xsm:w-full'>
          <span className='mb-[0.38rem] text-[1rem] font-semibold uppercase leading-[1.5] text-greyscaletext-body opacity-70 xsm:text-[0.75rem] xsm:font-medium'>
            TẠI SAO NÊN CHỌN CANADA?
          </span>
          <h2 className='mb-[1.5rem] font-optima text-[3rem] font-semibold leading-[1.2] tracking-[-0.06rem] text-Phase-1-Brown xsm:text-[1.5rem] xsm:tracking-[-0.045rem]'>
            Canada luôn là lựa chọn hàng đầu của người định cư
          </h2>
          <p className='text-[1rem] leading-[1.55] text-greyscaletext-body xsm:text-[0.875rem]'>
            Canada – quốc gia lớn thứ hai thế giới, nổi tiếng với nền kinh tế
            phát triển, xã hội văn minh và là điểm đến mơ ước cho hàng triệu
            người trên thế giới.
          </p>
          <div className='mt-[1.5rem] flex flex-col space-y-[1.5rem] xsm:space-y-3'>
            <div className='flex items-center space-x-4'>
              <div className='flex w-fit items-center justify-center rounded-[0.75rem] bg-[rgba(117,117,117,0.08)] p-[1.25rem] xsm:p-4'>
                <ImageV2
                  src={'/icons/immigration/map-section/star.svg'}
                  alt='map'
                  width={50}
                  height={50}
                  className='size-[1.45831rem] object-contain'
                />
              </div>
              <div className='flex flex-col'>
                <span className='text-[1.125rem] font-semibold leading-[1.5] text-[#767676] xsm:text-[0.875rem]'>
                  Thủ đô
                </span>
                <span className='text-[1.5rem] font-bold leading-[1.33] text-Phase-1-Brown xsm:text-[1rem]'>
                  Ottawa
                </span>
              </div>
            </div>
            <div className='flex items-center space-x-4'>
              <div className='flex w-fit items-center justify-center rounded-[0.75rem] bg-[rgba(117,117,117,0.08)] p-[1.25rem] xsm:p-4'>
                <ImageV2
                  src={'/icons/immigration/map-section/map.svg'}
                  alt='map'
                  width={50}
                  height={50}
                  className='size-[1.45831rem] object-contain'
                />
              </div>
              <div className='flex flex-col'>
                <span className='text-[1.125rem] font-semibold leading-[1.5] text-[#767676] xsm:text-[0.875rem]'>
                  Diện tích
                </span>
                <span className='text-[1.5rem] font-bold leading-[1.33] text-Phase-1-Brown xsm:text-[1rem]'>
                  9.98 triệu km²
                </span>
              </div>
            </div>
            <div className='flex items-center space-x-4'>
              <div className='flex w-fit items-center justify-center rounded-[0.75rem] bg-[rgba(117,117,117,0.08)] p-[1.25rem] xsm:p-4'>
                <ImageV2
                  src={'/icons/immigration/map-section/human.svg'}
                  alt='map'
                  width={50}
                  height={50}
                  className='size-[1.45831rem] object-contain'
                />
              </div>
              <div className='flex flex-col'>
                <span className='text-[1.125rem] font-semibold leading-[1.5] text-[#767676] xsm:text-[0.875rem]'>
                  Dân số
                </span>
                <span className='text-[1.5rem] font-bold leading-[1.33] text-Phase-1-Brown xsm:text-[1rem]'>
                  38 triệu người
                </span>
              </div>
            </div>
            <div className='flex items-center space-x-4'>
              <div className='flex w-fit items-center justify-center rounded-[0.75rem] bg-[rgba(117,117,117,0.08)] p-[1.25rem] xsm:p-4'>
                <ImageV2
                  src={'/icons/immigration/map-section/lang.svg'}
                  alt='map'
                  width={50}
                  height={50}
                  className='size-[1.45831rem] object-contain'
                />
              </div>
              <div className='flex flex-col'>
                <span className='text-[1.125rem] font-semibold leading-[1.5] text-[#767676] xsm:text-[0.875rem]'>
                  Ngôn ngữ chính
                </span>
                <span className='text-[1.5rem] font-bold leading-[1.33] text-Phase-1-Brown xsm:text-[1rem]'>
                  Tiếng Anh, tiếng Pháp
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className='relative h-[36.25rem] w-[27.86819rem] xsm:h-[22.125rem] xsm:w-full xsm:bg-white'>
          <LeafletMapPrograms
            countries={canadianCities}
            mapJson={customGeoJson as FeatureCollection}
            className='!absolute !z-[1] !h-full !w-full !overflow-hidden !bg-transparent'
            borderCountries='#7F7C6E'
            zoomDesktop={2.9}
            onClick={handleClickCountry}
            zoomMobile={2}
            isZoomClick={true}
            center={[70.2823, -96.0768]}
            centerMobile={[70.2823, -96.0768]}
            fillColor='#DED6D2'
          />
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
        />
      </div>
    </section>
  )
}
export default CanadaMap
