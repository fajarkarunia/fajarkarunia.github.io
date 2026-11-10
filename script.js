const header = document.querySelector('.site-header');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
});

navToggle.addEventListener('click', () => {
  const open = navMenu.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
});

navMenu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  navMenu.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
}));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

const filters = document.querySelectorAll('.filter');
const cards = document.querySelectorAll('.project-card');

filters.forEach((button) => button.addEventListener('click', () => {
  filters.forEach((item) => item.classList.remove('active'));
  button.classList.add('active');
  const filter = button.dataset.filter;
  cards.forEach((card) => {
    const categories = card.dataset.category.split(' ');
    card.classList.toggle('is-hidden', filter !== 'all' && !categories.includes(filter));
  });
}));

const projectData = {
  azera: {
    kicker: 'Inventory analytics · DEEPP',
    title: 'A-ZERA Physical Store Inventory Risk Analysis',
    description: 'An end-to-end analysis of physical-store inventory risk across a large Canadian electronics retail dataset.',
    stats: [['18.2M', 'records'], ['21,150', 'product-store pairs'], ['$172.7M', 'problem inventory']],
    actions: [
      'Prepared and analyzed data across 14 relational tables using BigQuery SQL.',
      'Built an inventory classification and early-warning framework using movement, demand frequency, sales recency, and cohort analysis.',
      'Found Watchlist pairs were 5.33 times more likely than Active pairs to become problem inventory.',
      'Developed a Tableau dashboard and proposed a targeted recovery and prevention pilot.'
    ],
    disclosure: 'The potential USD 15.9 million reduction represents lower inventory exposure under stated assumptions, not guaranteed cash savings.'
  },
  tokobli: {
    kicker: 'Customer analytics · RevoU',
    title: 'TokoBli Customer Spending Driver Analysis',
    description: 'A spreadsheet-based statistics project identifying the strongest drivers of yearly customer spending.',
    stats: [['299', 'customer records'], ['92.7%', 'variation explained'], ['IDR 10.98M', 'predicted spending']],
    actions: [
      'Evaluated six candidate predictors using correlation analysis.',
      'Built multiple linear regression and backward stepwise models.',
      'Identified average session time as the strongest standardized predictor.',
      'Translated the model into recommendations for engagement, retention, and promotion targeting.'
    ],
    disclosure: 'Regression results describe statistical associations and do not establish causal relationships.'
  },
  vba: {
    kicker: 'Reporting automation · Portfolio sample',
    title: 'Excel VBA Financial Reporting System',
    description: 'A representative portfolio version of an internal reporting system that automated recurring transaction summaries and trend reporting.',
    stats: [['1–2 weeks', 'previous recap time'], ['Minutes–1 hr', 'automated turnaround'], ['Daily + monthly', 'reporting frequency']],
    actions: [
      'Converted transaction input into daily and monthly inbound-inventory summaries by product category.',
      'Generated dynamic views of purchase-price and purchasing-volume trends.',
      'Improved access to analysis-ready data for faster anomaly investigation.',
      'Connected prepared outputs to Tableau for management-facing visualization.'
    ],
    disclosure: 'This portfolio sample uses a fictitious company name and anonymized data to protect confidential business information.'
  }
};

const dialog = document.querySelector('#project-dialog');
const closeDialog = dialog.querySelector('.dialog-close');

document.querySelectorAll('.open-project').forEach((button) => button.addEventListener('click', () => {
  const data = projectData[button.dataset.project];
  document.querySelector('#dialog-kicker').textContent = data.kicker;
  document.querySelector('#dialog-title').textContent = data.title;
  document.querySelector('#dialog-description').textContent = data.description;
  document.querySelector('#dialog-stats').innerHTML = data.stats.map(([value, label]) => `<div><b>${value}</b><span>${label}</span></div>`).join('');
  document.querySelector('#dialog-actions').innerHTML = data.actions.map((item) => `<li>${item}</li>`).join('');
  document.querySelector('#dialog-disclosure').textContent = data.disclosure;
  dialog.showModal();
}));

closeDialog.addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});

document.querySelector('#year').textContent = new Date().getFullYear();
