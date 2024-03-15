import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { watch, getCurrentInstance } from 'vue'

export default {
	install: (Vue, defaultLang) => {
		Vue.config.globalProperties.$defaultLang = defaultLang
		Vue.mixin({
			methods: {
				getLocalRoute({name, params = {}, hash = null}) {
					const route = {name, params, hash}
					if (this.$i18n.locale !== this.$defaultLang) {
						route.name += `:${this.$i18n.locale}`
					}
					return route
				}
			}
		})
	}
}

export const generateRoutes = (routes, defaultLang, otherLangs) => {
	const isArray = Array.isArray(otherLangs)
	const localizedRoutes = [...routes]
	if (isArray) {
		otherLangs.forEach(lang => {
			routes.forEach(route => {
				const newRoute = {
					...route,
					path: `/${lang}${getLocalizedPath(route, lang)}`,
					name: `${route.name}:${lang}`,
				}
				if(route.children && route.children.length) {
					route.children.forEach(child => {
						const newChild = {
							...child,
							path: `/${lang}${getLocalizedPath(child, lang)}`,
							name: `${child.name}:${lang}`,
						}
						newRoute.children.push(newChild)
					})
				}
				localizedRoutes.push(newRoute)
			})
		})
	} else {
		routes.forEach(route => {
			const newRoute = {
				...route,
				path: `/${otherLangs}${getLocalizedPath(route, otherLangs)}`,
				name: `${route.name}:${otherLangs}`,
			}
			if(route.children && route.children.length) {
				newRoute.children = []
				route.children.forEach(child => {
					const newChild = {
						...child,
						path: `/${otherLangs}${getLocalizedPath(child, otherLangs)}`,
						name: `${child.name}:${otherLangs}`,
					}
					newRoute.children.push(newChild)
				})
			}
			localizedRoutes.push(newRoute)
		})
	}
	return localizedRoutes
}

const getLocalizedPath = (route, lang) => {
	if (route.paths) {
		return route.paths[lang]
	} else {
		return route.path
	}
}

export const useLangRouter = () => {
	const app = getCurrentInstance()
	const defaultLang = app.appContext.config.globalProperties.$defaultLang
	const i18n = useI18n()
	const route = useRoute()
	const router = useRouter()

	watch(route, (to) => {
		if (to && to.name) {
			const routeName = to.name
			const routeLangIsDefault = routeName.indexOf(':') === -1
			if (routeLangIsDefault && i18n.locale.value === defaultLang) return
			if (routeLangIsDefault && i18n.locale.value !== defaultLang) {
				i18n.locale.value = defaultLang
				return
			}
			const routeLang = routeName.substr(routeName.indexOf(':'), routeName.length).replace(':', '')
			if (routeLang === i18n.locale.value) return
			else i18n.locale.value = routeLang
		}
	})

	watch(i18n.locale, (to) => {
		if (!route.name.includes(`:${to}`)) {
			let routeName = route.name
			if (routeName.indexOf(':') !== -1) {
				routeName = routeName.substr(0, routeName.indexOf(':'))
			}
			if (to === defaultLang) {
				router.replace({name: routeName})
			} else {
				routeName = `${routeName}:${to}`
				router.replace({name: routeName})
			}
		}
	})
}
