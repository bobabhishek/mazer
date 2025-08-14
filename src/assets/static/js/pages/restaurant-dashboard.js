(async function () {
	const formatCurrency = (value) =>
		new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value)

	try {
		const res = await fetch('assets/static/data.json', { cache: 'no-store' })
		const data = await res.json()

		// KPIs
		const { ordersToday, revenueToday, avgOrderValue, fiveStarReviews } = data.kpis
		const el = (id) => document.getElementById(id)
		if (el('kpi-orders')) el('kpi-orders').textContent = ordersToday.toLocaleString()
		if (el('kpi-revenue')) el('kpi-revenue').textContent = formatCurrency(revenueToday)
		if (el('kpi-aov')) el('kpi-aov').textContent = formatCurrency(avgOrderValue)
		if (el('kpi-reviews')) el('kpi-reviews').textContent = fiveStarReviews.toLocaleString()

		// Orders Trend (Monthly)
		if (window.ApexCharts && document.querySelector('#chart-orders-monthly')) {
			const optionsOrdersMonthly = {
				annotations: { position: 'back' },
				dataLabels: { enabled: false },
				chart: { type: 'bar', height: 300 },
				fill: { opacity: 1 },
				series: [
					{ name: 'Orders', data: data.monthlyOrders.data }
				],
				colors: '#435ebe',
				xaxis: { categories: data.monthlyOrders.categories }
			}
			const chart = new ApexCharts(document.querySelector('#chart-orders-monthly'), optionsOrdersMonthly)
			chart.render()
		}

		// Sales by Channel (sparklines)
		const baseSpark = {
			chart: { height: 80, type: 'area', toolbar: { show: false }, sparkline: { enabled: true } },
			stroke: { width: 2 },
			grid: { show: false },
			dataLabels: { enabled: false },
			xaxis: { labels: { show: false }, axisBorder: { show: false }, axisTicks: { show: false } },
			yaxis: { labels: { show: false } },
			tooltip: { x: { show: false } }
		}

		const channels = [
			{ key: 'dinein', color: '#5350e9' },
			{ key: 'delivery', color: '#008b75' },
			{ key: 'takeaway', color: '#ffc434' },
			{ key: 'catering', color: '#dc3545' }
		]

		channels.forEach(({ key, color }) => {
			const section = data.channels[key]
			if (!section) return
			if (el(`count-${key}`)) el(`count-${key}`).textContent = (section.count ?? 0).toLocaleString()
			const mount = document.querySelector(`#chart-${key}`)
			if (!mount || !window.ApexCharts) return
			const seriesData = section.sparkline && section.sparkline.length ? section.sparkline : new Array(12).fill(0)
			const options = {
				...baseSpark,
				series: [{ name: key, data: seriesData }],
				colors: [color]
			}
			const chart = new ApexCharts(mount, options)
			chart.render()
		})

		// Customers Profile (Donut)
		if (window.ApexCharts && document.getElementById('chart-customers-profile')) {
			const optionsCustomers = {
				series: data.customersProfile.series,
				labels: data.customersProfile.labels,
				colors: ['#435ebe', '#55c6e8', '#ffc434'],
				chart: { type: 'donut', width: '100%', height: '350px' },
				legend: { position: 'bottom' },
				plotOptions: { pie: { donut: { size: '30%' } } }
			}
			const chart = new ApexCharts(document.getElementById('chart-customers-profile'), optionsCustomers)
			chart.render()
		}
	} catch (e) {
		// Fail silently but log in dev tools
		console.error('Failed to load restaurant analytics:', e)
	}
})() 