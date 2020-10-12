var MainMenu_Padding_Static_padding = function(menu_id, position, value) {
	var ps_d = document.getElementById(selected_id);
        var ps = document.getElementById(selected_id + "_content");

        var padding_left = parseInt(ps_d.style.paddingLeft, 10);
        var padding_right = parseInt(ps_d.style.paddingRight, 10);
        var padding_top = parseInt(ps_d.style.paddingTop, 10);
        var padding_bottom = parseInt(ps_d.style.paddingBottom, 10);
	if (padding_left == "" || isNaN(padding_left)) padding_left = 0;
	if (padding_right == "" || isNaN(padding_right)) padding_right = 0;
	if (padding_top == "" || isNaN(padding_top)) padding_top = 0;
	if (padding_bottom == "" || isNaN(padding_bottom)) padding_bottom = 0;

	if (position == "left") {
		padding_left = parseInt(value);
	} else if (position == "right") {
		padding_right = parseInt(value);
	} else if (position == "top") {
		padding_top = parseInt(value);
	} else if (position == "bottom") {
		paddint_bottom = parseInt(value);
	} else if (position == "all") {
		padding_left = parseInt(value);
		padding_right = parseInt(value);
		padding_top = parseInt(value);
		padding_bottom = parseInt(value);
	}

        ps_d.style.paddingLeft = padding_left;
        ps_d.style.paddingRight = padding_right;
	ps_d.style.paddingTop = padding_top;
	ps_d.style.paddingBottom = padding_bottom;

	var padding_all = 0;
	if (padding_left == padding_right && padding_right == padding_top &&padding_top == padding_bottom) padding_all = padding_left;

	document.getElementById(menu_id + "_padding_left_form").value = parseInt(padding_left);
        document.getElementById(menu_id + "_padding_right_form").value = parseInt(padding_right);
        document.getElementById(menu_id + "_padding_top_form").value = parseInt(padding_top);;
        document.getElementById(menu_id + "_padding_bottom_form").value = parseInt(padding_bottom);
        document.getElementById(menu_id + "_padding_all_form").value = parseInt(padding_all);
}

var MainMenu_Padding = function() {
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

                                //Padding
				controls_div.appendChild(document.createTextNode("Padding"));
				controls_div.appendChild(document.createElement("br"));

				var padding = document.createElement("table");
				padding.id = this.id + "_padding_table";

				var table_cols = [];
				for (var r = 0; r < 3; r++) {
					var tr = document.createElement("tr");
					tr.id = padding.id + "_" + r;
					padding.appendChild(tr);
					for (var c = 0; c < 3; c++) {
						var td = document.createElement("td");
						td.id = tr.id + "_" + c;
						tr.appendChild(td);
						table_cols.push(td);
					}
				}

                                var padding_left_form = document.createElement("input");
                                padding_left_form.id = this.id + "_padding_left_form";
                                padding_left_form.menu_id = this.id;
				padding_left_form.title = "padding left";
                                padding_left_form.value = 0;
                                padding_left_form.maxLength = 6;
                                padding_left_form.size = 6;
                                padding_left_form.addEventListener("keydown", function(event) {
                                        if (event.key == "Enter") {
                                                event.preventDefault();
						MainMenu_Padding_Static_padding(this.menu_id, "left", this.value);
                                        }
                                });
				table_cols[1 * 3 + 0].appendChild(padding_left_form);

                                var padding_right_form = document.createElement("input");
                                padding_right_form.id = this.id + "_padding_right_form";
                                padding_right_form.menu_id = this.id;
                                padding_right_form.title = "padding right";
                                padding_right_form.value = 0;
                                padding_right_form.maxLength = 6;
                                padding_right_form.size = 6;
                                padding_right_form.addEventListener("keydown", function(event) {
                                        if (event.key == "Enter") {
                                                event.preventDefault();
                                                MainMenu_Padding_Static_padding(this.menu_id, "right", this.value);
                                        }
                                });
                                table_cols[1 * 3 + 2].appendChild(padding_right_form);

                                var padding_top_form = document.createElement("input");
                                padding_top_form.id = this.id + "_padding_top_form";
                                padding_top_form.menu_id = this.id;
                                padding_top_form.title = "padding top";
                                padding_top_form.value = 0;
                                padding_top_form.maxLength = 6;
                                padding_top_form.size = 6;
                                padding_top_form.addEventListener("keydown", function(event) {
                                        if (event.key == "Enter") {
                                                event.preventDefault();
                                                MainMenu_Padding_Static_padding(this.menu_id, "top", this.value);
                                        }
                                });
                                table_cols[0 * 3 + 1].appendChild(padding_top_form);

                                var padding_bottom_form = document.createElement("input");
                                padding_bottom_form.id = this.id + "_padding_bottom_form";
                                padding_bottom_form.menu_id = this.id;
                                padding_bottom_form.title = "padding bottom";
                                padding_bottom_form.value = 0;
                                padding_bottom_form.maxLength = 6;
                                padding_bottom_form.size = 6;
                                padding_bottom_form.addEventListener("keydown", function(event) {
                                        if (event.key == "Enter") {
                                                event.preventDefault();
                                                MainMenu_Padding_Static_padding(this.menu_id, "bottom", this.value);
                                        }
                                });
                                table_cols[2 * 3 + 1].appendChild(padding_bottom_form);

                                var padding_all_form = document.createElement("input");
                                padding_all_form.id = this.id + "_padding_all_form";
                                padding_all_form.menu_id = this.id;
                                padding_all_form.title = "padding all";
                                padding_all_form.value = 0;
                                padding_all_form.maxLength = 6;
                                padding_all_form.size = 6;
                                padding_all_form.addEventListener("keydown", function(event) {
                                        if (event.key == "Enter") {
                                                event.preventDefault();
                                                MainMenu_Padding_Static_padding(this.menu_id, "all", this.value);
                                        }
                                });
                                table_cols[1 * 3 + 1].appendChild(padding_all_form);

				controls_div.appendChild(padding);

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
			MainMenu_Padding_Static_padding(this.id, null, null);
		} else {
			MainMenu_Static_toggle_controls(this.id, false);
		}

		this.changed = true;
	}
}
