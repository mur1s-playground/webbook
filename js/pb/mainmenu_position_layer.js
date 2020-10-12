var MainMenu_Position_Layer_Static_move = function(menu_id, dir, value = null) {
	var elem = document.getElementById(selected_id);
        if (dir == "x") {
        	elem.style.left = value;
        } else if (dir == "y") {
                elem.style.top = value;
        } else if (dir == "z") {
		if (value == "up") {
			elem.style.zIndex = parseInt(elem.style.zIndex, 10)+1;
		} else if (value == "down") {
			var val = parseInt(elem.style.zIndex, 10)-1;
			if (val < 0) val = 0;
			elem.style.zIndex = val;
		} else {
			if (parseInt(value, 10) < 0) value = 0;
	                elem.style.zIndex = value;
		}
		document.getElementById(menu_id + "_pos_z").value = parseInt(elem.style.zIndex, 10);
        } else {
		if (dir == "up") {
			elem.style.top = parseInt(elem.style.top, 10) - 1;
		} else if (dir == "down") {
			elem.style.top = parseInt(elem.style.top, 10) + 1;
		} else if (dir == "left") {
			elem.style.left = parseInt(elem.style.left, 10) - 1;
		} else if (dir == "right") {
			elem.style.left = parseInt(elem.style.left, 10) + 1;
		}
		document.getElementById(menu_id + "_pos_x").value = parseInt(elem.style.left);
		document.getElementById(menu_id + "_pos_y").value = parseInt(elem.style.top);
	}
        main_app.components[selected_id].pos_set(parseInt(elem.style.left), parseInt(elem.style.top));
}


var MainMenu_Position_Layer = function() {
	this.pos = [0, 0];
	this.vel = [0, 0];
	this.acc = [0, 0];

	this.dim = [0, 0];
	this.bg = '#ffffff';

	this.changed = true;

	this.is_init = false;

	this.pos_set = function(x, y) {
		this.pos = [x, y];
		this.changed = true;
	}

	this.dim_set = function(w, h) {
		this.dim = [w, h];
		this.changed = true;
	}

	this.bg_set = function(c) {
		this.bg = c;
		this.changed = true;
	}

	this.acc_set = function(x, y) {
		this.acc = [x, y];
		this.changed = true;
	}

	this.draw = function() {
		if (this.changed) {
			var element = document.getElementById(this.id);
			element.style.position = 'fixed';
			element.style.top = this.pos[1];
			element.style.backgroundColor = this.bg;
			if (!this.is_init) {
				element.style.zIndex = 255;
				element.style.textAlign = "center";
				element.style.margin = "1px";

				var controls_div = document.createElement("div");
				controls_div.id = this.id + "_controls";
				controls_div.style.position = "absolute";
				controls_div.style.display = "none";
				controls_div.style.backgroundColor = this.bg;
				controls_div.style.border = "1px solid black";
				controls_div.style.borderRadius = "5px";
				controls_div.style.padding = "5px";

				controls_div.appendChild(document.createTextNode("Position"));
                                controls_div.appendChild(document.createElement("br"));


				var position_t = document.createElement("table");
                                position_t.id = this.id + "_position_table";

				var table_cols = [];
                                for (var r = 0; r < 3; r++) {
                                        var tr = document.createElement("tr");
                                        tr.id = position_t.id + "_" + r;
                                        position_t.appendChild(tr);
                                        for (var c = 0; c < 3; c++) {
                                                var td = document.createElement("td");
                                                td.id = tr.id + "_" + c;
						td.style.textAlign = "center";
                                                tr.appendChild(td);
                                                table_cols.push(td);
                                        }
                                }

				var ps_edit_move_left_button = document.createElement("a");
                                ps_edit_move_left_button.id = this.id + "_move_left_button";
                                ps_edit_move_left_button.appendChild(document.createTextNode(String.fromCodePoint(0x2190)));
                                ps_edit_move_left_button.setAttribute('onclick', "javascript:MainMenu_Position_Layer_Static_move(" + this.id + ", \"left\", 0)");
				table_cols[1 * 3 + 0].appendChild(ps_edit_move_left_button);

 				var ps_edit_move_right_button = document.createElement("a");
                                ps_edit_move_right_button.id = this.id + "_move_right_button";
                                ps_edit_move_right_button.appendChild(document.createTextNode(String.fromCodePoint(0x2192)));
                                ps_edit_move_right_button.setAttribute('onclick', "javascript:MainMenu_Position_Layer_Static_move(" + this.id + ", \"right\", 0)");
                                table_cols[1 * 3 + 2].appendChild(ps_edit_move_right_button);

				var ps_edit_move_up_button = document.createElement("a");
                                ps_edit_move_up_button.id = this.id + "_move_up_button";
                                ps_edit_move_up_button.appendChild(document.createTextNode(String.fromCodePoint(0x2191)));
                                ps_edit_move_up_button.setAttribute('onclick', "javascript:MainMenu_Position_Layer_Static_move(" + this.id + ", \"up\", 0)");
                                table_cols[0 * 3 + 1].appendChild(ps_edit_move_up_button);

				var ps_edit_move_down_button = document.createElement("a");
                                ps_edit_move_down_button.id = this.id + "_move_down_button";
                                ps_edit_move_down_button.appendChild(document.createTextNode(String.fromCodePoint(0x2193)));
                                ps_edit_move_down_button.setAttribute('onclick', "javascript:MainMenu_Position_Layer_Static_move(" + this.id + ", \"down\", 0)");
                                table_cols[2 * 3 + 1].appendChild(ps_edit_move_down_button);

				var ps_position_x = document.createElement("input");
                                ps_position_x.id = this.id + "_pos_x";
				ps_position_x.menu_id = this.id;
				ps_position_x.title = "horizontal position";
                                ps_position_x.value = 0;
                                ps_position_x.maxLength = 6;
                                ps_position_x.size = 6;
                                ps_position_x.addEventListener("keydown", function(event) {
                                        if (event.key == "Enter") {
                                                event.preventDefault();
						MainMenu_Position_Layer_Static_move(this.menu_id, "x", this.value);
	                                }
                                });
				table_cols[1 * 3 + 1].appendChild(ps_position_x);

                                var ps_position_y = document.createElement("input");
                                ps_position_y.id = this.id + "_pos_y";
				ps_position_y.menu_id = this.id;
				ps_position_y.title = "vertical position";
                                ps_position_y.value = 0;
                                ps_position_y.maxLength = 6;
                                ps_position_y.size = 6;
                                ps_position_y.addEventListener("keydown", function(event) {
                                        if (event.key == "Enter") {
                                                event.preventDefault();
						MainMenu_Position_Layer_Static_move(this.menu_id, "y", this.value);
                                        }
                                });
				table_cols[1 * 3 + 1].appendChild(ps_position_y);

				controls_div.appendChild(position_t);
				controls_div.appendChild(document.createElement("br"));

				controls_div.appendChild(document.createTextNode("Layer"));
				controls_div.appendChild(document.createElement("br"));

				var ps_edit_move_layer_up_button = document.createElement("a");
                                ps_edit_move_layer_up_button.id = this.id + "_move_layer_up_button";
				ps_edit_move_layer_up_button.title = "move content to foreground";
                                ps_edit_move_layer_up_button.appendChild(document.createTextNode(String.fromCodePoint(0x2191)));
                                ps_edit_move_layer_up_button.setAttribute('onclick', "javascript:MainMenu_Position_Layer_Static_move(" + this.id + ", \"z\", \"up\")");
                                controls_div.appendChild(ps_edit_move_layer_up_button);

                                var ps_position_z = document.createElement("input");
                                ps_position_z.id = this.id + "_pos_z";
				ps_position_z.menu_id = this.id;
                                ps_position_z.value = 1;
                                ps_position_z.maxLength = 6;
                                ps_position_z.size = 6;
                                ps_position_z.addEventListener("keydown", function(event) {
                                        if (event.key == "Enter") {
                                                event.preventDefault();
						MainMenu_Position_Layer_Static_move(this.menu_id, "z", this.value);
                                        }
                                });
                                controls_div.appendChild(ps_position_z);

				var ps_edit_move_layer_down_button = document.createElement("a");
                                ps_edit_move_layer_down_button.id = this.id + "_move_layer_down_button";
				ps_edit_move_layer_down_button.title = "move content to background";
                                ps_edit_move_layer_down_button.appendChild(document.createTextNode(String.fromCodePoint(0x2193)));
                                ps_edit_move_layer_down_button.setAttribute('onclick', "javascript:MainMenu_Position_Layer_Static_move(" + this.id + ", \"z\", \"down\")");
				controls_div.appendChild(ps_edit_move_layer_down_button);

				element.appendChild(controls_div);

				this.is_init = true;
			}
			this.changed = false;
		}
	}

	this.update = function() {
		this.vel[0] += this.acc[0];
		this.acc[0] = 0;
		this.pos[0] += this.vel[0];

		this.vel[1] += this.acc[1];
		this.acc[1] = 0;
		this.pos[1] += this.vel[1];

		if (selected_id != null && selected_id != undefined) {
			var selected_elem = document.getElementById(selected_id);

			var pos_x_elem = document.getElementById(this.id + "_pos_x");
			pos_x_elem.value = parseInt(selected_elem.style.left);

			var pos_y_elem = document.getElementById(this.id + "_pos_y");
			pos_y_elem.value = parseInt(selected_elem.style.top);

			var pos_z_elem = document.getElementById(this.id + "_pos_z");
			pos_z_elem.value = parseInt(selected_elem.style.zIndex);
		} else {
			MainMenu_Static_toggle_controls(this.id, false);
		}

		this.changed = true;
	}
}
