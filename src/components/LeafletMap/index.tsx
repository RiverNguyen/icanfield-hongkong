import { Feature, FeatureCollection, GeoJsonObject } from "geojson";
import L, { GeoJSONOptions, LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";
import { FC, useCallback, useEffect, useState } from "react";
import { GeoJSON, MapContainer, Marker } from "react-leaflet";
export interface ICountry {
  name: string;
  label?: string;
  flag?: string;
}

interface ILeafletMapProps {
  mapJson: FeatureCollection;
  countries: ICountry[][];
  onClick?: (country: ICountry) => void;
  className?: string;
}

// INIT COUNTRY OF EU
const euCountries = new Set();

export const LeafletMap: FC<ILeafletMapProps> = ({
  mapJson,
  countries,
  onClick,
  className,
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth < 640);
    }
    countries.forEach((countryList) => {
      countryList.forEach((item) => {
        euCountries.add(item.name);
      });
    });
  }, [countries]);

  const getPosition = useCallback(function (country: string): LatLngTuple {
    const geo: FeatureCollection = mapJson as FeatureCollection;

    // Nếu không có `features`, trả về [0, 0]
    if (!geo.features || geo.features.length === 0) return [0, 0];

    // Tìm feature có thuộc tính `name` khớp với `country`
    const position = geo.features.find((feature: Feature) => {
      return feature.properties && feature.properties.name === country;
    });

    // Nếu không tìm thấy feature, trả về [0, 0]
    if (!position || !position.properties) return [0, 0];

    // Lấy tọa độ `label_x` và `label_y` từ properties
    const { label_x, label_y } = position.properties;

    // Đảm bảo rằng `label_x` và `label_y` là số
    if (typeof label_x === "number" && typeof label_y === "number") {
      return [label_y, label_x];
    }

    // Nếu không hợp lệ, trả về [0, 0]
    return [0, 0];
  }, []);

  const getFillColor = useCallback((feature: Feature) => {
    if (!feature.properties) return "#F0EFE7"; // Màu mặc định

    const countryName = feature.properties.name;
    if (euCountries.has(countryName) && countryName !== "Vietnam") {
      return "#D0C1BA"; // Màu cho các quốc gia EU
    }

    // Xử lý màu cho các quốc gia cụ thể
    const specialColors: { [key: string]: string } = {
      Vietnam: "#EA3434",
    };
    return specialColors[countryName] || "#F0EFE7"; // Mặc định màu nền
  }, []);

  const geoJsonStyle = useCallback((feature: Feature) => {
    return {
      fillColor: getFillColor(feature), // Define a function to dynamically assign colors
      weight: 2, // Border thickness
      opacity: 1, // Border opacity
      color: "transparent", // Border color
      fillOpacity: 1, // Background fill opacity
    };
  }, []);

  return (
    <MapContainer
      key={isMobile ? "mobile-map" : "desktop-map"}
      style={{ background: "transparent !important" }}
      id="map_connect_global"
      center={[40, 0]}
      zoom={isMobile ? 0.5 : 1.5}
      minZoom={0.5}
      maxZoom={18}
      zoomSnap={0.1}
      zoomDelta={isMobile ? 1 : 0.5}
      className={className}
      scrollWheelZoom={isMobile ? false : true}
      zoomControl={false}
      dragging={isMobile ? false : true}
    >
      <GeoJSON
        data={mapJson as GeoJsonObject}
        style={geoJsonStyle as GeoJSONOptions}
      />
      {countries.map((country, index) => {
        let countryObj: ICountry = {
          name: country[0].name,
          label: country[0].label,
          flag: country[0].flag,
        };
        let position: LatLngTuple = getPosition(country[0].name);

        if (countries.length > 1) {
          const newPosition = country.find((item) => {
            if (item.label) return item;
          });
          if (newPosition) {
            position = getPosition(newPosition.name);
            countryObj = {
              name: newPosition.name,
              label: newPosition.label,
              flag: newPosition.flag,
            };
          }
        }
        return (
          <Marker
            key={index}
            position={position} // Tọa độ Canada
            icon={
              new L.DivIcon({
                html: `<div class="custom-marker pointer-events-none !w-[5rem] !h-[3.26rem] absolute !left-[-1.5rem] top-0">
                  <img src="/imgs/map/bg-marker.png" alt="VIỆT NAM" class="absolute w-full h-full top-0 !left-1/2 !-translate-x-1/2 object-cover marker-bound xsm:!w-[2rem] xsm:!h-auto"/>
                  <img src="${
                    countryObj.flag && countryObj.flag
                  }" alt="VIỆT NAM" class="absolute !size-[1.5rem] top-[1rem] !left-1/2 !-translate-x-1/2 object-cover marker-bound rounded-full xsm:!size-[1rem] xsm:top-[0.6rem]"/>
                  ${
                    isMobile
                      ? ""
                      : `<div class='text-brown absolute bottom-[-0.1rem] left-1/2 flex h-[1.375rem] w-fit -translate-x-1/2 translate-y-full items-center whitespace-nowrap rounded-[6.25rem] bg-[#E1DDC5] px-[0.5rem] text-[0.75rem] font-semibold uppercase leading-[1.2] tracking-[-0.0075rem]'>
                        ${countryObj.label ? countryObj.label : countryObj.name}
                      </div>`
                  }
              </div>`,
                className:
                  "my-div-icon !w-[5rem] !h-[3.26rem] relative !-mt-[3.26rem] xsm:!-mt-[2rem]",
                iconSize: [30, 30],
              })
            }
            eventHandlers={{
              click: () => onClick && onClick(countryObj),
            }}
          ></Marker>
        );
      })}
    </MapContainer>
  );
};
