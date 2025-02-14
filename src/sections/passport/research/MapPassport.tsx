/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import {Feature, GeoJsonObject} from 'geojson'
import L, {GeoJSONOptions} from 'leaflet'
import 'leaflet/dist/leaflet.css'
import './style.css'
import {useCallback, useEffect, useRef, useState} from 'react'
import {GeoJSON, MapContainer} from 'react-leaflet'

import mapJson from '@/sections/aboutus/office-map/custom.geo.json'
import useSWR from 'swr'
import {fetcher} from '@/lib/swr'
import {useSearchParams} from 'next/navigation'
import ListCountry from '@/sections/passport/research/ListCountry'
import {JSON_TYPE} from '@/types/passport'

const fetcherWithCustomBase = (url: string) =>
  fetcher(url, process.env.NEXT_PUBLIC_API_PASSPORT)

const MapPassport = () => {
  const mapRef = useRef<L.Map | null>(null)
  const geoJsonRef = useRef<L.GeoJSON | null>(null) // Reference to the GeoJSON layer
  const searchParams = useSearchParams()
  const postal = searchParams?.get('postal')
  const [isMobile, setIsMobile] = useState(false)

  const {data} = useSWR(
    postal ? `/v3/visa-single/${postal}` : null,
    fetcherWithCustomBase,
    {
      revalidateIfStale: false,
      revalidateOnReconnect: false,
    },
  )

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth < 640)
    }
  }, [])

  const handleCheckValue = (arr1: any[], postal: string) => {
    if (!Array.isArray(arr1)) return false
    return arr1.some((item: any) => item?.code === postal)
  }

  const getFillColor = useCallback(
    (feature: Feature) => {
      if (data?.code) {
        if (feature?.properties?.postal === postal) {
          return JSON_TYPE.FREE
        } else if (
          handleCheckValue(data?.visa_free_access, feature?.properties?.postal)
        ) {
          return JSON_TYPE.FREE
        } else if (
          handleCheckValue(data?.visa_on_arrival, feature?.properties?.postal)
        ) {
          return JSON_TYPE.AIRPORT
        } else if (
          handleCheckValue(data?.visa_required, feature?.properties?.postal)
        ) {
          return JSON_TYPE.REQUIRED
        } else {
          return JSON_TYPE.DEFAULT
        }
      } else {
        return JSON_TYPE.DEFAULT
      }
    },
    [data],
  )

  const geoJsonStyle = useCallback(
    (feature: Feature) => {
      return {
        fillColor: getFillColor(feature), // Define a function to dynamically assign colors
        weight: 0.5, // Border thickness
        opacity: 1, // Border opacity
        color: 'rgba(18, 18, 18, 0.54)', // Border color
        fillOpacity: 1, // Background fill opacity
      }
    },
    [getFillColor],
  )

  // Update GeoJSON layer styles when `data` changes
  useEffect(() => {
    if (geoJsonRef.current) {
      geoJsonRef.current.eachLayer((layer) => {
        if (layer instanceof L.Path) {
          const feature = (layer as L.Path & {feature: Feature}).feature
          const newStyle = geoJsonStyle(feature)
          layer.setStyle(newStyle)
        }
      })
    }
  }, [data, geoJsonStyle])

  // Custom tooltip
  const onEachFeature = (feature: Feature, layer: L.Layer) => {
    layer.bindTooltip(feature?.properties?.name, {
      sticky: true,
      direction: 'top',
      offset: [0, -10],
      opacity: 0.9,
    })
  }
  return (
    <div className='relative size-full bg-white xsm:min-h-[16.125rem] xsm:bg-transparent xsm:z-[51]'>
      <MapContainer
        key={isMobile ? 'mobile-map' : 'desktop-map'}
        style={{
          background: isMobile ? 'transparent !important' : '#fff !important',
        }}
        id='map_passport'
        center={[40, 0]}
        zoom={isMobile ? 0.4 : 1.5}
        minZoom={0.1}
        maxZoom={18}
        zoomSnap={0.1}
        zoomDelta={isMobile ? 0.5 : 0.5}
        className={
          'z-[5] h-full w-full !bg-white xsm:min-h-[16.125rem] xsm:!bg-transparent'
        }
        zoomControl={isMobile ? false : true}
        dragging={isMobile ? false : true}
        ref={mapRef}
        scrollWheelZoom={false}
      >
        <GeoJSON
          ref={geoJsonRef}
          data={mapJson as GeoJsonObject}
          style={geoJsonStyle as GeoJSONOptions}
          onEachFeature={onEachFeature}
        />
      </MapContainer>

      {data?.visa_free_access && <ListCountry data={data} />}
    </div>
  )
}

export default MapPassport
