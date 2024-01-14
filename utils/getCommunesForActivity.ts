import { communeOfCoordinate } from '@/utils/communeOfCoordinate';

export function getCommunesForActivity(
  activity: number[][] | [number, number],
  communeData: {
    boundaries: number[][];
    name: string;
  }[]
) {
  let communes: string[] = [];

  for (let index = 0; index < activity.length; index++) {
    const point = activity[index];
    if (index % 2 === 0 && Array.isArray(point)) {
      const communeOfCurrentPoint = communeOfCoordinate(point, communeData) || '';

      communes.push(communeOfCurrentPoint);
    }
  }

  const uniqueCommunes = new Set(communes);

  return Array.from(uniqueCommunes).filter(Boolean);
}
