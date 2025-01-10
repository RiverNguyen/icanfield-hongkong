'use client'
import customGeoJson from '@/sections/immigration/map/canada.geo.json'
import {Feature, GeoJsonObject} from 'geojson'
import L, {GeoJSONOptions} from 'leaflet'
import 'leaflet/dist/leaflet.css'
import {FC, useCallback, useEffect} from 'react'
import {GeoJSON, MapContainer, useMap} from 'react-leaflet'
import './style.css'

interface ICanadaMapProps {}

const LabelsLayer: FC<{data: GeoJsonObject}> = ({data}) => {
  const map = useMap()

  useEffect(() => {
    // Add labels for each region
    const geoJsonLayer = L.geoJSON(data, {
      onEachFeature: (feature, layer) => {
        if (
          feature.geometry.type === 'Polygon' ||
          feature.geometry.type === 'MultiPolygon'
        ) {
          // Calculate the center of the region
          const bounds = (layer as L.Polygon).getBounds()
          const center = bounds.getCenter()

          // Check if 'name' property exists
          if (feature.properties?.name) {
            const label = L.divIcon({
              className: 'region-label',
              html: `<p>${feature.properties.name}</p>`,
            })
            // Add label as a marker
            L.marker(center, {icon: label}).addTo(map)
          }
        }
      },
    })

    map.addLayer(geoJsonLayer)
  }, [data, map])

  return null
}

export const CanadaMap: FC<ICanadaMapProps> = () => {
  console.log(customGeoJson)

  const geoJsonStyle = useCallback((feature: Feature) => {
    return {
      fillColor: '#DED6D2', // Fill color
      weight: 1, // Border thickness
      opacity: 1, // Border opacity
      color: '#7F7C6E', // Border color
      fillOpacity: 1, // Background fill opacity
      strokeWidth: 0.281,
    }
  }, [])

  return (
    <section className='relative'>
      <MapContainer
        center={[56.1304, -106.3468]} // Center coordinates for Canada
        zoom={2} // Adjust zoom level
        scrollWheelZoom={false}
        style={{height: '100vh', width: '100%'}}
      >
        <GeoJSON
          data={customGeoJson as GeoJsonObject}
          style={geoJsonStyle as GeoJSONOptions}
        />
        <LabelsLayer data={customGeoJson as GeoJsonObject} />
      </MapContainer>
    </section>
  )
}
