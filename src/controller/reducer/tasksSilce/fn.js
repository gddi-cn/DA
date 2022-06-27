
const fns = {
  addTask: (state, action) => {
    const { data } = action.payload
    state.userInfo = data
  },

  subTask: (state, action) => {
    const { data } = action.payload
    state.homePageInfo = data
  }
}
export default fns
