console.log('chart one started')

//CHART ONE
var ctx = document.getElementById('myChart').getContext('2d')
var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: [],
    datasets: [
      {
        label: 'Room Nights',
        data: [],
        backgroundColor: [],

        borderColor: '#000000',

        borderWidth: 1
      }
    ]
  },
  options: {
    legend: {
      display: true,
      position: 'bottom',
      labels: {}
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            display: false
          }
        }
      ],
      yAxes: [
        {
          gridLines: {
            display: true
          },
          ticks: {
            beginAtZero: false,
            min: 100,
            max: 365
          }
        }
      ]
    }
  }
})
//CHART TWO
var ctx = document.getElementById('myChart2').getContext('2d')
var myChart2 = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: [],
    datasets: [
      {
        label: 'Room Revnue',
        data: [],
        backgroundColor: [],

        borderColor: '#000000',

        borderWidth: 1,
        fill: false
      }
    ]
  },
  options: {
    legend: {
      display: true,
      position: 'bottom',
      labels: {}
    },
    tooltips: {
      mode: 'point',
      label: 'mylabel',
      callbacks: {
        label: function(tooltipItem, data) {
          // console.log(tooltipItem)

          return tooltipItem.yLabel
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            .replace(/\b/, '$ ')
        }
      }
    },

    scales: {
      xAxes: [
        {
          gridLines: {
            display: false
          }
        }
      ],
      yAxes: [
        {
          gridLines: {
            display: true
          },
          ticks: {
            beginAtZero: false,
            min: 8000
          }
        }
      ]
    }
  }
})

//CHART THREE
var ctx = document.getElementById('myChart3').getContext('2d')
var myChart3 = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [
      {
        label: 'ADR',
        data: [],
        backgroundColor: [],

        borderColor: [],

        borderWidth: 1,
        fill: false
      }
    ]
  },
  options: {
    legend: {
      display: true,
      position: 'bottom',
      labels: {}
    },
    tooltips: {
      mode: 'point',
      label: 'mylabel',
      callbacks: {
        label: function(tooltipItem, data) {
          console.log(tooltipItem)

          return tooltipItem.yLabel
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            .replace(/\b/, '$ ')
        }
      }
    },

    scales: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {}
      },
      xAxes: [
        {
          gridLines: {
            display: false
          }
        }
      ],
      yAxes: [
        {
          gridLines: {
            display: true
          },
          ticks: {
            beginAtZero: false,
            min: 120
          }
        }
      ]
    }
  }
})

// BUILD MAIN CHART

colors = [
  '#ffffd9',
  '#edf8b1',
  '#c7e9b4',
  '#7fcdbb',
  '#41b6c4',
  '#1d91c0',
  '#225ea8',
  '#253494',
  '#081d58'
]

// COLOR CHOOSER FOR RM NIGHTS
function chooseColor(x) {
  if (x < 60) {
    return colors[0]
  } else if (x <= 120) {
    return colors[1]
  } else if (x <= 180) {
    return colors[2]
  } else if (x <= 240) {
    return colors[3]
  } else if (x <= 300) {
    return colors[4]
  } else {
    return colors[5]
  }
}

// COLOR CHOOSER FOR REVENUe
function chooseColorRevenue(x) {
  if (x < 10000) {
    return colors[0]
  } else if (x <= 20000) {
    return colors[1]
  } else if (x <= 30000) {
    return colors[2]
  } else if (x <= 40000) {
    return colors[3]
  } else if (x <= 50000) {
    return colors[4]
  } else {
    return colors[5]
  }
}

function buildMainChart() {
  var url = '/data'

  d3.json(url, function(data) {
    // console.log(data)

    for (p = 0; p < data.length; p++) {
      // GRAB ROOM NIGHT INFO
      myChart.data.labels.push(data[p][0])
      myChart.data.datasets[0].data.push(+data[p][3])
      myChart.data.datasets[0].backgroundColor.push(chooseColor(+data[p][3]))

      // GRAB REVENUE NUMBERS FOR ROOMS
      myChart2.data.labels.push(data[p][0])
      myChart2.data.datasets[0].data.push(+data[p][2].toFixed(2))
      myChart2.data.datasets[0].backgroundColor.push(
        chooseColorRevenue(+data[p][2].toFixed(2))
      )

      //GRAB ADR FOR EACH ROOM
      myChart3.data.labels.push(data[p][0])
      myChart3.data.datasets[0].data.push(+data[p][1])
      myChart3.data.datasets[0].backgroundColor.push(chooseColor(+data[p][1]))

      // myChart.data.datasets[1].data.push(+(data[p][1]))
    }
    myChart.update()
    myChart2.update()
    myChart3.update()
  })
}

buildMainChart()

// CLEAR CHART FUNCTION
function clearChart() {
  // clear charts

  myChart.data.datasets[0].data = []
  myChart.data.labels = []
  myChart.data.datasets[0].backgroundColor = []

  myChart2.data.datasets[0].data = []
  myChart2.data.labels = []
  myChart2.data.datasets[0].backgroundColor = []

  myChart3.data.datasets[0].data = []
  myChart3.data.labels = []
  myChart3.data.datasets[0].backgroundColor = []

  myChart.update()
  myChart2.update()
  myChart3.update()
}

//BUILD CHART BASED ON SELECTED FLOOR
var link = d3.selectAll('.nav-link')
link.on('click', function() {
  d3.event.preventDefault()
  // grab attr for floor selected
  floor = d3.select(this).attr('alt')
  console.log(floor)

  clearChart()

  var url2 = `/data_room/${floor}`
  // console.log(url2)
  d3.json(url2, function(data) {
    // console.log(data)

    for (p = 0; p < data.length; p++) {
      myChart.data.labels.push(data[p][0])
      myChart.data.datasets[0].data.push(+data[p][3])
      myChart.data.datasets[0].backgroundColor.push(chooseColor(+data[p][3]))
    }

    for (p = 0; p < data.length; p++) {
      myChart2.data.labels.push(data[p][0])
      myChart2.data.datasets[0].data.push(+data[p][2].toFixed(2))
      myChart2.data.datasets[0].backgroundColor.push(
        chooseColorRevenue(+data[p][2].toFixed(2))
      )
    }

    for (p = 0; p < data.length; p++) {
      myChart3.data.labels.push(data[p][0])
      myChart3.data.datasets[0].data.push(+data[p][1])
      myChart3.data.datasets[0].backgroundColor.push(chooseColor(+data[p][1]))
    }

    myChart.update()
    myChart2.update()
    myChart3.update()
  })
})

// CLICK TO FILTER DATA BASED OFF ROOM NIGHTS
var filterButton = d3.select('.btn-outline-success')
filterButton.on('click', function() {
  d3.event.preventDefault()
  // GRAB VALUE FROM INPUT VALUE
  roomNights = d3.select('.form-control').node().value
  // console.log(roomNights)

  clearChart()
  // RETRIEVE DATA AND BUILD CHART BASED OFF ROOM NIGHTS CHOOSEN.
  var url3 = `/data_room/nights/${roomNights}`
  d3.json(url3, function(data) {
    console.log(data)

    for (p = 0; p < data.length; p++) {
      myChart.data.labels.push(data[p][0])
      myChart.data.datasets[0].data.push(+data[p][3])
      myChart.data.datasets[0].backgroundColor.push(chooseColor(+data[p][3]))
    }

    for (p = 0; p < data.length; p++) {
      myChart2.data.labels.push(data[p][0])
      myChart2.data.datasets[0].data.push(+data[p][2].toFixed(2))
      myChart2.data.datasets[0].backgroundColor.push(
        chooseColorRevenue(+data[p][2].toFixed(2))
      )
    }

    for (p = 0; p < data.length; p++) {
      myChart3.data.labels.push(data[p][0])
      myChart3.data.datasets[0].data.push(+data[p][1])
      myChart3.data.datasets[0].backgroundColor.push(chooseColor(+data[p][1]))
    }

    myChart.update()
    myChart2.update()
    myChart3.update()
  })
})

// CLICK TO RESET GRAPHS TO ALL THE FLOORS
var allLink = d3.selectAll('#all_floors')
allLink.on('click', function() {
  d3.event.preventDefault()
  clearChart()
  buildMainChart()
})

// D3 CHARACTER FORMATTER
var formatComma = d3.format(','),
  formatDecimal = d3.format('.1f'),
  formatDecimalComma = d3.format(',.2f'),
  formatSuffix = d3.format('s'),
  formatSuffixDecimal1 = d3.format('.1s'),
  formatSuffixDecimal2 = d3.format('.2s'),
  formatMoney = function(d) {
    return '$' + formatDecimalComma(d)
  },
  formatPercent = d3.format(',.2%')

// BUILD TABLE BUILD TABLE BUILD TABLE BUILD TABLE BUILD TABLE

var url9 = '/data'
// GRAB DATA
d3.json(url9, function(data) {
  // 	console.log(data)

  data.forEach(function(element) {
    element[1] = formatMoney(element[1])
    element[2] = formatMoney(element[2])
  })

  // 	create var that selects the the table tag and append a table to the html
  var table = d3
    .select('#table')
    .append('table')
    .attr('class', 'table-striped')
    .attr('width', '100%')
    .attr('id', 'dtOrderExample')
  // select the table and append a table header and row
  var header = table.append('thead').append('tr')
  // select the the table header and enter the table headers
  header
    .selectAll('th')
    .data(['ROOM', 'ADR', 'REVENUE', 'ROOM NIGHTS'])
    .enter()
    .append('th')
    .text(function(d) {
      return d
    })
  // create a table body and append a table row for each row of data
  var tablebody = table.append('tbody')
  rows = tablebody
    .selectAll('tr')
    .data(data)
    .enter()
    .append('tr')
  cells = rows
    .selectAll('td')
    .data(function(d) {
      //   console.log(d)
      return d
    })
    .enter()
    .append('td')
    .text(function(d) {
      return d
    })
})

// TABLE SORT FUNCTION
