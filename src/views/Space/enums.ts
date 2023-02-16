export namespace Space {
  export enum Page {
    USAGE = 1,
    ACCOUNT,
    DEVICE,
    APP,
    DEPLOY,
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
}
