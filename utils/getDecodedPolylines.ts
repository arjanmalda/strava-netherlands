import { Activity } from '@/utils/types';
import poly from '@mapbox/polyline';

export function getDecodedPolylines(activities?: Activity[]) {
  if (!activities) return;

  const cyclingActivities = activities.filter((activity) => activity.type === 'Ride');
  const polylines = cyclingActivities.map((activity) => activity?.map?.summary_polyline);
  const decodedPolylines = polylines.map((polyline) => polyline && poly.decode(polyline)).filter(Boolean);

  return decodedPolylines as unknown as [number, number][];
}
