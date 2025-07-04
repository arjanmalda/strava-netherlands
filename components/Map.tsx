'use client';

import { HeroIcon } from '@/components/HeroIcon';
import { snazzyMapStyling } from '@/utils/snazzyMap';
import { CommunePolygons } from '@/utils/types';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import React, { useEffect, useRef, ReactElement, useMemo, useState, Fragment } from 'react';

interface Properties {
  center: MapComponentProperties['center'];
  zoom: MapComponentProperties['zoom'];
  communes?: string[];
}

export const Map = ({ center, zoom, communes }: Properties) => {
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
        <MapComponent communes={communes} center={center} zoom={zoom} polygons={polygons} />
      </Wrapper>
    </div>
  );
};

const renderGoogleMaps = (status: Status): ReactElement => (
  <div className="h-full w-full flex justify-center items-center">
    {status === Status.LOADING ? (
      <h3>{'Kaart ophalen...'}</h3>
    ) : status === Status.FAILURE ? (
      <h3>{'Er is iets misgegaan'}</h3>
    ) : (
      <Fragment />
    )}
  </div>
);

interface MapComponentProperties {
  center: google.maps.LatLngLiteral;
  communes?: string[];
  polygons?: CommunePolygons;
  zoom: number;
}

const MapComponent = ({ center, zoom, polygons, communes }: MapComponentProperties) => {
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
          const hasVisitedCommune = communes?.includes(polygon.name);
          const newPolygon = new window.google.maps.Polygon({
            paths: polyconCoords,
            strokeColor: hasVisitedCommune ? '#278621' : '#E84C3B',
            strokeOpacity: 0.8,
            strokeWeight: 1,
            fillColor: hasVisitedCommune ? '#278621' : '#E84C3B',
            fillOpacity: 0.6,
          });

          newPolygon.addListener('click', () => setInfoTitle((previous) => (previous ? undefined : polygon.name)));

          newPolygon.setMap(mapReference.current);
        }
      }
    }
  }, [center, communes, polygons, zoom]);

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
        <button className="right-2 top-2 cursor-pointer [&>svg]:h-2 [&>svg]:-translate-y-1 [&>svg]:stroke-black">
          <HeroIcon icon="XMarkIcon" />
        </button>
      </div>
    </div>
  );
};
