function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);

    document.body.style.visibility = "visible";
}

document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search)  
    const theme = params.get('theme')

    if (theme) {
        setTheme(theme);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        setTheme("dark");
    } else {
        setTheme("light");
    }

    document.getElementById("dark-mode-toggle").addEventListener("click", toggleTheme);
});