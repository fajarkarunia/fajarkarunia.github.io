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
    description: 'An individual end-to-end analysis of physical-store inventory risk across a Canadian electronics retail dataset. The project examined 18.2 million rows across 14 related tables and focused on inventory exposure at the product-store level from 2023 to 2025.',
    stats: [['18.2M', 'records analyzed'], ['21,150', 'product-store pairs'], ['$172.7M', 'problem inventory']],
    objective: 'Identify where physical-store inventory risk persists, prioritize recovery and prevention actions, and reduce Problem Inventory Share from 66.1% to 60% or below within 12 months while protecting gross margin and product availability.',
    methodology: [
      'Combined 14 relational tables in BigQuery and prepared monthly product-store observations from January 2023 to December 2025.',
      'Classified 21,150 product-store pairs as Dormant, Slow-moving, Watchlist, or Active using sales recency, 12-month movement rate, and Average Demand Interval.',
      'Compared December 2024 and December 2025 cohorts to measure persistence, recovery, new risk, and exposure concentration.',
      'Validated Watchlist as an early-warning signal using relative risk, a 95% confidence interval, and a chi-square test.',
      'Translated the findings into a Tableau dashboard and an 8–12 week recovery and prevention pilot.'
    ],
    tools: ['BigQuery', 'SQL', 'Spreadsheets', 'Tableau'],
    results: [
      'Problem Inventory reached $172.7M, equal to 66.1% of physical-store ending inventory value.',
      '80.3% of 2024 Problem pairs remained Problem in 2025. Persistent pairs accounted for $164.9M, or 95.5% of exposure.',
      'Watchlist pairs were 5.33 times as likely as Active pairs to become Problem Inventory: 30.0% versus 5.6%, p < 0.001.',
      'High-End and Mid-Tier products held 83.8% of exposure. Ontario represented 48.2%, while Computing held $57.0M.',
      'Reaching a 60% Problem Inventory Share would lower exposure by approximately $15.9M under the stated assumptions.'
    ],
    gallery: [
      ['assets/projects/azera/tableau-dashboard-27.png', 'Interactive Tableau executive dashboard'],
      ['assets/projects/azera/inventory-status-13.png', 'Inventory status classification and exposure'],
      ['assets/projects/azera/key-findings-21.png', 'Inventory hypotheses and early-warning findings'],
      ['assets/projects/azera/executive-summary-02.png', 'Executive summary and management target']
    ],
    links: [
      ['Open Tableau dashboard', 'https://public.tableau.com/app/profile/fajar.karunia.putra/viz/A-ZeraExecutiveAnalysis/01ExecutiveOverview?publish=yes'],
      ['Open project presentation', 'https://docs.google.com/presentation/d/1JBT_KKGn6_9kWXI3cE4E8ghJ1oV0UiQdCi-EMd1-69U/edit?usp=share_link']
    ],
    disclosure: 'The potential USD 15.9 million reduction represents lower inventory exposure under stated assumptions, not guaranteed cash savings.'
  },
  tokobli: {
    kicker: 'Customer analytics · RevoU',
    title: 'TokoBli Customer Spending Driver Analysis',
    description: 'An individual spreadsheet and statistics project using 299 customer records to identify statistically significant drivers of yearly spending and convert the model into practical recommendations.',
    stats: [['299', 'customer records'], ['92.7%', 'adjusted R²'], ['IDR 10.98M', 'predicted spending']],
    objective: 'Evaluate six potential spending drivers, build a statistically reliable regression model, predict yearly spending for a new customer profile, and recommend actions that TokoBli can influence directly.',
    methodology: [
      'Prepared and validated 299 customer records with Yearly Spending as the target variable and six candidate predictors.',
      'Used Pearson correlation to examine relationships among income, tenure, session time, promotion exposure, bounce rate, age, and spending.',
      'Built a full multiple linear regression model and applied backward stepwise selection. Age was removed because it was not significant after controlling for the other predictors.',
      'Interpreted standardized effects and practical coefficients, then applied the final model to a new customer scenario.',
      'Converted the findings into recommendations for engagement, journey-friction reduction, promotion targeting, and retention.'
    ],
    tools: ['Spreadsheets', 'Microsoft Excel', 'Google Slides'],
    results: [
      'The final model retained Income, Tenure, Average Session Time, Total Promo, and Bounce Rate, explaining 92.7% of Yearly Spending variation.',
      'Removing Age reduced adjusted R² by only about 0.08 percentage point and produced a cleaner model.',
      'Average Session Time was the strongest standardized predictor with β = 0.421.',
      'An additional 60 seconds of session time corresponded to approximately Rp0.38M higher spending, while a 10 percentage-point reduction in bounce rate corresponded to about Rp0.49M higher spending.',
      'The example customer was predicted to spend Rp10.98M annually versus the Rp9.30M dataset median, placing the profile near the 59th percentile.'
    ],
    gallery: [
      ['assets/projects/tokobli/correlation-03.png', 'Correlation analysis and strongest relationships'],
      ['assets/projects/tokobli/regression-04.png', 'Backward stepwise regression and final equation'],
      ['assets/projects/tokobli/model-drivers-05.png', 'Standardized effects and practical coefficient interpretation'],
      ['assets/projects/tokobli/prediction-06.png', 'Predicted yearly spending for a potential customer']
    ],
    links: [
      ['Open project presentation', 'https://docs.google.com/presentation/d/1cVHaUyCC3L5vQziNV_-9m_9yNHob12zz1CIJy51fMWE/edit?usp=share_link']
    ],
    disclosure: 'Regression results describe statistical associations and do not establish causal relationships.'
  },
  revoHospital: {
    kicker: 'Business intelligence · Tableau',
    title: 'Revo Hospital Billing Follow-up Priority Dashboard',
    description: 'An individual Tableau project that turned five related hospital datasets into a focused billing-prioritization system. Rather than building a general performance dashboard, the analysis was designed for a Finance Lead deciding where follow-up effort should be concentrated across Revo Hospital\'s Java network.',
    stats: [['5,000', 'admissions analyzed'], ['IDR 14.53B', 'pending exposure'], ['714', 'pending admissions']],
    objective: 'Identify the insurance types, branches, departments, and patient accounts with the highest current pending exposure, then translate the diagnosis into a practical collection work queue.',
    methodology: [
      'Related admissions, billing, patients, branches, and departments around one controlled grain: a unique admission. Doctors were excluded because the data did not support physician-level accountability for payment status.',
      'Validated 5,000 unique admissions and billing records, then reconciled IDR 98.87B in net billed revenue to prevent duplication and revenue overstatement.',
      'Built executive KPIs for pending revenue, weighted pending rate, admission workload, and average pending bill, supported by payer, trend, branch, department, and geographic comparisons.',
      'Used a FIXED level-of-detail calculation for stable branch exposure, a dense rank for the Top 5, and a running total to show cumulative pending exposure by admission month.',
      'Designed a two-stage interaction flow: an analytical overview for diagnosis followed by a searchable, sortable patient-level collection queue for action.'
    ],
    tools: ['Tableau Desktop', 'Tableau Public', 'Spreadsheets', 'Google Slides'],
    results: [
      'IDR 14.53B was pending, equal to 14.69% of IDR 98.87B in net billed revenue; the queue contained 714 admissions with an average pending bill of IDR 20.34M.',
      'Self-pay had the clearest relative-risk signal: a 35.39% pending rate and IDR 4.31B in exposure, or 2.41 times the network pending rate.',
      'Government insurance carried the largest pending value at IDR 4.95B, but its 12.49% rate indicated a scale-driven priority rather than the same pattern as self-pay.',
      'Jakarta Selatan, Jakarta Pusat, and Surabaya accounted for IDR 7.96B, or 54.8% of pending exposure; Jakarta Selatan ranked first at IDR 3.08B.',
      'The operational queue identified the largest individual case at IDR 84.95M while showing that the Top 10 represented only 4.61% of exposure, supporting a complete tiered workflow rather than a Top-10-only strategy.'
    ],
    gallery: [
      ['assets/projects/revo-hospital/dashboard-overview.png', 'Final Tableau overview and its decision hierarchy'],
      ['assets/projects/revo-hospital/collection-queue.png', 'Patient-level collection queue for operational follow-up'],
      ['assets/projects/revo-hospital/payer-priority.png', 'Payer priority matrix comparing pending value, rate, and workload'],
      ['assets/projects/revo-hospital/branch-department.png', 'Branch map and branch-by-department heatmap']
    ],
    links: [
      ['Open Tableau dashboard', 'https://public.tableau.com/views/RevoHospitalBillingFollow-up/BillingFollow-upCollectionPriorities?:language=en-GB&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link'],
      ['Open project presentation', 'https://docs.google.com/presentation/d/1vVAT3aefcYkM6X-AMN14vVPCPTwIMekpMkUvaXjUCdE/edit?slide=id.g3fb4166969e_1_64#slide=id.g3fb4166969e_1_64']
    ],
    disclosure: 'Pending is a current billing status, not evidence that a balance is overdue, uncollectible, or caused by a specific party. Aging analysis would require invoice due dates or days-outstanding data.'
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
  const caseStudy = document.querySelector('#dialog-case-study');
  const legacy = document.querySelector('#dialog-legacy');

  if (data.objective) {
    caseStudy.hidden = false;
    legacy.hidden = true;
    document.querySelector('#dialog-objective').textContent = data.objective;
    document.querySelector('#dialog-methodology').innerHTML = data.methodology.map((item) => `<li>${item}</li>`).join('');
    document.querySelector('#dialog-tools').innerHTML = data.tools.map((item) => `<span>${item}</span>`).join('');
    document.querySelector('#dialog-results').innerHTML = data.results.map((item) => `<li>${item}</li>`).join('');
    document.querySelector('#dialog-gallery').innerHTML = data.gallery.map(([src, caption]) => `
      <figure>
        <a href="${src}" target="_blank" rel="noopener" aria-label="Open full-size visual: ${caption}">
          <img src="${src}" alt="${caption}" loading="lazy">
        </a>
        <figcaption>${caption}</figcaption>
      </figure>
    `).join('');
    document.querySelector('#dialog-links').innerHTML = data.links.map(([label, href], index) => `
      <a class="button ${index === 0 ? 'primary' : 'secondary'}" href="${href}" target="_blank" rel="noopener">${label} ↗</a>
    `).join('');
  } else {
    caseStudy.hidden = true;
    legacy.hidden = false;
    document.querySelector('#dialog-actions').innerHTML = data.actions.map((item) => `<li>${item}</li>`).join('');
  }

  document.querySelector('#dialog-disclosure').textContent = data.disclosure;
  dialog.showModal();
  dialog.scrollTop = 0;
}));

closeDialog.addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});

document.querySelector('#year').textContent = new Date().getFullYear();
