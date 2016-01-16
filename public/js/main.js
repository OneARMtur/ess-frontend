webix.ui({
    rows: [{
        type: "header",
        template: "Gcubelabs Energy Saving System"
    }, {
        type: "space",
        cols: [
            rlist, {
                rows: [{
                        view: "template",
                        content: "room_name",
                        height: 50
                    }, {
                        view: "template",
                        content: "room_status",
                        height: 50
                    },
                    room, {
                        cols: [{
                            width: 55,
                            view: "button",
                            id: "add_button",
                            value: "Add",
                            inputWidth: 50
                        }, {
                            view: "button",
                            width: 75,
                            id: "del_button",
                            value: "Delete",
                            type: "danger",
                            inputWidth: 70
                        }, {
                            view: "button",
                            id: "save_button",
                            value: "Save",
                            type: "form",
                            inputWidth: 70
                        }]
                    },
                    my_chart,

                ]
            }
        ]
    }, ]
});

function loadRoomData() {
    webix.ajax("schedule/" + current_id, function(text) {
        obj = JSON.parse(text)
        $$("room_datatable").clearAll()
        $$("room_datatable").parse(obj, "json")
    });
    webix.ajax("status/" + current_id, function(text) {
        obj = JSON.parse(text)
        document.getElementById("room_name").innerHTML = "Имя: " + obj['room_name'];
        document.getElementById("room_status").innerHTML = "Температура: " + obj['room_temp'];
        document.getElementById("room_status").innerHTML += "&degC; Батарея: " + obj['room_ht'] + "&degC;";
    });
    $$("mychart").clearAll()
    $$("mychart").load('statistics/' + current_id, 'csv')
}

$$("room_tree").attachEvent("onItemClick", function(id, e, node) {
    var item = this.getItem(id);
    current_id = id;
    loadRoomData();
});
window.onload = function() {
    loadRoomData();
};
/**
* Attach event for delete button
*/
$$("del_button").attachEvent("onItemClick", function(id, e) {
    var schedule = $$("room_datatable");
    if (schedule.getVisibleCount() < 2) {
        alert("Должно быть как минимум 2 интервала!")
    } else {
        $$("room_datatable").remove($$("room_datatable").getSelectedId())
    }
});

$$("add_button").attachEvent("onItemClick", function(id, e) {
    var schedule = $$("room_datatable");
    schedule.add({})
});

$$("save_button").attachEvent("onItemClick", function(id, e) {
    var schedule = $$("room_datatable");
    if (schedule.validate() == false) {
        alert("Неверное расписание!")
        return;
    };
    webix.ajax().headers({
        "Content-type": "application/json"
    }).post("/schedule/" + current_id, JSON.stringify(schedule.serialize()), {
        error: function(text, data, XmlHttpRequest) {
            alert("Ошибка в расписании! Не совпадает время начала/конца в строке " + text);
        },
        success: function(text, data, XmlHttpRequest) {
            alert("ОК!");
        }
    });
});
$$("mychart").load('statistics/' + current_id, 'csv')
/**
* Sort schedule according to the start time
*/
function sortSchedule(array, asc) {
    res = array.sort(function(a, b) {
        field = "start_time"
        s1 = parseInt(a[field].split(":")[0]) * 60 + parseInt(a[field].split(":")[1])
        s2 = parseInt(b[field].split(":")[0]) * 60 + parseInt(b[field].split(":")[1])
        if (asc) return (s1 > s2) ? 1 : ((s1 < s2) ? -1 : 0);
        else return (s2 > s1) ? 1 : ((s2 < s1) ? -1 : 0);
    });
    return res;
}