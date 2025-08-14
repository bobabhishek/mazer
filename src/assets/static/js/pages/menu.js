(async function(){
	try{
		const res = await fetch('assets/static/data.json', { cache: 'no-store' })
		const data = await res.json()
		const formatCurrency = (v)=> new Intl.NumberFormat(undefined,{style:'currency',currency:'USD',maximumFractionDigits:0}).format(v)
		const top = (data.menu?.items || []).sort((a,b)=>b.popularity-a.popularity).slice(0,6)
		const grid = document.getElementById('menu-grid')
		if(grid){
			grid.innerHTML = top.map(item => `
				<div class="col-md-4">
					<div class="card mb-3">
						<div class="card-body">
							<h5 class="card-title">${item.name}</h5>
							<p class="card-text text-muted mb-2">${item.category}</p>
							<div class="d-flex justify-content-between align-items-center">
								<span class="badge bg-primary">${formatCurrency(item.price)}</span>
								<span class="text-muted">Popularity: ${item.popularity}</span>
							</div>
						</div>
					</div>
				</div>
			`).join('')
		}
		const tbody = document.getElementById('menu-table')
		if(tbody){
			tbody.innerHTML = (data.menu?.items || []).map(item => `
				<tr>
					<td>${item.name}</td>
					<td>${item.category}</td>
					<td>${formatCurrency(item.price)}</td>
					<td>${item.popularity}</td>
				</tr>
			`).join('')
		}
	}catch(e){
		console.error('Failed to load menu', e)
	}
})() 