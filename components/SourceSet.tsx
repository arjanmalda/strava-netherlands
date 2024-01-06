import { Fragment, useMemo } from "react";

const DEFAULT_SIZES = [
  { width: 1400, minWidth: 1300 },
  { width: 1300, minWidth: 1200 },
  { width: 1200, minWidth: 1100 },
  { width: 1100, minWidth: 1000 },
  { width: 1000, minWidth: 900 },
  { width: 900, minWidth: 800 },
  { width: 800, minWidth: 768 },
  { width: 768, minWidth: 700 },
  { width: 700, minWidth: 600 },
  { width: 600, minWidth: 500 },
  { width: 500, minWidth: 400 },
  { width: 400, minWidth: 300 },
  { width: 300, minWidth: 1 },
];

interface Properties {
  loading?: "eager" | "lazy";
  maxWidth?: number;
  sizes?: { width: number; minWidth: number; ratio?: number }[];
  src: string;
  alt: string;
}

export const SourceSet = ({
  loading = "lazy",
  maxWidth = DEFAULT_SIZES[0].width,
  sizes = DEFAULT_SIZES,
  src,
  alt,
}: Properties) => {
  const sizesToUse = useMemo(
    () => sizes.filter(({ width }) => width <= maxWidth),
    [maxWidth, sizes]
  );

  return (
    <picture>
      {sizesToUse.map(({ width, minWidth }) => {
        return (
          <Fragment key={`${width}-${minWidth}`}>
            <source
              srcSet={src}
              sizes={`(min-width: ${minWidth}px) ${width}px`}
              media={`(min-width: ${minWidth}px) and (-webkit-min-device-pixel-ratio: 1.25), (min-width: ${minWidth}px) and (min-resolution: 120dpi)`}
            />
            <source
              srcSet={src}
              sizes={`(min-width: ${minWidth}px) ${width}px`}
              media={`(min-width: ${minWidth}px)`}
            />
          </Fragment>
        );
      })}
      <img alt={alt} loading={loading} />
    </picture>
  );
};
