#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use tauri::api::dialog;
use tauri::{CustomMenuItem, Menu, MenuItem, Submenu, WindowBuilder, WindowUrl};

#[derive(Clone, serde::Serialize)]
struct OpenPayload {
  path: String,
}

fn main() {
  // TODO Menus are fine for now... But improve once. Inspiration: https://github.com/probablykasper/tauri-template/blob/14b51d4f8702f5fdcb54cf528bdbf3be61e36372/src-tauri/src/menu.rs
  let new = CustomMenuItem::new("new".to_string(), "New Board").accelerator("Cmd+N");
  let new_window =
    CustomMenuItem::new("newWindow".to_string(), "New Window").accelerator("Cmd+Shift+N");
  let open = CustomMenuItem::new("open".to_string(), "Open…").accelerator("Cmd+O");

  let file_menu = Submenu::new(
    "File",
    Menu::new()
      .add_item(new)
      .add_item(new_window)
      .add_item(open)
      .add_native_item(MenuItem::Separator)
      .add_native_item(MenuItem::CloseWindow),
  );

  tauri::Builder::default()
    .create_window(
      "main",
      WindowUrl::default(),
      |builder, webview_attributes| {
        let window = builder
          .title("Lanes")
          .resizable(true)
          .inner_size(800.0, 500.0)
          .min_inner_size(600.0, 400.0);

        return (window, webview_attributes);
      },
    )
    .menu(
      Menu::new()
        .add_submenu(Submenu::new(
          "Lanes",
          Menu::new().add_native_item(MenuItem::Quit),
        ))
        .add_submenu(file_menu),
    )
    .on_menu_event(|event| match event.menu_item_id() {
      "new" => {
        event.window().emit("lanes://frontend/new", {}).unwrap();
      }
      "newWindow" => {
        let mut window = event.window().clone();
        window
          .create_window(
            "test".into(),
            WindowUrl::App("http://localhost:3000".into()),
            |builder, attrs| (builder, attrs),
          )
          .unwrap();
      }
      "open" => {
        dialog::FileDialogBuilder::default()
          .add_filter("Markdown", &["md"])
          .pick_file(move |path_buf| match path_buf {
            Some(p) => {
              event
                .window()
                .emit(
                  "lanes://frontend/open",
                  OpenPayload {
                    path: p.to_str().unwrap().into(),
                  },
                )
                .unwrap();
            }
            _ => {}
          });
      }
      _ => {}
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
