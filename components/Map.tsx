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
import { MarkerIcon } from "./Icon";

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

  const initialMarkersLimit = 10;
  const zoomFactor = 0.05;
  const currentMarkersLimit = region
    ? initialMarkersLimit + Math.floor((1 - region.latitudeDelta) / zoomFactor)
    : initialMarkersLimit;

  const limitedMarkersToShow = markersToShow.slice(0, currentMarkersLimit);

  return (
    <MapView
      style={{ height: "100%" }}
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

      <Polyline coordinates={coordinates} strokeColor="white" strokeWidth={2} />

      {limitedMarkersToShow.map((coord: any) => (
        <Marker
          key={coord.id}
          coordinate={{ latitude: coord.latitude, longitude: coord.longitude }}
          description={`${coord.description}`}
          image={coord.category.marker.url}
        >
          <Callout>
            <View style={{ borderRadius: 5 }}>
              <Text style={{ marginTop: 5 }} className="text-center">{coord.name}</Text>

              <Text style={{ marginTop: 5 }}>
                <MarkerIcon />
                {coord.description}
              </Text>
            </View>
          </Callout>
        </Marker>
      ))}

      {event.map((evt: any) => (
        <Marker
          key={evt.id}
          coordinate={{
            latitude: Number(evt.latitude),
            longitude: Number(evt.longitude),
          }}
          description={`${evt.description}`}
          image={evt.category.icon.url}
        >
          <Callout>
            <View style={{ borderRadius: 5 }}>
              <Text style={{ marginTop: 5 }} className="text-center">{evt.title}</Text>
              <Text style={{ marginTop: 5 }}>
                <MarkerIcon />
                {evt.address.slice(0, 20)}
              </Text>
            </View>
          </Callout>
        </Marker>
      ))}
    </MapView>
  );
};

export default MapComponent;
