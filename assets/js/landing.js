const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() {
  navigation.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}
menuButton.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});
navigation.addEventListener('click', (event) => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && navigation.classList.contains('open')) { closeMenu(); menuButton.focus(); }
});
document.addEventListener('click', (event) => { if (!event.target.closest('.nav')) closeMenu(); });
window.matchMedia('(min-width: 801px)').addEventListener('change', closeMenu);
document.querySelector('#year').textContent = new Date().getFullYear();

const inquiryForm = document.querySelector('#inquiry-form');
const inquiryNeed = document.querySelector('#inquiry-need');
const inquiryDetails = document.querySelector('#inquiry-details');
const examples = {
  'Business software': 'For example: We need a better way to track orders across our team.',
  'AI and automation': 'For example: Our team manually copies information between spreadsheets every day.',
  'IT equipment and support': 'For example: We need five office laptops and help setting up our network.',
  'Technology consulting': 'For example: We want to improve our systems but need help deciding where to invest.',
  'Free technology assessment': 'Tell us what your business does and the challenge you would like to solve.'
};
function updateInquiryHint() { inquiryDetails.placeholder = examples[inquiryNeed.value]; }
updateInquiryHint();
inquiryNeed.addEventListener('change', updateInquiryHint);
document.querySelectorAll('[data-need]').forEach(link => {
  link.addEventListener('click', () => {
    inquiryNeed.value = link.dataset.need;
    updateInquiryHint();
  });
});
inquiryDetails.addEventListener('input', () => inquiryDetails.setCustomValidity(''));
inquiryForm.addEventListener('submit', event => {
  event.preventDefault();
  const details = inquiryDetails.value.trim();
  if (!details) {
    inquiryDetails.setCustomValidity('Please tell us what you would like help with.');
    inquiryDetails.reportValidity();
    return;
  }
  inquiryDetails.setCustomValidity('');
  const business = document.querySelector('#inquiry-business').value.trim();
  const message = ['Hello E-Tech, I would like help with: ' + inquiryNeed.value + '.', business ? 'Business: ' + business : '', 'My requirements: ' + details].filter(Boolean).join('\n\n');
  window.open('https://wa.me/2347013930533?text=' + encodeURIComponent(message), '_blank', 'noopener,noreferrer');
});
