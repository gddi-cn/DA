declare namespace Unremarked {
  type Step = 'base' | 'requirement' | 'process'

  declare namespace Form {
    interface Base {
      cover: Array<import('antd').UploadFile>
      name: string
      summary: string
    }

    interface Requirement {
      demandDescribe: string
      examples: Array<import('antd').UploadFile>
      scene: string
    }
  }
}
