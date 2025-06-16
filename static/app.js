const votedKey = 'voted';

async function sendVote(value) {
  await fetch('/api/vote', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ vote: value })
  });
}

function createConfetti() {
  const colors = ['#f00', '#0f0', '#00f', '#ff0', '#f0f', '#0ff'];
  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.top = '-10px';
    confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
    const size = Math.random() * 10 + 5;
    confetti.style.width = size + 'px';
    confetti.style.height = size + 'px';
    document.body.appendChild(confetti);
    const animation = confetti.animate([
      { top: '-10px', opacity: 0 },
      { top: Math.random() * 100 + 'vh', opacity: 1 }
    ], {
      duration: Math.random() * 3000 + 2000,
      easing: 'cubic-bezier(0.1, 0.8, 0.3, 1)'
    });
    animation.onfinish = () => confetti.remove();
  }
}

function setupTooltip(ratings) {
  const tooltip = document.getElementById('tooltip');
  function showTooltip(e, rating) {
    tooltip.innerHTML = `<div class='flex flex-col items-start'><span class='text-base font-bold'>${rating.value} point</span><span class='text-xs mt-1 text-gray-700'>${rating.text}</span></div>`;
    tooltip.classList.add('show');
    const x = e.clientX;
    const y = e.clientY;
    tooltip.style.left = x + 16 + 'px';
    tooltip.style.top = y - 10 + 'px';
  }
  function hideTooltip() {
    tooltip.classList.remove('show');
  }
  // Attach to result bars and icons
  document.querySelectorAll('#results-graph > div').forEach((bar, i) => {
    bar.addEventListener('mousemove', (e) => showTooltip(e, ratings[i]));
    bar.addEventListener('mouseleave', hideTooltip);
    bar.querySelector('img').addEventListener('mousemove', (e) => showTooltip(e, ratings[i]));
    bar.querySelector('img').addEventListener('mouseleave', hideTooltip);
  });
}

function renderResultsGraph(results, ratings) {
  const graph = document.getElementById('results-graph');
  graph.innerHTML = '';
  const max = Math.max(...ratings.map(r => results[r.value] || 0), 1);
  ratings.forEach(rating => {
    const count = results[rating.value] || 0;
    const percent = Math.round((count / max) * 100);
    const bar = document.createElement('div');
    bar.className = 'flex items-center mb-4 group cursor-pointer';
    bar.innerHTML = `
      <img src="icons/${rating.icon}" alt="${rating.value}" class="w-10 h-10 mr-3">
      <div class="flex-1 bg-white/20 rounded-full h-8 relative overflow-hidden">
        <div class="bg-gradient-to-r from-indigo-400 to-purple-400 h-8 rounded-full" style="width: ${percent}%; min-width: 2rem;"></div>
        <span class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-bold">${count}</span>
      </div>
    `;
    graph.appendChild(bar);
  });
  setupTooltip(ratings);
}

async function fetchResultsAndShowGraph(ratings) {
  const resultsDiv = document.getElementById('results');
  const thankYouDiv = document.getElementById('thank-you');
  try {
    const res = await fetch('/api/results');
    const data = await res.json();
    renderResultsGraph(data.counts, ratings);
    resultsDiv.classList.remove('hidden');
    thankYouDiv.classList.remove('hidden');
  } catch (e) {
    // fallback: show error
    document.getElementById('results-graph').innerHTML = '<div class="text-white">Could not load results.</div>';
    resultsDiv.classList.remove('hidden');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const ratings = [
    { value: 1, icon: 'rate-1.png', text: "Oh dear, this was absolutely ap-peelingly awful!" },
    { value: 2, icon: 'rate-2.png', text: "Mildly steeped, mostly spilled!" },
    { value: 3, icon: 'rate-3.png', text: "Sparks flew… but not in a good way." },
    { value: 4, icon: 'rate-4.png', text: "Clumsy, but charmingly pointy!" },
    { value: 5, icon: 'rate-5.png', text: "Top marks! I'm flipping impressed!" }
  ];

  const container = document.getElementById('rating-container');
  const feedbackDiv = document.getElementById('rating-feedback');
  const feedbackText = document.getElementById('feedback-text');
  const thankYouDiv = document.getElementById('thank-you');
  const qrSection = document.getElementById('qr-section');
  const rateBelowText = document.getElementById('rate-below-text');

  if (localStorage.getItem(votedKey)) {
    container.classList.add('hidden');
    feedbackDiv.classList.add('hidden');
    thankYouDiv.classList.remove('hidden');
    if (qrSection) qrSection.classList.add('hidden');
    if (rateBelowText) rateBelowText.classList.add('hidden');
    fetchResultsAndShowGraph(ratings);
    return;
  }

  ratings.forEach(rating => {
    const btn = document.createElement('button');
    btn.className = 'rating-btn bg-white/20 hover:bg-white/30 text-white font-bold py-3 px-4 rounded-full flex flex-col items-center w-32';
    btn.innerHTML = `<img src="icons/${rating.icon}" alt="Rating ${rating.value}" class="w-12 h-12 mb-1"><span class="text-xs text-center">${rating.text}</span>`;
    btn.addEventListener('click', () => {
      if (localStorage.getItem(votedKey)) return;
      document.querySelectorAll('.rating-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      feedbackText.textContent = rating.text;
      feedbackDiv.classList.remove('hidden');
      localStorage.setItem(votedKey, '1');
      sendVote(rating.value).then(() => {
        setTimeout(() => {
          feedbackDiv.classList.add('hidden');
          thankYouDiv.classList.remove('hidden');
          if (qrSection) qrSection.classList.add('hidden');
          if (rateBelowText) rateBelowText.classList.add('hidden');
          createConfetti();
          fetchResultsAndShowGraph(ratings);
        }, 1500);
      });
    });
    container.appendChild(btn);
  });
});
