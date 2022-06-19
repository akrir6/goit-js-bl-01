import cards from './menu.json';
const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};
const THEMESTATE = 'theme-switch-state';

const refs = {
  cardList: document.querySelector('.js-menu'),
  themeToggle: document.querySelector('.theme-switch__toggle'),
};

refs.themeToggle.addEventListener('click', onThemeToggleClick);

document.body.classList = localStorage.getItem(THEMESTATE) || Theme.LIGHT;
refs.themeToggle.checked = document.body.classList.contains(Theme.DARK);

function onThemeToggleClick(e) {
  if (e.target.checked) {
    document.body.classList = Theme.DARK;
  } else {
    document.body.classList = Theme.LIGHT;
  }
  localStorage.setItem(THEMESTATE, document.body.classList);
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
