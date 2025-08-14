<h1 align="center">Viju's Restaurant Dashboard (Mazer Customization)</h1>

<p align="center">A customized admin dashboard for <strong>Viju's Restaurant</strong> built on top of <a href="https://github.com/zuramai/mazer">Mazer</a> (MIT-licensed, Bootstrap 5). Charts and KPIs are data-driven via <code>assets/static/data.json</code>.</p>

<p align="center">
  <a href="https://github.com/zuramai/mazer">Base Template</a>
  ·
  <a href="#features">Features</a>
  ·
  <a href="#getting-started">Getting Started</a>
  ·
  <a href="#data-driven-analytics">Data</a>
</p>

## Features

- Restaurant-themed landing dashboard at `src/index.html`
  - KPIs: Today's Orders, Revenue, Avg. Order Value, 5-Star Reviews
  - Orders Trend (monthly) bar chart
  - Sales by Channel (Dine-in, Delivery, Takeaway, Catering) sparklines + totals
  - Customer Types donut chart (Returning, New, VIP)
- Data-driven: all analytics values are loaded from `src/assets/static/data.json`
- Title/branding updated via build-time template variables

## Getting Started

### Prerequisites
- Node.js 18+

### Install
```sh
npm install
# or
yarn install
```

### Run Dev Server
```sh
npm run dev
```
Open `http://localhost:5173`.

### Build
```sh
npm run build
```
The static build is emitted to `dist/`.

## Data-Driven Analytics
All chart data and KPIs are read from:
- `src/assets/static/data.json` (copied to `dist/assets/static/data.json` during build)

Example schema:
```json
{
  "kpis": {
    "ordersToday": 156,
    "revenueToday": 4820,
    "avgOrderValue": 31,
    "fiveStarReviews": 28
  },
  "monthlyOrders": {
    "categories": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    "data": [420, 510, 590, 640, 700, 820, 910, 980, 860, 740, 690, 760]
  },
  "channels": {
    "dinein": { "count": 862, "sparkline": [35,42,39,51,62,69,58,64,70,72,68,75] },
    "delivery": { "count": 375, "sparkline": [20,28,25,33,31,37,40,44,41,39,36,38] },
    "takeaway": { "count": 625, "sparkline": [18,22,24,27,30,34,36,38,37,35,33,31] },
    "catering": { "count": 102, "sparkline": [2,3,4,6,8,7,9,11,10,9,8,14] }
  },
  "customersProfile": { "labels": ["Returning", "New", "VIP"], "series": [62, 32, 6] }
}
```

Update the JSON to change the dashboard without touching HTML/JS wiring.

## What Changed vs. Upstream Mazer
- `vite.config.js`: set `web_title` to "Viju's Restaurant Dashboard"
- `src/index.html`: restaurant-focused layout, new component IDs, and script include
- `src/assets/static/js/pages/restaurant-dashboard.js`: loads `data.json` and renders ApexCharts + KPIs
- `src/assets/static/data.json`: example analytics data
- `README.md`: this file

## License
- Base template: Mazer (MIT)
- This customization: MIT
