export namespace Space {
  export enum Page {
    USAGE = 1,
    ACCOUNT,
    DEVICE,
    APP,
    DEPLOY,
    API,
  }
  export namespace API {
    export enum Status {
      ACTIVE = 1,
      INACTIVE,
    }
  }
  export namespace App {
    export enum Page {
      LIST = 1,
      CREATE,
      DETAIL,
      CONFIG,
    }
    export namespace Detail {
      export enum Page {
        INFO,
        CONFIG,
        DEPLOY,
      }
    }
    export namespace Create {
      export enum Step {
        META,
        TEMPLATE,
      }
    }
  }
  export namespace Deploy {
    export enum Page {
      LIST = 1,
      CREATE,
      DETAIL,
      APP_DETAIL,
    }
    export namespace Create {
      export enum Step {
        DEVICE = 1,
        APP,
        OVERVIEW,
      }
    }
  }
}
