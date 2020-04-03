var number = new Intl.NumberFormat();

var chart = new Chart('chart', {
  type: 'line',
  data: {
    labels: [],
    datasets: [],
  },
  options: {
    resposive: true,
    maintainAspectRatio: false,
    aspectRatio: 0.5,
    elements: {
      line: {
        fill: false,
        borderWidth: 2,
        lineTension: 0,
      },
    },
    tooltips: {
      mode: 'x',
      bodyAlign: 'right',
      itemSort: (a, b) => b.yLabel - a.yLabel,
      callbacks: {
        label: (item, data) => {
          return data.datasets[item.datasetIndex].label + ': ' + number.format(item.yLabel);
        },
      },
    },
    scales: {
      xAxes: [{
        scaleLabel: { labelString: 'days', display: true, },
      }],
      yAxes: [{
        scaleLabel: { display: true, },
        ticks: {
          callback: (value) => number.format(value),
        },
      }],
    },
  },
});

async function start(callback, callback2, callbackActive, callbackActivePrediction) {
  const response = await fetch('https://pomber.github.io/covid19/timeseries.json');
  const data = await response.json();

  let keys = Array.from( Object.keys(data) );

  let countries = [
  ];

  for (var i = 0; i < keys.length; i++) {
    countries.push({ id : keys[i], color: 'hsl(280, 75%, 50%)' });
  }

  if (r = window.location.href.match(/[?&]country=([^&]+)/)) {
    const n = {
      id: r[1],
      color: 'hsl(280, 75%, 50%)',
      params: { borderWidth: 4, pointStyle: 'rectRot' },
    };
    countries = countries.filter(e => e.id == n.id);
  }

  for (const {id, color, params} of countries) {
    const dataset = {
      label: "confirmed",
      data: callback(data[id]),
      borderColor: color,
      backgroundColor: color,
    };

    if (params) Object.assign(dataset, params);
    chart.data.datasets.push(dataset);



    const dataset2 = {
      label: "predicted",
      data: callback2(data[id]),
      borderColor: 'hsl(180, 75%, 50%)',
      backgroundColor: 'hsl(180, 75%, 50%)',
    };

    if (params) Object.assign(dataset2, params);
    chart.data.datasets.push(dataset2);



    const activeDataset = {
      label: "active",
      data: callbackActive(data[id]),
      borderColor: 'hsl(210, 75%, 50%)',
      backgroundColor: 'hsl(210, 75%, 50%)',
    };

    if (params) Object.assign(activeDataset, params);
    chart.data.datasets.push(activeDataset);
  }

  const max_days = chart.data.datasets.reduce((accum, e) => Math.max(accum, e.data.length), 0);
  chart.data.labels = Array.apply(null, Array(max_days)).map((e, i) => i + 1);
  const axis = chart.options.scales.yAxes[0];
  if (axis.type == 'logarithmic') {
    axis.ticks.callback = (value) => {
      return Number.isInteger(Math.log10(value)) ? number.format(value) : null;
    };
  }
  chart.update();
}