  var mt_data = [{
                start_time: "8:00",
                end_time: "22:00",
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
      