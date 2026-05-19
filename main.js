const baseConfig = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  config: {
    background: "white",
    view: { stroke: "#dddddd" },
    axis: {
      labelFont: "Arial",
      titleFont: "Arial",
      labelFontSize: 11,
      titleFontSize: 12,
      gridColor: "#e6e6e6",
      tickColor: "#999999",
      labelColor: "#333333",
      titleColor: "#333333"
    },
    legend: {
      labelFont: "Arial",
      titleFont: "Arial",
      labelFontSize: 11,
      titleFontSize: 12
    }
  }
};

function withBase(spec) {
  return {
    ...baseConfig,
    ...spec,
    config: {
      ...baseConfig.config,
      ...(spec.config || {})
    }
  };
}

const malaysiaGeoJson = "data/malaysia.geojson";

const totalTrendSpec = withBase({
        width: 470,
        height: 150,
        layer: [
            {
            data: { url: "data/ridership_daily_clean.csv" },
            transform: [
                {
                calculate:
                    "toNumber(datum.bus_rkl) + toNumber(datum.bus_rkn) + toNumber(datum.bus_rpn) + toNumber(datum.rail_lrt_ampang) + toNumber(datum.rail_lrt_kj) + toNumber(datum.rail_monorail) + toNumber(datum.rail_mrt_kajang) + toNumber(datum.rail_mrt_pjy) + toNumber(datum.rail_ets) + toNumber(datum.rail_intercity) + toNumber(datum.rail_komuter) + toNumber(datum.rail_komuter_utara) + toNumber(datum.rail_tebrau)",
                as: "total_ridership"
                }
            ],
            mark: {
                type: "line",
                point: {
                filled: true,
                size: 18
                },
                strokeWidth: 2,
                color: "#2c7fb8"
            },
            encoding: {
                x: {
                field: "date",
                type: "temporal",
                title: "Date",
                axis: {
                    format: "%Y",
                    tickCount: 5,
                    labelAngle: 0,
                    labelFontSize: 8,
                    titleFontSize: 9,
                    grid: false
                }
                },
                y: {
                field: "total_ridership",
                type: "quantitative",
                title: "Total Ridership",
                axis: {
                    format: ".2s",
                    labelFontSize: 8,
                    titleFontSize: 9,
                    grid : false
                }
                },
                tooltip: [
                { field: "date", type: "temporal", title: "Date" },
                { field: "total_ridership", type: "quantitative", title: "Total Ridership", format: "," }
                ]
            }
            },

            {
            data: {
                values: [
                { event_date: "2020-03-18", label: "MCO starts" },
                { event_date: "2021-12-01", label: "Recovery phase" },
                { event_date: "2023-01-01", label: "Post-pandemic growth" }
                ]
            },
            mark: {
                type: "rule",
                strokeDash: [4, 4],
                color: "#666"
            },
            encoding: {
                x: { field: "event_date", type: "temporal" }
            }
            },

            {
            data: {
                values: [
                { event_date: "2020-03-18", y_pos: 1450000, label: "MCO starts" },
                { event_date: "2021-12-01", y_pos: 1370000, label: "Recovery phase" },
                { event_date: "2023-01-01", y_pos: 1520000, label: "Post-pandemic growth" }
                ]
            },
            mark: {
                type: "text",
                align: "left",
                dx: 4,
                dy: -4,
                fontSize: 8,
                color: "#444"
            },
            encoding: {
                x: { field: "event_date", type: "temporal" },
                y: { field: "y_pos", type: "quantitative" },
                text: { field: "label" }
            }
            },

            {
            data: { url: "data/ridership_daily_clean.csv" },
            transform: [
                {
                calculate:
                    "toNumber(datum.bus_rkl) + toNumber(datum.bus_rkn) + toNumber(datum.bus_rpn) + toNumber(datum.rail_lrt_ampang) + toNumber(datum.rail_lrt_kj) + toNumber(datum.rail_monorail) + toNumber(datum.rail_mrt_kajang) + toNumber(datum.rail_mrt_pjy) + toNumber(datum.rail_ets) + toNumber(datum.rail_intercity) + toNumber(datum.rail_komuter) + toNumber(datum.rail_komuter_utara) + toNumber(datum.rail_tebrau)",
                as: "total_ridership"
                },
                {
                window: [{ op: "rank", as: "rank_high" }],
                sort: [{ field: "total_ridership", order: "descending" }]
                },
                { filter: "datum.rank_high == 1" }
            ],
            mark: {
                type: "point",
                filled: true,
                color: "#d62728",
                size: 55
            },
            encoding: {
                x: { field: "date", type: "temporal" },
                y: { field: "total_ridership", type: "quantitative" }
            }
            },

            {
            data: { url: "data/ridership_daily_clean.csv" },
            transform: [
                {
                calculate:
                    "toNumber(datum.bus_rkl) + toNumber(datum.bus_rkn) + toNumber(datum.bus_rpn) + toNumber(datum.rail_lrt_ampang) + toNumber(datum.rail_lrt_kj) + toNumber(datum.rail_monorail) + toNumber(datum.rail_mrt_kajang) + toNumber(datum.rail_mrt_pjy) + toNumber(datum.rail_ets) + toNumber(datum.rail_intercity) + toNumber(datum.rail_komuter) + toNumber(datum.rail_komuter_utara) + toNumber(datum.rail_tebrau)",
                as: "total_ridership"
                },
                {
                window: [{ op: "rank", as: "rank_high" }],
                sort: [{ field: "total_ridership", order: "descending" }]
                },
                { filter: "datum.rank_high == 1" }
            ],
            mark: {
                type: "text",
                dx: -10,
                dy: -8,
                fontSize: 8,
                color: "#d62728"
            },
            encoding: {
                x: { field: "date", type: "temporal" },
                y: { field: "total_ridership", type: "quantitative" },
                text: { value: "Peak" }
            }
            },

            {
            data: { url: "data/ridership_daily_clean.csv" },
            transform: [
                {
                calculate:
                    "toNumber(datum.bus_rkl) + toNumber(datum.bus_rkn) + toNumber(datum.bus_rpn) + toNumber(datum.rail_lrt_ampang) + toNumber(datum.rail_lrt_kj) + toNumber(datum.rail_monorail) + toNumber(datum.rail_mrt_kajang) + toNumber(datum.rail_mrt_pjy) + toNumber(datum.rail_ets) + toNumber(datum.rail_intercity) + toNumber(datum.rail_komuter) + toNumber(datum.rail_komuter_utara) + toNumber(datum.rail_tebrau)",
                as: "total_ridership"
                },
                {
                window: [{ op: "rank", as: "rank_low" }],
                sort: [{ field: "total_ridership", order: "ascending" }]
                },
                { filter: "datum.rank_low == 1" }
            ],
            mark: {
                type: "point",
                filled: true,
                color: "#2ca02c",
                size: 55
            },
            encoding: {
                x: { field: "date", type: "temporal" },
                y: { field: "total_ridership", type: "quantitative" }
            }
            },

            {
            data: { url: "data/ridership_daily_clean.csv" },
            transform: [
                {
                calculate:
                    "toNumber(datum.bus_rkl) + toNumber(datum.bus_rkn) + toNumber(datum.bus_rpn) + toNumber(datum.rail_lrt_ampang) + toNumber(datum.rail_lrt_kj) + toNumber(datum.rail_monorail) + toNumber(datum.rail_mrt_kajang) + toNumber(datum.rail_mrt_pjy) + toNumber(datum.rail_ets) + toNumber(datum.rail_intercity) + toNumber(datum.rail_komuter) + toNumber(datum.rail_komuter_utara) + toNumber(datum.rail_tebrau)",
                as: "total_ridership"
                },
                {
                window: [{ op: "rank", as: "rank_low" }],
                sort: [{ field: "total_ridership", order: "ascending" }]
                },
                { filter: "datum.rank_low == 1" }
            ],
            mark: {
                type: "text",
                dx: 8,
                dy: -8,
                fontSize: 8,
                color: "#2ca02c",
                align: "left",
                baseline: "bottom"
            },
            encoding: {
                x: { field: "date", type: "temporal" },
                y: { field: "total_ridership", type: "quantitative" },
                text: { value: "Lowest" }
            }
            }
        ]
        });

const modeSpec = withBase({
        width: 380,
        height: 180,
        autosize: {
            type: "fit",
            contains: "padding"
        },
        data: { url: "data/ridership_by_mode.csv" },
        mark: {
            type: "area",
            opacity: 0.85,
            clip: true
        },
        encoding: {
            x: {
            field: "date",
            type: "temporal",
            title: null,
            axis: {
                format: "%Y",
                tickCount: 4,
                labelAngle: 0,
                labelFontSize: 7,
                titleFontSize: 8,
                grid:false
            }
            },
            y: {
            field: "ridership",
            type: "quantitative",
            stack: true,
            title: "Ridership",
            axis: {
                format: ".2s",
                labelFontSize: 7,
                titleFontSize: 8,
                grid:false
            }
            },
            color: {
            field: "mode",
            type: "nominal",
            title: "Mode",
            scale: {
                domain: ["Bus", "KTM", "LRT", "MRT", "Monorail"]
            },
            legend: {
                orient: "right",
                labelFontSize: 7,
                titleFontSize: 8,
                symbolSize: 20,
                offset: 4
            }
            },
            tooltip: [
            { field: "date", type: "temporal", title: "Date" },
            { field: "mode", type: "nominal", title: "Mode" },
            { field: "ridership", type: "quantitative", title: "Ridership", format: "," }
            ]
        }
        });

const weekdayWeekendSpec = withBase({
    width: 420,
    height: 160,
    data: { url: "data/ridership_daily_clean.csv" },
    transform: [
        {
        calculate:
            "toNumber(datum.bus_rkl) + toNumber(datum.bus_rkn) + toNumber(datum.bus_rpn) + toNumber(datum.rail_lrt_ampang) + toNumber(datum.rail_lrt_kj) + toNumber(datum.rail_monorail) + toNumber(datum.rail_mrt_kajang) + toNumber(datum.rail_mrt_pjy) + toNumber(datum.rail_ets) + toNumber(datum.rail_intercity) + toNumber(datum.rail_komuter) + toNumber(datum.rail_komuter_utara) + toNumber(datum.rail_tebrau)",
        as: "total_ridership"
        },
        {
        calculate: "day(datum.date) == 0 || day(datum.date) == 6 ? 'Weekend' : 'Weekday'",
        as: "day_type"
        }
    ],
    layer: [
        {
        mark: {
            type: "bar",
            cornerRadiusTopLeft: 3,
            cornerRadiusTopRight: 3
        },
        encoding: {
            x: {
                field: "day_type",
                type: "nominal",
                title: null,
                axis: {
                    labelFontSize: 8,
                    labelAngle: 0,
                    grid:false
                }
                },
            y: {
            aggregate: "average",
            field: "total_ridership",
            type: "quantitative",
            title: "Avg Ridership",
            axis: {
                labelFontSize: 8,
                titleFontSize: 9,
                format: ".2s",
                labelAngle: 0,
                grid:false
            }
            },
            color: {
            field: "day_type",
            type: "nominal",
            legend: null
            }
        }
        },
        {
        mark: {
            type: "text",
            dy: -6,
            fontSize: 7,
            color: "#333"
        },
        encoding: {
            x: { field: "day_type", type: "nominal" },
            y: {
            aggregate: "average",
            field: "total_ridership",
            type: "quantitative"
            },
            text: {
            aggregate: "average",
            field: "total_ridership",
            type: "quantitative",
            format: ".2s"
            }
        }
        }
    ]
    });

const yearlyAverageSpec = withBase({
    width: 300,
    height: 160,
    data: { url: "data/ridership_daily_clean.csv" },
    transform: [
        {
        calculate:
            "toNumber(datum.bus_rkl) + toNumber(datum.bus_rkn) + toNumber(datum.bus_rpn) + toNumber(datum.rail_lrt_ampang) + toNumber(datum.rail_lrt_kj) + toNumber(datum.rail_monorail) + toNumber(datum.rail_mrt_kajang) + toNumber(datum.rail_mrt_pjy) + toNumber(datum.rail_ets) + toNumber(datum.rail_intercity) + toNumber(datum.rail_komuter) + toNumber(datum.rail_komuter_utara) + toNumber(datum.rail_tebrau)",
        as: "total_ridership"
        },
        {
        timeUnit: "year",
        field: "date",
        as: "year_date"
        },
        {
        calculate: "timeFormat(datum.year_date, '%Y')",
        as: "year_label"
        }
    ],
    layer: [
        {
        mark: {
            type: "bar",
            color: "#6baed6"
        },
        encoding: {
            x: {
            field: "year_label",
            type: "ordinal",
            title: null,
            axis: {
                labelFontSize: 8,
                labelAngle: 0,
                grid:false
            }
            },
            y: {
            aggregate: "average",
            field: "total_ridership",
            type: "quantitative",
            title: "Avg Ridership",
            axis: {
                labelFontSize: 8,
                titleFontSize: 9,
                format: ".2s",
                grid:false
            }
            }
        }
        },
        {
        mark: {
            type: "text",
            dy: -6,
            fontSize: 7,
            color: "#333"
        },
        encoding: {
            x: { field: "year_label", type: "ordinal" },
            y: {
            aggregate: "average",
            field: "total_ridership",
            type: "quantitative"
            },
            text: {
            aggregate: "average",
            field: "total_ridership",
            type: "quantitative",
            format: ".2s"
            }
        }
        }
    ]
    });

const serviceBarSpec = withBase({
        width: 320,
        height: 190,
        data: { url: "data/service_daily.csv" },
        transform: [
            {
            aggregate: [
                { op: "average", field: "ridership", as: "avg_ridership" }
            ],
            groupby: ["service"]
            },
            {
            window: [
                { op: "rank", as: "service_rank" }
            ],
            sort: [
                { field: "avg_ridership", order: "descending" }
            ]
            },
            {
            calculate: "datum.service_rank <= 3 ? 'Top 3' : 'Others'",
            as: "highlight_group"
            }
        ],
        mark: {
            type: "bar"
        },
        encoding: {
            y: {
            field: "service",
            type: "nominal",
            sort: "-x",
            title: "Service",
            axis: {
                labelFontSize: 8,
                titleFontSize: 9,
                grid:false
            }
            },
            x: {
            field: "avg_ridership",
            type: "quantitative",
            title: "Average Daily Ridership",
            axis: {
                labelFontSize: 8,
                titleFontSize: 9,
                format: ".2s",
                grid:false
            }
            },
            color: {
            field: "highlight_group",
            type: "nominal",
            scale: {
                domain: ["Top 3", "Others"],
                range: ["#4e79a7", "#a0c4e4"]
            },
            legend: null
            },
            tooltip: [
            { field: "service", type: "nominal", title: "Service" },
            { field: "avg_ridership", type: "quantitative", title: "Average Daily Ridership", format: "," },
            { field: "service_rank", type: "quantitative", title: "Rank" }
            ]
        }
        });

const serviceRankSpec = withBase({
  width: 320,
  height: 190,
  data: { url: "data/service_daily.csv" },
  transform: [
    {
      aggregate: [
        { op: "average", field: "ridership", as: "avg_ridership" }
      ],
      groupby: ["service"]
    },
    {
      calculate: "0",
      as: "zero"
    },
    {
      calculate: "datum.avg_ridership >= 120000 ? 'Top services' : 'Other services'",
      as: "highlight_group"
    }
  ],
  layer: [
    {
      mark: {
        type: "rule",
        strokeWidth: 1.4,
        color: "#d0d0d0"
      },
      encoding: {
        y: {
          field: "service",
          type: "nominal",
          sort: { field: "avg_ridership", order: "descending" },
          title: "Service",
          axis: {
            labelFontSize: 8,
            titleFontSize: 9,
            grid:false
          }
        },
        x: {
          field: "zero",
          type: "quantitative"
        },
        x2: {
          field: "avg_ridership"
        }
      }
    },
    {
      mark: {
        type: "point",
        filled: true,
        size: 75
      },
      encoding: {
        y: {
          field: "service",
          type: "nominal",
          sort: { field: "avg_ridership", order: "descending" },
          title: "Service",
          axis: {
            labelFontSize: 8,
            titleFontSize: 9,
            grid:false
          }
        },
        x: {
          field: "avg_ridership",
          type: "quantitative",
          title: "Average Daily Ridership",
          axis: {
            labelFontSize: 8,
            titleFontSize: 9,
            format: ".2s",
            grid:false
          }
        },
        color: {
          field: "highlight_group",
          type: "nominal",
          scale: {
            domain: ["Top services", "Other services"],
            range: ["#2c7fb8", "#9ecae1"]
          },
          legend: null
        },
        tooltip: [
          { field: "service", type: "nominal", title: "Service" },
          { field: "avg_ridership", type: "quantitative", title: "Average Daily Ridership", format: "," }
        ]
      }
    }
  ]
});

const malaysiaMapSpec = withBase({
  width: 400,
  height: 230,
  projection: {
    type: "mercator",
    center: [109.5, 3.7],
    scale: 1150
  },
  layer: [
    {
      data: {
        url: malaysiaGeoJson,
        format: {
          type: "json",
          property: "features"
        }
      },
      mark: {
        type: "geoshape",
        fill: "#e5ead7",
        stroke: "#7f8c8d",
        strokeWidth: 0.8,
        clip: true
      }
    },
    {
      data: {
        values: [
          { place: "Penang", longitude: 100.33, latitude: 5.41 },
          { place: "Klang Valley", longitude: 101.68, latitude: 3.14 },
          { place: "Johor Bahru", longitude: 103.76, latitude: 1.49 },
          { place: "Kota Kinabalu", longitude: 116.07, latitude: 5.98 }
        ]
      },
      mark: {
        type: "text",
        fontSize: 8,
        fontWeight: "bold",
        color: "#444",
        dx: 5,
        dy: -5
      },
      encoding: {
        longitude: {
          field: "longitude",
          type: "quantitative"
        },
        latitude: {
          field: "latitude",
          type: "quantitative"
        },
        text: {
          field: "place",
          type: "nominal"
        }
      }
    },
    {
      data: {
        url: "data/stations_clean.csv"
      },
      mark: {
        type: "circle",
        filled: true,
        opacity: 0.9,
        stroke: "white",
        strokeWidth: 0.7,
        clip: true
      },
      encoding: {
        longitude: {
          field: "longitude",
          type: "quantitative"
        },
        latitude: {
          field: "latitude",
          type: "quantitative"
        },
        color: {
          field: "mode",
          type: "nominal",
          title: "Mode",
          scale: {
            domain: ["Bus", "KTM", "LRT", "MRT", "Monorail"]
          },
          legend: {
            orient: "right",
            labelFontSize: 7,
            titleFontSize: 8,
            symbolSize: 30
          }
        },
        size: {
          value: 55
        },
        tooltip: [
          { field: "name", type: "nominal", title: "Station" },
          { field: "mode", type: "nominal", title: "Mode" },
          { field: "region", type: "nominal", title: "Region" },
          { field: "latitude", type: "quantitative", title: "Latitude" },
          { field: "longitude", type: "quantitative", title: "Longitude" }
        ]
      }
    }
  ],
  config: {
    background: "#dcecf7",
    view: {
      stroke: null
    }
  }
});

const klangMapSpec = withBase({
  width: 400,
  height: 230,
  projection: {
    type: "mercator",
    center: [101.68, 3.05],
    scale: 27000
  },
  layer: [
    {
      data: {
        url: malaysiaGeoJson,
        format: {
          type: "json",
          property: "features"
        }
      },
      mark: {
        type: "geoshape",
        fill: "#e5ead7",
        stroke: "#7f8c8d",
        strokeWidth: 0.8,
        clip: true
      }
    },
    {
      data: {
        values: [
          { place: "Kuala Lumpur", longitude: 101.69, latitude: 3.14 },
          { place: "Klang", longitude: 101.45, latitude: 3.04 },
          { place: "Shah Alam", longitude: 101.52, latitude: 3.07 },
          { place: "Putrajaya", longitude: 101.69, latitude: 2.93 }
        ]
      },
      mark: {
        type: "text",
        fontSize: 8,
        fontWeight: "bold",
        color: "#444",
        dx: 5,
        dy: -5
      },
      encoding: {
        longitude: {
          field: "longitude",
          type: "quantitative"
        },
        latitude: {
          field: "latitude",
          type: "quantitative"
        },
        text: {
          field: "place",
          type: "nominal"
        }
      }
    },
    {
      data: {
        url: "data/stations_clean.csv"
      },
      transform: [
        {
          filter: "datum.region == 'Klang Valley'"
        }
      ],
      mark: {
        type: "circle",
        filled: true,
        opacity: 0.95,
        stroke: "white",
        strokeWidth: 0.8,
        clip: true
      },
      encoding: {
        longitude: {
          field: "longitude",
          type: "quantitative"
        },
        latitude: {
          field: "latitude",
          type: "quantitative"
        },
        color: {
          field: "mode",
          type: "nominal",
          title: "Mode",
          scale: {
            domain: ["KTM", "LRT", "MRT", "Monorail"]
          },
          legend: {
            orient: "right",
            labelFontSize: 7,
            titleFontSize: 8,
            symbolSize: 30
          }
        },
        size: {
          value: 70
        },
        tooltip: [
          { field: "name", type: "nominal", title: "Station" },
          { field: "mode", type: "nominal", title: "Mode" },
          { field: "region", type: "nominal", title: "Region" },
          { field: "latitude", type: "quantitative", title: "Latitude" },
          { field: "longitude", type: "quantitative", title: "Longitude" }
        ]
      }
    }
  ],
  config: {
    background: "#dcecf7",
    view: {
      stroke: null
    }
  }
});

const coverageScatterSpec = withBase({
  width: 380,
  height: 230,
  data: { url: "data/coverage_usage_clean.csv" },
  layer: [
    {
      transform: [
        {
          regression: "avg_daily_ridership",
          on: "stations",
          extent: [6, 19]
        }
      ],
      mark: {
        type: "line",
        stroke: "#9e9e9e",
        strokeDash: [5, 4],
        strokeWidth: 1.5
      },
      encoding: {
        x: {
          field: "stations",
          type: "quantitative",
          title: "Number of Stations / Terminals",
          axis: {
            labelFontSize: 9,
            titleFontSize: 10,
            grid: false
          }
        },
        y: {
          field: "avg_daily_ridership",
          type: "quantitative",
          title: "Average Daily Ridership",
          axis: {
            labelFontSize: 9,
            titleFontSize: 10,
            format: ".2s",
            grid: false
          }
        }
      }
    },
    {
      mark: {
        type: "circle",
        filled: true,
        opacity: 0.85,
        stroke: "white",
        strokeWidth: 1
      },
      encoding: {
        x: {
          field: "stations",
          type: "quantitative",
          title: "Number of Stations / Terminals",
          axis: {
            labelFontSize: 9,
            titleFontSize: 10,
            grid: false
          }
        },
        y: {
          field: "avg_daily_ridership",
          type: "quantitative",
          title: "Average Daily Ridership",
          axis: {
            labelFontSize: 9,
            titleFontSize: 10,
            format: ".2s",
            grid: false
          }
        },
        size: {
          field: "ridership_per_station",
          type: "quantitative",
          legend: null
        },
        color: {
          field: "region",
          type: "nominal",
          legend: null
        },
        tooltip: [
          { field: "region", type: "nominal", title: "Region" },
          { field: "stations", type: "quantitative", title: "Stations / Terminals" },
          { field: "avg_daily_ridership", type: "quantitative", title: "Average Daily Ridership", format: "," },
          { field: "ridership_per_station", type: "quantitative", title: "Ridership per Station", format: "," }
        ]
      }
    },
    {
      mark: {
        type: "text",
        fontSize: 9,
        color: "#444",
        baseline: "top",
        align: "center",
        dy: 12
      },
      encoding: {
        x: { field: "stations", type: "quantitative" },
        y: { field: "avg_daily_ridership", type: "quantitative" },
        text: { field: "region", type: "nominal" }
      }
    }
  ],
  config: {
    view: { stroke: null }
  }
});
const ridershipPerStationSpec = withBase({
  width: 380,
  height: 230,
  data: { url: "data/coverage_usage_clean.csv" },
  transform: [
    {
      joinaggregate: [
        { op: "mean", field: "ridership_per_station", as: "overall_avg" }
      ]
    }
  ],
  layer: [
    {
      mark: {
        type: "rule",
        strokeWidth: 2,
        color: "#c7c7c7"
      },
      encoding: {
        y: {
          field: "region",
          type: "nominal",
          sort: "-x",
          title: "Region",
          axis: {
            labelFontSize: 9,
            titleFontSize: 10
          }
        },
        x: {
          field: "overall_avg",
          type: "quantitative",
          title: "Average Daily Ridership per Station",
          axis: {
            labelFontSize: 9,
            titleFontSize: 10,
            format: ".2s",
            grid: false
          }
        },
        x2: {
          field: "ridership_per_station"
        }
      }
    },
    {
      mark: {
        type: "point",
        filled: true,
        size: 80,
        color: "#999999"
      },
      encoding: {
        y: {
          field: "region",
          type: "nominal",
          sort: "-x"
        },
        x: {
          field: "overall_avg",
          type: "quantitative"
        }
      }
    },
    {
      mark: {
        type: "point",
        filled: true,
        size: 95,
        color: "#5b8cc0",
        stroke: "white",
        strokeWidth: 1
      },
      encoding: {
        y: {
          field: "region",
          type: "nominal",
          sort: "-x"
        },
        x: {
          field: "ridership_per_station",
          type: "quantitative"
        }
      }
    },
    {
      transform: [
        { filter: "datum.ridership_per_station < datum.overall_avg" }
      ],
      mark: {
        type: "text",
        fontSize: 9,
        color: "#333",
        baseline: "middle",
        align: "right",
        dx: -10
      },
      encoding: {
        y: {
          field: "region",
          type: "nominal",
          sort: "-x"
        },
        x: {
          field: "ridership_per_station",
          type: "quantitative"
        },
        text: {
          field: "ridership_per_station",
          type: "quantitative",
          format: ".2s"
        }
      }
    },
    {
      transform: [
        { filter: "datum.ridership_per_station >= datum.overall_avg" }
      ],
      mark: {
        type: "text",
        fontSize: 9,
        color: "#333",
        baseline: "middle",
        align: "left",
        dx: 10
      },
      encoding: {
        y: {
          field: "region",
          type: "nominal",
          sort: "-x"
        },
        x: {
          field: "ridership_per_station",
          type: "quantitative"
        },
        text: {
          field: "ridership_per_station",
          type: "quantitative",
          format: ".2s"
        }
      }
    }
  ],
  config: {
    view: { stroke: null }
  }
});

vegaEmbed("#chart-total-trend", totalTrendSpec, { actions: false, renderer: "svg" });
vegaEmbed("#chart-mode", modeSpec, { actions: false, renderer: "svg" });
vegaEmbed("#chart-weekday-weekend", weekdayWeekendSpec, { actions: false, renderer: "svg" });
vegaEmbed("#chart-yearly-average", yearlyAverageSpec, { actions: false, renderer: "svg" });
vegaEmbed("#chart-service-bar", serviceBarSpec, { actions: false, renderer: "svg" });
vegaEmbed("#chart-service-rank", serviceRankSpec, { actions: false, renderer: "svg" });
vegaEmbed("#chart-malaysia-map", malaysiaMapSpec, { actions: false, renderer: "svg" });
vegaEmbed("#chart-klang-map", klangMapSpec, { actions: false, renderer: "svg" });
vegaEmbed("#chart-coverage-scatter", coverageScatterSpec, { actions: false, renderer: "svg" });
vegaEmbed("#chart-ridership-per-station", ridershipPerStationSpec, { actions: false, renderer: "svg" });