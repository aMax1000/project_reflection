// THEME CHANGE FUNCTIONS
function lightTheme(){
    document.documentElement.style.setProperty('--primary', 'rgb(255, 255, 255)');
    document.documentElement.style.setProperty('--primary-text', 'rgb(0, 0, 0)');

    document.documentElement.style.setProperty('--secondary', 'rgb(122, 246, 174)');
    document.documentElement.style.setProperty('--secondary-border', '1px solid rgb(21, 118, 95)');
    document.documentElement.style.setProperty('--secondary-faded', 'rgb(72, 196, 148)');
    document.documentElement.style.setProperty('--secondary-text', 'rgb(0, 0, 0)');
    
    document.documentElement.style.setProperty('--accent', 'rgb(255, 253, 112)');
    document.documentElement.style.setProperty('--accent-border', '1px solid rgb(220, 117, 55)');
    document.documentElement.style.setProperty('--accent-faded', 'rgb(249, 175, 75)');
    document.documentElement.style.setProperty('--accent-text', 'rgb(0, 0, 0)');
    
    document.documentElement.style.setProperty('--glass-bg', 'rgba(122, 246, 174, 0.4)');
    document.documentElement.style.setProperty('--glass-border', '1px solid rgba(122, 246, 174, 0.4)');
    document.documentElement.style.setProperty('--glass-text', 'rgb(0, 0, 0)');
    // SAVE THEME INTO LOCAL STORAGE
    localStorage.removeItem('theme');
    localStorage.setItem('theme', 'light');
}
function darkTheme(){
    document.documentElement.style.setProperty('--primary', 'rgb(0, 0, 0)');
    document.documentElement.style.setProperty('--primary-text', 'rgb(255, 255, 255)');

    document.documentElement.style.setProperty('--secondary', 'rgb(21, 118, 95)');
    document.documentElement.style.setProperty('--secondary-border', '1px solid rgb(10, 81, 71)');
    document.documentElement.style.setProperty('--secondary-faded', 'rgb(2, 56, 54)');
    document.documentElement.style.setProperty('--secondary-text', 'rgb(255, 255, 255)');
    
    document.documentElement.style.setProperty('--accent', 'rgb(249, 175, 75)');
    document.documentElement.style.setProperty('--accent-border', '1px solid rgb(192, 79, 23)');
    document.documentElement.style.setProperty('--accent-faded', 'rgb(220, 117, 55)');
    document.documentElement.style.setProperty('--accent-text', 'rgb(0, 0, 0)');
    
    document.documentElement.style.setProperty('--glass-bg', 'rgba(2, 56, 54, 0.4)');
    document.documentElement.style.setProperty('--glass-border', '1px solid rgba(2, 56, 54, 0.4)');
    document.documentElement.style.setProperty('--glass-text', 'rgb(255, 255, 255)');
    // SAVE THEME INTO LOCAL STORAGE
    localStorage.removeItem('theme');
    localStorage.setItem('theme', 'dark');
}

// THEME BUTTONS
let lightBtn = document.getElementById("light");
let darkBtn = document.getElementById("dark");
lightBtn.addEventListener("click", lightTheme);
dark.addEventListener("click", darkTheme);

// GET THEME FROM LOCAL STORAGE AND APPLY IT
if (localStorage.getItem('theme') === 'dark'){
    darkTheme();
} else if (localStorage.getItem('theme') === 'light'){
    lightTheme();
}