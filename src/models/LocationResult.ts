import GeoJSON from "../common/models/GeoJSON";


export default interface LocationResult {
    location: GeoJSON;
    address: string
}