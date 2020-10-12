var MainMenu_Color_Static_color = function(menu_id, type, r_id, value) {
	if (type == "background") {
		var elem = document.getElementById(selected_id);
		var rgba = elem.style.backgroundColor.replace(/[^\d,]/g, '').split(',');
		rgba[r_id] = value;
		if (rgba.length == 4) {
			var color_str = "rgba(" + rgba[0] + ", " + rgba[1] + ", " + rgba[2] + ", " + parseInt(rgba[3], 10)/255.0 + ")";
			elem.style.backgroundColor = color_str;
			main_app.components[selected_id].bg_set(color_str);
		} else {
			var color_str = "rgb(" + rgba[0] + ", " + rgba[1] + ", " + rgba[2] + ")";
                        elem.style.backgroundColor = color_str;
                        main_app.components[selected_id].bg_set(color_str);
		}
	} else if (type == "foreground") {
		var elem = document.getElementById(selected_id + "_content");
		var rgba = elem.style.color.replace(/[^\d,]/g, '').split(',');
                rgba[r_id] = value;
                if (rgba.length == 4) {
                        var color_str = "rgba(" + rgba[0] + ", " + rgba[1] + ", " + rgba[2] + ", " + parseInt(rgba[3], 10)/255.0 + ")";
                        elem.style.color = color_str;
			if (elem.nodeName == "IMG") {
				elem.style.opacity = parseInt(rgba[3], 10)/255.0;
			}
                } else {
                        var color_str = "rgb(" + rgba[0] + ", " + rgba[1] + ", " + rgba[2] + ")";
                        elem.style.color = color_str;
                }
	}
}

var MainMenu_Color = function() {
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

				controls_div.appendChild(document.createTextNode("Background"));
                                controls_div.appendChild(document.createElement("br"));
				controls_div.appendChild(document.createTextNode("Color/Transparency"));

				var bg_t = document.createElement("table");
                                bg_t.id = this.id + "_background_table";

				var table_cols = [];
                                for (var r = 0; r < 4; r++) {
                                        var tr = document.createElement("tr");
                                        tr.id = bg_t.id + "_" + r;
                                        bg_t.appendChild(tr);
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
					slider.id = this.id + "_bg_slider_" + ranges[r];
					slider.menu_id = this.id;
					slider.r_id = r;
					slider.addEventListener("change", function(event) {
						MainMenu_Color_Static_color(this.menu_id, "background", this.r_id, this.value);
					});
					table_cols[r * 2 + 1].appendChild(slider);
				}

				controls_div.appendChild(bg_t);

				controls_div.appendChild(document.createTextNode("Foreground"));
                                controls_div.appendChild(document.createElement("br"));
                                controls_div.appendChild(document.createTextNode("Color/Transparency"));


                                var fg_t = document.createElement("table");
                                fg_t.id = this.id + "_foreground_table";

                                table_cols = [];
                                for (var r = 0; r < 4; r++) {
                                        var tr = document.createElement("tr");
                                        tr.id = fg_t.id + "_" + r;
                                        fg_t.appendChild(tr);
                                        for (var c = 0; c < 2; c++) {
                                                var td = document.createElement("td");
                                                td.id = tr.id + "_" + c;
                                                td.style.textAlign = "center";
                                                tr.appendChild(td);
                                                table_cols.push(td);
                                        }
                                }

                                for (var r = 0; r < 4; r++) {
                                        table_cols[r * 2 + 0].appendChild(document.createTextNode(ranges[r]));

                                        var slider = document.createElement("input");
                                        slider.type = "range";
                                        slider.min = 0;
                                        slider.max = 255;
					if (r < 3) {
						slider.value = 0;
					} else {
	                                        slider.value = 255;
					}
                                        slider.id = this.id + "_fg_slider_" + ranges[r];
                                        slider.menu_id = this.id;
                                        slider.r_id = r;
                                        slider.addEventListener("change", function(event) {
                                                MainMenu_Color_Static_color(this.menu_id, "foreground", this.r_id, this.value);
                                        });
                                        table_cols[r * 2 + 1].appendChild(slider);
                                }

                                controls_div.appendChild(fg_t);

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

			var rgba = selected_elem.style.backgroundColor.replace(/[^\d,]/g, '').split(',');
			var rgba_c = content_elem.style.color.replace(/[^\d,]/g, '').split(',');
			var ranges = ["Red", "Green", "Blue", "Alpha"];
			for (var r = 0; r < 3; r++) {
				document.getElementById(this.id + "_bg_slider_" + ranges[r]).value = rgba[r];
				document.getElementById(this.id + "_fg_slider_" + ranges[r]).value = rgba_c[r];
			}
			if (rgba.length == 4) {
				document.getElementById(this.id + "_bg_slider_" + ranges[3]).value = parseFloat(rgba[3])*255;
				document.getElementById(this.id + "_fg_slider_" + ranges[3]).value = parseFloat(rgba_c[3])*255;
			}
			if (content_elem.nodeName == "IMG") {
				for (var r = 0; r < 3; r++) {
					document.getElementById(this.id + "_fg_slider_" + ranges[r]).disabled = true;
				}
			} else {
				for (var r = 0; r < 3; r++) {
                                        document.getElementById(this.id + "_fg_slider_" + ranges[r]).disabled = false;
                                }
			}
		} else {
			MainMenu_Static_toggle_controls(this.id, false);
		}

		this.changed = true;
	}
}
