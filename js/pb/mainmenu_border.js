var MainMenu_Border_Static_color = function(menu_id) {
	var elem = document.getElementById(selected_id);
	var border_color_select = document.getElementById(menu_id + "_border_color_select");

	var elems = "";
	var border_left_set = elem.style.borderLeftWidth != "0px";
	var border_right_set = elem.style.borderRightWidth != "0px";
	var border_top_set = elem.style.borderTopWidth != "0px";
	var border_bottom_set = elem.style.borderBottomWidth != "0px";
	var border_set = false;

	if (border_color_select.value == "left") {
		elems = elem.style.borderLeftColor;
		if (border_left_set) border_set = true;
	} else if (border_color_select.value == "right") {
		elems = elem.style.borderRightColor;
		if (border_right_set) border_set = true;
	} else if (border_color_select.value == "top") {
		elems = elem.style.borderTopColor;
		if (border_top_set) border_set = true;
	} else if (border_color_select.value == "bottom") {
		elems = elem.style.borderBottomColor;
		if (border_bottom_set) border_set = true;
	} else {
		elems = elem.style.borderLeftColor;
		if (border_left_set || border_right_set || border_top_set || border_bottom_set) border_set = true;
	}
	if (elems == "initial" && border_set) elems = "rgba(0, 0, 0, 1.0)";
	var rgba = elems.replace(/[^\d\.,]/g, '').split(',');
	var ranges = ["Red", "Green", "Blue", "Alpha"];
        for (var r = 0; r < 3; r++) {
		if (elems == "" || elems == "initial") {
			document.getElementById(menu_id + "_border_color_slider_" + ranges[r]).disabled = true;
        	} else {
			document.getElementById(menu_id + "_border_color_slider_" + ranges[r]).disabled = false;
	        	document.getElementById(menu_id + "_border_color_slider_" + ranges[r]).value = rgba[r];
		}
        }
	if (elems == "" || elems == "initial") {
        	document.getElementById(menu_id + "_border_color_slider_" + ranges[3]).disabled = true;
	} else {
		document.getElementById(menu_id + "_border_color_slider_" + ranges[3]).disabled = false;
	}
        if (rgba.length == 4) {
		document.getElementById(menu_id + "_border_color_slider_" + ranges[3]).value = parseInt(parseFloat(rgba[3])*255);
        } else {
		document.getElementById(menu_id + "_border_color_slider_" + ranges[3]).value = 255;
	}
}

var MainMenu_Border_Static_border = function(menu_id, action, position) {
	var elem = document.getElementById(selected_id);
	var button_left = document.getElementById(menu_id + "_border_left");
	var button_right = document.getElementById(menu_id + "_border_right");
	var button_top = document.getElementById(menu_id + "_border_top");
	var button_bottom = document.getElementById(menu_id + "_border_bottom");
	var button_all = document.getElementById(menu_id + "_border_all");

	var bl_state = button_left.classList.contains("buttonPressed");
	var br_state = button_right.classList.contains("buttonPressed");
	var bt_state = button_top.classList.contains("buttonPressed");
	var bb_state = button_bottom.classList.contains("buttonPressed");
	var ba_state = button_all.classList.contains("buttonPressed");

	var l_color = elem.style.borderLeftColor;
	var r_color = elem.style.borderRightColor;
	var t_color = elem.style.borderTopColor;
	var b_color = elem.style.borderBottomColor;

	if (l_color == "") l_color = "rgba(0, 0, 0, 1.0)";
	if (r_color == "") r_color = "rgba(0, 0, 0, 1.0)";
	if (t_color == "") t_color = "rgba(0, 0, 0, 1.0)";
	if (b_color == "") b_color = "rgba(0, 0, 0, 1.0)";

	if (action == "button") {
		if (position == "left") {
			if (bl_state) {
				bl_state = false;
				ba_state = false;
			} else {
				bl_state = true;
			}
		} else if (position == "right") {
			if (br_state) {
				br_state = false;
				ba_state = false;
			} else {
				br_state = true;
			}
		} else if (position == "top") {
			if (bt_state) {
				bt_state = false;
				ba_state = false;
			} else {
				bt_state = true;
			}
		} else if (position == "bottom") {
			if (bb_state) {
				bb_state = false;
				ba_state = false;
			} else {
				bb_state = true;
			}
		} else if (position == "all") {
			if (ba_state) {
				bl_state = false;
				br_state = false;
				bt_state = false;
				bb_state = false;
				ba_state = false;
			} else {
				bl_state = true;
       	                	br_state = true;
       	                	bt_state = true;
                        	bb_state = true;
			}
		}
	} else if (action == "type") {
		if (position == "all") {
			document.getElementById(menu_id + "_border_left_type").value = document.getElementById(menu_id + "_border_all_type").value;
			document.getElementById(menu_id + "_border_right_type").value = document.getElementById(menu_id + "_border_all_type").value;
			document.getElementById(menu_id + "_border_top_type").value = document.getElementById(menu_id + "_border_all_type").value;
			document.getElementById(menu_id + "_border_bottom_type").value = document.getElementById(menu_id + "_border_all_type").value;
		}
	} else if (action == "thickness") {
		if (position == "all") {
			document.getElementById(menu_id + "_border_left_thickness").value = parseInt(document.getElementById(menu_id + "_border_all_thickness").value, 10);
                        document.getElementById(menu_id + "_border_right_thickness").value = parseInt(document.getElementById(menu_id + "_border_all_thickness").value, 10);
                        document.getElementById(menu_id + "_border_top_thickness").value = parseInt(document.getElementById(menu_id + "_border_all_thickness").value, 10);
                        document.getElementById(menu_id + "_border_bottom_thickness").value = parseInt(document.getElementById(menu_id + "_border_all_thickness").value, 10);
		}
	} else if (action == "radius") {
		if (position == "all") {
			document.getElementById(menu_id + "_border_top-left_radius").value = document.getElementById(menu_id + "_border_all_radius").value;
                        document.getElementById(menu_id + "_border_top-right_radius").value = document.getElementById(menu_id + "_border_all_radius").value;
                        document.getElementById(menu_id + "_border_bottom-left_radius").value = document.getElementById(menu_id + "_border_all_radius").value;
                        document.getElementById(menu_id + "_border_bottom-right_radius").value = document.getElementById(menu_id + "_border_all_radius").value;
		}
	} else if (action == "color") {
                var border_color_select = document.getElementById(menu_id + "_border_color_select");

		var r = document.getElementById(menu_id + "_border_color_slider_Red").value;
                var g = document.getElementById(menu_id + "_border_color_slider_Green").value;
                var b = document.getElementById(menu_id + "_border_color_slider_Blue").value;
                var a = parseInt(document.getElementById(menu_id + "_border_color_slider_Alpha").value, 10)/255.0;

		var color_str = "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";

		if (border_color_select.value == "left") {
			l_color = color_str;
		} else if (border_color_select.value == "right") {
			r_color = color_str;
		} else if (border_color_select.value == "top") {
			t_color = color_str;
		} else if (border_color_select.value == "bottom") {
			b_color = color_str;
		} else if (border_color_select.value == "all") {
			l_color = color_str;
			r_color = color_str;
			t_color = color_str;
			b_color = color_str;
		}
        }

	if (bl_state && br_state && bt_state && bb_state) ba_state = true;

	elem.style.borderTopLeftRadius = document.getElementById(menu_id + "_border_top-left_radius").value + "px";
	elem.style.borderTopRightRadius = document.getElementById(menu_id + "_border_top-right_radius").value + "px";
	elem.style.borderBottomLeftRadius = document.getElementById(menu_id + "_border_bottom-left_radius").value + "px";
        elem.style.borderBottomRightRadius = document.getElementById(menu_id + "_border_bottom-right_radius").value + "px";

        var l_thickness = document.getElementById(menu_id + "_border_left_thickness").value;
        var l_type = document.getElementById(menu_id + "_border_left_type").value;

        var r_thickness = document.getElementById(menu_id + "_border_right_thickness").value;
        var r_type = document.getElementById(menu_id + "_border_right_type").value;

        var t_thickness = document.getElementById(menu_id + "_border_top_thickness").value;
        var t_type = document.getElementById(menu_id + "_border_top_type").value;

        var b_thickness = document.getElementById(menu_id + "_border_bottom_thickness").value;
        var b_type = document.getElementById(menu_id + "_border_bottom_type").value;

	if (bl_state) {
		elem.style.borderLeftWidth = l_thickness + "px";
		elem.style.borderLeftStyle = l_type;
		elem.style.borderLeftColor = l_color;
	} else {
		elem.style.borderLeft = 0;
	}

        if (br_state) {
                elem.style.borderRightWidth = r_thickness + "px";
		elem.style.borderRightStyle = r_type;
		elem.style.borderRightColor = r_color;
        } else {
                elem.style.borderRight= 0;
        }

        if (bt_state) {
                elem.style.borderTopWidth = t_thickness + "px";
		elem.style.borderTopStyle = t_type;
		elem.style.borderTopColor = t_color;
        } else {
                elem.style.borderTop = 0;
        }

        if (bb_state) {
                elem.style.borderBottomWidth = b_thickness + "px";
		elem.style.borderBottomStyle = b_type;
		elem.style.borderBottomColor = b_color;
        } else {
                elem.style.borderBottom = 0;
        }

	(bl_state ? button_left.classList.add("buttonPressed") : button_left.classList.remove("buttonPressed"));
	(br_state ? button_right.classList.add("buttonPressed") : button_right.classList.remove("buttonPressed"));
	(bt_state ? button_top.classList.add("buttonPressed") : button_top.classList.remove("buttonPressed"));
	(bb_state ? button_bottom.classList.add("buttonPressed") : button_bottom.classList.remove("buttonPressed"));
	(ba_state ? button_all.classList.add("buttonPressed") : button_all.classList.remove("buttonPressed"));
	MainMenu_Border_Static_color(menu_id);
}

var MainMenu_Border = function() {
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

				controls_div.appendChild(document.createTextNode("Border"));
                                controls_div.appendChild(document.createElement("br"));

				var b_t = document.createElement("table");
                                b_t.id = this.id + "_border_table";

				var table_cols = [];
                                for (var r = 0; r < 3; r++) {
                                        var tr = document.createElement("tr");
                                        tr.id = b_t.id + "_" + r;
                                        b_t.appendChild(tr);
                                        for (var c = 0; c < 3; c++) {
                                                var td = document.createElement("td");
                                                td.id = tr.id + "_" + c;
						td.style.textAlign = "center";
                                                tr.appendChild(td);
                                                table_cols.push(td);
                                        }
                                }

				var border_left = document.createElement("button");
				border_left.id = this.id + "_border_left";
				border_left.title = "toggle left border";
				border_left.appendChild(document.createTextNode("left"));
				border_left.setAttribute("onclick", "javascript:MainMenu_Border_Static_border(" + this.id + ", \"button\", \"left\")");
				table_cols[1 * 3 + 0].appendChild(border_left);

				var border_positions = ["left", "right", "top", "bottom", "all"];
				var border_types = ["solid", "dotted", "dashed", "double"];
				var border_type_elems = [];
				var border_thickness_elems = [];
				for (var bp = 0; bp < border_positions.length; bp++) {
					var border_p_type = document.createElement("select");
					border_p_type.id = this.id + "_border_" + border_positions[bp] + "_type";
					border_p_type.title = "select border type";
					border_p_type.setAttribute("onchange", "javascript:MainMenu_Border_Static_border(" + this.id + ", \"type\", \"" + border_positions[bp] + "\")");
					for (var bt = 0; bt < border_types.length; bt++) {
						var border_type_o = document.createElement("option");
						border_type_o.id = border_p_type + "_" + border_types[bt];
						border_type_o.value = border_types[bt];
						border_type_o.appendChild(document.createTextNode(border_types[bt]));
						border_p_type.appendChild(border_type_o);
					}
					border_type_elems.push(border_p_type);

					var border_thickness = document.createElement("input");
					border_thickness.id = this.id + "_border_" + border_positions[bp] + "_thickness";
					border_thickness.menu_id = this.id;
					border_thickness.title = "set border thickness";
					border_thickness.bp = border_positions[bp];
					border_thickness.value = 1;
					border_thickness.maxLength = 6;
					border_thickness.size = 6;
					border_thickness.addEventListener("keydown", function(event) {
						if (event.key == "Enter") {
                                                	event.preventDefault();
                                                	MainMenu_Border_Static_border(this.menu_id, "thickness", this.bp);
	                                        }
					});

					border_thickness_elems.push(border_thickness);
				}
				table_cols[1 * 3 + 0].appendChild(border_type_elems[0]);
				table_cols[1 * 3 + 0].appendChild(border_thickness_elems[0]);

				var border_right = document.createElement("button");
                                border_right.id = this.id + "_border_right";
				border_right.title = "toggle right border";
                                border_right.appendChild(document.createTextNode("right"));
				border_right.setAttribute("onclick", "javascript:MainMenu_Border_Static_border(" + this.id + ", \"button\", \"right\")");
                                table_cols[1 * 3 + 2].appendChild(border_right);
				table_cols[1 * 3 + 2].appendChild(border_type_elems[1]);
                                table_cols[1 * 3 + 2].appendChild(border_thickness_elems[1]);


				var border_top = document.createElement("button");
                                border_top.id = this.id + "_border_top";
				border_top.title = "toggle top border";
                                border_top.appendChild(document.createTextNode("top"));
				border_top.setAttribute("onclick", "javascript:MainMenu_Border_Static_border(" + this.id + ", \"button\", \"top\")");
                                table_cols[0 * 3 + 1].appendChild(border_top);
				table_cols[0 * 3 + 1].appendChild(border_type_elems[2]);
                                table_cols[0 * 3 + 1].appendChild(border_thickness_elems[2]);


				var border_bottom = document.createElement("button");
                                border_bottom.id = this.id + "_border_bottom";
				border_bottom.title = "toggle bottom border";
                                border_bottom.appendChild(document.createTextNode("bottom"));
				border_bottom.setAttribute("onclick", "javascript:MainMenu_Border_Static_border(" + this.id + ", \"button\", \"bottom\")");
                                table_cols[2 * 3 + 1].appendChild(border_bottom);
				table_cols[2 * 3 + 1].appendChild(border_type_elems[3]);
                                table_cols[2 * 3 + 1].appendChild(border_thickness_elems[3]);

				var radius_positions = ["top-left", "top-right", "bottom-left", "bottom-right", "all"];

				var radius_elements = [];
				for (var rp = 0; rp < radius_positions.length; rp++) {
					var border_radius = document.createElement("input");
					border_radius.id = this.id + "_border_" + radius_positions[rp] + "_radius";
					border_radius.menu_id = this.id;
					border_radius.title = radius_positions[rp] + " round corner radius";
                        	        border_radius.bp = radius_positions[rp];
                                	border_radius.value = 0;
	                                border_radius.maxLength = 6;
	                                border_radius.size = 6;
	                                border_radius.addEventListener("keydown", function(event) {
        	                        	if (event.key == "Enter") {
                	                        	event.preventDefault();
                        	                        MainMenu_Border_Static_border(this.menu_id, "radius", this.bp);
                                	        }
                                	});
					radius_elements.push(border_radius);
				}
				table_cols[0 * 3 + 0].appendChild(radius_elements[0]);
				table_cols[0 * 3 + 2].appendChild(radius_elements[1]);
				table_cols[2 * 3 + 0].appendChild(radius_elements[2]);
				table_cols[2 * 3 + 2].appendChild(radius_elements[3]);

				var border_all = document.createElement("button");
                                border_all.id = this.id + "_border_all";
				border_all.title = "toggle all borders";
                                border_all.appendChild(document.createTextNode("all"));
				border_all.setAttribute("onclick", "javascript:MainMenu_Border_Static_border(" + this.id + ", \"button\", \"all\")");
                                table_cols[1 * 3 + 1].appendChild(border_all);
				table_cols[1 * 3 + 1].appendChild(border_type_elems[4]);
                                table_cols[1 * 3 + 1].appendChild(border_thickness_elems[4]);
				table_cols[1 * 3 + 1].appendChild(radius_elements[4]);

                                controls_div.appendChild(b_t);

				controls_div.appendChild(document.createTextNode("Border Color"));

				controls_div.appendChild(document.createElement("br"));

				var border_color_select = document.createElement("select");
				border_color_select.id = this.id + "_border_color_select";
				border_color_select.title = "select border to adjust color";
				border_color_select.setAttribute("onchange", "javascript:MainMenu_Border_Static_color(" + this.id + ")");

				for (var bp = 0; bp < border_positions.length; bp++) {
					var bco = document.createElement("option");
					bco.appendChild(document.createTextNode(border_positions[bp]));
					bco.id = this.id + "_border_color_select_" + border_positions[bp];
					bco.value = border_positions[bp];
					border_color_select.appendChild(bco);
				}

				controls_div.appendChild(border_color_select);

				var c_t = document.createElement("table");
                                c_t.id = this.id + "_border_color_table";

                                table_cols = [];
                                for (var r = 0; r < 4; r++) {
                                        var tr = document.createElement("tr");
                                        tr.id = c_t.id + "_" + r;
                                        c_t.appendChild(tr);
                                        for (var c = 0; c < 2; c++) {
                                                var td = document.createElement("td");
                                                td.id = tr.id + "_" + c;
                                                td.style.textAlign = "center";
                                                tr.appendChild(td);
                                                table_cols.push(td);
                                        }
                                }

                                var ranges = ["Red", "Green", "Blue", "Alpha"];

                                for (var r = 0; r < 4; r++) {
                                        table_cols[r * 2 + 0].appendChild(document.createTextNode(ranges[r]));

                                        var slider = document.createElement("input");
                                        slider.type = "range";
                                        slider.min = 0;
                                        slider.max = 255;
                                        slider.value = 255;
                                        slider.id = this.id + "_border_color_slider_" + ranges[r];
                                        slider.menu_id = this.id;
                                        slider.r_id = r;
                                        slider.addEventListener("change", function(event) {
                                                MainMenu_Border_Static_border(this.menu_id, "color", this.r_id);
                                        });
                                        table_cols[r * 2 + 1].appendChild(slider);
                                }

                                controls_div.appendChild(c_t);

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
			var content_elem = document.getElementById(selected_id + "_content");

			var positions = ["left", "right", "top", "bottom"];
			var borders_arr = [
						selected_elem.style.borderLeft.split(" "),
						selected_elem.style.borderRight.split(" "),
						selected_elem.style.borderTop.split(" "),
						selected_elem.style.borderBottom.split(" ")
					];
			var w_c = 0;
			for (var p = 0; p < positions.length; p++) {
				var w = parseInt(borders_arr[p][0]);
				if (w > 0) {
					w_c++;
					document.getElementById(this.id + "_border_" + positions[p]).classList.add("buttonPressed");
	                                document.getElementById(this.id + "_border_" + positions[p] + "_type").value = borders_arr[p][1];
        	                        document.getElementById(this.id + "_border_" + positions[p] + "_thickness").value = w;
				} else {
					document.getElementById(this.id + "_border_" + positions[p]).classList.remove("buttonPressed");
                                        document.getElementById(this.id + "_border_" + positions[p] + "_type").value = "solid";
                                        document.getElementById(this.id + "_border_" + positions[p] + "_thickness").value = 1;

				}
			}
			if (w_c == 4) {
				document.getElementById(this.id + "_border_all").classList.add("buttonPressed");
				document.getElementById(this.id + "_border_all_type").value = borders_arr[0][1];
				document.getElementById(this.id + "_border_all_thickness").value = parseInt(borders_arr[0][0]);
			} else {
				document.getElementById(this.id + "_border_all").classList.remove("buttonPressed");
				document.getElementById(this.id + "_border_all_type").value = "solid";
				document.getElementById(this.id + "_border_all_thickness").value = 1;
			}
			document.getElementById(this.id + "_border_top-left_radius").value = parseInt(selected_elem.style.borderTopLeftRadius, 10);
			document.getElementById(this.id + "_border_top-right_radius").value = parseInt(selected_elem.style.borderTopRightRadius, 10);
			document.getElementById(this.id + "_border_bottom-left_radius").value = parseInt(selected_elem.style.borderBottomLeftRadius, 10);
			document.getElementById(this.id + "_border_bottom-right_radius").value = parseInt(selected_elem.style.borderBottomRightRadius, 10);
			document.getElementById(this.id + "_border_all_radius").value = parseInt(selected_elem.style.borderTopLeftRadius, 10);
			MainMenu_Border_Static_color(this.id);
		} else {
			MainMenu_Static_toggle_controls(this.id, false);
		}

		this.changed = true;
	}
}
