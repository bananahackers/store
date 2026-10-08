'use strict';

const appCardContainer = document.getElementById('app-cards-container')

function escapeHTML (raw = '') {
  return `${raw}`
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function addAppCard (appDetails) {
  const appIcon = appDetails.icon || 'assets/icons/default-icon.png'
  const hasScreenshots = Array.isArray(appDetails.screenshots) && appDetails.screenshots.length > 0
  const screenshotsHTML = hasScreenshots
    ? `<div class="store-app-preview-screenshots app-entry-open" data-app-name="${escapeHTML(appDetails.name)}" data-app-slug="${escapeHTML(appDetails.slug)}">${appDetails.screenshots.map(screenshot => `<img src="${escapeHTML(screenshot)}" alt="${escapeHTML(appDetails.name)} screenshot">`).join('')}</div>`
    : `<p class="store-app-preview-description is-clamped app-entry-open" data-app-name="${escapeHTML(appDetails.name)}" data-app-slug="${escapeHTML(appDetails.slug)}">${escapeHTML(appDetails.description)}</p>`

  appCardContainer.innerHTML += `
    <article id="${escapeHTML(appDetails.slug)}" class="store-app-entry">
      <div class="store-app-main">
        <div class="store-app-info app-entry-open" data-app-name="${escapeHTML(appDetails.name)}" data-app-slug="${escapeHTML(appDetails.slug)}">
          <img src="${escapeHTML(appIcon)}" alt="${escapeHTML(appDetails.name)}">
          <div>
            <h2 class="store-app-name">${escapeHTML(appDetails.name)}</h2>
            <p class="store-app-categories">${escapeHTML(generateReadableCategories(appDetails.meta.categories))}</p>
          </div>
        </div>
        <button class="button is-link store-app-download app-download"
                data-app-name="${escapeHTML(appDetails.name)}"
                ${appDetails.download.url ? '' : 'disabled'}>
          ${i18next.t('download')}
        </button>
      </div>
      <div class="store-app-preview">
        ${screenshotsHTML}
      </div>
    </article>
  `
}

const appCardsContainerElement = document.getElementById('app-cards-container')
appCardsContainerElement.onclick = (e) => {
  const downloadTarget = e.target.closest('.app-download')
  if (downloadTarget) {
    setAppDownloadModalDetails(StoreDbAPI.db.apps.objects[downloadTarget.getAttribute('data-app-name')])
    appDownloadsModal.controller.show()
    return
  }

  const detailsTarget = e.target.closest('.app-entry-open')
  if (detailsTarget) {
    setAppDetailsModalDetails(StoreDbAPI.db.apps.objects[detailsTarget.getAttribute('data-app-name')])
    appDetailsModal.controller.show()
  }
}
