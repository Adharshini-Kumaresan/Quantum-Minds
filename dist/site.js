const main = document.querySelector('#main');
const members = ['Vasudevan Rajagopalan', 'Hansel Thomas', 'Gururaj Nadiyal', 'Vijay Somanna', 'Adharshini K', 'Archanaa M'];
const memberProfiles = {
  'Vasudevan Rajagopalan': ['vasudevan', 'Principal Architect, Orchestrator, Innovator', 'Presented AirWise at Global Open Hack.'],
  'Hansel Thomas': ['hansel', 'Innovator, Think-Tank, Business Analyst', 'Presented AirWise at Global Open Hack.'],
  'Gururaj Nadiyal': ['gururaj', 'Innovator, Think-Tank, Technical Specialist'],
  'Vijay Somanna': ['vijay', 'Innovator, Think-Tank, Technical Specialist'],
  'Adharshini K': ['adharshini', 'AI/ML Engineer, Inquirer', 'Worked on passenger comfort modeling and system integration for AISANCE.'],
  'Archanaa M': ['archanaa', 'AI/ML Engineer, Inquirer', 'Worked on computer vision for AISANCE, detecting potholes and other road hazards.']
};
const sponsors = ['Shailendra Shrivastava', 'Ashish Kushu'];
const projects = [
  {
    id: 'lifex', logo: '/logos/lifex.webp', number: '01', name: 'LifeX', website: 'https://lifex-roan.vercel.app', category: 'ENGINEERING KNOWLEDGE', status: 'In progress',
    line: 'Keep the reasoning behind engineering decisions.',
    theme: 'Engineering decisions are harder to revisit when their rationale, evidence and trade-offs are scattered across documents and handoffs.',
    approach: 'LifeX, formerly CLAVIS, brings engineering knowledge into a searchable workspace. Its Decision Intelligence prototype explores capturing a decision with its context and supporting evidence so another engineer can retrieve and understand it later.',
    steps: ['Capture the decision and its context', 'Connect the supporting evidence', 'Retrieve the reasoning when it is needed']
  },
  {
    id: 'airwise', logo: '/logos/airwise.webp', number: '02', name: 'AirWise', website: 'https://airwise-nine.vercel.app/airwise', category: 'CONNECTED VEHICLES', status: 'Prototype demonstrated',
    line: 'Spot performance drift across a connected fleet.',
    theme: 'Steering and braking behavior can drift as vehicles age or encounter different operating conditions. Validation on a limited set of vehicles gives OEMs a reference curve for comparison.',
    approach: 'AirWise compares fleet characteristic curves with OEM references and scores deviations by subsystem. The Global Open Hack prototype used synthetic data. The proposed workflow puts bench, hardware-in-the-loop and field verification before a targeted COLD OTA rollout.',
    steps: ['Compare steering and braking curves', 'Identify deviations and assess subsystem risk', 'Verify candidate calibrations before rollout']
  },
  {
    id: 'aisance', number: '03', name: 'AISANCE', website: 'https://aisance.in', category: 'VEHICLE COMFORT', status: 'Prototype demonstrated',
    line: 'Measure passenger discomfort and adapt suspension response.',
    theme: 'The same road disturbance can feel different to passengers depending on how the vehicle and seat transmit vibration.',
    approach: 'AISANCE combines vehicle motion and seat-pressure sensing with passenger comfort modeling to estimate discomfort and inform adaptive suspension. The project earned third prize at the ninth edition of TECHgium.',
    steps: ['Capture vehicle motion and seat pressure', 'Estimate passenger discomfort from vibration', 'Use the comfort estimate to inform suspension adjustments']
  }
];
const capabilities = [
  ['01', 'Engineering knowledge', 'Capture decisions, preserve their rationale and make technical context easier to retrieve.'],
  ['02', 'Fleet analytics', 'Compare vehicle behavior against reference curves and surface drift by subsystem.'],
  ['03', 'AI prototyping', 'Prototype retrieval, forecasting and risk models around engineering workflows.'],
  ['04', 'Validation planning', 'Define the evidence and checks an engineering team needs before advancing a change.']
];
const names = people => people.map(name => `<li>${name}</li>`).join('');
const projectCard = p => `<a class="project ${p.id}" href="#projects/${p.id}"><div class="card-top"><span>${p.category}</span><span class="state">${p.status}</span></div><div class="project-identity">${p.logo ? `<img src="${p.logo}" alt="" loading="lazy">` : `<span class="aisance-wordmark" aria-hidden="true">AISANCE</span>`}</div><div class="card-bottom"><div><h3>${p.name}</h3><p>${p.line}</p></div><span class="arrow" aria-hidden="true">↗</span></div></a>`;
const label = (_number, title) => `<div class="label">${title}</div>`;

const chapters = [
  ['01', 'Question the default', 'What happens when a decision gets separated from its reasoning? LifeX starts there. It captures the context and evidence an engineer needs to understand a decision later.', 'lifex'],
  ['02', 'Find the signal', 'A change in steering or braking can be hard to spot vehicle by vehicle. AirWise compares fleet behaviour against reference curves to bring that drift into view.', 'airwise'],
  ['03', 'Design for the person in the seat', 'A road input tells only part of the story. AISANCE looks at how vibration reaches the passenger, then uses that estimate to inform suspension response.', 'aisance']
];

let revealObserver;
function observeMotion() {
  revealObserver?.disconnect();
  if (!('IntersectionObserver' in window)) return;
  revealObserver = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('has-entered');
      revealObserver.unobserve(entry.target);
    }
  }, {threshold: 0.12});
  const targets = main.querySelectorAll('.chapter, .section-head, .project, .cap-grid article, .people section, .profile, .detail-grid > *, .closing .wrap');
  for (const target of targets) revealObserver.observe(target);
}

let hasShownIntro = false;

function render(moveFocus = false) {
  const route = location.hash.slice(1) || 'home';
  const project = projects.find(item => route === 'projects/' + item.id);
  const section = route.split('/')[0];
  for (const link of document.querySelectorAll('nav a')) {
    if (link.hash === '#' + section) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  }
  if (route === 'home') {
    main.innerHTML = `<section class="hero"><div class="wrap hero-grid"><div class="hero-copy">${label('QM','ENGINEERING INNOVATION GROUP')}<h1 tabindex="-1">The Quantum<br><em>Minds.</em></h1><p>An engineering group working on decision intelligence, connected fleets, and passenger comfort.</p><div class="actions"><a class="pill solid" href="#projects">Explore our projects ↗</a><a class="pill" href="#members">Meet the team</a></div></div><figure class="hero-art"><span class="burst" aria-hidden="true">✦</span><img src="/mascot.svg" alt="Quantum Minds mascot"><figcaption>THE QM MASCOT</figcaption></figure></div></section>
    <section class="wrap block">${label('01','THE PORTFOLIO')}<div class="section-head"><h2>Our projects<span class="dot">.</span></h2><a class="under" href="#projects">Browse projects ↗</a></div><div class="grid">${projects.map(projectCard).join('')}</div></section>
    <section class="mindset"><div class="wrap block"><div class="section-head"><div><div class="label">OUR MINDSET</div><h2>How we think<span class="dot">.</span></h2></div></div>
    ${chapters.map(([number, title, copy, id]) => `<article class="chapter"><span class="chapter-index" aria-hidden="true">${number}</span><div><h3>${title}</h3><p>${copy}</p><a class="under" href="#projects/${id}">Explore ${projects.find(p => p.id === id).name} ↗</a></div></article>`).join('')}</div></section>
    <section class="cap-section"><div class="wrap block">${label('02','CAPABILITIES')}<h2>What we build<span class="dot">.</span></h2><div class="cap-grid">${capabilities.map(([,title,copy]) => `<article><h3>${title}</h3><p>${copy}</p></article>`).join('')}</div></div></section>
    <section class="wrap block">${label('03','THE PEOPLE')}<div class="section-head"><h2>Meet the minds<span class="dot">.</span></h2><a class="under" href="#members">View members ↗</a></div>${peopleSection()}</section>
`;
    if (!hasShownIntro && window.matchMedia?.('(prefers-reduced-motion: no-preference)').matches) {
      hasShownIntro = true;
      main.insertAdjacentHTML('afterbegin', `<div class="opening" role="region" aria-label="Quantum Minds trailer">
        <div class="trailer-frame" aria-hidden="true">
          <div class="trailer-orbit"></div>
          <div class="trailer-sweep"></div>
          <img class="trailer-mascot" src="/mascot.svg" alt="">
          <div class="trailer-title">THE QUANTUM<br><em>MINDS.</em></div>
          <div class="trailer-progress"></div>
        </div>
        <button class="trailer-skip" type="button">Skip intro <span aria-hidden="true">↗</span></button>
      </div>`);
      const opening = main.querySelector('.opening');
      const dismiss = () => {
        const restoreFocus = opening.contains(document.activeElement);
        opening.remove();
        if (restoreFocus) main.querySelector('h1')?.focus({preventScroll:true});
      };
      opening.querySelector('button').addEventListener('click', dismiss);
      opening.addEventListener('animationend', event => {
        if (event.target === opening) dismiss();
      });
      window.setTimeout(() => {
        if (opening.isConnected) dismiss();
      }, 5000);
    }
  } else if (route === 'members') {
    main.innerHTML = `<section class="wrap block inner">${label('03','THE PEOPLE')}<h1 tabindex="-1">Members</h1><p class="member-intro">Meet the six members of Quantum Minds and the executive sponsors supporting the group.</p>${profileSection()}<div class="actions"><a class="pill solid" href="#projects">Explore the projects ↗</a></div></section>`;
  } else if (route === 'projects') {
    main.innerHTML = `<section class="wrap block inner">${label('01','THE PORTFOLIO')}<h1 tabindex="-1">Projects<span class="dot">.</span></h1><p>Browse the group’s documented work by status.</p><div class="filters" role="group" aria-label="Filter projects by status">${['All','In progress','Yet to start','Prototype demonstrated','Completed','On hold'].map((status,index) => `<button class="pill" aria-pressed="${index === 0}">${status}</button>`).join('')}</div><div class="grid" id="project-list">${projects.map(projectCard).join('')}</div></section>`;
    const buttons = main.querySelectorAll('button');
    for (const button of buttons) button.addEventListener('click', () => {
      for (const option of buttons) option.setAttribute('aria-pressed', String(option === button));
      const filtered = projects.filter(p => button.textContent === 'All' || p.status === button.textContent);
      main.querySelector('#project-list').innerHTML = filtered.length ? filtered.map(projectCard).join('') : '<p>No projects are listed under this status.</p>';
      observeMotion();
    });
  } else if (project) {
    main.innerHTML = `<article class="wrap block inner"><a class="under" href="#projects">← All projects</a><div class="detail-hero ${project.id}">${label(project.number,project.category)}<h1 tabindex="-1">${project.name}<span class="dot">.</span></h1><p>${project.line}</p><span class="state">${project.status}</span>${project.website ? `<div class="actions"><a class="pill project-website" href="${project.website}" target="_blank" rel="noopener noreferrer">Visit ${project.name} website ↗<span class="sr-only"> (opens in a new tab)</span></a></div>` : ""}</div><div class="detail-grid"><section><h2>Theme behind the idea</h2><p>${project.theme}</p><h2>How it works</h2><p>${project.approach}</p><ol>${names(project.steps)}</ol></section><aside><h3>People involved</h3><ul>${names(members)}</ul></aside></div></article>`;
  } else {
    main.innerHTML = '<section class="wrap block"><h1 tabindex="-1">Page unavailable.</h1><a class="under" href="#home">← Overview</a></section>';
  }
  const title = main.querySelector('h1');
  document.title = route === 'home' ? 'The Quantum Minds' : (project?.name ?? (route === 'members' ? 'Members' : 'Projects')) + ' | The Quantum Minds';
  if (moveFocus) title.focus({preventScroll:true});
  window.scrollTo(0,0);
  observeMotion();
}

function profileSection() {
  const profiles = members.map(name => {
    const [portrait, role, bio] = memberProfiles[name];
    return `<article class="profile"><img class="member-portrait" src="/portraits/${portrait}.webp" width="288" height="288" alt="" loading="lazy"><div><h3>${name}</h3><p class="profile-role">${role}</p>${bio ? `<p>${bio}</p>` : ''}</div></article>`;
  });
  return `<div class="profile-grid">${profiles.join('')}</div><section class="sponsor-section"><h2>Executive sponsors</h2><ul>${names(sponsors)}</ul></section>`;
}

function peopleSection() {
  return `<div class="people"><section><h3>Executive sponsors</h3><ul>${names(sponsors)}</ul></section><section><h3>Group members</h3><ul>${names(members)}</ul></section></div>`;
}
window.addEventListener('hashchange', () => render(true));
render();
