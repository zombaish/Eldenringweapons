const categories = [
    "Daggers", "Straight Swords", "Light Greatswords", "Greatswords", "Colossal Swords",
    "Thrusting Swords", "Heavy Thrusting Swords", "Curved Swords", "Curved Greatswords",
    "Backhand Blades", "Katanas", "Great Katanas", "Twinblades", "Axes", "Greataxes",
    "Hammers", "Flails", "Great Hammers", "Colossal Weapons", "Spears", "Great Spears",
    "Halberds", "Reapers", "Whips", "Fists", "Claws", "Beast Claws", "Hand-to-Hand Arts",
    "Perfume Bottles", "Light Bows", "Bows", "Greatbows", "Crossbows", "Ballistas",
    "Glintstone Staves", "Sacred Seals", "Torches", "Throwing Blades", "Thrusting Shields",
    "Small Shields", "Medium Shields", "Greatshields"
];

const categoriesContainer = document.getElementById('categories');
const weaponsContainer = document.getElementById('weapons');

let currentCategory = categories[0];
let currentCategoryButton = null;
let allWeapons = [];

// Load JSON
fetch('/weapons.json')
    .then(res => res.json())
    .then(data => {

        // Convert category arrays to objects
        for (const cat in data) {
            const list = data[cat];
            list.forEach(entry => {
                if (typeof entry === 'string') {
                    allWeapons.push({ name: entry, category: cat });
                } else {
                    allWeapons.push({
                        name: entry.name,
                        category: cat,
                        info: entry.info || ''
                    });
                }
            });
        }

        // Build category buttons
        categories.forEach(cat => {
            const btn = document.createElement('button');
            btn.textContent = cat;
            btn.className = "category-btn";
            btn.addEventListener('click', () => showWeapons(cat, btn));
            categoriesContainer.appendChild(btn);
        });

        const firstBtn = document.querySelectorAll('.category-btn')[0];
        if (firstBtn) showWeapons(categories[0], firstBtn);
    });

function showWeapons(category, button) {
    currentCategory = category;

    if (currentCategoryButton) {
        currentCategoryButton.classList.remove('active');
    }
    currentCategoryButton = button;
    currentCategoryButton.classList.add('active');

    const searchInput = document.getElementById('searchInput');
    if (searchInput.value.trim() !== '') {
        searchInput.value = '';
    }

    renderWeapons(allWeapons.filter(w => w.category === category));
}

function renderWeapons(weapons) {
    weaponsContainer.innerHTML = '';
    let lastCategory = null;

    weapons.forEach((w, idx) => {
        if (weapons.length > 0 && w.category !== lastCategory) {
            if (weapons.some(x => x.category === w.category) && weapons.length !== allWeapons.length) {
                const label = document.createElement('div');
                label.className = 'category-label';
                label.textContent = w.category;
                weaponsContainer.appendChild(label);
            }
            lastCategory = w.category;
        }

        const weapon = document.createElement('div');
        weapon.className = 'weapon-item show cursor-pointer';
        weapon.textContent = w.name;
        weapon.style.transitionDelay = `${(idx % 10) * 40}ms`;

        // Expand handled in expand.js
        weapon.onclick = () => openWeaponModal(w);

        weaponsContainer.appendChild(weapon);
    });
}

function filterWeapons() {
    const searchValue = document.getElementById('searchInput').value.trim().toLowerCase();

    if (searchValue === '') {
        renderWeapons(allWeapons.filter(w => w.category === currentCategory));
        return;
    }

    const matches = [];

    categories.forEach(cat => {
        if (cat.toLowerCase().includes(searchValue)) {
            allWeapons.forEach(w => { if (w.category === cat) matches.push(w); });
        }
    });

    allWeapons.forEach(w => {
        if (w.name.toLowerCase().includes(searchValue)) {
            if (!matches.some(m => m.name === w.name)) matches.push(w);
        }
    });

    document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
    renderWeapons(matches);
}
