export enum UserRoles {
  Guest = "GUEST",
  User = "USER",
  DeliveryAgent = "DELIVERY AGENT",
  Admin = "ADMIN",
  SuperAdmin = "SUPER ADMIN",
}

export enum UserPermissions {
  WriteProduct = "WriteProduct",
  ReadProduct = "ReadProduct",
  ReadProductSelf = "ReadProductSelf",
  WriteProductSelf = "WriteProductSelf",
  ReadUser = "ReadUser",
  WriteUser = "WriteUser",
  ReadUserSelf = "ReadUserSelf",
  WriteUserSelf = "WriteUserSelf",
}

export const RolesPermissions: Record<any, UserPermissions[]> = {
  [UserRoles.SuperAdmin]: Object.values(UserPermissions),
  [UserRoles.Admin]: Object.values(UserPermissions),
  [UserRoles.User]: [
    UserPermissions.ReadProduct,
    UserPermissions.ReadProductSelf,
    UserPermissions.WriteProductSelf,
    UserPermissions.ReadUser,
    UserPermissions.ReadUserSelf,
    UserPermissions.WriteUserSelf,
  ],
  [UserRoles.Guest]: [
    UserPermissions.ReadProduct,
    UserPermissions.ReadProductSelf,
    UserPermissions.WriteUserSelf,
    UserPermissions.ReadUserSelf,
  ],
  [UserRoles.DeliveryAgent]: [],
};

export enum PaymentModes {
  CashOnDelivery = "Cash On Delivery",
}

export enum Unit {
  Kg = "Kg",
  Ltr = "Ltr",
  Pc = "Pc",
}

export enum ClaimStatus {
  Completed = "Completed",
  Pending = "Pending",
  Assigned = "Assigned",
}
