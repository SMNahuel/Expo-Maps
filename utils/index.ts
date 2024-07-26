export const calculateBounds = (coordinates: any) => {
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

export const getMarkersInRegion = (markers: any[], region: any) => {
  return markers.filter((marker) => {
    return (
      marker.latitude >= region.latitude - region.latitudeDelta / 2 &&
      marker.latitude <= region.latitude + region.latitudeDelta / 2 &&
      marker.longitude >= region.longitude - region.longitudeDelta / 2 &&
      marker.longitude <= region.longitude + region.longitudeDelta / 2
    );
  });
};
