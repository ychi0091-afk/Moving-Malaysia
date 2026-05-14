const spec = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  width: 700,
  height: 350,
  data: { url: "data/ridership_daily_clean.csv" },
  transform: [
    {
      calculate: "datum.bus_rkl + datum.bus_rkn + datum.bus_rpn + datum.rail_lrt_ampang + datum.rail_lrt_kj + datum.rail_monorail + datum.rail_mrt_kajang + datum.rail_mrt_pjy + datum.rail_ets + datum.rail_intercity + datum.rail_komuter + datum.rail_komuter_utara + datum.rail_tebrau",
      as: "total_ridership"
    }
  ],
  mark: {
    type: "line",
    point: true
  },
  encoding: {
    x: {
      field: "date",
      type: "temporal",
      title: "Date"
    },
    y: {
      field: "total_ridership",
      type: "quantitative",
      title: "Total Ridership"
    },
    tooltip: [
      { field: "date", type: "temporal", title: "Date" },
      { field: "total_ridership", type: "quantitative", title: "Total Ridership" }
    ]
  }
};

vegaEmbed("#chart-total-trend", spec, { actions: false });