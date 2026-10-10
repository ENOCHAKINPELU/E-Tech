const quoteForm = document.querySelector('#quote-form');
const quoteItem = document.querySelector('#quote-item');
const quoteDetails = document.querySelector('#quote-details');
const quoteExamples = {
  'Laptops and workstations': 'For example: 5 laptops for our accounts team, mainly Excel and email. Needed by the end of the month.',
  'Desktops and monitors': 'For example: 3 desktops with monitors for our front desk and records office.',
  'Networking and Wi-Fi': 'For example: Wi-Fi keeps dropping on our second floor. About 20 staff use it daily.',
  'Printers and peripherals': 'For example: One printer that can scan and copy, shared by 10 staff.',
  'Power backup (UPS and inverters)': 'For example: UPS units for 6 desktops and a router so we can keep working during outages.',
  'Accessories and storage': 'For example: 10 keyboard and mouse sets and 2 external drives for backups.',
  'A full office setup': 'For example: We are opening an office for 8 staff next month and need computers, Wi-Fi and a printer.',
  'Maintenance, repairs or upgrades': 'For example: Two of our laptops are very slow and one will not charge.',
  "I'm not sure yet": 'Tell us what your business does and what your team needs to get done.'
};
function updateQuoteHint() { quoteDetails.placeholder = quoteExamples[quoteItem.value]; }
updateQuoteHint();
quoteItem.addEventListener('change', updateQuoteHint);
let prefilledDetails = '';
document.querySelectorAll('[data-item]').forEach(link => {
  link.addEventListener('click', () => {
    quoteItem.value = link.dataset.item;
    updateQuoteHint();
    // Fill in the chosen package, without overwriting anything the visitor typed.
    const current = quoteDetails.value.trim();
    if (link.dataset.package && (!current || current === prefilledDetails.trim())) {
      quoteDetails.value = prefilledDetails = link.dataset.package;
    }
  });
});

// Hide the floating WhatsApp button while the quote form is on screen.
const whatsappFab = document.querySelector('.whatsapp-fab');
if (whatsappFab && 'IntersectionObserver' in window) {
  new IntersectionObserver(([entry]) => {
    whatsappFab.classList.toggle('is-hidden', entry.isIntersecting);
  }, { threshold: 0.15 }).observe(document.querySelector('#quote'));
}
quoteDetails.addEventListener('input', () => quoteDetails.setCustomValidity(''));
quoteForm.addEventListener('submit', event => {
  event.preventDefault();
  const details = quoteDetails.value.trim();
  if (!details) {
    quoteDetails.setCustomValidity('Please tell us a little about what you need.');
    quoteDetails.reportValidity();
    return;
  }
  quoteDetails.setCustomValidity('');
  const field = id => document.querySelector(id).value.trim();
  const quantity = field('#quote-quantity');
  const location = field('#quote-location');
  const business = field('#quote-business');
  const message = [
    'Hello E-Tech Store, I would like a quote for: ' + quoteItem.value + '.',
    quantity ? 'Quantity: ' + quantity : '',
    location ? 'Location: ' + location : '',
    business ? 'Business: ' + business : '',
    'Details: ' + details
  ].filter(Boolean).join('\n');
  window.open('https://wa.me/2347013930533?text=' + encodeURIComponent(message), '_blank', 'noopener,noreferrer');
});
