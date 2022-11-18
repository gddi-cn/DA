import { LicenseStatus, LicenseType } from '@src/shared/enum/license'

export const licenseTypeNameMapping: Map<LicenseType, string> = new Map([
  [LicenseType.SDK, /*         */'SDK 授权'],
  [LicenseType.DEMO, /*        */'Demo 授权'],
  [LicenseType.FULL, /*        */'完全授权'],
  [LicenseType.APPLICATION, /* */'应用授权'],
  [LicenseType.CLOUD, /*       */'云端授权']
])

export const licenseStatusNameMapping: Map<LicenseStatus, string> = new Map([
  [LicenseStatus.UNDER_REVIEW, /* */'申请中'],
  [LicenseStatus.PASS, /*         */'已授权'],
  [LicenseStatus.REJECT, /*       */'未通过'],
  [LicenseStatus.EXPIRE, /*       */'已失效'],
])

export const licenseStatusColorMapping: Map<LicenseStatus, string> = new Map([
  [LicenseStatus.UNDER_REVIEW, /* */'#2582c1'],
  [LicenseStatus.PASS, /*         */'#19a051'],
  [LicenseStatus.REJECT, /*       */'#ff6177'],
  [LicenseStatus.EXPIRE, /*       */'#bfbfbf'],
])