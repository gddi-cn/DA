declare namespace Experience {
  interface Instance {
    device_chip: string
    device_name: string
    expire: number
    id: string
    state: import('@src/shared/enum/experience').ExperienceState
    url: string
    current: number
  }
}
