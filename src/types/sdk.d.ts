declare namespace SDK {
  declare namespace Document {
    interface Instance {
      adapted_chip: string
      name: string
      src: string
    }

    interface ListParams {
      model_iter_id?: string
    }
  }
}