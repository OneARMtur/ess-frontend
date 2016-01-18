/**
* Validate time form
*/
function validTime(timestr) {
    if (typeof(timestr) != 'string') return false;
    if (timestr.split(":").length != 2) return false;

    hour = parseFloat(timestr.split(":")[0]);
    minute = parseFloat(timestr.split(":")[1]);

    if (hour < 0 || hour > 23) return false;
    if (minute < 0 || minute > 60) return false;

    if (timestr.split(":")[1].length != 2) return false;
    return true;
}
/**
* Validate temperature form
*/
function validTemperature(tempstr) {
    if (typeof(tempstr) != 'string') return false;
    return !isNaN(tempstr) && parseFloat(tempstr) > 0;
}

var current_id = 1
var rlist = {
    width: 200,
    view: "tree",
    activetitle: true,
    select: true,
    id: "room_tree",
    data: [{
        id: "1",
        value: "Комната"
    }, {
        id: "2",
        value: "Кухня"
    }, {
        id: "3",
        value: "Зал"
    }, {
        id: "4",
        value: "Бойлер"
    }]
}

//var chart_data = "Grigori room,1450860626,22.56,22.81\nGrigori room,1450860434,22.75,23.55\nGrigori room,1450772748,21.81,\nGrigori room,1450772746,21.81,\nGrigori room,1450772745,21.81,\nGrigori room,1450772743,21.81,\nGrigori room,1450772742,21.81,\nGrigori room,1450772740,21.81,\nGrigori room,1450772738,21.75,\nGrigori room,1450772736,21.75,\nGrigori room,1450532138,22.81,\nGrigori room,1450532130,22.87,\nGrigori room,1450532119,22.87,\n"
var my_chart = {
    view: "chart",
    type: "line",
//    value: "#data3#",
    series: [ 
    {
        value:"#data3#",
        color:"#69ba00",
        item:{
            radius:0
        }
    }, 
    // {
    //     value:"#data4#",
    //     color:"#69baee",
    //             item:{
    //         radius:0
    //     }
    // }, 
    {
        value:"#data5#",
        color:"#69baff",
                item:{
            radius:0
        }
    }//, 
    // {
    //     value:"#data6#",
    //     color:"#69babb",
    //             item:{
    //         radius:0
    //     }
    // }
    ], // series
    id: "mychart",
//    data: chart_data,
    datatype: "csv",
    xAxis: {
        title: "Years",
        template: function(obj) {
            var date = new Date(parseInt(obj.data2*1000))
            //alert(parseInt(obj.data1) mod (60*2))
            
            // if(parseInt(obj.data2) % (60*60*6) <= 60) {
            //     alert(parseInt(obj.data2))
            //     alert(date.toString())
            // }
            return parseInt(obj.data2) % (60*60*6) <= 60 ? date.toLocaleTimeString() : "";
        },
        lines: true
    },
    yAxis: {
        title: "temperature",
        lines: true
    }
};


var room = {
    view: "datatable",
    rules: {
        "start": validTime,
        "end": validTime,
        "t": validTemperature,
        "th": validTemperature
    },
    columns: [{
        id: "start",
        header: "Начало",
        width: 100,
        editor: "text"
    }, {
        id: "end",
        header: "Конец",
        width: 100,
        editor: "text"
    }, {
        id: "t",
        header: "Комната &deg C",
        width: 100,
        editor: "text"
    }, {
        id: "th",
        header: "Нагреватель &deg C",
        width: 100,
        editor: "text"
    }, ],
    editaction: "dblclick",
    select: "row",
    autoheight: true,
    autowidth: true,
    editable: true,
    id: "room_datatable",
    ready: function() {
        this.validate();
    }
};