export function communeOfCoordinate(
  point: number[],
  allDutchCommunes: { boundaries: number[][]; name: string }[]
) {
  for (const commune of allDutchCommunes) {
    const polygonBoundaries = switchLatLongs(commune.boundaries);
    if (pointInPolygon(polygonBoundaries, point)) {
      return commune.name;
    }
  }
}

function pointInPolygon(polygon: number[][], point: number[]) {
  let odd = false;

  for (
    let polygonIndex = 0, j = polygon.length - 1;
    polygonIndex < polygon.length;
    polygonIndex++
  ) {
    const polygonPoint = polygon[polygonIndex];
    if (
      polygonPoint[1] > point[1] !== polygon[j][1] > point[1] &&
      point[0] <
        ((polygon[j][0] - polygonPoint[0]) * (point[1] - polygonPoint[1])) /
          (polygon[j][1] - polygonPoint[1]) +
          polygonPoint[0]
    ) {
      odd = !odd;
    }
    j = polygonIndex;
  }

  return odd;
}

function switchLatLongs(polygon: number[][]) {
  return polygon.map((point) => {
    return [point[1], point[0]];
  });
}
