let allIssuesStore = [];

// ১. লগইন হ্যান্ডলার
document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;

    if (user === 'admin' && pass === 'admin123') {
        document.getElementById('login-page').style.display = 'none';
        document.getElementById('dashboard-page').style.display = 'block';
        fetchIssues();
    } else {
        alert("ভুল ইউজারনেম বা পাসওয়ার্ড!");
    }
});

// ২. ডাটা ফেচ করা
async function fetchIssues() {
    try {
        const res = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues');
        const data = await res.json();
        allIssuesStore = data.data.slice(0, 50); // ৫০টি ডাটা রাখা হলো
        renderCards(allIssuesStore);
    } catch (err) {
        console.error("ডাটা লোড করতে সমস্যা:", err);
    }
}

// ৩. গ্রিড রেন্ডার করা (৪টি কার্ড প্রতি লাইনে)
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
            <div style="display:flex; justify-content:space-between; margin-bottom:12px; align-items:center;">
                <i class="far fa-circle-check" style="color: ${isClosed ? '#8957e5' : '#238636'}"></i>
                <span class="priority-label">${item.priority || 'HIGH'}</span>
            </div>
            <h3 style="font-size:15px; margin: 0 0 10px 0; height: 40px; overflow: hidden;">${item.title}</h3>
            <p style="font-size:13px; color:#666; height: 36px; overflow: hidden;">${item.description.substring(0, 55)}...</p>
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

// ৪. ফিল্টারিং লজিক (Open/Closed)
window.filterIssues = function(status, btn) {
    // অ্যাক্টিভ ট্যাব স্টাইল পরিবর্তন
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');

    if (status === 'all') {
        renderCards(allIssuesStore);
    } else {
        const filtered = allIssuesStore.filter(i => i.status.toLowerCase() === status);
        renderCards(filtered);
    }
}

// ৫. পপ-আপ (Modal) লজিক
function openModal(item) {
    const modal = document.getElementById('issue-modal');
    document.getElementById('m-title').innerText = item.title;
    document.getElementById('m-desc').innerText = item.description || "No description available.";
    
    const statusBadge = document.getElementById('m-status');
    statusBadge.innerText = item.status.toUpperCase();
    statusBadge.style.background = item.status.toLowerCase() === 'open' ? '#238636' : '#8957e5';
    
    modal.style.display = 'block';
}

window.closeModal = function() {
    document.getElementById('issue-modal').style.display = 'none';
}

// ৬. সার্চ লজিক
document.getElementById('search-input').addEventListener('input', function(e) {
    const term = e.target.value.toLowerCase();
    const filtered = allIssuesStore.filter(i => i.title.toLowerCase().includes(term));
    renderCards(filtered);
});

// মডালের বাইরে ক্লিক করলে বন্ধ হবে
window.onclick = function(event) {
    const modal = document.getElementById('issue-modal');
    if (event.target == modal) {
        closeModal();
    }
}