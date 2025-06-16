const votedKey = 'voted';

// Hide voting UI if already voted - do this immediately
if (localStorage.getItem(votedKey)) {
  document.getElementById('icons')?.classList.add('hidden');
  document.getElementById('qr-section')?.classList.add('hidden');
}

async function sendVote(value) {
  await fetch('/api/vote', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ vote: value })
  });
}

async function fetchResults() {
  const res = await fetch('/api/results');
  return res.json();
}

function renderChart(percentages) {
  const svg = document.getElementById('chart');
  svg.innerHTML = '';
  const barWidth = 15;
  const colors = ['#dc2626', '#f97316', '#eab308', '#84cc16', '#22c55e'];
  Object.keys(percentages).forEach((key, idx) => {
    const height = percentages[key];
    const x = idx * (barWidth + 5);
    const y = 60 - height * 0.6;
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('x', x);
    rect.setAttribute('y', y);
    rect.setAttribute('width', barWidth);
    rect.setAttribute('height', height * 0.6);
    rect.setAttribute('fill', colors[idx]);
    rect.setAttribute('class', 'bar');
    svg.appendChild(rect);

    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', x + barWidth / 2);
    text.setAttribute('y', 58);
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('font-size', '8');
    text.setAttribute('fill', '#000000');
    text.setAttribute('font-weight', 'bold');
    text.textContent = percentages[key] + '%';
    svg.appendChild(text);
  });
}

async function loadResults() {
  const data = await fetchResults();
  renderChart(data.percentages);
}

function showThankYou() {
  const thankYou = document.getElementById('thank-you');
  thankYou.classList.remove('hidden');
  setTimeout(() => {
    thankYou.classList.add('hidden');
  }, 2000);
}

function handleVoteClick(e) {
  const value = Number(e.currentTarget.dataset.vote);
  if (localStorage.getItem(votedKey)) return;
  
  // Disable all vote buttons immediately
  document.querySelectorAll('.vote').forEach(btn => {
    btn.disabled = true;
    btn.classList.add('opacity-50');
  });
  
  // Highlight selected button
  e.currentTarget.classList.remove('opacity-50');
  e.currentTarget.classList.add('bg-gray-100');
  
  localStorage.setItem(votedKey, '1');
  
  sendVote(value).then(() => {
    loadResults();
    showThankYou();
    setTimeout(() => {
      document.getElementById('icons')?.classList.add('hidden');
      document.getElementById('qr-section')?.classList.add('hidden');
    }, 2000);
  });
}

document.querySelectorAll('.vote').forEach(btn => btn.addEventListener('click', handleVoteClick));

loadResults();
