import { RoleType,  } from '@core/enums';
import {NameId} from '@core/models';

export class Role extends NameId {
  permissions: string[] = [];
  roleType: number;
  permissionList?: string[] = [];

  constructor(data?: Partial<Role>) {
    super(data);
    this.roleType = data?.roleType ?? RoleType.Volunteer;
    this.permissions = data?.permissions ?? [];
    this.permissionList = data?.permissionList;
  }
}
