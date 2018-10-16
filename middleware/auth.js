export default async function ({ app, redirect, res, route, req, store }) {
  const token = app.$cookies.get('token')
  if (token) { // already logged in
    app.$axios.setToken(token, 'Bearer') // All requests should also include the JWT token
  } else { // not logged in
    store.commit('setLoggedOut', false)
    let matchedRoute = route.matched[0]
    if (matchedRoute) { // redirect them unless the route overrides auth
      let authOverride = matchedRoute.components.default.options.auth
      let routeRequiresAuth = (authOverride !== false)
      if (routeRequiresAuth) return redirect('/')
    }
  }
}
