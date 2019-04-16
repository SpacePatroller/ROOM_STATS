// console.log('chart three working')

// var ctx = document.getElementById('myChart3').getContext('2d')
// var myChart3 = new Chart(ctx, {
//   type: 'bar',
//   data: {
//     labels: [],
//     datasets: [
//       {
//         label: 'ADR',
//         data: [],
//         backgroundColor: [],

//         borderColor: [],

//         borderWidth: 1,
//         fill: false
//       }
//     ]
//   },
//   options: {
//     tooltips: {
//       mode: 'point',
//       label: 'mylabel',
//       callbacks: {
//         label: function(tooltipItem, data) {
//           console.log(tooltipItem)

//           return tooltipItem.yLabel
//             .toString()
//             .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
//             .replace(/\b/, '$ ')
//         }
//       }
//     },

//     scales: {
//       xAxes: [
//         {
//           gridLines: {
//             display: false
//           }
//         }
//       ],
//       yAxes: [
//         {
//           gridLines: {
//             display: true
//           },
//           ticks: {
//             beginAtZero: false,
//             min: 120
//           }
//         }
//       ]
//     }
//   }
// })
