'use client';

import { HeroIcon } from '@/components/HeroIcon';
import { snazzyMapStyling } from '@/utils/snazzyMap';
import { CommunePolygons } from '@/utils/types';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import React, { useEffect, useRef, ReactElement, useMemo, useState, Fragment } from 'react';

interface Properties {
  center: MapComponentProperties['center'];
  zoom: MapComponentProperties['zoom'];
  communesVisited?: string[];
}

export const Map = ({ center, zoom, communesVisited }: Properties) => {
  const [polygons, setPolygons] = useState<CommunePolygons>();

  useEffect(() => {
    fetch('/api/communes/polygons')
      .then((response) => response.json())
      .then((data) => {
        setPolygons(data.polygons);
      });
  }, []);

  return (
    <div className={'w-full h-80'}>
      <Wrapper apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string} render={renderGoogleMaps}>
        <MapComponent communesVisited={communesVisited} center={center} zoom={zoom} polygons={polygons} />
      </Wrapper>
    </div>
  );
};

const renderGoogleMaps = (status: Status): ReactElement => {
  if (status === Status.LOADING) return <h3>{status} ..</h3>;
  if (status === Status.FAILURE) return <h3>{status} ...</h3>;
  return <React.Fragment> </React.Fragment>;
};

interface MapComponentProperties {
  center: google.maps.LatLngLiteral;
  communesVisited?: string[];
  polygons?: CommunePolygons;
  zoom: number;
}

const MapComponent = ({ center, zoom, polygons, communesVisited }: MapComponentProperties) => {
  const [infoTitle, setInfoTitle] = useState<string>();
  const domElementReference = useRef(null);
  const mapReference = useRef<google.maps.Map>();

  useEffect(() => {
    if (domElementReference.current) {
      mapReference.current = new window.google.maps.Map(domElementReference.current, {
        center,
        zoom,
        styles: JSON.parse(snazzyMapStyling),
        disableDefaultUI: true,
      });

      if (mapReference.current && !!polygons) {
        for (const polygon of polygons) {
          const polyconCoords = polygon.shape;
          const hasVisitedCommune = communesVisited?.includes(polygon.name);
          const newPolygon = new window.google.maps.Polygon({
            paths: polyconCoords,
            strokeColor: hasVisitedCommune ? '#278621' : '#E84C3B',
            strokeOpacity: 0.8,
            strokeWeight: 1,
            fillColor: hasVisitedCommune ? '#278621' : '#E84C3B',
            fillOpacity: 0.6,
          });

          newPolygon.addListener('mousedown', () => setInfoTitle(polygon.name));
          newPolygon.addListener('mouseup', () => setInfoTitle(undefined));

          newPolygon.setMap(mapReference.current);
        }
      }
    }
  }, [center, communesVisited, polygons, zoom]);

  return (
    <Fragment>
      {!!infoTitle && <InfoPopup setInfoTitle={setInfoTitle} title={infoTitle} />}
      <div className={'w-full h-96 '} ref={domElementReference} />
    </Fragment>
  );
};

const InfoPopup = ({
  title,
  setInfoTitle,
}: {
  title: string;
  setInfoTitle: (value: React.SetStateAction<string | undefined>) => void;
}) => {
  return (
    <div className="fixed w-full h-1/2  bg-transparent z-50" onClick={() => setInfoTitle(undefined)}>
      <div
        className={
          'bg-white p-2 pr-0 rounded-lg shadow-lg  top-1/2 left-1/2 transform -translate-x-2/3 -translate-y-1/2 relative w-fit flex gap-1'
        }>
        <h3 className={'text-2xs font-bold text-black'}>{title}</h3>
        <button className=" right-1 top-1 cursor-pointer [&>svg]:h-2 [&>svg]:-translate-y-1 [&>svg]:stroke-black">
          <HeroIcon icon="XMarkIcon" />
        </button>
      </div>
    </div>
  );
};
