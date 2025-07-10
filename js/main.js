window.addEventListener('DOMContentLoaded', () => {
    loadPartial('partials/header.html', '#header');
    loadPartial('partials/marquee.html', '#marquee');
    loadPartial('partials/searchForm.html', '#searchForm');
  
    setTimeout(() => {
      document.getElementById('loading').style.display = 'none';
    }, 1500);
  });
  
  function loadPartial(file, containerSelector) {
    fetch(file)
      .then(res => res.text())
      .then(html => {
        document.querySelector(containerSelector).innerHTML = html;
      })
      .catch(err => {
        console.error(`Gagal memuat ${file}:`, err);
      });
  }
  