document.addEventListener('click', function (event) {
	const element = event.target.closest('a, button');

	if (!element || typeof window.gtag !== 'function') {
		return;
	}

	const label = element.getAttribute('aria-label') || element.textContent.trim().replace(/\s+/g, ' ');
	const url = element instanceof HTMLAnchorElement ? element.href : '';
	const eventName = element.dataset.analyticsEvent || getEventName(element, url);

	window.gtag('event', eventName, {
		event_category: 'engajamento',
		event_label: label.slice(0, 100),
		link_url: url,
		transport_type: 'beacon'
	});
});

function getEventName(element, url) {
	if (url.includes('wa.me')) {
		return element.textContent.includes('Agende seu horário') ? 'clique_agendar' : 'clique_whatsapp';
	}

	if (url.includes('google.com/maps/')) {
		return 'clique_localizacao';
	}

	if (url.includes('maps.app.goo.gl')) {
		return 'clique_google_negocio';
	}

	if (url.includes('instagram.com')) {
		return 'clique_instagram';
	}

	if (url.includes('meli.la')) {
		return 'clique_mercado_livre';
	}

	if (url.endsWith('/cursos/') || url.endsWith('/cursos')) {
		return 'clique_cursos';
	}

	if (url.endsWith('/produtos/') || url.endsWith('/produtos')) {
		return 'clique_produtos';
	}

	if (url.endsWith('/') || url.endsWith('/index.html')) {
		return 'clique_voltar';
	}

	return 'clique_elemento';
}
