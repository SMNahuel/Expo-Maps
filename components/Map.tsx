import React, { useState } from "react";
import { Text, View } from "react-native";
import MapView, {
  Callout,
  Marker,
  Polygon,
  Polyline,
  Region,
} from "react-native-maps";

import { MapProps } from "@/types/interface";
import { calculateBounds, getMarkersInRegion } from "@/utils";

const MapComponent = ({ coordinates, marker, event }: MapProps) => {
  const [region, setRegion] = useState<Region | null>(null);

  const bounds = calculateBounds(coordinates);

  const center = {
    latitude: (bounds.minLat + bounds.maxLat) / 2,
    longitude: (bounds.minLon + bounds.maxLon) / 2,
  };

  const latitudeDelta = bounds.maxLat - bounds.minLat;
  const longitudeDelta = bounds.maxLon - bounds.minLon;

  // Ordenar marcadores por likes_count
  const sortedMarkers = marker.sort(
    (a: any, b: any) => b.likes_count - a.likes_count
  );

  const markersToShow = region
    ? getMarkersInRegion(sortedMarkers, region)
    : sortedMarkers;

  // Limit initial markers to 10, show more as zoom level increases
  const initialMarkersLimit = 10;
  const zoomFactor = 0.05; // Smaller value = more markers shown at each zoom level
  const currentMarkersLimit = region
    ? initialMarkersLimit + Math.floor((1 - region.latitudeDelta) / zoomFactor)
    : initialMarkersLimit;

  const limitedMarkersToShow = markersToShow.slice(0, currentMarkersLimit);

  return (
    <MapView
      style={{ height: "80%" }}
      initialRegion={{
        latitude: center.latitude,
        longitude: center.longitude,
        latitudeDelta: latitudeDelta,
        longitudeDelta: longitudeDelta,
      }}
      customMapStyle={[
        {
          featureType: "poi",
          stylers: [
            {
              visibility: "off",
            },
          ],
        },
      ]}
      provider={"google"}
      onRegionChangeComplete={(region) => setRegion(region)}
    >
      <Polygon
        coordinates={coordinates}
        fillColor="rgba(255, 0, 0, 0.5)" // Color de fondo con transparencia
        strokeWidth={0}
      />

      <Polyline coordinates={coordinates} strokeColor="black" strokeWidth={1} />

      {limitedMarkersToShow.map((coord: any) => (
        <Marker
          key={coord.id}
          coordinate={{ latitude: coord.latitude, longitude: coord.longitude }}
          icon={coord.category.icon}
          description={`${coord.description}`}
          image={coord.category.marker.url}
        >
          <Callout tooltip={true}>
            <View
              style={{ padding: 5, backgroundColor: "black", borderRadius: 5 }}
            >
              <Text style={{ marginTop: 5, color: "white" }}>{coord.name}</Text>
              <Text style={{ marginTop: 5, color: "white" }}>
                {coord.description}
              </Text>
            </View>
          </Callout>
        </Marker>
      ))}
    </MapView>
  );
};

export default MapComponent;
