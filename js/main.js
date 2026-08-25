
const dropdown = document.querySelector(".dropdown");
const hamburg = document.querySelector(".hamburg");
const cancel = document.querySelector(".cancel");
const themeButtons = document.querySelectorAll(".theme-toggle");
const languageButtons = document.querySelectorAll(".lang-toggle");

if (hamburg && dropdown) {
    hamburg.addEventListener("click", () => {
        dropdown.style.transform = "translateY(0px)";
    });
}

if (cancel && dropdown) {
    cancel.addEventListener("click", () => {
        dropdown.style.transform = "translateY(-500px)";
    });
}

function updateThemeButtons() {
    const isDark = document.body.classList.contains("dark");
    themeButtons.forEach((btn) => {
        const label = btn.classList.contains("mobile-theme")
            ? `<i class="fa-solid ${isDark ? "fa-sun" : "fa-moon"}"></i> <span data-nl="Thema" data-en="Theme">${getCurrentLanguage() === "nl" ? "Thema" : "Theme"}</span>`
            : `<i class="fa-solid ${isDark ? "fa-sun" : "fa-moon"}"></i>`;
        btn.innerHTML = label;
    });
}

themeButtons.forEach((button) => {
    button.addEventListener("click", () => {
        document.body.classList.toggle("dark");
        localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
        updateThemeButtons();
    });
});

function getCurrentLanguage() {
    return localStorage.getItem("language") || "nl";
}

function setLanguage(language) {
    document.querySelectorAll("[data-nl][data-en]").forEach((element) => {
        const value = language === "nl" ? element.dataset.nl : element.dataset.en;
        element.textContent = value;
    });

    document.documentElement.lang = language;

    // Typewriter text on the home page.
    document.documentElement.style.setProperty(
        "--typewriter-1",
        language === "nl" ? '"Telecom professional"' : '"Telecom Professional"'
    );
    document.documentElement.style.setProperty(
        "--typewriter-2",
        language === "nl" ? '"Probleemoplosser"' : '"Problem Solver"'
    );
    document.documentElement.style.setProperty(
        "--typewriter-3",
        language === "nl" ? '"Toekomstige data professional"' : '"Future Data Professional"'
    );

    localStorage.setItem("language", language);

    languageButtons.forEach((button) => {
        button.textContent = language === "nl" ? "EN" : "NL";
    });

    updateThemeButtons();
}

window.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark");
    }

    const loader = document.querySelector(".loader");
    setTimeout(() => {
        if (loader) loader.classList.add("hidden");
    }, 800);

    document.querySelectorAll(".bar span").forEach((bar) => {
        setTimeout(() => {
            bar.style.width = bar.dataset.width || "0%";
        }, 450);
    });

    setLanguage(getCurrentLanguage());
    updateThemeButtons();
});

languageButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const next = getCurrentLanguage() === "nl" ? "en" : "nl";
        setLanguage(next);
    });
});
