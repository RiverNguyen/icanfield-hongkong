'use client'
// STYLE
import './style.css'

// GEO JSON
import ImageV2 from '@/components/image/ImageV2'
import {ICountry, LeafletMap} from '@/components/LeafletMap'
import ChevronRight from '@/components/svg/ChevronRight'
import {cn} from '@/lib/utils'
import customGeoJson from '@/sections/aboutus/office-map/custom.geo.json'
import PopupMarker from '@/sections/aboutus/office-map/PopupMarker'
import {FeatureCollection} from 'geojson'
import {useEffect, useState} from 'react'

interface IIndexMapProps {
  countries: ICountry[][]
}

const IndexMap = ({countries}: IIndexMapProps) => {
  const [open, setOpen] = useState(false)
  const [countrySelected, setCountrySelected] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (open) {
        document.body.classList.add('no-scroll')
      } else {
        document.body.classList.remove('no-scroll')
      }
    }
  }, [open])
  const handleClickMarker = (country: ICountry) => {
    setCountrySelected(country.label ? country.label : country.name)
    setOpen(true)
  }
  return (
    <div className=''>
      <div
        id='map_container'
        className='relative z-10 flex w-fit items-center xsm:w-full'
      >
        <LeafletMap
          className='!h-[32.68438rem] !w-[49.6875rem] xsm:!h-[18.75rem] xsm:!w-full'
          countries={countries}
          mapJson={customGeoJson as FeatureCollection}
          onClick={handleClickMarker}
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
      />
      <div className='mt-4 grid grid-cols-2 gap-[0.5rem] sm:hidden'>
        {countries.map((country, index) => {
          let countryObj: ICountry = {
            name: country[0].name,
            label: country[0].label,
            flag: country[0].flag,
          }
          if (countries.length > 1) {
            const newPosition = country.find((item) => {
              if (item.label) return item
            })
            if (newPosition) {
              countryObj = {
                name: newPosition.name,
                label: newPosition.label,
                flag: newPosition.flag,
              }
            }
          }
          return (
            <MarkerButton
              onClick={() => handleClickMarker(countryObj)}
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
        <span className='body-14-s text-brown'>{label}</span>
      </div>
      <ChevronRight className='size-[1.5rem] text-tagtext' />
    </button>
  )
}
