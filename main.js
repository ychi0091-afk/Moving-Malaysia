const baseConfig = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  config: {
    background: "white",
    font: "Arial",
    title: {
      font: "Arial",
      subtitleFont: "Arial"
    },
    view: { stroke: null },
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
    },
    header: {
      labelFont: "Arial",
      titleFont: "Arial"
    },
    text: {
      font: "Arial"
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
const malaysiaStateGeoJson = "data/malaysia_states.geojson";
const malaysiaDistrictGeoJson = "data/malaysia_districts.geojson";
const modeColorScale = {
  domain: ["Bus", "KTM", "LRT", "MRT", "Monorail"],
  range: ["#4e79a7", "#f28e2b", "#e15759", "#76b7b2", "#59a14f"]
};


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
                dy: 3,
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
    },
    {
      aggregate: [
        { op: "average", field: "total_ridership", as: "avg_ridership" }
      ],
      groupby: ["day_type"]
    },
    {
      calculate: "datum.day_type == 'Weekday' ? 1 : 2",
      as: "sort_order"
    },
    {
      calculate: "datum.day_type == 'Weekday' ? '#4e79a7' : '#d9d9d9'",
      as: "bar_colour"
    }
  ],
  layer: [
    {
      mark: {
        type: "bar",
        cornerRadiusTopLeft: 4,
        cornerRadiusTopRight: 4
      },
      encoding: {
        x: {
          field: "day_type",
          type: "nominal",
          sort: { field: "sort_order" },
          title: null,
          axis: {
            labelFontSize: 8,
            labelAngle: 0,
            grid: false
          }
        },
        y: {
          field: "avg_ridership",
          type: "quantitative",
          title: "Avg Ridership",
          axis: {
            labelFontSize: 8,
            titleFontSize: 9,
            format: ".2s",
            grid: false
          }
        },
        color: {
          field: "bar_colour",
          type: "nominal",
          scale: null,
          legend: null
        },
        tooltip: [
          { field: "day_type", type: "nominal", title: "Day Type" },
          { field: "avg_ridership", type: "quantitative", title: "Average Ridership", format: "," }
        ]
      }
    },
    {
      mark: {
        type: "text",
        dy: -8,
        fontSize: 8,
        fontWeight: "bold",
        color: "#333"
      },
      encoding: {
        x: {
          field: "day_type",
          type: "nominal",
          sort: { field: "sort_order" }
        },
        y: {
          field: "avg_ridership",
          type: "quantitative"
        },
        text: {
          field: "avg_ridership",
          type: "quantitative",
          format: ".2s"
        }
      }
    },
    {
      data: {
          values: [
            {
              x_pos: "Weekday",
              y_pos: 1060000,
              label: "Weekday demand is higher"
            }
          ]
        },
        mark: {
          type: "text",
          align: "left",
          dx: 15,
          dy: -2,
          fontSize: 8,
          fontWeight: "bold",
          color: "#4e79a7"
        },
        encoding: {
          x: {
            field: "x_pos",
            type: "nominal",
            sort: ["Weekday", "Weekend"]
          },
          y: {
            field: "y_pos",
            type: "quantitative"
          },
          text: {
            field: "label"
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
    },
    {
      aggregate: [
        { op: "average", field: "total_ridership", as: "avg_ridership" }
      ],
      groupby: ["year_label"]
    },
    {
      calculate: "datum.year_label == '2020' ? 'Lowest year' : datum.year_label == '2026' ? 'Latest peak' : 'Other years'",
      as: "year_highlight"
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
          field: "year_label",
          type: "ordinal",
          title: null,
          axis: {
            labelFontSize: 8,
            labelAngle: 0,
            grid: false
          }
        },
        y: {
          field: "avg_ridership",
          type: "quantitative",
          title: "Avg Ridership",
          axis: {
            labelFontSize: 8,
            titleFontSize: 9,
            format: ".2s",
            grid: false
          }
        },
        color: {
          field: "year_highlight",
          type: "nominal",
          scale: {
            domain: ["Lowest year", "Latest peak", "Other years"],
            range: ["#d62728", "#2c7fb8", "#d9d9d9"]
          },
          legend: null
        },
        tooltip: [
          { field: "year_label", type: "ordinal", title: "Year" },
          { field: "avg_ridership", type: "quantitative", title: "Average Ridership", format: "," },
          { field: "year_highlight", type: "nominal", title: "Status" }
        ]
      }
    },
    {
      transform: [
        {
          filter: "datum.year_label == '2019'"
        }
      ],
      mark: {
        type: "rule",
        strokeDash: [4, 4],
        strokeWidth: 1.2,
        color: "#666"
      },
      encoding: {
        y: {
          field: "avg_ridership",
          type: "quantitative"
        }
      }
    },
    {
    data: {
        values: [
          {
            year_label: "2019",
            y_pos: 900000,
            label: "2019 pre-pandemic level"
          }
        ]
      },
      mark: {
        type: "text",
        align: "left",
        dx: 20,
        dy: -10,
        fontSize: 7,
        color: "#555"
      },
      encoding: {
        x: {
          field: "year_label",
          type: "ordinal"
        },
        y: {
          field: "y_pos",
          type: "quantitative"
        },
        text: {
          field: "label"
        }
      }
    },
    {
      mark: {
        type: "text",
        dy: -7,
        fontSize: 7,
        color: "#333"
      },
      encoding: {
        x: {
          field: "year_label",
          type: "ordinal"
        },
        y: {
          field: "avg_ridership",
          type: "quantitative"
        },
        text: {
          field: "avg_ridership",
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
                range: ["#2c7fb8", "#d9d9d9"]
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
            domain: ["Top 3", "Others"],
            range: ["#2c7fb8", "#d9d9d9"]
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
  height: 250,
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
      url: malaysiaDistrictGeoJson,
      format: {
        type: "json",
        property: "features"
      }
    },
    mark: {
      type: "geoshape",
      fill: null,
      stroke: "#ffffff",
      strokeWidth: 0.45,
      opacity: 0.9,
      clip: true
    }
  },
  {
    data: {
      url: malaysiaStateGeoJson,
      format: {
        type: "json",
        property: "features"
      }
    },
    mark: {
      type: "geoshape",
      fill: null,
      stroke: "#5f6f72",
      strokeWidth: 1.1,
      opacity: 0.95,
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
        opacity: 0.6,
        stroke: "#333333",
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
          scale: modeColorScale,
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
      stroke: "#d0d0d0",
      strokeWidth: 1
    }
  }
});

const klangMapSpec = withBase({
  width: 400,
  height: 250,
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
    url: malaysiaDistrictGeoJson,
    format: {
      type: "json",
      property: "features"
    }
  },
  mark: {
    type: "geoshape",
    fill: null,
    stroke: "#ffffff",
    strokeWidth: 0.45,
    opacity: 0.9,
    clip: true
  }
},
{
  data: {
    url: malaysiaStateGeoJson,
    format: {
      type: "json",
      property: "features"
    }
  },
  mark: {
    type: "geoshape",
    fill: null,
    stroke: "#5f6f72",
    strokeWidth: 1.1,
    opacity: 0.95,
    clip: true
  }
},
    {
      data: {
        values: [
          { place: "Kuala Lumpur", longitude: 101.63, latitude: 3.18 },
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
      filter: "datum.region == 'Klang Valley' && datum.mode != 'LRT'"
    }
  ],
  mark: {
    type: "circle",
    filled: true,
    opacity: 0.78,
    stroke: "white",
    strokeWidth: 2,
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
      scale: modeColorScale,
      legend: {
        orient: "right",
        labelFontSize: 7,
        titleFontSize: 8,
        symbolSize: 30
      }
    },
    size: {
      value: 100
    },
    tooltip: [
      { field: "name", type: "nominal", title: "Station" },
      { field: "mode", type: "nominal", title: "Mode" },
      { field: "region", type: "nominal", title: "Region" },
      { field: "latitude", type: "quantitative", title: "Latitude" },
      { field: "longitude", type: "quantitative", title: "Longitude" }
    ]
  }
},
{
  data: {
    url: "data/stations_clean.csv"
  },
  transform: [
    {
      filter: "datum.region == 'Klang Valley' && datum.mode == 'LRT'"
    }
  ],
  mark: {
    type: "circle",
    filled: true,
    opacity: 0.55,
    stroke: "#333333",
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
      scale: modeColorScale,
      legend: null
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
},
  ],
  config: {
      background: "#dcecf7",
      view: {
        stroke: "#d0d0d0",
        strokeWidth: 1
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

let selectedMode = "All";

function cloneSpec(spec) {
  return JSON.parse(JSON.stringify(spec));
}

function getRidershipCalculation(selectedMode) {
  if (selectedMode === "Bus") {
    return "toNumber(datum.bus_rkl) + toNumber(datum.bus_rkn) + toNumber(datum.bus_rpn)";
  }

  if (selectedMode === "KTM") {
    return "toNumber(datum.rail_komuter) + toNumber(datum.rail_komuter_utara) + toNumber(datum.rail_ets) + toNumber(datum.rail_intercity) + toNumber(datum.rail_tebrau)";
  }

  if (selectedMode === "LRT") {
    return "toNumber(datum.rail_lrt_ampang) + toNumber(datum.rail_lrt_kj)";
  }

  if (selectedMode === "MRT") {
    return "toNumber(datum.rail_mrt_kajang) + toNumber(datum.rail_mrt_pjy)";
  }

  if (selectedMode === "Monorail") {
    return "toNumber(datum.rail_monorail)";
  }

  return "toNumber(datum.bus_rkl) + toNumber(datum.bus_rkn) + toNumber(datum.bus_rpn) + toNumber(datum.rail_lrt_ampang) + toNumber(datum.rail_lrt_kj) + toNumber(datum.rail_monorail) + toNumber(datum.rail_mrt_kajang) + toNumber(datum.rail_mrt_pjy) + toNumber(datum.rail_ets) + toNumber(datum.rail_intercity) + toNumber(datum.rail_komuter) + toNumber(datum.rail_komuter_utara) + toNumber(datum.rail_tebrau)";
}

function updateTotalRidershipCalculation(spec, selectedMode) {
  const newCalculation = getRidershipCalculation(selectedMode);

  function updateTransforms(part) {
    if (part.transform) {
      part.transform.forEach(function(t) {
        if (t.as === "total_ridership") {
          t.calculate = newCalculation;
        }
      });
    }

    if (part.layer) {
      part.layer.forEach(updateTransforms);
    }
  }

  updateTransforms(spec);
  return spec;
}

function addModeFilterToModeChart(spec, selectedMode) {
  if (selectedMode === "All") {
    return spec;
  }

  if (!spec.transform) {
    spec.transform = [];
  }

  spec.transform.push({
    filter: "datum.mode == '" + selectedMode + "'"
  });

  return spec;
}

function getServiceFilterExpression(selectedMode) {
  if (selectedMode === "Bus") {
    return "indexof(datum.service, 'Bus') >= 0";
  }

  if (selectedMode === "KTM") {
    return "indexof(datum.service, 'KTM') >= 0 || indexof(datum.service, 'ETS') >= 0";
  }

  if (selectedMode === "LRT") {
    return "indexof(datum.service, 'LRT') >= 0";
  }

  if (selectedMode === "MRT") {
    return "indexof(datum.service, 'MRT') >= 0";
  }

  if (selectedMode === "Monorail") {
    return "indexof(datum.service, 'Monorail') >= 0";
  }

  return null;
}

function addModeFilterToServiceSpec(spec, selectedMode) {
  const filterExpression = getServiceFilterExpression(selectedMode);

  if (!filterExpression) {
    return spec;
  }

  if (!spec.transform) {
    spec.transform = [];
  }

  spec.transform.unshift({
    filter: filterExpression
  });

  return spec;
}

function addModeFilterToMapSpec(spec, selectedMode) {
  if (selectedMode === "All") {
    return spec;
  }

  spec.layer.forEach(function(layer) {
    if (layer.data && layer.data.url === "data/stations_clean.csv") {
      if (!layer.transform) {
        layer.transform = [];
      }

      layer.transform.push({
        filter: "datum.mode == '" + selectedMode + "'"
      });
    }
  });

  return spec;
}

function renderDashboard() {
  const filteredTotalTrendSpec = updateTotalRidershipCalculation(cloneSpec(totalTrendSpec), selectedMode);
  vegaEmbed("#chart-total-trend", filteredTotalTrendSpec, { actions: false, renderer: "svg" });

  const filteredModeSpec = addModeFilterToModeChart(cloneSpec(modeSpec), selectedMode);
  vegaEmbed("#chart-mode", filteredModeSpec, { actions: false, renderer: "svg" });

  const filteredWeekdayWeekendSpec = updateTotalRidershipCalculation(cloneSpec(weekdayWeekendSpec), selectedMode);
  vegaEmbed("#chart-weekday-weekend", filteredWeekdayWeekendSpec, { actions: false, renderer: "svg" });

  const filteredYearlyAverageSpec = updateTotalRidershipCalculation(cloneSpec(yearlyAverageSpec), selectedMode);
  vegaEmbed("#chart-yearly-average", filteredYearlyAverageSpec, { actions: false, renderer: "svg" });

  const filteredServiceBarSpec = addModeFilterToServiceSpec(cloneSpec(serviceBarSpec), selectedMode);
  vegaEmbed("#chart-service-bar", filteredServiceBarSpec, { actions: false, renderer: "svg" });

  const filteredServiceRankSpec = addModeFilterToServiceSpec(cloneSpec(serviceRankSpec), selectedMode);
  vegaEmbed("#chart-service-rank", filteredServiceRankSpec, { actions: false, renderer: "svg" });

  const filteredMalaysiaMapSpec = addModeFilterToMapSpec(cloneSpec(malaysiaMapSpec), selectedMode);
  vegaEmbed("#chart-malaysia-map", filteredMalaysiaMapSpec, { actions: false, renderer: "svg" });

  const filteredKlangMapSpec = addModeFilterToMapSpec(cloneSpec(klangMapSpec), selectedMode);
  vegaEmbed("#chart-klang-map", filteredKlangMapSpec, { actions: false, renderer: "svg" });

  vegaEmbed("#chart-coverage-scatter", coverageScatterSpec, { actions: false, renderer: "svg" });
  vegaEmbed("#chart-ridership-per-station", ridershipPerStationSpec, { actions: false, renderer: "svg" });
}

renderDashboard();

const modeFilter = document.getElementById("mode-filter");

if (modeFilter) {
  modeFilter.addEventListener("change", function(event) {
    selectedMode = event.target.value;
    renderDashboard();
  });
}