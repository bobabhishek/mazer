(async function(){
	try{
		const res = await fetch('assets/static/data.json', { cache: 'no-store' })
		const data = await res.json()
		const el = document.querySelector('#chart-revenue-daily')
		if(!el || !window.ApexCharts) return
		const seriesData = data.revenue?.daily?.data || []
		const categories = data.revenue?.daily?.categories || []
		const options = {
			series: [{ name: 'Revenue', data: seriesData }],
			chart: { type: 'area', height: 350, toolbar: { show: false } },
			colors: ['#435ebe'],
			dataLabels: { enabled: false },
			stroke: { curve: 'smooth', width: 2 },
			xaxis: { categories },
			yaxis: { labels: { formatter: (v)=> `$${Math.round(v)}` } },
			tooltip: { y: { formatter: (v)=> `$${Math.round(v)}` } }
		}
		const chart = new ApexCharts(el, options)
		chart.render()
	}catch(e){
		console.error('Failed to load revenue data', e)
	}
})() 