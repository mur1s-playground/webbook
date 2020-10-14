var Animation_Static_animation_types = ["single", "repeat"];

var Animation_Static_started = true;

var Animation_Static_animation_type = "single";

var Animation_Static_animated_ids = [];
var Animation_Static_animations = {};

var Animation_Static_animation_frame_max = 100;
var Animation_Static_animation_frame_current = 0;

//COMPILING
var Animation_Static_animation_compiling = false;
var Animation_Static_animation_is_compiled = false;

var Animation_Static_animation_compiled_frames = 0;
var Animation_Static_animation_compiled_id_ranges = [];
var Animation_Static_animation_compiled_ids = {};

var Animation_Static_start_compiling = function() {
	Animation_Static_animation_compiling = true;
}

var Animation_Static_compile_animations = function() {
	if (Animation_Static_animation_compiled_frames+1 == Animation_Static_animation_frame_max) {
		Animation_Static_animation_is_compiled = true;
		Animation_Static_animation_compiling = false;
		Animation_Static_animation_compiled_frames = 0;
	} else if (Animation_Static_animation_compiled_frames == 0) {
		Animation_Static_animation_compiled_id_ranges = [];
		Animation_Static_animation_compiled_ids = {};
	}
	var compiled_ids = {};
	var compiled_ids_animation_count = 0;
	for (var a = 0; a < Animation_Static_animated_ids.length; a++) {
		var current = Animation_Static_animations[Animation_Static_animated_ids[a]];
                for (var animation_id in current) {
			if (!Object.prototype.hasOwnProperty.call(current, animation_id)) continue;
                        var animation = current[animation_id];
                        var keyfr = Animation_Static_is_animation_active(animation, Animation_Static_animation_compiled_frames);
			if (keyfr[0] != null && keyfr[1] != null) {
				if (!compiled_ids.hasOwnProperty(Animation_Static_animated_ids[a])) {
					compiled_ids[Animation_Static_animated_ids[a]] = {};
				}
				compiled_ids[Animation_Static_animated_ids[a]][animation_id] = [keyfr[0], keyfr[1]];
				compiled_ids_animation_count++;
			}
		}
	}
	if (Animation_Static_animation_compiled_id_ranges.length == 0) {
		Animation_Static_animation_compiled_id_ranges.push(Animation_Static_animation_compiled_frames);
		Animation_Static_animation_compiled_ids[Animation_Static_animation_compiled_frames] = compiled_ids;
	} else {
		var last_range = Animation_Static_animation_compiled_id_ranges[Animation_Static_animation_compiled_id_ranges.length - 1];
		var last_compiled = Animation_Static_animation_compiled_ids[last_range];
		var last_elem_count = 0;
		var difference = false;
		for (var animated_elem_id in last_compiled) {
			if ( !(Object.prototype.hasOwnProperty.call(last_compiled, animated_elem_id) && Object.prototype.hasOwnProperty.call(compiled_ids, animated_elem_id)) ) {
				last_elem_count++;
				difference = true;
				break;
			} else {
				last_elem_count++;
				for (var animation_id in last_compiled[animated_elem_id]) {
					if ( !(Object.prototype.hasOwnProperty.call(last_compiled[animated_elem_id], animation_id) && Object.prototype.hasOwnProperty.call(compiled_ids[animated_elem_id], animation_id)) ) {
						difference = true;
						break;
					}
				}
				if (difference) break;
			}
		}
		if ((last_elem_count == 0 && compiled_ids_animation_count != 0) || difference || last_elem_count != compiled_ids_animation_count) {
			Animation_Static_animation_compiled_id_ranges.push(Animation_Static_animation_compiled_frames);
	                Animation_Static_animation_compiled_ids[Animation_Static_animation_compiled_frames] = compiled_ids;
		}
	}
	Animation_Static_animation_compiled_frames++;
}
//END - COMPILING

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

var Animation_Static_get_animation_frame = function(animation, frame) {
		var current_frame = frame - animation.frame_start;
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
		return current_frame;
}

var Animation_Static_is_animation_active = function(animation, frame) {
	if (animation.frame_start <= frame && animation.frame_end > frame) {
        	var from_k = null;
                var to_k = null;

                var current_frame = Animation_Static_get_animation_frame(animation, frame);
                for (var prop in animation.keyframes) {
                	if (Object.prototype.hasOwnProperty.call(animation.keyframes, prop)) {
				prop = parseInt(prop);
                        	if (prop <= current_frame && (from_k == null || from_k < prop)) {
                                	from_k = prop;
                                }
                                if (prop >= current_frame && (to_k == null || to_k > prop) && prop != from_k) {
                                	to_k = prop;
                                }
                        }
                }
                if (from_k != null && to_k != null) {
			return [ from_k, to_k, current_frame ];
		}
	}
	return [ null, null, current_frame ];
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
			if (!Object.prototype.hasOwnProperty.call(current, animation_id)) continue;
			var animation = current[animation_id];
			var keyfr = Animation_Static_is_animation_active(animation, Animation_Static_animation_frame_current);
			var from_k = keyfr[0];
			var to_k = keyfr[1];
			var current_frame = keyfr[2];
			if (from_k != null && to_k != null) {
					var element = document.getElementById(Animation_Static_animated_ids[a]);
					var content = document.getElementById(Animation_Static_animated_ids[a] + "_content");

					var elem_from_style = animation.keyframes[from_k]["element_style"];
					var elem_to_style = animation.keyframes[to_k]["element_style"];
					for (var prop in elem_from_style) {
						if (Object.prototype.hasOwnProperty.call(elem_from_style, prop) && Object.prototype.hasOwnProperty.call(elem_to_style, prop)) {
							var f = elem_from_style[prop].replace(/^([-]?[\d]+(?:\.[\d]+)?)(px)?$/g, "$1");
							var t = elem_to_style[prop].replace(/^([-]?[\d]+(?:\.[\d]+)?)(px)?$/g, "$1");

							if (isNaN(f) || isNaN(t)) {
								var rgba_f = elem_from_style[prop].replace(/^(?:rgba\(([\d]+), ([\d]+), ([\d]+), ([\d](?:.[\d]+)?)\))$/g, "$1 $2 $3 $4").replace(/(?:rgb\(([\d]+), ([\d]+), ([\d]+)()\))$/g, "$1 $2 $3 $4").split(" ");
								var rgba_t = elem_to_style[prop].replace(/^(?:rgba\(([\d]+), ([\d]+), ([\d]+), ([\d](?:.[\d]+)?)\))$/g, "$1 $2 $3 $4").replace(/(?:rgb\(([\d]+), ([\d]+), ([\d]+)()\))$/g, "$1 $2 $3 $4").split(" ");
								if (rgba_f.length == 4 && rgba_t.length == 4) {
									if (rgba_f[3] == "") rgba_f[3] = 1.0;
									if (rgba_t[3] == "") rgba_t[3] = 1.0;
									var result = "rgba(";
									for (var c = 0; c < 4; c++) {
										f = parseInt(rgba_f[c]);
										t = parseInt(rgba_t[c]);
										result += (f + ((current_frame - from_k)/(to_k - from_k) * (t - f)));
										if (c < 3) result += ", ";
									}
									element.style[prop] = result + ")";
								}
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

				var compile_button = document.createElement("button");
				compile_button.id = this.id + "_animation_compile_button";
				compile_button.appendChild(document.createTextNode("compile"));
				compile_button.setAttribute("onclick", "javascript:Animation_Static_start_compiling()");

				controls_div.appendChild(select_animation_type);
				controls_div.appendChild(max_frames_form);
				controls_div.appendChild(compile_button);

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
