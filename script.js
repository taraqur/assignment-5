let allIssuesStore = [];

// Login Handler
document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    if (document.getElementById('username').value === 'admin' && document.getElementById('password').value === 'admin123') {
        document.getElementById('login-page').style.display = 'none';
        document.getElementById('dashboard-page').style.display = 'block';
        fetchIssues();
    } else { alert("Invalid login!"); }
});

// Fetch API
async function fetchIssues() {
    try {
        const res = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues');
        const data = await res.json();
        allIssuesStore = data.data;
        renderCards(allIssuesStore);
    } catch (err) { console.error(err); }
}

// Render Cards
function renderCards(data) {
    const grid = document.getElementById('issues-grid');
    document.getElementById('total-count').innerText = `${data.length} Issues`;
    grid.innerHTML = '';

    data.forEach(item => {
        const isClosed = item.status.toLowerCase() === 'closed';
        const card = document.createElement('div');
        card.className = `issue-card ${isClosed ? 'is-closed' : ''}`;
        card.onclick = () => openModal(item);

        card.innerHTML = `
            <div style="display:flex; justify-content:space-between; margin-bottom:12px;">
                <i class="far fa-circle-check" style="color: ${isClosed ? '#8957e5' : '#238636'}"></i>
                <span class="priority-label">${item.priority || 'HIGH'}</span>
            </div>
            <h3 style="font-size:15px; margin:0 0 10px 0;">${item.title}</h3>
            <p style="font-size:13px; color:#666;">${item.description.substring(0, 55)}...</p>
            <div style="margin: 15px 0;">
                <span class="tag bug">BUG</span>
                <span class="tag help">HELP WANTED</span>
            </div>
            <div style="font-size:11px; color:#999; border-top:1px solid #f0f0f0; padding-top:10px;">
                #${item.id} by john_doe
            </div>
        `;
        grid.appendChild(card);
    });
}

// Filtering
window.filterIssues = function(status, btn) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    const filtered = status === 'all' ? allIssuesStore : allIssuesStore.filter(i => i.status.toLowerCase() === status);
    renderCards(filtered);
}

// Modal
function openModal(item) {
    const modal = document.getElementById('issue-modal');
    document.getElementById('m-title').innerText = item.title;
    document.getElementById('m-desc').innerText = item.description;
    const statusBadge = document.getElementById('m-status');
    statusBadge.innerText = item.status.toUpperCase();
    statusBadge.style.background = item.status.toLowerCase() === 'open' ? '#238636' : '#8957e5';
    modal.style.display = 'block';
}

window.closeModal = function() { document.getElementById('issue-modal').style.display = 'none'; }

// Search
document.getElementById('search-input').addEventListener('input', function(e) {
    const term = e.target.value.toLowerCase();
    const filtered = allIssuesStore.filter(i => i.title.toLowerCase().includes(term));
    renderCards(filtered);
});