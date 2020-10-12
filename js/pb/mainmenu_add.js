var MainMenu_Add_Static_add = function(menu_id, typename, type) {
	var obj = null;
	if (typename == "photosource") {
		if (type == "url") {
			var form = document.getElementById(menu_id + "_add_photosource_by_url_form");
			if (form.value != "") {
				var obj = new PhotoSource(form.value);
        		        main_app.component_add(obj, "main_app");
			}
			form.value = "";
		}
	} else if (typename == "textfield") {
		var obj = new TextField();
		main_app.component_add(obj, "main_app");
	}
	MainMenu_Static_toggle_controls(menu_id, false);
        main_app.create_body();
        main_app.update();
        main_app.draw();
}


var MainMenu_Add = function() {
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
 				element.style.margin = "1px";

				var controls_div = document.createElement("div");
				controls_div.id = this.id + "_controls";
				controls_div.style.position = "absolute";
				controls_div.style.display = "none";
				controls_div.style.backgroundColor = this.bg;
                                controls_div.style.border = "1px solid black";
                                controls_div.style.borderRadius = "5px";
                                controls_div.style.padding = "5px";

				controls_div.appendChild(document.createTextNode("Add photo"));

				var addp_t = document.createElement("table");
                                addp_t.id = this.id + "_add_photo_table";

                                var table_cols = [];
                                for (var r = 0; r < 2; r++) {
                                        var tr = document.createElement("tr");
                                        tr.id = addp_t.id + "_" + r;
                                        addp_t.appendChild(tr);
                                        for (var c = 0; c < 2; c++) {
                                                var td = document.createElement("td");
                                                td.id = tr.id + "_" + c;
                                                td.style.textAlign = "center";
                                                tr.appendChild(td);
                                                table_cols.push(td);
                                        }
                                }

				table_cols[0 * 2 + 0].appendChild(document.createTextNode("by URL"));

				var add_by_url_form = document.createElement("input");
				add_by_url_form.id = this.id + "_add_photosource_by_url_form";
				add_by_url_form.menu_id = this.id;
				add_by_url_form.addEventListener("keydown", function(event) {
                                        if (event.key == "Enter") {
                                                event.preventDefault();
                                                MainMenu_Add_Static_add(this.menu_id, "photosource", "url");
                                        }
                                });
				table_cols[0 * 2 + 1].appendChild(add_by_url_form);

				controls_div.appendChild(addp_t);
				controls_div.appendChild(document.createElement("br"));

				var add_textfield = document.createElement("a");
				add_textfield.appendChild(document.createTextNode("Add textfield"));
				add_textfield.id = this.id + "_add_textfield";
				add_textfield.setAttribute("onclick", "javascript:MainMenu_Add_Static_add(" + this.id + ", \"textfield\", null)");

				controls_div.appendChild(add_textfield);

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

		this.changed = true;
	}
}
