import { isEmpty, capitalize } from "lodash";
import { UserRoles } from "../../../models/enum";
import useUser from "./useUser";

export default function useUserName(): string {
  const { name, role } = useUser();

  if (name && !isEmpty(name)) {
    return name;
  }
  return capitalize(role);
}
