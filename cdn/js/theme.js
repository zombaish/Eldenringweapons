function getCookie(name) {
    let match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
}

function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    document.cookie = `theme=${theme}; path=/; max-age=31536000`; // Store for 1 year

    document.body.style.visibility = "visible";
}

document.addEventListener("DOMContentLoaded", function () {
    let savedTheme = getCookie("theme");

    if (savedTheme) {
        setTheme(savedTheme);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        setTheme("dark");
    } else {
        setTheme("light");
    }

    document.getElementById("dark-mode-toggle").addEventListener("click", toggleTheme);
});