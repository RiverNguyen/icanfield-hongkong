'use client'
import {Feature, FeatureCollection, GeoJsonObject} from 'geojson'
import L, {GeoJSONOptions, LatLngTuple} from 'leaflet'
import 'leaflet/dist/leaflet.css'
import {FC, useCallback, useEffect, useRef, useState} from 'react'
import {GeoJSON, MapContainer, Marker} from 'react-leaflet'
import './styles.css'
import {usePathname} from 'next/navigation'
export interface ICountry {
  name: string
  label?: string
  flag?: string
  number_of_projects?: number
}

interface ILeafletMapProps {
  mapJson: FeatureCollection
  countries: ICountry[][]
  dataCountry?: {
    slug: string
    count: number
    location_name: string
    metropolis?: string
  }[]
  onClick?: (country: ICountry) => void
  className?: string
  borderCountries?: string
  zoomMobile?: number
  zoomDesktop?: number
  isZoomClick?: boolean
  changeCountry?: string
  isZoomInClick?: boolean
  isZoomOutClick?: boolean
  isControlZoom?: boolean
  center?: LatLngTuple
  centerMobile?: LatLngTuple
  fillColor?: string
  isAustralia?: boolean
}

// INIT COUNTRY OF EU
const euCountries = new Set()

export const LeafletMapCountries: FC<ILeafletMapProps> = ({
  mapJson,
  countries,
  dataCountry,
  onClick,
  className,
  borderCountries,
  zoomMobile = 0.5,
  zoomDesktop = 1.5,
  isZoomClick = false,
  changeCountry,
  isZoomInClick = false,
  isZoomOutClick = false,
  isControlZoom = false,
  center = [47, -121.4905],
  centerMobile = [42, -107.3025],
  fillColor = '#BC9247',
  isAustralia = false,
}) => {
  const [isMobile, setIsMobile] = useState(false)
  const mapRef = useRef<L.Map | null>(null)

  const path = usePathname() // Lấy đường dẫn hiện tại (vd: "/tour-nuoc-ngoai")
  const segment = path?.split('/').filter(Boolean)[0] // Lấy phần đầu tiên sau "/"
  const currentPath = `/${segment}` // Lấy đường dẫn hiện tại không bao gồm phần query string
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth < 640)
      if (Array.isArray(countries)) {
        countries.forEach((country) => {
          country.forEach((item) => {
            euCountries.add(item.name)
          })
        })
      }
    }
  }, [])

  const getPosition = useCallback(function (country: string): LatLngTuple {
    const geo: FeatureCollection = mapJson as FeatureCollection

    // Nếu không có `features`, trả về [0, 0]
    if (!geo.features || geo.features.length === 0) return [0, 0]
    // Tìm feature có thuộc tính `name` khớp với `country`
    const position = geo.features.find((feature: Feature) => {
      return (
        feature.properties &&
        feature.properties.name.trim().toLowerCase() ===
          country.trim().toLowerCase()
      )
    })
    // console.log(position)
    // Nếu không tìm thấy feature, trả về [0, 0]
    if (!position || !position.properties) return [0, 0]

    // Lấy tọa độ `label_x` và `label_y` từ properties
    const {label_x, label_y} = position.properties

    // Đảm bảo rằng `label_x` và `label_y` là số
    if (typeof label_x === 'number' && typeof label_y === 'number') {
      return [label_y, label_x]
    }

    // Nếu không hợp lệ, trả về [0, 0]
    return [0, 0]
  }, [])

  const getFillColor = useCallback((feature: Feature) => {
    if (!feature.properties) return '#f6f6f6' // Màu mặc định
    const countryName = feature.properties.name
    if (euCountries.has(countryName) && countryName !== 'Vietnam') {
      return fillColor // Màu cho các quốc gia EU
    }

    // Xử lý màu cho các quốc gia cụ thể
    const specialColors: {[key: string]: string} = {}
    return specialColors[countryName] || '#F6f6f6' // Mặc định màu nền
  }, [])

  const geoJsonStyle = useCallback((feature: Feature) => {
    return {
      fillColor: getFillColor(feature), // Define a function to dynamically assign colors
      weight: 0.281, // Border thickness
      opacity: 1, // Border opacity
      color: borderCountries, // Border color
      fillOpacity: 1, // Background fill opacity
    }
  }, [])
  // Zoom to country when click
  const [zoomedCountry, setZoomedCountry] = useState<string | null>(null)
  const handleCountryClick = (countryName: string) => {
    const position = getPosition(countryName)
    if (mapRef.current && isZoomClick) {
      if (zoomedCountry === countryName) {
        // Nếu quốc gia đã được zoom, bỏ zoom
        mapRef.current.flyTo([40, 0], isMobile ? zoomMobile : 1.5)
        setZoomedCountry(null)
      } else {
        // Nếu quốc gia chưa được zoom, zoom vào quốc gia đó
        mapRef.current.flyTo(position, isMobile ? 1.75 : 3)
        setZoomedCountry(countryName)
      }
    }
  }
  const findCountry = (label: string) => {
    for (let i = 0; i < countries.length; i++) {
      const country = countries[i].find((country) => country.label === label)
      if (country) {
        return country.name // Return the name of the country if found
      }
    }
    return null // Return null if no country with the given label is found
  }
  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    if (
      changeCountry !== '' &&
      changeCountry !== null &&
      changeCountry !== undefined
    ) {
      const countryName = findCountry(changeCountry)
      if (countryName) {
        timeoutId = setTimeout(() => {
          handleCountryClick(countryName)
        }, 100)
      }
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [changeCountry])
  // Hàm xử lý zoom
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
      center={isMobile ? centerMobile : center}
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
      {Array.isArray(dataCountry)
        ? dataCountry.map((country, index) => {
            const countryObj: {
              name: string
              label: string
              slug: string
              flag: string
              number_of_projects: number
              metropolis?: string
            } = {
              name: country.location_name,
              label: country.location_name,
              slug: country.slug,
              flag: '', // Bạn có thể thêm cờ nếu cần
              number_of_projects: country.count,
              metropolis: country.metropolis,
            }
            const position: LatLngTuple = getPosition(country.location_name)
            return (
              <Marker
                key={index}
                position={position}
                icon={
                  new L.DivIcon({
                    html: `<div class="custom-marker absolute !left-0 top-0 xsm:!pointer-events-none">
                            <div class="flex items-center relative">
                                <div class='size-[0.75rem] bg-[#DAF2AF] rounded-full mr-1 xsm:size-[0.375rem] flex-shrink-0'></div>
                                <span class="text-Phase-1-Brown text-[0.75rem] tracking-[-0.0075rem] font-medium leading-[1.2] xsm:text-[0.5rem]">${countryObj.metropolis || countryObj.name}</span>
                                <a href="${currentPath}/location/${countryObj.slug}" class='flex items-center justify-around absolute bg-white w-[8.63rem] sm:w-max sm:space-x-[0.5rem] p-2 rounded-[0.63rem] bottom-0 left-1/2 -translate-x-1/2 shadow-lg  transition-all duration-300 opacity-0 info-tag '>
                                      <div class='flex items-center justify-center p-4 rounded-[0.5rem] bg-primary-brown'>
                                        <img src='/icons/EB5/pioneering-values/project.svg' class='size-[1.01563rem] object-cover' />
                                      </div>
                                      <div class='flex flex-col '>
                                            <span class='text-greentext font-normal leading-[1.25] text-[1.25rem]'>${countryObj?.number_of_projects}</span>
                                            <span class = 'text-tagtext leading-[1.41] tracking-[-0.00875rem] xsm:text-[0.5rem] '>${isAustralia ? countryObj.label : 'Dự án EB-5'}</span>
                                      </div>
                                </a>
                            </div>
                              <div class='text-brown absolute bottom-[-0.1rem] left-1/2 flex h-[1.375rem] w-fit -translate-x-1/2 translate-y-full items-center whitespace-nowrap rounded-[6.25rem] bg-[#E1DDC5] px-[0.5rem] text-[0.625rem] font-semibold uppercase leading-[1.2] tracking-[-0.0075rem] xsm:text-[0.5rem] xsm:px-1 xsm:py-[0.12rem] xsm:bg-[#F7F6F1] shadow-[0px_1.371px_5.482px_0px_rgba(0,0,0,0.10)] xsm:h-auto xsm:pt-1'>
                                ${countryObj.label}
                              </div>
                      </div>`,
                    className:
                      'my-div-icon !w-[5rem] !h-[3.26rem] relative marker-custom__nation  xsm:!pointer-events-none group',
                    iconSize: [30, 30],
                  })
                }
                eventHandlers={{
                  click: () => {
                    if (onClick) {
                      onClick(countryObj)
                    }
                    handleCountryClick(countryObj.name)
                  },
                }}
              ></Marker>
            )
          })
        : Array.isArray(countries) &&
          countries.map((country, index) => {
            let countryObj: ICountry = {
              name: country[0].name,
              label: country[0].label,
              flag: country[0].flag,
              number_of_projects: country[0].number_of_projects,
            }
            let position: LatLngTuple = getPosition(country[0].name)
            if (countries.length > 1) {
              const newPosition = country.find((item) => {
                if (item.label) return item
              })
              if (newPosition) {
                position = getPosition(newPosition.name)
                countryObj = {
                  name: newPosition.name,
                  label: newPosition.label,
                  flag: newPosition.flag,
                  number_of_projects: newPosition.number_of_projects,
                }
              }
            }
            return (
              <Marker
                key={index}
                position={position}
                icon={
                  new L.DivIcon({
                    html: `<div class="custom-marker absolute !left-0 top-0 xsm:!pointer-events-none">
                    <div class="flex items-center relative">
                        <div class='size-[0.75rem] bg-[#DAF2AF] rounded-full mr-1 xsm:size-[0.375rem] '></div>
                        <span class="text-Phase-1-Brown text-[0.75rem] tracking-[-0.0075rem] font-medium leading-[1.2] xsm:text-[0.5rem]">${countryObj.label ? countryObj.label : countryObj.name}</span>
                        <div class='flex items-center justify-around absolute bg-white w-[8.63rem] sm:w-max sm:space-x-[0.5rem] p-2 rounded-[0.63rem] bottom-0 left-1/2 -translate-x-1/2 shadow-lg  transition-all duration-300 opacity-0 info-tag '>
                              <div class='flex items-center justify-center p-4 rounded-[0.5rem] bg-primary-brown'>
                                <img src='/icons/EB5/pioneering-values/project.svg' class='size-[1.01563rem] object-cover' />
                              </div>
                              <div class='flex flex-col '>
                                    <span class='text-greentext font-normal leading-[1.25] text-[1.25rem]'>${countryObj?.number_of_projects || 1}</span>
                                    <span class = 'text-tagtext leading-[1.41] tracking-[-0.00875rem] xsm:text-[0.5rem] '>${isAustralia ? (countryObj.label ? countryObj.label : countryObj.name) : 'Dự án EB-5'}</span>
                              </div>
                        </div>
                    </div>
                      <div class='text-brown absolute bottom-[-0.1rem] left-1/2 flex h-[1.375rem] w-fit -translate-x-1/2 translate-y-full items-center whitespace-nowrap rounded-[6.25rem] bg-[#E1DDC5] px-[0.5rem] text-[0.625rem] font-semibold uppercase leading-[1.2] tracking-[-0.0075rem] xsm:text-[0.5rem] xsm:px-1 xsm:py-[0.12rem] xsm:bg-[#F7F6F1] shadow-[0px_1.371px_5.482px_0px_rgba(0,0,0,0.10)] xsm:h-auto xsm:pt-1'>
                        ${countryObj.label ? countryObj.label : countryObj.name}
                      </div>
              </div>`,
                    className:
                      'my-div-icon !w-[5rem] !h-[3.26rem] relative marker-custom__nation  xsm:!pointer-events-none group',
                    iconSize: [30, 30],
                  })
                }
                eventHandlers={{
                  click: () => {
                    if (onClick) {
                      onClick(countryObj)
                    }
                    handleCountryClick(countryObj.name)
                  },
                }}
              ></Marker>
            )
          })}
    </MapContainer>
  )
}
