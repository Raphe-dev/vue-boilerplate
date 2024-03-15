export const setMeta = seo => {
	document.title = seo.title || 'Vue 3 boilerplate'
	const metas = document.getElementsByTagName('meta')
	metas['og:title'].content = seo.title || ''
	metas['description'].content = seo.description || ''
	metas['og:description'].content = seo.description || ''
	metas['og:image'].content = seo.image || ''
	metas['og:type'].content = seo.type || 'website'
	metas['twitter:card'].content = seo.twitter || seo.description || 'summary'
}
