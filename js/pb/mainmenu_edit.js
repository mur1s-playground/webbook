var MainMenu_Edit_Static_fonts = ["Font", "Georgia", "Palatino Linotype", "Times New Roman", "Arial", "Arial Black", "Comic Sans", "Impact", "Lucida Sans", "Tahoma", "Trebuchet", "Verdana", "Courier", "Lucida Console"];
var MainMenu_Edit_Static_font_attributes = ["Font Attribute", "weight: normal", "weight: bold", "style: normal", "style: italic", "style: oblique", "variant: normal", "variant: small-caps"];

var MainMenu_Edit_Static_edit = function(menu_id) {
	var content_elem = document.getElementById(selected_id + "_content");
	if (content_elem.nodeName == "SPAN") {
		var textarea_value = document.getElementById(menu_id + "_textarea").value;
		textarea_value = textarea_value.replaceAll(/(<<f:)(Georgia|Palatino Linotype|Times New Roman|Arial|Arial Black|Comic Sans|Impact|Lucida Sans|Tahoma|Trebuchet|Verdana|Courier|Lucida Console)(>>)/g, "<span style=\"font-family: $2;\">");
		textarea_value = textarea_value.replaceAll(/(<<a:)(weight: normal|weight: bold|style: normal|style: italic|style: oblique|variant: normal|variant: small-caps)(>>)/g, "<span style=\"font-$2;\">");
		textarea_value = textarea_value.replaceAll(/(<<s:)([\d]+)(>>)/g, "<span style=\"font-size: $2px\">");
		content_elem.innerHTML = textarea_value;
	}
}

var MainMenu_Edit_Static_font = function(menu_id) {
	var font_select = document.getElementById(menu_id + "_textarea_font_select");
	if (font_select.selectedIndex > 0) {
		document.getElementById(menu_id + "_textarea").value += "<<f:" + font_select.options[font_select.selectedIndex].value + ">>";
		font_select.selectedIndex = 0;
	}
}

var MainMenu_Edit_Static_fontsize = function(menu_id) {
	var font_size = document.getElementById(menu_id + "_textarea_font_size");
	document.getElementById(menu_id + "_textarea").value += "<<s:" + font_size.value + ">>";
}

var MainMenu_Edit_Static_font_attribute = function(menu_id) {
	var font_attribute = document.getElementById(menu_id + "_textarea_font_attributes_select");
	if (font_attribute.selectedIndex > 0) {
		document.getElementById(menu_id + "_textarea").value += "<<a:" + font_attribute.options[font_attribute.selectedIndex].value + ">>";
		font_attribute.selectedIndex = 0;
	}
}


var MainMenu_Edit = function() {
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

				controls_div.appendChild(document.createTextNode("Edit"));
                                controls_div.appendChild(document.createElement("br"));

				var textarea_edit_div = document.createElement("div");
				textarea_edit_div.id = this.id + "_textarea_edit_div";
				textarea_edit_div.style.display = "none";
				controls_div.appendChild(textarea_edit_div);

				var textarea_font_select = document.createElement("select");
				textarea_font_select.id = this.id + "_textarea_font_select";
				textarea_font_select.setAttribute("onchange", "javascript:MainMenu_Edit_Static_font(" + this.id + ")");

				var fonts = MainMenu_Edit_Static_fonts;

				for (var f = 0; f < fonts.length; f++) {
					var f_option = document.createElement("option");
					f_option.id = this.id + "_textarea_font_select_" + fonts[f];
					f_option.value = fonts[f];
					f_option.appendChild(document.createTextNode(fonts[f]));
					textarea_font_select.appendChild(f_option);
				}

				textarea_edit_div.appendChild(textarea_font_select);

				var textarea_font_size = document.createElement("input");
				textarea_font_size.id = this.id + "_textarea_font_size";
				textarea_font_size.value = 12;
				textarea_font_size.maxLength = 5;
				textarea_font_size.size = 5;
				textarea_font_size.menu_id = this.id;
				textarea_font_size.addEventListener("keydown", function(event) {
                                                if (event.key == "Enter") {
                                                        event.preventDefault();
                                                        MainMenu_Edit_Static_fontsize(this.menu_id);
                                                }
                                        });

				textarea_edit_div.appendChild(textarea_font_size);


				var textarea_select_attributes = document.createElement("select");
				textarea_select_attributes.id = this.id + "_textarea_font_attributes_select";
				textarea_select_attributes.setAttribute("onchange", "javascript:MainMenu_Edit_Static_font_attribute(" + this.id + ")");
				var font_attributes = MainMenu_Edit_Static_font_attributes;

                                for (var f = 0; f < font_attributes.length; f++) {
                                        var f_option = document.createElement("option");
                                        f_option.id = this.id + "_textarea_font_attributes_select_" + font_attributes[f];
                                        f_option.value = font_attributes[f];
                                        f_option.appendChild(document.createTextNode(font_attributes[f]));
                                        textarea_select_attributes.appendChild(f_option);
                                }
				textarea_edit_div.appendChild(textarea_select_attributes);

				var textarea_elem = document.createElement("textarea");
				textarea_elem.id = this.id + "_textarea";
				textarea_elem.style.width = "300px";
				textarea_elem.style.height = "300px";
				textarea_edit_div.appendChild(textarea_elem);

				var textarea_apply = document.createElement("button");
				textarea_apply.id = this.id + "_textarea_apply";
				textarea_apply.title = "apply text to textarea";
				textarea_apply.setAttribute("onclick", "javascript:MainMenu_Edit_Static_edit("+ this.id +")");
				textarea_apply.appendChild(document.createTextNode("apply"));
				textarea_edit_div.appendChild(textarea_apply);

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

			if (content_elem.nodeName == "SPAN") {
				document.getElementById(this.id + "_textarea_edit_div").style.display = "block";
				document.getElementById(this.id + "_textarea").value = content_elem.innerHTML.replaceAll(/(<span style="font-family: )(Georgia|Palatino Linotype|Times New Roman|Arial|Arial Black|Comic Sans|Impact|Lucida Sans|Tahoma|Trebuchet|Verdana|Courier|Lucida Console)(;">)/g, "<<f:$2>>").replaceAll(/(<span style="font-size: )([\d]+)(px">)/g, "<<s:$2>>").replaceAll(/(<span style="font-)(weight: normal|weight: bold|style: normal|style: italic|style: oblique|variant: normal|variant: small-caps)(;">)/g, "<<a:$2>>").replaceAll(/<\/span>/g, "");
			} else {
				document.getElementById(this.id + "_textarea_edit_div").style.display = "none";
			}
		} else {
			MainMenu_Static_toggle_controls(this.id, false);
		}

		this.changed = true;
	}
}
