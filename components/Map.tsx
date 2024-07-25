import { Text, View } from "react-native";
import MapView, { Callout, Marker, Polygon, Polyline } from "react-native-maps";
import { isPointInPolygon } from "geolib";
import { MapProps } from "@/types/interface";


const MapComponent = ({ coordinates, marker, event }: MapProps) => {
  const calculateBounds = (coordinates: any) => {
    let minLat = coordinates[0].latitude;
    let maxLat = coordinates[0].latitude;
    let minLon = coordinates[0].longitude;
    let maxLon = coordinates[0].longitude;

    coordinates.forEach((coord: any) => {
      if (coord.latitude < minLat) minLat = coord.latitude;
      if (coord.latitude > maxLat) maxLat = coord.latitude;
      if (coord.longitude < minLon) minLon = coord.longitude;
      if (coord.longitude > maxLon) maxLon = coord.longitude;
    });

    return {
      minLat,
      maxLat,
      minLon,
      maxLon,
    };
  };

  const bounds = calculateBounds(coordinates);

  const center = {
    latitude: (bounds.minLat + bounds.maxLat) / 2,
    longitude: (bounds.minLon + bounds.maxLon) / 2,
  };

  const latitudeDelta = bounds.maxLat - bounds.minLat;
  const longitudeDelta = bounds.maxLon - bounds.minLon;

  const getMarkersOutsidePolygon = (polygon: any, points: any) => {
    return points.filter((point: any) => isPointInPolygon(point, polygon));
  };

  // Marker dentro del poligon
  const markersOutsidePolygon = getMarkersOutsidePolygon(
    coordinates.map((coord) => ({
      latitude: coord.latitude,
      longitude: coord.longitude,
    })),
    marker.map((marker: any) => marker)
  );

  const popularMarkers = marker.filter((item: any) => item.likes_count > 0);

  return (
    <MapView
      style={{height: '80%'}}
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
    >
      <Polygon
        coordinates={coordinates}
        fillColor="rgba(255, 0, 0, 0.5)" // Color de fondo con transparencia
        strokeWidth={0}
      />

      <Polyline coordinates={coordinates} strokeColor="black" strokeWidth={1} />
      {markersOutsidePolygon.map((coord: any, index: number) => (
        <Marker
          key={coord.id}
          coordinate={coord}
          icon={coord.category.icon}
          description={`${coord.description}`}
          image={coord.category.marker.url}
        >
          <Callout
            tooltip={true}
            className="bg-black w-auto h-auto" 
          >
            <View className="p-5">
              <Text className="m-t-5 text-white">{coord.name}</Text>
              <Text className="m-t-5 text-white">{coord.description}</Text>
            </View>
          </Callout>
        </Marker>
      ))}
    </MapView>
  );
};

export default MapComponent;
