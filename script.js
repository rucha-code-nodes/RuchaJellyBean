// const API_URL = "http://localhost:5000/agents";

// async function fetchAgents() {
//     const res = await fetch(API_URL);
//     const agents = await res.json();
//     renderAgents(agents);
// }

// async function toggleStatus(id) {
//     const res = await fetch(`${API_URL}/${id}/toggle`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" }
//     });
//     const updatedAgent = await res.json();
//     fetchAgents();
// }

// function renderAgents(agents) {
//     const list = document.getElementById("agent-list");
//     list.innerHTML = "";
//     agents.forEach(agent => {
//         const card = document.createElement("div");
//         card.className = "agent-card";
//         card.innerHTML = `
//             <div class="agent-info">
//                 <h3>${agent.name}</h3>
//                 <p>${agent.role}</p>
//                 <span class="status ${agent.online ? "online" : "offline"}">
//                     ${agent.online ? "Online" : "Offline"}
//                 </span>
//             </div>
//             <button class="toggle-btn" onclick="toggleStatus('${agent._id}')">
//                 Toggle Status
//             </button>
//         `;
//         list.appendChild(card);
//     });
// }

// fetchAgents();


const API_URL = "http://localhost:5000/agents";

async function fetchAgents() {
    const res = await fetch(API_URL);
    const agents = await res.json();
    renderAgents(agents);
}

async function toggleStatus(id) {
    await fetch(`${API_URL}/${id}/toggle`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" }
    });
    fetchAgents();
}

function renderAgents(agents) {
    const list = document.getElementById("agent-list");
    list.innerHTML = "";
    agents.forEach(agent => {
        const card = document.createElement("div");
        card.className = "agent-card";
        // card.innerHTML = `
        //     <div class="agent-info">
        //         <h3>${agent.name}</h3>
        //         <p>${agent.role}</p>
        //         <span class="status ${agent.online ? "online" : "offline"}">
        //             ${agent.online ? "Online" : "Offline"}
        //         </span>
        //     </div>
        //     <button class="toggle-btn" onclick="toggleStatus('${agent._id}')">
        //         Toggle Status
        //     </button>
        // `;

        card.innerHTML = `
    <div class="agent-info">
        <h3>${agent.name}</h3>
        <p>${agent.role}</p>
    </div>
    <div class="agent-footer">
        <span class="status ${agent.online ? "online" : "offline"}">
            ${agent.online ? "Online" : "Offline"}
        </span>
        <button class="toggle-btn" onclick="toggleStatus('${agent._id}')">
            Toggle Status
        </button>
    </div>
`;


        list.appendChild(card);
    });
}

fetchAgents();
