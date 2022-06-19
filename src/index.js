import cards from './menu.json';
const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};
const THEMESWITCHSTATE = 'theme-switch-state';

const refs = {
  cardList: document.querySelector('.js-menu'),
  themeToggle: document.querySelector('.theme-switch__toggle'),
};

refs.themeToggle.addEventListener('click', onThemeToggleClick);

if (localStorage.getItem(THEMESWITCHSTATE)) {
  refs.themeToggle.checked = JSON.parse(localStorage.getItem(THEMESWITCHSTATE));
}

setBodyTheme(refs.themeToggle.checked);

function onThemeToggleClick(e) {
  setBodyTheme(e.target.checked);
  localStorage.setItem(THEMESWITCHSTATE, e.target.checked);
}

function setBodyTheme(switchState) {
  if (switchState) {
    document.body.classList.add(Theme.DARK);
    document.body.classList.remove(Theme.LIGHT);
  } else {
    document.body.classList.add(Theme.LIGHT);
    document.body.classList.remove(Theme.DARK);
  }
}

refs.cardList.insertAdjacentHTML('afterbegin', makeCards());
function makeCards() {
  return cards
    .map(({ id, name, description, image, price, ingredients }) => {
      return `<li class="menu__item">
  <article class="card">
    <img
      src="${image}"
      alt="${name}"
      class="card__image"
    />
    <div class="card__content">
      <h2 class="card__name">${name}</h2>
      <p class="card__price">
        ${price} кредитов
      </p>
      <p class="card__descr">
        ${description}
      </p>

      <ul class="tag-list">
      ${ingredients
        .map(item => `<li class="tag-list__item">${item}</li>`)
        .join('')}
          </ul>
    </div>

    <button class="card__button button">
          В корзину
    </button>
  </article>
</li>`;
    })
    .join('');
}
