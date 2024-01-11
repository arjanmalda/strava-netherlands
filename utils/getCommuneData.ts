import dutchCommuneData from '@/constants/dutchCommunes.json';

export function getCommuneData() {
  return dutchCommuneData.features.map((feature) => {
    return {
      boundaries: feature.geometry.coordinates[0][0],
      name: feature.properties.gemeentena,
    };
  });
}
