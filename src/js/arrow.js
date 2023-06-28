var scrollThreshold = 250; // Número de píxeles de scroll requeridos para mostrar la flecha
var arrowLink = document.getElementById('arrow-link');

window.addEventListener('scroll', function () {
  if (window.pageYOffset > scrollThreshold) {
    arrowLink.style.display = 'block';
  } else {
    arrowLink.style.display = 'none';
  }
});

arrowLink.addEventListener('click', function () {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});