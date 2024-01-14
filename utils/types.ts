import { HERO_ICONS_OPTIONS } from './HERO_ICONS_OPTIONS';

export type IconType = (typeof HERO_ICONS_OPTIONS)[number];

export type CommuneData = {
  type: string;
  crs: {
    type: string;
    properties: {
      name: string;
    };
  };
  features: {
    type: string;
    properties: {
      fid: number;
      code: number;
      communeName: string;
    };
    geometry: {
      type: string;
      coordinates: number[][][][];
    };
  }[];
};

export type CommunePolygons = {
  name: string;
  shape: { lat: number; lng: number }[];
}[];

export interface Activity {
  resource_state: number;
  athlete: {
    id: number;
    resource_state: number;
  };
  name: string;
  distance: number;
  moving_time: number;
  elapsed_time: number;
  total_elevation_gain: number;
  type: string;
  sport_type: string;
  workout_type?: string;
  id: number;
  external_id: string;
  upload_id: number;
  start_date: string;
  start_date_local: string;
  timezone: string;
  utc_offset: number;
  start_latlng?: [number, number];
  end_latlng?: [number, number];
  location_city?: string;
  location_state?: string;
  location_country: string;
  achievement_count: number;
  kudos_count: number;
  comment_count: number;
  athlete_count: number;
  photo_count: number;
  map?: {
    id: string;
    summary_polyline?: string;
    resource_state: number;
  };
  trainer: boolean;
  commute: boolean;
  manual: boolean;
  private: boolean;
  flagged: boolean;
  gear_id?: string;
  from_accepted_tag?: boolean;
  average_speed: number;
  max_speed: number;
  average_cadence: number;
  average_watts: number;
  weighted_average_watts: number;
  kilojoules: number;
  device_watts: boolean;
  has_heartrate: boolean;
  average_heartrate: number;
  max_heartrate: number;
  max_watts: number;
  pr_count: number;
  total_photo_count: number;
  has_kudoed: boolean;
  suffer_score: number;
}

type ActivityTypeTotals = {
  count: number;
  distance: number;
  moving_time: number;
  elapsed_time: number;
  elevation_gain: number;
  achievement_count?: number;
};

export interface AthleteStats {
  biggest_ride_distance: number;
  biggest_climb_elevation_gain: number;
  recent_ride_totals: ActivityTypeTotals;
  all_ride_totals: ActivityTypeTotals;
  recent_run_totals: ActivityTypeTotals;
  all_run_totals: ActivityTypeTotals;
  recent_swim_totals: ActivityTypeTotals;
  all_swim_totals: ActivityTypeTotals;
  ytd_ride_totals: ActivityTypeTotals;
  ytd_run_totals: ActivityTypeTotals;
  ytd_swim_totals: ActivityTypeTotals;
}

export type User = {
  communes: string[];
  id: number;
  numberOfActivities?: number;
  timeOfLastActivity?: number;
};
