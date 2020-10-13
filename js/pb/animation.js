var Animation_Static_animation_types = ["single", "repeat"];


var Animation_Static_animation_type = "single";

var Animation_Static_animated_ids = [];
var Animation_Static_animations = {};

var Animation_Static_animation_frame_max = 100;
var Animation_Static_animation_frame_current = 0;


var Animation = function() {
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
/*
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

				controls_div.appendChild(document.createTextNode("Animation"));

				var animation_type_select = document.createElement("select");
				animation_type_select.id = this.id + "_animation_type_select";
				animation_type_select.setAttribute("onchange", "javascript:MainMenu_Animation_Static_set_type(" + this.id + ")");

				var animation_types = ["single", "repeat", "ping-pong"];
				for (var at = 0; at < animation_types.length; at++) {
					var at_o = document.createElement("option");
					at_o.id = animation_type_select.id + "_" + animation_types[at];
					at_o.value = animation_types[at];
					at_o.appendChild(document.createTextNode(animation_types[at]));
					animation_type_select.appendChild(at_o);
				}
				controls_div.appendChild(animation_type_select);

				var animation_start_frame = document.createElement("input");
				animation_start_frame.id = this.id + "_animation_start_frame";
				animation_start_frame.title = "animation start frame";
				animation_start_frame.value = 0;
				controls_div.appendChild(animation_start_frame);

				var animation_stop_frame = document.createElement("input");
				animation_stop_frame.id = this.id + "_animation_stop_frame";
				animation_stop_frame.title = "animation stop frame";
				animation_stop_frame.value = 100;
				controls_div.appendChild(animation_stop_frame);

				var animation_length_form = document.createElement("input");
				animation_length_form.id = this.id + "_animation_length_form";
				animation_length_form.title = "animation length";
				animation_length_form.menu_id = this.id;
				animation_length_form.value = 100;
				animation_length_form.addEventListener("keydown", function(event) {
					if (event.key == "Enter") {
						event.preventDefault();
						MainMenu_Animation_Static_set_length(this.menu_id);
					}
				});

				controls_div.appendChild(animation_length_form);

				var animation_current_frame = document.createElement("input");
				animation_current_frame.id = this.id + "_animation_current_frame";
				animation_current_frame.title = "animation current frame";
				animation_current_frame.menu_id = this.id;
				animation_current_frame.value = 0;
				animation_current_frame.addEventListener("keydown", function(event) {
					if (event.key == "Enter") {
						event.preventDefault();
						MainMenu_Animation_Static_set_current_frame(this.menu_id, this.value);
					}
				});
				controls_div.appendChild(animation_current_frame);

				var animation_keyframes = document.createElement("div");
				animation_keyframes.style.width = "200px";
				animation_keyframes.style.overflowX = "auto";
				animation_keyframes.style.whiteSpace = "nowrap";

				for (var k = 0; k < parseInt(animation_length_form.value); k++) {
					var k_a = document.createElement("a");
					k_a.id = this.id + "_animation_keyframe_" + k;
					if (k == 0) {
						k_a.style.backgroundColor = "#ffff00";
					}
					if (k % 5 == 0) {
						k_a.appendChild(document.createTextNode(k));
					} else {
						k_a.appendChild(document.createTextNode("-"));
					}
					k_a.setAttribute("onclick", "javascript:Animation_Static_set_current_frame("+ this.id +", " + k + ")");
					animation_keyframes.appendChild(k_a);
				}

				controls_div.appendChild(animation_keyframes);

				var insert_keyframe_button = document.createElement("button");
				insert_keyframe_button.id = this.id + "_animation_keyframe_insert";
				insert_keyframe_button.appendChild(document.createTextNode("insert keyframe"));

				controls_div.appendChild(insert_keyframe_button);

				var delete_keyframe_button = document.createElement("button");
				delete_keyframe_button.id = this.id + "_animation_keyframe_delete";
				delete_keyframe_button.appendChild(document.createTextNode("delete keyframe"));

				controls_div.appendChild(delete_keyframe_button);

				element.appendChild(controls_div);

				this.is_init = true;
			}
*/
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
		} else {
			MainMenu_Static_toggle_controls(this.id, false);
		}

		this.changed = true;
	}
}
