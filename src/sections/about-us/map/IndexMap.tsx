/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
// STYLE
import 'leaflet/dist/leaflet.css'
import './style.css'

// LIBRARY
import L from 'leaflet'
import {MapContainer, Marker, GeoJSON} from 'react-leaflet'

// TYPES
import {GeoJsonObject} from 'geojson'

// GEO JSON
import customGeoJson from '@/sections/about-us/map/custom.geo.json'
import {useEffect, useState} from 'react'
import {cn} from '@/lib/utils'
import PopupMarker from '@/sections/about-us/map/PopupMarker'

// INIT COUNTRY OF EU
const euCountries = new Set([
  'Austria',
  'Belgium',
  'Bulgaria',
  'Croatia',
  'Cyprus',
  'Czech Republic',
  'Denmark',
  'Estonia',
  'Finland',
  'France',
  'Germany',
  'Greece',
  'Hungary',
  'Ireland',
  'Italy',
  'Latvia',
  'Lithuania',
  'Luxembourg',
  'Malta',
  'Netherlands',
  'Poland',
  'Portugal',
  'Romania',
  'Slovakia',
  'Slovenia',
  'Spain',
  'Sweden',
])

const IndexMap = () => {
  const [open, setOpen] = useState(false)
  const [countrySelected, setCountrySelected] = useState<any | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth < 640)
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (open) {
        document.body.classList.add('no-scroll')
      } else {
        document.body.classList.remove('no-scroll')
      }
    }
  }, [open])
  const geoJsonStyle = (feature: any) => {
    return {
      fillColor: getFillColor(feature), // Define a function to dynamically assign colors
      weight: 2, // Border thickness
      opacity: 1, // Border opacity
      color: 'transparent', // Border color
      fillOpacity: 1, // Background fill opacity
    }
  }

  // Example of a color assignment function
  const getFillColor = (feature: any) => {
    // Assign colors based on some property in the feature
    const countryName = feature.properties.name
    if (euCountries.has(countryName)) {
      return '#D0C1BA'
    }
    switch (countryName) {
      case 'USA':
        return '#D0C1BA'
      case 'United States of America':
        return '#D0C1BA'
      case 'Canada':
        return '#D0C1BA'
      case 'Vietnam':
        return '#EA3434'
      case 'Australia':
        return '#D0C1BA'
      default:
        return '#F0EFE7'
    }
  }
  return (
    <div className='flex justify-between'>
      <div className='flex-1'></div>
      <div
        id='map_container'
        className='relative z-10 flex h-screen w-fit items-center xsm:w-full'
      >
        <MapContainer
          key={isMobile ? 'mobile-map' : 'desktop-map'}
          style={{background: 'transparent !important'}}
          id='map_connect_global'
          center={[40, 0]}
          zoom={isMobile ? 0.5 : 1.5}
          minZoom={0.5}
          maxZoom={18}
          zoomSnap={0.1}
          zoomDelta={isMobile ? 1 : 0.5}
          className='!h-[80vh] !w-[59.56rem] xsm:!h-[18.75rem] xsm:!w-full'
          scrollWheelZoom={isMobile ? false : true}
          zoomControl={false}
          dragging={isMobile ? false : true}
        >
          <GeoJSON
            data={customGeoJson as GeoJsonObject}
            style={geoJsonStyle}
            // style={(feature) => geoJsonStyle(feature, selectedCountry)}
            onEachFeature={(feature, layer) => {
              layer.bindTooltip(feature.properties.name, {
                sticky: true,
              })
            }}
          />

          <Marker
            position={[23.17716511117584, 105.35123310672446]} // Tọa độ Canada
            icon={
              new L.DivIcon({
                html: `<div class="custom-marker pointer-events-none !w-[5rem] !h-[3.26rem] absolute !left-[-1.5rem] top-0">
                  <img src="/imgs/map/bg-marker.png" alt="VIỆT NAM" class="absolute w-full h-full top-0 !left-1/2 !-translate-x-1/2 object-cover marker-bound xsm:!w-[2rem] xsm:!h-auto"/>
                  <img src="/imgs/map/vn.svg" alt="VIỆT NAM" class="absolute !size-[1.5rem] top-[1rem] !left-1/2 !-translate-x-1/2 object-cover marker-bound rounded-full xsm:!size-[1rem] xsm:top-[0.6rem]"/>
                  ${
                    isMobile
                      ? ''
                      : `<div class='text-[#5C321E absolute bottom-[-0.1rem] left-1/2 flex h-[1.375rem] w-fit -translate-x-1/2 translate-y-full items-center whitespace-nowrap rounded-[6.25rem] bg-[#E1DDC5] px-[0.5rem] text-[0.75rem] font-semibold uppercase leading-[1.2] tracking-[-0.0075rem]'>
                        VIỆT NAM
                      </div>`
                  }
              </div>`,
                className:
                  'my-div-icon !w-[5rem] !h-[3.26rem] relative !-mt-[3.26rem] xsm:!-mt-[2rem]',
                iconSize: [30, 30],
              })
            }
            eventHandlers={{
              click: () => {
                if (isMobile) return
                setOpen(true)
                setCountrySelected('Vietnam')
              },
            }}
          ></Marker>
        </MapContainer>
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
