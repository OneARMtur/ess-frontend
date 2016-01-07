// test comment
	var current_id = 1
 var rlist = { 
            width:200,
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
  var mt_data = [{
                start_time: "8:00",
                end_time: "2:00",
                r_t: "22.5",
                h_t: "60"
            }, {
                start_time: "22:00",
                end_time: "8:00",
                r_t: "21.0",
                h_t: "60"
            }];
        var room = {
            view: "datatable",
            columns: [{
                id: "start_time",
                header: "Start time",
                width: 100,
                editor: "text"
            }, {
                id: "end_time",
                header: "End time",
                width: 100,
                editor: "text"
            }, {
                id: "r_t",
                header: "Room temp &deg C",
                width: 100,
                editor: "text"
            }, {
                id: "h_t",
                header: "Heater temp &deg C",
                width: 100,
                editor: "text"
            }, ],
            editaction: "dblclick",
            select: "row",
            autoheight: true,
            autowidth: true,
            editable: true,
            id: "room_datatable"
        };
       webix.ui({
            rows: [
            { type:"header", template:"Gcubelabs Energy Saving System" },
            {
            type:"space",
                cols: [
                    rlist, {
                            rows: [
                               {view:"template", content:"room_name", height:50},
                               {view:"template", content:"room_status", height:50},
                               room,
                               {cols:[{
                                width:55,
                                view: "button",
                                id: "my_button",
                                value: "Add",
                                inputWidth: 50
                            }, {
                                view: "button",
                                id: "my_button_del",
                                value: "Delete",
                                type: "danger",
                                inputWidth: 70
                                }]}

                        ]
                    }
                ]
            }, ]
        });
        $$("room_datatable").parse(mt_data, "json")
        $$("room_tree").attachEvent("onItemClick", function(id, e, node){
            var item = this.getItem(id);
            current_id = id;
            webix.ajax("schedule/"+id, function(text){
                obj = JSON.parse(text)
                $$("room_datatable").clearAll()
                $$("room_datatable").parse(obj, "json")
            });
            webix.ajax("status/"+current_id, function(text){
                obj = JSON.parse(text)
                document.getElementById("room_name").innerHTML = "Имя: " + obj['room_name'];
                document.getElementById("room_status").innerHTML = "Температура: " + obj['room_temp'];
                document.getElementById("room_status").innerHTML += "&degC; Батарея: " + obj['room_ht'] + "&degC;";
            });
            });
    $$("my_button").attachEvent("onItemClick", function(id, e){
        var mt_data = [{
                start_time: "8:00",
                end_time: "22:00",
                r_t: "22.5",
                h_t: "61"
            }, {
                start_time: "22:00",
                end_time: "8:00",
                r_t: "21.0",
                h_t: "61"
            }];
        $$("room_datatable").clearAll()
        $$("room_datatable").parse(mt_data, "json")
        }
        );
    	window.onload = function(){
        	webix.ajax("status/"+current_id, function(text){
                obj = JSON.parse(text)
                document.getElementById("room_name").innerHTML = "Имя: " + obj['room_name'];
                document.getElementById("room_status").innerHTML = "Температура: " + obj['room_temp'];
                document.getElementById("room_status").innerHTML += "&degC; Батарея: " + obj['room_ht'] + "&degC;";
			});
			webix.ajax("schedule/"+current_id, function(text){
                obj = JSON.parse(text)
                $$("room_datatable").clearAll()
                $$("room_datatable").parse(obj, "json")
			});
        };
