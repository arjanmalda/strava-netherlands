import { getCommuneData } from "@/helpers/apiCalls";
import { NextResponse } from "next/server";

export async function GET() {
  const communeData = await getCommuneData();

  const polygons = convertCommuneDataToPolygons(communeData);

  return NextResponse.json({ polygons });
}

function convertCommuneDataToPolygons(
  communeData: {
    boundaries: number[][];
    name: string;
  }[]
) {
  return communeData.map((commune) => {
    const shape = commune.boundaries.map((boundary) => {
      return { lat: boundary[1], lng: boundary[0] };
    });

    return { name: commune.name, shape };
  });
}
