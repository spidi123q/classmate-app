import { GeoJSONType } from "./enum";

interface GeoJSON {
  type: GeoJSONType;
  /**
   * Specifying coordinates such longitude first and then latitude
   */
  coordinates: number[] | Array<number[]>;
}

export default GeoJSON;
