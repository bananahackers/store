'use strict';

const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const exitSearchButton = document.getElementById('exit-search-button');
const searchPanel = document.getElementById('search-panel');
const searchControl = document.getElementById('search-control');

var isSearching = false;

function showSearchPanel () {
  searchPanel.classList.remove('is-hidden')
  searchControl.classList.add('is-expanded')
  exitSearchButton.disabled = false
  searchInput.focus()
}

function hideSearchPanel () {
  searchPanel.classList.add('is-hidden')
  searchControl.classList.remove('is-expanded')
}

function runSearch () {
  if (searchInput.value.trim() !== '') {
    isSearching = true;
    document.getElementById('categories-tabs-container').classList.add('is-hidden');
    exitSearchButton.disabled = false;
    sortSelect.dispatchEvent(new Event('change'));
  }
}

searchButton.onclick = () => {
  if (searchPanel.classList.contains('is-hidden')) {
    showSearchPanel()
    return
  }

  runSearch()
}

searchInput.onkeyup = (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    runSearch()
  }
}

exitSearchButton.onclick = () => {
  searchInput.value = ''
  hideSearchPanel()
  if (isSearching) {
    isSearching = false;
    document.getElementById('categories-tabs-container').classList.remove('is-hidden');
    sortSelect.dispatchEvent(new Event('change'));
  }
  exitSearchButton.disabled = true;
}
