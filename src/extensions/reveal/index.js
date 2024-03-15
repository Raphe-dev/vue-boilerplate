export default {
	install: (Vue) => {
		Vue.directive('reveal', {
			mounted: (el, binding) => {
				const delay = binding.value?.delay || 150
				const customClass = binding.value?.class || 'v-reveal'
				const customClassActive = binding.value?.activeClass || 'v-reveal-active'
				const repeat = binding.value?.repeat || false

				const observer = new IntersectionObserver((entries) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting && !entry.target.classList.contains(customClassActive)) {
							setTimeout(() => {
								entry.target.classList.add(customClassActive)
							}, delay)
						} else if (!entry.isIntersecting && repeat) {
							entry.target.classList.remove(customClassActive)
						}
					})
				})
				observer.observe(el)
				el.classList.add(customClass)
			}
		})
	}
}

