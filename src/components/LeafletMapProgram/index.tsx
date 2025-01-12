'use client'
import {Feature, FeatureCollection, GeoJsonObject} from 'geojson'
import L, {GeoJSONOptions, LatLngTuple} from 'leaflet'
import 'leaflet/dist/leaflet.css'
import {FC, useCallback, useEffect, useRef, useState} from 'react'
import {GeoJSON, MapContainer, Marker} from 'react-leaflet'
import './styles.css'
export interface ICountry {
  name: string
  label?: string
  flag?: string
  projectNumber?: number
}

interface ILeafletMapProps {
  mapJson: FeatureCollection
  countries: ICountry[][]
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
}

// INIT COUNTRY OF EU
const euCountries = new Set()

export const LeafletMapPrograms: FC<ILeafletMapProps> = ({
  mapJson,
  countries,
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
}) => {
  const [isMobile, setIsMobile] = useState(false)
  const mapRef = useRef<L.Map | null>(null)
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
  const [zoomedCountry, setZoomedCountry] = useState<string | null>(null)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth < 640)
      countries.forEach((country) => {
        country.forEach((item) => {
          euCountries.add(item.name)
        })
      })
    }
  }, [])

  const getPosition = useCallback(function (country: string): LatLngTuple {
    const geo: FeatureCollection = mapJson as FeatureCollection

    // Nếu không có `features`, trả về [0, 0]
    if (!geo.features || geo.features.length === 0) return [0, 0]

    // Tìm feature có thuộc tính `name` khớp với `country`
    const position = geo.features.find((feature: Feature) => {
      return feature.properties && feature.properties.name === country
    })

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

  const getFillColor = useCallback(
    (feature: Feature) => {
      if (!feature.properties) return '#f6f6f6' // Màu mặc định
      const countryName = feature.properties.name

      // Kiểm tra quốc gia được chọn
      if (selectedCountry === countryName) {
        return '#BC9247' // Màu nổi bật cho quốc gia được chọn
      }

      // Màu cho các quốc gia EU
      if (euCountries.has(countryName) && countryName !== 'Vietnam') {
        return fillColor
      }

      // Xử lý màu cho các quốc gia đặc biệt
      const specialColors: {[key: string]: string} = {}
      return specialColors[countryName] || '#f6f6f6' // Màu mặc định
    },
    [selectedCountry],
  )
  const geoJsonStyle = useCallback(
    (feature: Feature) => ({
      fillColor: getFillColor(feature), // Màu nền
      weight: 0.281, // Độ dày viền
      opacity: 1, // Độ mờ viền
      color: borderCountries, // Màu viền
      fillOpacity: 1, // Độ mờ nền
    }),
    [getFillColor],
  )
  // Zoom to country when click

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
        onEachFeature={(feature, layer) => {
          // Thêm event click vào từng khu vực
          layer.on('click', () => {
            const countryName = feature.properties?.name || 'Unknown'
            const clickedCountry = countries.find(
              (country) => country[0].name === countryName,
            )

            if (clickedCountry) {
              const countryObj: ICountry = {
                name: clickedCountry[0].name,
                label: clickedCountry[0].label,
                flag: clickedCountry[0].flag,
                projectNumber: clickedCountry[0].projectNumber,
              }

              if (onClick) {
                onClick(countryObj)
              }
              setSelectedCountry(countryObj.name)
              handleCountryClick(countryObj.name)
            }
          })
        }}
      />
      {countries.map((country, index) => {
        let countryObj: ICountry = {
          name: country[0].name,
          label: country[0].label,
          flag: country[0].flag,
          projectNumber: country[0].projectNumber,
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
              projectNumber: newPosition.projectNumber,
            }
          }
        }
        return (
          <Marker
            key={index}
            position={position} // Tọa độ Canada
            icon={
              new L.DivIcon({
                html: `<div class="custom-marker absolute !-left-0 top-0 xsm:!pointer-events-none">
                      <div class='bg-[linear-gradient(90deg,#5C4E47_0%,#5C4235_100%)] text-transparent bg-clip-text text-[0.625rem] font-semibold leading-[1.2] tracking-[-0.00625rem] uppercase absolute bottom-[-0.1rem]  '>
                        ${countryObj.label ? countryObj.label : countryObj.name}
                      </div>
              </div>`,
                className:
                  'my-div-icon !w-[5rem] !h-[3.26rem] relative marker-custom__nation  xsm:!pointer-events-none group !pointer-events-none',
                iconSize: [30, 30],
              })
            }
          ></Marker>
        )
      })}
    </MapContainer>
  )
}
