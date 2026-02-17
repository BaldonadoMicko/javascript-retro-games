const body = document.body;
const button = document.getElementById("light-mode-toggle");
let is_light_mode = localStorage.getItem("light_mode_enabled") === "true";


function toggle_light_mode() {

  if (is_light_mode) {
    body.classList.add("light-mode");
    button.innerHTML = "<span'>NIGHT</span>";
  } else {
    body.classList.remove("light-mode");
    button.innerHTML = "<span>DAY</span>";
  }
    
}

toggle_light_mode();

button.onclick = function () {
  is_light_mode = !is_light_mode;

  if (is_light_mode) {
    localStorage.setItem("light_mode_enabled", "true");
  } else {
    localStorage.removeItem("light_mode_enabled");
  }

  toggle_light_mode();
};







