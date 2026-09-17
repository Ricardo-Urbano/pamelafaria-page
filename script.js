document.addEventListener('click', function (event) {
	const element = event.target.closest('a, button');

	if (!element || typeof window.gtag !== 'function') {
		return;
	}

	const label = element.getAttribute('aria-label') || element.textContent.trim().replace(/\s+/g, ' ');
	const url = element instanceof HTMLAnchorElement ? element.href : '';
	const eventName = element.dataset.analyticsEvent || 'clique_elemento';

	window.gtag('event', eventName, {
		event_category: 'engajamento',
		event_label: label.slice(0, 100),
		link_url: url,
		transport_type: 'beacon'
	});
});
