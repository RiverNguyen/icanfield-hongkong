'use client'
// STYLE
import 'leaflet/dist/leaflet.css'
import './style.css'

// GEO JSON
import {ICountry, LeafletMap} from '@/components/LeafletMap'
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
    console.log(customGeoJson)
  }, [open])
  const handleClickMarker = (country: ICountry) => {
    setCountrySelected(country.name)
    setOpen(true)
    console.log(country)
  }
  return (
    <div className=''>
      <div
        id='map_container'
        className='relative z-10 flex w-fit items-center xsm:w-full'
      >
        <LeafletMap
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
    </div>
  )
}

export default IndexMap
