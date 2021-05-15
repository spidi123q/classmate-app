import React from "react";
import EmpyListPlaceholder from "./EmpyListPlaceholder";

interface IProps {
  skeleton: JSX.Element;
  isLoading: boolean;
  items: any[];
}

export default function ListLoadingPlaceholder({
  skeleton,
  items,
  isLoading,
}: IProps) {
  return isLoading ? (
    skeleton
  ) : (
    <EmpyListPlaceholder items={items} isLoading={isLoading} />
  );
}
