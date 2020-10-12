var MainMenu_Size_Crop_Static_resize = function(menu_id, type, value) {
	var ps_d = document.getElementById(selected_id);
        var ps = document.getElementById(selected_id + "_content");

        value = parseInt(value);

        var ps_width = parseFloat(ps.style.width);
        var ps_height = parseFloat(ps.style.height);
        var width = ps_width;
        var height = ps_height;

        var aspect = document.getElementById(menu_id + "_resize_keep_aspect_checkbox").checked;
        var ratio = ps_width/ps_height;

        var margin_left = parseFloat(ps.style.marginLeft, 10);
        var margin_right = parseFloat(ps.style.marginRight, 10);
        var margin_top = parseFloat(ps.style.marginTop, 10);
        var margin_bottom = parseFloat(ps.style.marginBottom, 10);

        if (type == "width") {
	        var resize_ratio = value / ps_width;
                margin_left *= resize_ratio;
                margin_right *= resize_ratio;
                width = value;
                if (aspect == true) {
        	        height *= resize_ratio;
                        margin_top *= resize_ratio;
                        margin_bottom *= resize_ratio;
                }
        } else if (type == "height") {
                var resize_ratio = value / ps_height;
                margin_top *= resize_ratio;
                margin_bottom *= resize_ratio;
                height = value;
                if (aspect == true) {
        	        width *= resize_ratio;
                        margin_left *= resize_ratio;
                        margin_right *= resize_ratio;
                }
        }
        ps_d.style.width = width + margin_left + margin_right;
        ps_d.style.height = height + margin_top + margin_bottom;
        ps.style.width = width;
        ps.style.height = height;
	ps.style.marginLeft = margin_left;
	ps.style.marginRight = margin_right;
	ps.style.marginTop = margin_top;
	ps.style.marginBottom = margin_bottom;

	document.getElementById(menu_id + "_crop_left_form").value = -margin_left;
        document.getElementById(menu_id + "_crop_right_form").value = -margin_right;
        document.getElementById(menu_id + "_crop_top_form").value = -margin_top;
        document.getElementById(menu_id + "_crop_bottom_form").value = -margin_bottom;
        document.getElementById(menu_id + "_resize_width_form").value = width;
        document.getElementById(menu_id + "_resize_height_form").value = height;
}

var MainMenu_Size_Crop_Static_crop = function(menu_id, border, action) {
                var ps = document.getElementById(selected_id + "_content");
                var margin_left = parseFloat(ps.style.marginLeft, 10);
                var margin_right = parseFloat(ps.style.marginRight, 10);
                var margin_top = parseFloat(ps.style.marginTop, 10);
                var margin_bottom = parseFloat(ps.style.marginBottom, 10);
                if (border == "left") {
                        if (action == "left") {
                                if (margin_left < 0) {
                                        margin_left++;
                                }
                        } else if (action == "right") {
                                //TODO: IF
                                margin_left--;
                        } else {
                                margin_left = -parseFloat(document.getElementById(menu_id + "_crop_left_form").value);
                        }
                        ps.style.marginLeft = margin_left;
                        document.getElementById(menu_id + "_crop_left_form").value = -margin_left;
                } else if (border == "right") {
                        if (action == "left") {
                                //TODO: IF
                                margin_right--;
                        } else if (action == "right") {
                                if (margin_right < 0) {
                                        margin_right++;
                                }
                        } else {
                                margin_right = -parseFloat(document.getElementById(menu_id + "_crop_right_form").value);
                        }
                        ps.style.marginRight = margin_right;
                        document.getElementById(menu_id + "_crop_right_form").value = -margin_right;
                } else if (border == "top") {
                        if (action == "left") {
                                if (margin_top < 0) {
                                        margin_top++;
                                }
                        } else if (action == "right") {
                                //TODO: IF
                                margin_top--;
                        } else {
                                margin_top = -parseFloat(document.getElementById(menu_id + "_crop_top_form").value);
                        }
                        ps.style.marginTop = margin_top;
                        document.getElementById(menu_id + "_crop_top_form").value = -margin_top;
                } else if (border == "bottom") {
                        if (action == "left") {
                                //TOOD: IF
                                margin_bottom--;
                        } else if (action == "right") {
                                if (margin_bottom < 0) {
                                        margin_bottom++;
                                }
                        } else {
                                margin_bottom = -parseFloat(document.getElementById(menu_id + "_crop_bottom_form").value);
                        }
                        ps.style.marginBottom = margin_bottom;
                        document.getElementById(menu_id + "_crop_bottom_form").value = -margin_bottom;
                }
                var ps_d = document.getElementById(selected_id);
                var ps_width = parseInt(ps.style.width);
                var ps_height = parseInt(ps.style.height);
		ps_d.style.width = ps_width + margin_left + margin_right;
		ps_d.style.height = ps_height + margin_top + margin_bottom;
}


var MainMenu_Size_Crop = function() {
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
				element.style.margin = "1px";
				element.style.zIndex = 255;
				element.style.textAlign = "center";

				var controls_div = document.createElement("div");
				controls_div.id = this.id + "_controls";
				controls_div.style.position = "absolute";
				controls_div.style.display = "none";
				controls_div.style.backgroundColor = this.bg;
				controls_div.style.border = "1px solid black";
                                controls_div.style.borderRadius = "5px";
                                controls_div.style.padding = "5px";

                                //RESIZE
				controls_div.appendChild(document.createTextNode("Size"));
				controls_div.appendChild(document.createElement("br"));

                                var ps_edit_resize_width_form = document.createElement("input");
                                ps_edit_resize_width_form.id = this.id + "_resize_width_form";
                                ps_edit_resize_width_form.menu_id = this.id;
				ps_edit_resize_width_form.title = "Width";
                                ps_edit_resize_width_form.value = 0;
                                ps_edit_resize_width_form.maxSize = 6;
                                ps_edit_resize_width_form.size = 6;
                                ps_edit_resize_width_form.addEventListener("keydown", function(event) {
                                        if (event.key == "Enter") {
                                                event.preventDefault();
						MainMenu_Size_Crop_Static_resize(this.menu_id, "width", this.value);
                                        }
                                });
                                controls_div.appendChild(ps_edit_resize_width_form);

                                var ps_edit_resize_keep_aspect_checkbox = document.createElement("input");
                                ps_edit_resize_keep_aspect_checkbox.type = "checkbox";
                                ps_edit_resize_keep_aspect_checkbox.checked = true;
                                ps_edit_resize_keep_aspect_checkbox.id = this.id + "_resize_keep_aspect_checkbox";
				ps_edit_resize_keep_aspect_checkbox.title = "Keep current aspect ratio";
                                controls_div.appendChild(ps_edit_resize_keep_aspect_checkbox);

                                var ps_edit_resize_height_form = document.createElement("input");
                                ps_edit_resize_height_form.id = this.id + "_resize_height_form";
                                ps_edit_resize_height_form.menu_id = this.id;
				ps_edit_resize_height_form.title = "height";
                                ps_edit_resize_height_form.value = 0;
                                ps_edit_resize_height_form.maxSize = 6;
                                ps_edit_resize_height_form.size = 6;
                                ps_edit_resize_height_form.addEventListener("keydown", function(event) {
                                        if (event.key == "Enter") {
                                                event.preventDefault();
						MainMenu_Size_Crop_Static_resize(this.menu_id, "height", this.value);
                                        }
                                });
                                controls_div.appendChild(ps_edit_resize_height_form);

				controls_div.appendChild(document.createElement("br"));
				controls_div.appendChild(document.createElement("br"));

				//CROPPING
				controls_div.appendChild(document.createTextNode("Crop"));
				controls_div.appendChild(document.createElement("br"));

				var cropping = document.createElement("table");
				cropping.id = this.id + "_cropping_table";

				var table_cols = [];
				for (var r = 0; r < 3; r++) {
					var tr = document.createElement("tr");
					tr.id = cropping.id + "_" + r;
					cropping.appendChild(tr);
					for (var c = 0; c < 9; c++) {
						var td = document.createElement("td");
						td.id = tr.id + "_" + c;
						tr.appendChild(td);
						table_cols.push(td);
					}
				}

				//CROP LEFT
                                var ps_edit_crop_left_left_button = document.createElement("a");
                                ps_edit_crop_left_left_button.id = this.id + "_crop_left_left_button";
                                ps_edit_crop_left_left_button.appendChild(document.createTextNode(String.fromCodePoint(0x2190)));
                                ps_edit_crop_left_left_button.setAttribute('onclick', "javascript:MainMenu_Size_Crop_Static_crop(" + this.id + ",\"left\", \"left\")");
				table_cols[1 * 9 + 0].appendChild(ps_edit_crop_left_left_button);

                                var ps_edit_crop_left_form = document.createElement("input");
                                ps_edit_crop_left_form.id = this.id + "_crop_left_form";
                                ps_edit_crop_left_form.menu_id = this.id;
				ps_edit_crop_left_form.title = "crop left";
                                ps_edit_crop_left_form.value = 0;
                                ps_edit_crop_left_form.maxLength = 6;
                                ps_edit_crop_left_form.size = 6;
                                ps_edit_crop_left_form.addEventListener("keydown", function(event) {
                                        if (event.key == "Enter") {
                                                event.preventDefault();
						MainMenu_Size_Crop_Static_crop(this.menu_id, "left", this.value);
                                        }
                                });
				table_cols[1 * 9 + 1].appendChild(ps_edit_crop_left_form);

                                var ps_edit_crop_left_right_button = document.createElement("a");
                                ps_edit_crop_left_right_button.id = this.id + "_crop_left_right_button";
                                ps_edit_crop_left_right_button.appendChild(document.createTextNode(String.fromCodePoint(0x2192)));
                                ps_edit_crop_left_right_button.setAttribute('onclick', "javascript:MainMenu_Size_Crop_Static_crop(" + this.id + ",\"left\", \"right\")");
				table_cols[1 * 9 + 2].appendChild(ps_edit_crop_left_right_button);

				 //CROP RIGHT
                                var ps_edit_crop_right_left_button = document.createElement("a");
                                ps_edit_crop_right_left_button.id = this.id + "_crop_right_left_button";
                                ps_edit_crop_right_left_button.appendChild(document.createTextNode(String.fromCodePoint(0x2190)));
                                ps_edit_crop_right_left_button.setAttribute('onclick', "javascript:MainMenu_Size_Crop_Static_crop(" + this.id + ",\"right\", \"left\")");
                                table_cols[1 * 9 + 6].appendChild(ps_edit_crop_right_left_button);

                                var ps_edit_crop_right_form = document.createElement("input");
                                ps_edit_crop_right_form.id = this.id + "_crop_right_form";
                                ps_edit_crop_right_form.menu_id = this.id;
				ps_edit_crop_right_form.title = "crop right";
                                ps_edit_crop_right_form.value = 0;
                                ps_edit_crop_right_form.maxLength = 6;
                                ps_edit_crop_right_form.size = 6;
                                ps_edit_crop_right_form.addEventListener("keydown", function(event) {
                                        if (event.key == "Enter") {
                                                event.preventDefault();
                                                MainMenu_Size_Crop_Static_crop(this.menu_id, "right", this.value);
                                        }
                                });
                                table_cols[1 * 9 + 7].appendChild(ps_edit_crop_right_form);

                                var ps_edit_crop_right_right_button = document.createElement("a");
                                ps_edit_crop_right_right_button.id = this.id + "_crop_right_right_button";
                                ps_edit_crop_right_right_button.appendChild(document.createTextNode(String.fromCodePoint(0x2192)));
                                ps_edit_crop_right_right_button.setAttribute('onclick', "javascript:MainMenu_Size_Crop_Static_crop(" + this.id + ",\"right\", \"right\")");
                                table_cols[1 * 9 + 8].appendChild(ps_edit_crop_right_right_button);

				//CROP TOP
                                var ps_edit_crop_top_left_button = document.createElement("a");
                                ps_edit_crop_top_left_button.id = this.id + "_crop_top_left_button";
                                ps_edit_crop_top_left_button.appendChild(document.createTextNode(String.fromCodePoint(0x2191)));
                                ps_edit_crop_top_left_button.setAttribute('onclick', "javascript:MainMenu_Size_Crop_Static_crop(" + this.id + ",\"top\", \"left\")");
                                table_cols[0 * 9 + 3].appendChild(ps_edit_crop_top_left_button);

                                var ps_edit_crop_top_form = document.createElement("input");
                                ps_edit_crop_top_form.id = this.id + "_crop_top_form";
                                ps_edit_crop_top_form.menu_id = this.id;
				ps_edit_crop_top_form.title = "crop top";
                                ps_edit_crop_top_form.value = 0;
                                ps_edit_crop_top_form.maxLength = 6;
                                ps_edit_crop_top_form.size = 6;
                                ps_edit_crop_top_form.addEventListener("keydown", function(event) {
                                        if (event.key == "Enter") {
                                                event.preventDefault();
                                                MainMenu_Size_Crop_Static_crop(this.menu_id, "top", this.value);
                                        }
                                });
                                table_cols[0 * 9 + 4].appendChild(ps_edit_crop_top_form);

                                var ps_edit_crop_top_right_button = document.createElement("a");
                                ps_edit_crop_top_right_button.id = this.id + "_crop_top_right_button";
                                ps_edit_crop_top_right_button.appendChild(document.createTextNode(String.fromCodePoint(0x2193)));
                                ps_edit_crop_top_right_button.setAttribute('onclick', "javascript:MainMenu_Size_Crop_Static_crop(" + this.id + ",\"top\", \"right\")");
                                table_cols[0 * 9 + 5].appendChild(ps_edit_crop_top_right_button);

				//CROP BOTTOM
                                var ps_edit_crop_bottom_left_button = document.createElement("a");
                                ps_edit_crop_bottom_left_button.id = this.id + "_crop_bottom_left_button";
                                ps_edit_crop_bottom_left_button.appendChild(document.createTextNode(String.fromCodePoint(0x2191)));
                                ps_edit_crop_bottom_left_button.setAttribute('onclick', "javascript:MainMenu_Size_Crop_Static_crop(" + this.id + ",\"bottom\", \"left\")");
                                table_cols[2 * 9 + 3].appendChild(ps_edit_crop_bottom_left_button);

                                var ps_edit_crop_bottom_form = document.createElement("input");
                                ps_edit_crop_bottom_form.id = this.id + "_crop_bottom_form";
                                ps_edit_crop_bottom_form.menu_id = this.id;
				ps_edit_crop_bottom_form.title = "crop bottom";
                                ps_edit_crop_bottom_form.value = 0;
                                ps_edit_crop_bottom_form.maxLength = 6;
                                ps_edit_crop_bottom_form.size = 6;
                                ps_edit_crop_bottom_form.addEventListener("keydown", function(event) {
                                        if (event.key == "Enter") {
                                                event.preventDefault();
                                                MainMenu_Size_Crop_Static_crop(this.menu_id, "bottom", this.value);
                                        }
                                });
                                table_cols[2 * 9 + 4].appendChild(ps_edit_crop_bottom_form);

                                var ps_edit_crop_bottom_right_button = document.createElement("a");
                                ps_edit_crop_bottom_right_button.id = this.id + "_crop_bottom_right_button";
                                ps_edit_crop_bottom_right_button.appendChild(document.createTextNode(String.fromCodePoint(0x2193)));
                                ps_edit_crop_bottom_right_button.setAttribute('onclick', "javascript:MainMenu_Size_Crop_Static_crop(" + this.id + ",\"bottom\", \"right\")");
                                table_cols[2 * 9 + 5].appendChild(ps_edit_crop_bottom_right_button);


				controls_div.appendChild(cropping);

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

			var width_elem = document.getElementById(this.id + "_resize_width_form");
			width_elem.value = parseFloat(selected_elem.style.width);

			var height_elem = document.getElementById(this.id + "_resize_height_form");
			height_elem.value = parseFloat(selected_elem.style.height);

			var content_elem = document.getElementById(selected_id + "_content");

			var crop_left_elem = document.getElementById(this.id + "_crop_left_form");
			crop_left_elem.value = -parseFloat(content_elem.style.marginLeft);

			var crop_right_elem = document.getElementById(this.id + "_crop_right_form");
			crop_right_elem.value = -parseFloat(content_elem.style.marginRight);

			var crop_top_elem = document.getElementById(this.id + "_crop_top_form");
			crop_top_elem.value = -parseFloat(content_elem.style.marginTop);

			var crop_bottom_elem = document.getElementById(this.id + "_crop_bottom_form");
			crop_bottom_elem.value = -parseFloat(content_elem.style.marginBottom);
		} else {
			MainMenu_Static_toggle_controls(this.id, false);
		}

		this.changed = true;
	}
}
