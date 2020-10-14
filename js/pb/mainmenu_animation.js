var MainMenu_Animation_Static_animation_new = function(menu_id) {
	if (!Animation_Static_animated_ids.includes(selected_id)) {
		Animation_Static_animated_ids.push(selected_id);
		Animation_Static_animations[selected_id] = [];
	}
	Animation_Static_animations[selected_id].push({
		title: 'new animation',
		type: 'single',
		frame_start: 0,
		frame_end: 100,
		length: 100,
		current_frame: 0,
		keyframes: {}
	});
	MainMenu_Animation_Static_update_animation_selection(menu_id);

	document.getElementById(menu_id + "_animation_select").selectedIndex = Animation_Static_animations[selected_id].length - 1;
	MainMenu_Animation_Static_set_controls_fields(menu_id);
}

var MainMenu_Animation_Static_update_animation_selection = function(menu_id) {
	var animation_select = document.getElementById(menu_id + "_animation_select");
	animation_select.innerHTML = "";

	var animations = Animation_Static_animations[selected_id];

	if (animations != undefined) {
		for (var a = 0; a < animations.length; a++) {
			var option = document.createElement("option");
			option.id = menu_id + "_animation_select_" + a;
			option.value = a;
			option.appendChild(document.createTextNode(a + ": " + animations[a].title));
			animation_select.appendChild(option);
		}
	}
}

var MainMenu_Animation_Static_animation_select = function(menu_id) {
	MainMenu_Animation_Static_set_controls_fields(menu_id);
}

var MainMenu_Animation_Static_set_controls_fields = function(menu_id) {
	var animation_editor_controls = document.getElementById(menu_id + "_animation_editor_controls");
	if (Animation_Static_animated_ids.includes(selected_id)) {
		var animation = Animation_Static_animations[selected_id][document.getElementById(menu_id + "_animation_select").selectedIndex];

		document.getElementById(menu_id + "_animation_title").value = animation.title;
		document.getElementById(menu_id + "_animation_type_select").value = animation.type;
		document.getElementById(menu_id + "_animation_start_frame").value = animation.frame_start;
       		document.getElementById(menu_id + "_animation_stop_frame").value = animation.frame_end;
       		document.getElementById(menu_id + "_animation_length_form").value = animation.length;
		document.getElementById(menu_id + "_animation_current_frame").value = animation.current_frame;
		MainMenu_Animation_Static_update_keyframes(menu_id);
		MainMenu_Animation_Static_set_current_frame(menu_id);

		animation_editor_controls.style.display = "block";
	} else {
		animation_editor_controls.style.display = "none";
	}
}

var MainMenu_Animation_Static_set_current_frame = function(menu_id, frame = null) {
	var animation = Animation_Static_animations[selected_id][document.getElementById(menu_id + "_animation_select").selectedIndex];

	if (animation.current_frame < animation.length) {
		document.getElementById(menu_id + "_animation_keyframe_" + animation.current_frame).style.border = "";
	}

	var animation_current_frame = document.getElementById(menu_id + "_animation_current_frame");
	if (frame != null) {
		animation_current_frame.value = frame;
	}
	document.getElementById(menu_id + "_animation_keyframe_" + animation_current_frame.value).style.border = "1px solid black";
	animation.current_frame = parseInt(animation_current_frame.value);

	Animation_Static_animation_frame_current = animation.frame_start + animation.current_frame - 1;
	Animation_Static_next(true);
}

var MainMenu_Animation_Static_update_keyframes = function(menu_id) {
	var animation = Animation_Static_animations[selected_id][document.getElementById(menu_id + "_animation_select").selectedIndex];

	var animation_keyframes_div = document.getElementById(menu_id + "_animation_keyframes");
	animation_keyframes_div.innerHTML = "";

	var animation_length_form = document.getElementById(menu_id + "_animation_length_form");

        for (var prop in animation.keyframes) {
                if (Object.prototype.hasOwnProperty.call(animation.keyframes, prop)) {
                        if (prop > parseInt(animation_length_form.value)) {
				delete animation.keyframes[prop];
			}
                }
        }

	var animation_current_frame = document.getElementById(menu_id + "_animation_current_frame");
	for (var k = 0; k < parseInt(animation_length_form.value); k++) {
        	var k_a = document.createElement("a");
                k_a.id = menu_id + "_animation_keyframe_" + k;
                if (k == parseInt(animation_current_frame.value)) {
                	k_a.style.border = "1px solid black";
                }
		if (animation.keyframes.hasOwnProperty(k)) {
			k_a.style.backgroundColor = "#00aa00";
		}
                if (k % 5 == 0) {
                	k_a.appendChild(document.createTextNode(k));
                } else {
                	k_a.appendChild(document.createTextNode("-"));
                }
               	k_a.setAttribute("onclick", "javascript:MainMenu_Animation_Static_set_current_frame("+ menu_id +", " + k + ")");
                animation_keyframes_div.appendChild(k_a);
	}
}

var MainMenu_Animation_Static_animation_title_set = function(menu_id) {
	var animation_select = document.getElementById(menu_id + "_animation_select");
	var animation = Animation_Static_animations[selected_id][animation_select.selectedIndex];
	animation.title = document.getElementById(menu_id + "_animation_title").value;
	var option = document.getElementById(menu_id + "_animation_select_" + animation_select.selectedIndex);
	option.innerHTML = "";
	option.appendChild(document.createTextNode(animation_select.selectedIndex + ": " + animation.title));
}

var MainMenu_Animation_Static_set_type = function(menu_id) {
	var animation = Animation_Static_animations[selected_id][document.getElementById(menu_id + "_animation_select").selectedIndex];
	animation.type = document.getElementById(menu_id + "_animation_type_select").value;
}

var MainMenu_Animation_Static_set_start_frame = function(menu_id) {
	var animation = Animation_Static_animations[selected_id][document.getElementById(menu_id + "_animation_select").selectedIndex];
	animation.frame_start = parseInt(document.getElementById(menu_id + "_animation_start_frame").value);
}

var MainMenu_Animation_Static_set_stop_frame = function(menu_id) {
	var animation = Animation_Static_animations[selected_id][document.getElementById(menu_id + "_animation_select").selectedIndex];
        animation.frame_end = parseInt(document.getElementById(menu_id + "_animation_stop_frame").value);
}

var MainMenu_Animation_Static_set_length = function(menu_id) {
	var animation = Animation_Static_animations[selected_id][document.getElementById(menu_id + "_animation_select").selectedIndex];
        animation.length = parseInt(document.getElementById(menu_id + "_animation_length_form").value);
	if (animation.length < animation.current_frame) {
		MainMenu_Animation_Static_set_current_frame(menu_id, 0);
	}
	MainMenu_Animation_Static_update_keyframes(menu_id);
}

var MainMenu_Animation_Static_style_pack = function(style) {
	var result = {};
	for (var prop in style) {
		if (Object.prototype.hasOwnProperty.call(style, prop)) {
			if (isNaN(prop) && style[prop] != null && style[prop] != "" && style[prop] != undefined) {
				result[prop] = style[prop];
			}
		}
	}
	return result;
}

var MainMenu_Animation_Static_add_keyframe = function(menu_id) {
	var animation = Animation_Static_animations[selected_id][document.getElementById(menu_id + "_animation_select").selectedIndex];
	MainMenu_Animation_Static_delete_keyframe(menu_id);

	var selected_elem = document.getElementById(selected_id);
	var content_elem = document.getElementById(selected_id + "_content");

	animation.keyframes[animation.current_frame] = {
			element_style:	MainMenu_Animation_Static_style_pack(Object.assign({}, selected_elem.style)),
			content_style:	MainMenu_Animation_Static_style_pack(Object.assign({}, content_elem.style)),
			content:	content_elem.innerHTML
	};

	document.getElementById(menu_id + "_animation_keyframe_" + animation.current_frame).style.backgroundColor = "#00aa00";
}

var MainMenu_Animation_Static_delete_keyframe = function(menu_id) {
	var animation = Animation_Static_animations[selected_id][document.getElementById(menu_id + "_animation_select").selectedIndex];
        if (animation.keyframes.hasOwnProperty(animation.current_frame)) {
                delete animation.keyframes[animation.current_frame];
		document.getElementById(menu_id + "_animation_keyframe_" + animation.current_frame).style.backgroundColor = "";
        }
}

var MainMenu_Animation = function() {
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

				controls_div.appendChild(document.createTextNode("Animation"));

				var animation_select = document.createElement("select");
				animation_select.id = this.id + "_animation_select";
				animation_select.setAttribute("onchange", "javascript:MainMenu_Animation_Static_animation_select(" + this.id + ")");
				controls_div.appendChild(animation_select);

				var animation_new = document.createElement("button");
				animation_new.id = this.id + "_animation_new_button";
				animation_new.title = "create new animation for selected element";
				animation_new.appendChild(document.createTextNode("new"));
				animation_new.setAttribute("onclick", "javascript:MainMenu_Animation_Static_animation_new(" + this.id +")");
				controls_div.appendChild(animation_new);

				var animation_editor_controls = document.createElement("div");
				animation_editor_controls.id = this.id + "_animation_editor_controls";
				animation_editor_controls.style.display = "none";

				var animation_title = document.createElement("input");
				animation_title.id = this.id + "_animation_title";
				animation_title.menu_id = this.id;
				animation_title.addEventListener("keydown", function(event) {
					if (event.key == "Enter") {
						event.preventDefault();
						MainMenu_Animation_Static_animation_title_set(this.menu_id);
					}
				});
				animation_editor_controls.appendChild(animation_title);

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
				animation_editor_controls.appendChild(animation_type_select);

				var animation_start_frame = document.createElement("input");
				animation_start_frame.id = this.id + "_animation_start_frame";
				animation_start_frame.menu_id = this.id;
				animation_start_frame.title = "animation start frame";
				animation_start_frame.value = 0;
				animation_start_frame.addEventListener("keydown", function(event) {
					if (event.key == "Enter") {
						event.preventDefault();
						MainMenu_Animation_Static_set_start_frame(this.menu_id);
					}
				});
				animation_editor_controls.appendChild(animation_start_frame);

				var animation_stop_frame = document.createElement("input");
				animation_stop_frame.id = this.id + "_animation_stop_frame";
				animation_stop_frame.menu_id = this.id;
				animation_stop_frame.title = "animation stop frame";
				animation_stop_frame.value = 100;
				animation_stop_frame.addEventListener("keydown", function(event) {
                                        if (event.key == "Enter") {
                                                event.preventDefault();
                                                MainMenu_Animation_Static_set_stop_frame(this.menu_id);
                                        }
                                });
				animation_editor_controls.appendChild(animation_stop_frame);

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

				animation_editor_controls.appendChild(animation_length_form);

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
				animation_editor_controls.appendChild(animation_current_frame);

				var animation_keyframes = document.createElement("div");
				animation_keyframes.id = this.id + "_animation_keyframes";
				animation_keyframes.style.width = "200px";
				animation_keyframes.style.overflowX = "auto";
				animation_keyframes.style.overflowY = "hidden";
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

				animation_editor_controls.appendChild(animation_keyframes);

				var insert_keyframe_button = document.createElement("button");
				insert_keyframe_button.id = this.id + "_animation_keyframe_insert";
				insert_keyframe_button.appendChild(document.createTextNode("insert keyframe"));
				insert_keyframe_button.setAttribute("onclick", "javascript:MainMenu_Animation_Static_add_keyframe(" + this.id +")");

				animation_editor_controls.appendChild(insert_keyframe_button);

				var delete_keyframe_button = document.createElement("button");
				delete_keyframe_button.id = this.id + "_animation_keyframe_delete";
				delete_keyframe_button.appendChild(document.createTextNode("delete keyframe"));
				delete_keyframe_button.setAttribute("onclick", "javascript:MainMenu_Animation_Static_delete_keyframe(" + this.id +")");

				animation_editor_controls.appendChild(delete_keyframe_button);

				controls_div.appendChild(animation_editor_controls);

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
			MainMenu_Animation_Static_update_animation_selection(this.id);
			MainMenu_Animation_Static_set_controls_fields(this.id);
		} else {
			MainMenu_Static_toggle_controls(this.id, false);
		}

		this.changed = true;
	}
}
