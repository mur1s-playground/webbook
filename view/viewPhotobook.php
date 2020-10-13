<div class="content">
	<div class="headline">Photobook</div><br>
	<div id="main_app"></div>
	<br><br><br><br>
</div>
<script type="text/javascript">
	var selected_id = null;
	var selected_controls_id = null;

	function set_selected_id(id) {
		if (selected_id != null) {
			var selected_element = document.getElementById(selected_id);
			selected_element.style.webkitBoxShadow = "";
			selected_element.style.boxShadow = "";
		}
		if (selected_id == id) {
			selected_id = null;
		} else {
			if (id != null) {
				selected_id = id;
				var selected_element = document.getElementById(id);
				selected_element.style.webkitBoxShadow = "0px 0px 10px 0px rgba(0, 0, 170, 0.75)";
                        	selected_element.style.boxShadow = "0px 0px 10px 0px rgba(0, 0, 170, 0.75)";
			}
		}
		main_app.update();
		main_app.draw();
	}

	var is_setup = false;

	var main_app = new Main();
	main_app.base_name = "main_app";

	var main_animation = new Animation();
	main_app.component_add(main_animation, "main_app");

	var main_menu = new MainMenu();
	main_app.component_add(main_menu, "main_app");

	var main_menu_add = new MainMenu_Add();
	main_app.component_add(main_menu_add, "main_app");

	var main_menu_edit = new MainMenu_Edit();
	main_app.component_add(main_menu_edit, "main_app");

	var main_menu_position_layer = new MainMenu_Position_Layer();
	main_app.component_add(main_menu_position_layer, "main_app");

	var main_menu_size_crop = new MainMenu_Size_Crop();
	main_app.component_add(main_menu_size_crop, "main_app");

	var main_menu_color = new MainMenu_Color();
	main_app.component_add(main_menu_color, "main_app");

	var main_menu_border = new MainMenu_Border();
	main_app.component_add(main_menu_border, "main_app");

	var main_menu_padding = new MainMenu_Padding();
	main_app.component_add(main_menu_padding, "main_app");

	var main_menu_animation = new MainMenu_Animation();
	main_app.component_add(main_menu_animation, "main_app");

	var main_menu_export = new MainMenu_Export();
	main_app.component_add(main_menu_export, "main_app");

	function mainLoop() {
		if (!is_setup) {
			main_app.create_body();

			main_app.update();
			main_app.draw();

                        main_menu.add_item(main_menu_add.id, "Add");
			main_menu.add_item(main_menu_edit.id, "Edit");
                        main_menu.add_item(main_menu_position_layer.id, "Position/Layer");
			main_menu.add_item(main_menu_size_crop.id, "Size/Crop");
			main_menu.add_item(main_menu_color.id, "Color/Transparency");
			main_menu.add_item(main_menu_border.id, "Border");
			main_menu.add_item(main_menu_padding.id, "Padding");
			main_menu.add_item(main_menu_animation.id, "Animation");
			main_menu.add_item(main_menu_export.id, "Export");

			is_setup = true;
		}
	        requestAnimationFrame(mainLoop);
	}
	requestAnimationFrame(mainLoop);

</script>

