(async function(){
	try{
		const res = await fetch('assets/static/data.json', { cache: 'no-store' })
		const data = await res.json()
		// Chart
		const mount = document.querySelector('#chart-ingredients-week')
		if(mount && window.ApexCharts){
			const categories = data.ingredients?.weekly?.categories || []
			const series = [{ name: 'Units', data: data.ingredients?.weekly?.data || [] }]
			const options = {
				series,
				chart: { type: 'bar', height: 350, toolbar: { show: false } },
				plotOptions: { bar: { columnWidth: '50%', borderRadius: 4 } },
				colors: ['#55c6e8'],
				xaxis: { categories },
				dataLabels: { enabled: false }
			}
			const chart = new ApexCharts(mount, options)
			chart.render()
		}
		// Table
		const tbody = document.getElementById('ingredients-table')
		if(tbody){
			const fmt = (v)=> new Intl.NumberFormat().format(v)
			tbody.innerHTML = (data.ingredients?.latest || []).map(r=>`
				<tr>
					<td>${r.item}</td>
					<td>${fmt(r.qty)}</td>
					<td>${r.unit}</td>
					<td>$${fmt(r.cost)}</td>
				</tr>
			`).join('')
		}
	}catch(e){
		console.error('Failed to load ingredients data', e)
	}
})() 