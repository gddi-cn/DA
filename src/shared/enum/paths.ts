export namespace Paths {
  export enum Primary {
    LAYOUT = '/',
    LOGIN = '/login',
    NOTFOUND = '*',
  }

  export enum Layout {
    HOME = '/',
    LABELING = '/app/labeling',
    SPACE = '/app/space',
    PROJECT = '/project/:id',
  }

  export enum Project {
    NEW = 'new',
    DATASET = 'dataset',
    MODEL = 'model',
    DEPLOY = 'deploy',
  }

  export enum Space {
    ACCOUNT = '/app/space/account',
    API = '/app/space/api',
    DEVICE = '/app/space/device',
    DEPLOY = '/app/space/deploy',
  }
}

