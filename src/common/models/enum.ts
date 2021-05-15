export enum RequestTypes {
  Post = "POST",
  Get = "GET",
  Delete = "DELETE",
  Put = "PUT",
  Patch = "PATCH",
}

export enum GeoJSONType {
  Point = "Point",
  LineString = "LineString",
  Polygon = "Polygon",
}

export enum ToastTitle {
  ApiError = "Request Failed",
  PermissionError = "Permission Error",
  LocationError = "Location Error",
  Error = "Error",
  Success = "Success",
  Warning = "Warning",
  FirebaseError = "App Error",
  FormError = "Form Validation Failed",
}
