var chart = Highcharts.chart('container', {

    title: {
        text: 'SSE streaming test'
    },

    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
    },

    plotOptions: {
        series: {
            label: {
                connectorAllowed: false
            },
            pointStart: 1
        }
    },

    series: [{
        name: 'Streaming Data',
        data: []
    }],

    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                }
            }
        }]
    }

});


const INFO_SOURCE = new EventSource("/streaming");
INFO_SOURCE.onmessage = function(event){
    console.log("id: " + event.lastEventId + ", data: " + event.data);
    chart.series[0].addPoint(Number(event.data));        
}