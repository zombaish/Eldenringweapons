const modal = document.getElementById('weaponModal');
const modalName = document.getElementById('modalName');
const modalInfo = document.getElementById('modalInfo');
const modalImage = document.getElementById('modalImage');
const closeModal = document.getElementById('closeModal');

function openWeaponModal(weapon) {
    modalName.textContent = weapon.name;

    if (weapon.info) {
        modalInfo.textContent = weapon.info;
    } else {
        modalInfo.textContent = '';
    }

    const file = weapon.name.replace(/ /g, '_');
    modalImage.src = `/cdn/img/${file}.png`;

    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

closeModal.onclick = () => {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
};

modal.onclick = e => {
    if (e.target === modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
};
