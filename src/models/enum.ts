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
  AwaitingConfirmation = "Waiting for confirmation",
  Accepted = "Accepted",
  Rejected = "Rejected",
  Completed = "Completed",
}

export enum PreferredSlot {
  Morning = "Morning",
  Noon = "Noon",
  Evening = "Evening",
  Night = "Night",
}
