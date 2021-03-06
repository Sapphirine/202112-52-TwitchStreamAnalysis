
let LineChartForGameTrend = echarts.init(document.getElementById('lineChartForGameTrend'), null, {
    height: 500,
    width: 1248
});

let LineChartForGameTrend1 = echarts.init(document.getElementById('lineChartForGameTrend1'), null, {
    height: 500,
    width: 850
});

// TODO: implement Custome Game Name
window.onload = function () {
    gameTrendInformationInjection();
    drawLineChartForGameTrend([]);
}

function drawLineChartForGameTrend(dataSet) {
    // let minStartTime = covertToDatetimeFormat(dataSet);
    let option = {
        title: {
            // text: 'Viewer Count Trend'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: dataSet.label
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: dataSet.time
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: 'True',
                type: 'line',
                data: dataSet.true
            },
            {
                name: 'Predict',
                type: 'line',
                data: dataSet.pred
            }
        ]
    };
    LineChartForGameTrend.setOption(option);
    LineChartForGameTrend1.setOption(option);
}


function gameTrendInformationInjection() {
    console.log("111111111111")
    let gameName = [
        "Chatting",
        "GrandTheftAutoV",
        "LeagueofLegends",
        "ApexLegends",
        "Valorant",
        "CallofDuty",
        "Fortnite",
        "TeamfightTactics",
        "Minecraft",
        "Pokemon",
        "Total",
    ];
    let gameListString = "";
    for (let i = 0; i < gameName.length; i++) {
        gameListString += "<option value=\"" + gameName[i] + "\">" + gameName[i] + "</option>";
    }
    document.getElementById("popularGameTrendSelection").innerHTML =
        "<select id=\"gameList\">" + gameListString + "</select>";
    document.getElementById("popularGameTrendSelection").innerHTML +=
        "<button id=\"gameList\" " +
        "onClick=\"submitRequestForGameTrend()\">change game</button>";
}


let lineDataSetForPopularGameTrend;
function submitRequestForGameTrend() {
    $.ajax({
        url: domain + "/getViewerPrediction",
        type: 'POST',
        cache: false,
        data: $('#gameList').val(),
        processData: false,
        contentType: 'application/json',
        success: function (r) {
            console.log(r)
            lineDataSetForPopularGameTrend = JSON.parse(r);
            console.log(lineDataSetForPopularGameTrend);
            drawLineChartForGameTrend(lineDataSetForPopularGameTrend);
        }
    })
}
