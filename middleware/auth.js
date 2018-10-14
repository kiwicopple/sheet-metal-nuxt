export default async function ({ app, redirect, res, route, req, store }) {
  const token = app.$cookies.get('token')
  if (token) { // already logged in
    store.commit('setLoggedIn', true)
    app.$axios.setToken(token, 'Bearer') // All requests should also include the JWT token

    // get the sheets for this user
    let { data: sheets } = await app.$axios.get('/api/auth/sheets')
    store.commit('setSheetList', sheets)
  } else { // not logged in
    store.commit('setLoggedIn', false)
    app.$cookies.set('token', false)
    let matchedRoute = route.matched[0]
    let authOverride = matchedRoute.components.default.options.auth
    let routeRequiresAuth = (authOverride !== false)
    if (routeRequiresAuth) return redirect('/')
  }
}
