

var ctx = document.getElementById("myChart");
var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ["AAPL", "GOOGL", "FB"],
    datasets: [{
      label: 'Apple',
      data: [5,000, 9,000, 8,000 ],
      backgroundColor: "rgba(153,255,51,1)"

    // }, {
    //   label: 'Google',
    //   data: [30,000],
    //   backgroundColor: "rgba(255,153,0,1)"
    // }, {
    //   label: 'Faceboook',
    //   data: [20,000],
    //   backgroundColor: "rgba(255,153,0,1)"
    }]
   }
});
