export enum RoleType {
  Admin = 'admin',
  Elderly = 'elderly',
  Volunteer = 'volunteer'
}

export interface RoleTypeMapValue {
  permissionKey: string;
  value: RoleType;
}

