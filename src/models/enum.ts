export enum UserRoles {
  Guest = "Guest",
  User = "User",
  //OrganizationStaff = "Organization Staff",
  OrganizationAdmin = "Organization Admin",
  //Admin = "Admin",
  SuperAdmin = "SuperAdmin",
}

export enum UserPermissions {
  SystemAdmin = "SystemAdmin",
  WriteOrganization = "WriteOrganization",
  ReadOrganization = "ReadOrganization",
  ReadOrganizationSelf = "ReadOrganizationSelf",
  WriteOrganizationSelf = "WriteOrganizationSelf",
  ReadUser = "ReadUser",
  WriteUser = "WriteUser",
  ReadUserSelf = "ReadUserSelf",
  WriteUserSelf = "WriteUserSelf",
}

export enum BookingStatus {
  AwaitingConfirmation = "Awaiting Confirmation",
  Accepted = "Accepted",
}

export enum PreferredSlot {
  Morning = "Morning",
  Noon = "Noon",
  Evening = "Evening",
  Night = "Night",
}
