import Link from "next/link";
import { ReactNode } from "react";

interface Properties {
  title?: string;
  href?: string;
  children?: ReactNode;
}

export const CardWithLink = ({
  title,
  href,
  children,
}: Properties): JSX.Element => {
  const Container = href ? Link : "div";
  return (
    <Container
      href={href || ""}
      className="flex flex-col flex-wrap items-start gap-2 p-2 text-left text-current no-underline transition-all bg-white border border-gray-200 shadow group/card rounded-2xl lg:px-4 lg:py-3 hover:border-red-50 hover:shadow-md focus:border-red-50"
    >
      {title ? (
        <strong className="leading-none text-black transition-colors text-md lg:text-lg">
          {title}
        </strong>
      ) : undefined}
      {children}
    </Container>
  );
};
