import { IRequest } from "../helpers/axios";

const SearchPlace = (search: string, token: string): IRequest => ({
  url: `/api/v1/Lookup/Place/Autocomplete/${search}`,
  params: { token },
});

export default SearchPlace;
