'use strict';

// Global variables.
var currentSelectedCategory = 'all';

const categoriesTabsElement = document.getElementById('categories-tabs');

categoriesTabsElement.onclick = (e) => {
  const tabElement = e.target.closest('.category-tab')
  if (tabElement) {
    const clickedCategory = tabElement.getAttribute('data-category-id');
    if (currentSelectedCategory !== clickedCategory) {
      currentSelectedCategory = clickedCategory;
      for (const categoryTabElement of document.querySelectorAll('.category-tab')) {
        if (categoryTabElement.getAttribute('data-category-id') === currentSelectedCategory) {
          categoryTabElement.classList.add('is-active');
        } else {
          categoryTabElement.classList.remove('is-active');
        }
      }
      sortSelect.dispatchEvent(new Event('change'));
    }
  }
}
