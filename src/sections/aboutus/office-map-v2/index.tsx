'use client'
import {FeatureCollection, GeoJsonObject} from 'geojson'
import L, {GeoJSONOptions, LatLngTuple} from 'leaflet'
import 'leaflet/dist/leaflet.css'
import {FC, useCallback, useEffect, useRef, useState} from 'react'
import {GeoJSON, MapContainer, Marker} from 'react-leaflet'
import './styles.css'
import {ItemMap} from '@/pages/about-us/IndexAboutUs'
export interface ICountry {
  name: string
  label?: string
  flag?: string
}

interface ILeafletMapProps {
  mapJson: FeatureCollection
  countries: ItemMap[]
  // eslint-disable-next-line no-unused-vars
  onClick?: (country: ItemMap) => void
  setActiveCountry?: (country: string) => void
  className?: string
  borderCountries?: string
  zoomMobile?: number
  zoomDesktop?: number
  isZoomInClick?: boolean
  isZoomOutClick?: boolean
  isControlZoom?: boolean
}
export const LeafletMapV2: FC<ILeafletMapProps> = ({
  mapJson,
  countries,
  onClick,
  className,
  setActiveCountry,
  borderCountries,
  zoomMobile = 0.5,
  zoomDesktop = 1.5,
  isZoomInClick = false,
  isZoomOutClick = false,
  isControlZoom = false,
}) => {
  const [isMobile, setIsMobile] = useState(false)
  const mapRef = useRef<L.Map | null>(null)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth < 640)
    }
  }, [])

  const geoJsonStyle = useCallback(() => {
    return {
      fillColor: '#ccc', // Define a function to dynamically assign colors
      weight: 0.3, // Border thickness
      opacity: 1, // Border opacity
      color: borderCountries, // Border color
      fillOpacity: 1, // Background fill opacity
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const handleZoomIn = () => {
    if (mapRef.current) {
      mapRef.current.zoomIn()
    }
  }

  const handleZoomOut = () => {
    if (mapRef.current) {
      mapRef.current.zoomOut()
    }
  }
  useEffect(() => {
    handleZoomIn()
  }, [isZoomInClick])
  useEffect(() => {
    handleZoomOut()
  }, [isZoomOutClick])
  return (
    <MapContainer
      key={isMobile ? 'mobile-map' : 'desktop-map'}
      style={{background: 'transparent !important'}}
      id='map_connect_global'
      center={[20, 106]}
      zoom={isMobile ? zoomMobile : zoomDesktop}
      minZoom={0.5}
      maxZoom={18}
      zoomSnap={0.1}
      zoomDelta={isMobile ? 1 : 0.5}
      className={className}
      zoomControl={isControlZoom}
      dragging={isMobile ? false : true}
      ref={mapRef}
      scrollWheelZoom={false}
    >
      <GeoJSON
        data={mapJson as GeoJsonObject}
        style={geoJsonStyle as GeoJSONOptions}
      />
      {countries.map((country, index) => {
        let position: LatLngTuple = [0, 0]
        if (countries.length > 1) {
          position = [parseFloat(country.label_y), parseFloat(country.label_x)]
        }
        return (
          <Marker
            key={index}
            position={position} // Tọa độ Canada
            icon={
              new L.DivIcon({
                html: `<div class="custom-marker pointer-events-none !w-[5rem] !h-[3.26rem] absolute !left-[-1.5rem] top-0 xsm:!pointer-events-none">
                  <img src="/imgs/map/bg-marker.png" alt="VIỆT NAM" class="absolute w-full h-full top-0 !left-1/2 !-translate-x-1/2 object-cover marker-bound xsm:!w-[2rem] xsm:!h-auto"/>
                  <img src="${
                    (country.flag && country.flag) || ''
                  }" alt="VIỆT NAM" class="absolute !size-[1.5rem] top-[1rem] !left-1/2 !-translate-x-1/2 object-cover marker-bound rounded-full xsm:!size-[1rem] xsm:top-[0.6rem]"/>
                  ${
                    isMobile
                      ? ''
                      : `<div class='text-brown absolute bottom-[-0.1rem] left-1/2 flex h-[1.375rem] w-fit -translate-x-1/2 translate-y-full items-center whitespace-nowrap rounded-[6.25rem] bg-[#E1DDC5] px-[0.5rem] text-[0.75rem] font-semibold uppercase leading-[1.2] tracking-[-0.0075rem]'>
                        ${country.name ? country.name : country.name}
                      </div>`
                  }
              </div>`,
                className:
                  'my-div-icon !w-[5rem] !h-[3.26rem] relative !-mt-[3.26rem] xsm:!-mt-[2rem]  xsm:!pointer-events-none',
                iconSize: [30, 30],
              })
            }
            eventHandlers={{
              click: () => {
                if (onClick) {
                  onClick(country)
                }
                if (setActiveCountry) {
                  setActiveCountry(country.name)
                }
              },
            }}
          ></Marker>
        )
      })}
    </MapContainer>
  )
}
