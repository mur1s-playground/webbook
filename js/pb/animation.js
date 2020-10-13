var Animation_Static_animation_types = ["single", "repeat"];

var Animation_Static_started = true;

var Animation_Static_animation_type = "single";

var Animation_Static_animated_ids = [];
var Animation_Static_animations = {};

var Animation_Static_animation_frame_max = 100;
var Animation_Static_animation_frame_current = 0;

var Animation_Static_compile_animations = function() {

}

var Animation_Static_set_type = function(menu_id) {
	Animation_Static_animation_type = Animation_Static_animation_types[document.getElementById(menu_id + "_animation_select_type").selectedIndex];
}

var Animation_Static_start_toggle = function(menu_id) {
	Animation_Static_started = !Animation_Static_started;
	var start_button = document.getElementById(menu_id + "_animation_start_button");
	start_button.innerHTML = "";
	if (Animation_Static_started) {
		start_button.appendChild(document.createTextNode(String.fromCodePoint(0x23f8)));
	} else {
		start_button.appendChild(document.createTextNode(String.fromCodePoint(0x23f4)));
	}
}

var Animation_Static_next = function(single = false) {
	if (!Animation_Static_started && !single) return;
	if (Animation_Static_animation_type == "repeat") {
		Animation_Static_animation_frame_current = (Animation_Static_animation_frame_current + 1) % (Animation_Static_animation_frame_max + 1);
	} else if (Animation_Static_animation_type == "single") {
		if (Animation_Static_animation_frame_current == Animation_Static_animation_frame_max) {
			Animation_Static_started = false;
			Animation_Static_animation_frame_current = 0;
			var start_button = document.getElementById(main_animation.id + "_animation_start_button");
		        start_button.innerHTML = "";
	                start_button.appendChild(document.createTextNode(String.fromCodePoint(0x23f4)));
			return;
		}
		Animation_Static_animation_frame_current++;
	}
	for (var a = 0; a < Animation_Static_animated_ids.length; a++) {
		var current = Animation_Static_animations[Animation_Static_animated_ids[a]];
		for (var animation_id in current) {
			var animation = current[animation_id];
			if (animation.frame_start <= Animation_Static_animation_frame_current && animation.frame_end > Animation_Static_animation_frame_current) {
				var from_k = null;
				var to_k = null;

				var current_frame = Animation_Static_animation_frame_current - animation.frame_start;
                                if (animation.type == "single") {

				} else if (animation.type == "repeat") {
					current_frame = current_frame % animation.length;
				} else if (animation.type == "ping-pong") {
					var it = current_frame / animation.length;
					current_frame = current_frame % animation.length;
					if (it % 2 >= 1) {
						current_frame = animation.length - current_frame;
					}
				}
				for (var prop in animation.keyframes) {
                			if (Object.prototype.hasOwnProperty.call(animation.keyframes, prop)) {
						if (prop <= current_frame && (from_k == null || from_k < prop)) {
							from_k = prop;
						}
						if (prop > current_frame && (to_k == null || to_k > prop)) {
							to_k = prop;
						}
					}
				}
				if (from_k != null && to_k != null) {
					var element = document.getElementById(Animation_Static_animated_ids[a]);
					var content = document.getElementById(Animation_Static_animated_ids[a] + "_content");

					var elem_from_style = animation.keyframes[from_k]["element_style"];
					var elem_to_style = animation.keyframes[to_k]["element_style"];
					for (var prop in elem_from_style) {
						if (Object.prototype.hasOwnProperty.call(elem_from_style, prop) && Object.prototype.hasOwnProperty.call(elem_to_style, prop)) {
							var f = elem_from_style[prop].replace(/^([\d]+(?:\.[\d]+)?)(px)?$/g, "$1");
							var t = elem_to_style[prop].replace(/^([\d]+(?:\.[\d]+)?)(px)?$/g, "$1");
							if (isNaN(f) || isNaN(t)) {

							} else {
								f = parseFloat(f);
								t = parseFloat(t);
								element.style[prop] = f + ((current_frame - from_k)/(to_k - from_k) * (t - f));
							}
						}
					}
				}
			}
		}
	}
}

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
			var element = document.getElementById(this.id);
			element.style.position = 'fixed';
			element.style.top = 0;
			element.style.right = 50;
			element.style.backgroundColor = this.bg;
			if (!this.is_init) {
				element.style.fontSize = "40px";
				element.style.zIndex = 255;
				element.style.textAlign = "center";

				var start_button = document.createElement("a");
				start_button.id = this.id + "_animation_start_button";
				start_button.style.border = "1px solid black";
				start_button.appendChild(document.createTextNode(String.fromCodePoint(0x23f8)));
				start_button.setAttribute("onclick", "javascript:Animation_Static_start_toggle(" + this.id + ")");

				var settings_button = document.createElement("a");
				settings_button.id = this.id + "_animation_settings_button";
				settings_button.style.border = "1px solid black";
				settings_button.style.margin = "1px";
				settings_button.style.paddingLeft = "5px";
				settings_button.style.paddingRight = "5px";
				settings_button.appendChild(document.createTextNode(String.fromCodePoint(0x2699)));
				settings_button.setAttribute("onclick", "javascript:MainMenu_Static_toggle_controls(" + this.id + ", true, 150)");

				element.appendChild(settings_button);
				element.appendChild(start_button);

				var controls_div = document.createElement("div");
				controls_div.id = this.id + "_controls";
				controls_div.style.position = "absolute";
                                controls_div.style.display = "none";
                                controls_div.style.backgroundColor = this.bg;
                                controls_div.style.border = "1px solid black";
                                controls_div.style.borderRadius = "5px";
                                controls_div.style.padding = "5px";
				element.appendChild(controls_div);

				var select_animation_type = document.createElement("select");
				select_animation_type.id = this.id + "_animation_select_type";
				select_animation_type.setAttribute("onchange", "javascript:Animation_Static_set_type(" + this.id + ")");

				for (var sa = 0; sa < Animation_Static_animation_types.length; sa++) {
					var op_sa = document.createElement("option");
					op_sa.id = select_animation_type.id + "_" + Animation_Static_animation_types[sa];
					op_sa.appendChild(document.createTextNode(Animation_Static_animation_types[sa]));
					select_animation_type.appendChild(op_sa);
				}

				var max_frames_form = document.createElement("input");
				max_frames_form.id = this.id + "_animation_max_frames";
				max_frames_form.title = "total animation frame";
				max_frames_form.value = 100;
				max_frames_form.addEventListener("keydown", function(event) {
					event.preventDefault();
					Animation_Static_animation_frame_max = this.value;
				});
/*
				var compile_button = document.createElement("button");
				compile_button.id = this.id + "_animation_compile_button";
				compile_button.setAttribute("onclick", "javascript:Animation_Static_compile_animations()");
*/
				controls_div.appendChild(select_animation_type);
				controls_div.appendChild(max_frames_form);
//				controls_div.appendChild(compile_button);

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
		} else {
			MainMenu_Static_toggle_controls(this.id, false);
		}

		this.changed = true;
	}
}
