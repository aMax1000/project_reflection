// LIGHT AND DARK THEMES
let light = document.getElementById("light");
let dark = document.getElementById("dark");

light.addEventListener("change", function(){
    document.documentElement.style.setProperty('--glass-bg', 'rgba(0, 0, 0, 1)');
} );

dark.addEventListener("change", function(){
    //
} );

// TOP-MENU WIDTH SETTER
let top_menu_uls = document.querySelectorAll(".top-menu .option");

top_menu_max_width = 0;
top_menu_uls.forEach(element => {
    if (element.offsetWidth > top_menu_max_width){
        top_menu_max_width = element.offsetWidth;
    }
});

let top_sub_menu_uls = document.querySelectorAll(".top-menu .option ul")
top_sub_menu_uls.forEach(element => {
    element.classList.remove("sub-menu");
    if (element.offsetWidth > top_menu_max_width){
        top_menu_max_width = element.offsetWidth;
    }
    element.classList.add("sub-menu");
});

top_menu_uls.forEach(element => {
    element.style.width = top_menu_max_width +"px";
});