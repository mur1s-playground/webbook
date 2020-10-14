var MainMenu_Export_Static_export = function(type) {
	if (type == "to_blank") {
		set_selected_id(null);
		var elem = document.getElementById("main_app");

		var open_window = window.open("https://mur1.de/sites/mur1/js/pb/export.html", "exported photobook", '');
		open_window.main_menu = main_menu;
	        open_window.main_app = elem;

		//Animation
		open_window.main_animation = main_animation;
		open_window.a_Static_started = true;
		open_window.a_Static_animation_type = Animation_Static_animation_type;
		open_window.a_Static_animated_ids = Animation_Static_animated_ids;
		open_window.a_Static_animations = Animation_Static_animations;
		open_window.a_Static_animation_frame_max = Animation_Static_animation_frame_max;

		open_window.a_Static_animation_is_compiled = Animation_Static_animation_is_compiled;
		open_window.a_Static_animation_compiled_id_ranges = Animation_Static_animation_compiled_id_ranges;
		open_window.a_Static_animation_compiled_ids = Animation_Static_animation_compiled_ids;

		MainMenu_Static_toggle_controls(selected_controls_id);
	}
}

var MainMenu_Export = function() {
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

				controls_div.appendChild(document.createTextNode("Export"));
                                controls_div.appendChild(document.createElement("br"));

				var to_blank = document.createElement("a");
				to_blank.appendChild(document.createTextNode("to blank"));
				to_blank.setAttribute("onclick", "javascript:MainMenu_Export_Static_export(\"to_blank\")");
				controls_div.appendChild(to_blank);

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
