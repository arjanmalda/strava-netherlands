import { NextResponse } from "next/server";
import { communeOfCoordinate } from "@/helpers/communeOfCoordinate";
import { getCommuneData } from "@/helpers/apiCalls";

const poly = require("@mapbox/polyline");

export async function POST(request: Request) {
  const { polyLines } = await request.json();

  const latLongsOfAllActivities = getDecodedPolylines(polyLines);

  const communeData = await getCommuneData();
  const allTimeCommunes = [];

  for (let index = 0; index < latLongsOfAllActivities.length; index++) {
    const communesForActivity = getCommunesForActivity(
      latLongsOfAllActivities[index],
      communeData
    );

    allTimeCommunes.push(communesForActivity);
  }

  const uniqueCommunes = new Set(allTimeCommunes.flat());

  return NextResponse.json({ communes: Array.from(uniqueCommunes) });
}

function getDecodedPolylines(polyLines: string[]) {
  return polyLines.map((polyLine) => {
    return poly.decode(polyLine);
  });
}

function getCommunesForActivity(
  activity: number[][],
  communeData: {
    boundaries: number[][];
    name: string;
  }[]
) {
  let communes: string[] = [];

  for (let index = 0; index < activity.length; index++) {
    const point = activity[index];
    if (index % 2 === 0) {
      const communeOfCurrentPoint =
        communeOfCoordinate(point, communeData) || "";

      communes.push(communeOfCurrentPoint);
    }
  }

  const uniqueCommunes = new Set(communes);

  return Array.from(uniqueCommunes).filter(Boolean);
}
