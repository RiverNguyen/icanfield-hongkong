'use client'
// STYLE
import './style.css'

// GEO JSON
import ImageV2 from '@/components/image/ImageV2'
import {ICountry} from '@/components/LeafletMap'
import ChevronRight from '@/components/svg/ChevronRight'
import {cn} from '@/lib/utils'
import {ItemMap} from '@/pages/about-us/IndexAboutUs'
import {LeafletMapV2} from '@/sections/aboutus/office-map-v2'
import customGeoJson from '@/sections/aboutus/office-map/custom.geo.json'
import PopupMarker from '@/sections/aboutus/office-map/PopupMarker'
// import {ItemOfficeData} from '@/sections/homepage/map-discover/dataMap.interface'
import {FeatureCollection} from 'geojson'
import {useEffect, useState} from 'react'

// interface IIndexMapProps {
//   countries: ICountry[][]
// }

const IndexMap = ({dataOffice}: {dataOffice: ItemMap[]}) => {
  const [open, setOpen] = useState(false)
  const [countrySelected, setCountrySelected] = useState<string | null>(null)
  const [flagSelected, setFlagSelected] = useState<string | null>(null)
  const [dataOfficeSelected, setDataOfficeSelected] = useState<ItemMap | null>(
    null,
  )
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (open) {
        document.body.classList.add('no-scroll')
      } else {
        document.body.classList.remove('no-scroll')
      }
    }
  }, [open])
  const handleClickMarker = (country: ItemMap) => {
    setCountrySelected(country.name ? country.name : country.name)
    setFlagSelected(country.flag || null)
    setOpen(true)
    setDataOfficeSelected(country)
  }
  // console.log(dataOffice)
  return (
    <div className=''>
      <div
        id='map_container'
        className='relative z-10 flex w-fit items-center xsm:w-full'
      >
        <LeafletMapV2
          className='!h-[32.68438rem] !w-[49.6875rem] xsm:!h-[18.75rem] xsm:!w-full'
          countries={dataOffice}
          mapJson={customGeoJson as FeatureCollection}
          onClick={handleClickMarker}
          zoomDesktop={4}
          isControlZoom={false}
        />
      </div>
      <div
        onClick={() => setOpen(false)}
        className={cn(
          'pointer-events-none fixed left-0 top-0 z-50 h-screen w-full bg-black/30 opacity-0 transition-all duration-200',
          open && 'pointer-events-auto opacity-100',
        )}
      ></div>
      <PopupMarker
        open={open}
        setOpen={setOpen}
        countrySelected={countrySelected}
        flagSelected={flagSelected}
        dataOfficeSelected={dataOfficeSelected as ItemMap}
      />
      <div className='mt-4 grid grid-cols-2 gap-[0.5rem] sm:hidden'>
        {dataOffice.map((country, index) => {
          let countryObj: ICountry = {
            name: country.name,
            label: country.name,
            flag: country.flag,
          }
          if (dataOffice.length > 1) {
            const newPosition = dataOffice.find(
              (item) => item.name === country.name,
            )
            if (newPosition) {
              countryObj = {
                name: newPosition.name,
                label: newPosition.name,
                flag: newPosition.flag,
              }
            }
          }
          return (
            <MarkerButton
              onClick={() => handleClickMarker(country)}
              key={index}
              {...countryObj}
            />
          )
        })}
      </div>
    </div>
  )
}

export default IndexMap

interface IMarkerButtonProps extends ICountry {
  onClick: () => void
}

function MarkerButton({onClick, name, label, flag}: IMarkerButtonProps) {
  return (
    <button
      className='flex items-center rounded-[0.5rem] bg-background p-[0.5rem_0.63rem]'
      onClick={onClick}
    >
      <span className='after:content relative block h-[2.25rem] w-[2.25rem] overflow-hidden rounded-full bg-black/10 p-[0.125rem] after:overflow-hidden'>
        {flag && (
          <ImageV2
            src={flag || ''}
            alt={name}
            width={48}
            height={48}
            className='h-full w-full rounded-full object-cover'
          />
        )}
      </span>
      <div className='ml-[0.63rem] mr-auto flex flex-col items-start'>
        <span className='text-[0.5rem] font-medium leading-[1.5] tracking-[-0.005rem] text-tagtext'>
          Văn phòng
        </span>
        <span className='text-brown text-[0.75rem] font-semibold'>{label}</span>
      </div>
      <ChevronRight className='size-[1.5rem] text-tagtext' />
    </button>
  )
}
