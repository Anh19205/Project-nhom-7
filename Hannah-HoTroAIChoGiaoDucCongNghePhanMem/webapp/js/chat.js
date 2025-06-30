function ask(){
    const urlAsk = "http://localhost:9999/api/AI/ask";
    const token = localStorage.getItem("token");
    const question = document.getElementById('textChat').value;
    console.log("message: ", question);
    const request = {
        "message": question
    };
    fetch(urlAsk, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(request)
    })
    .then((response) => response.json())
    .then((data) => {
        console.log("data question.\n", data);
        historyChat();
    })
    .catch((err) => {
        console.log("error when question chat bot: ", err);
        alert("error when question chat bot")
    })
}

let pageChat = 1;
let sizeChat = 10;

function historyChat(){
    const urlHistory = `http://localhost:9999/api/AI/history?page=${pageChat}&size=${sizeChat}`;
    const token = localStorage.getItem("token");
    fetch(urlHistory, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })
    .then((response) => response.json())
    .then((data) => {
        console.log('page: ', pageChat);
        const chatHistory = document.getElementById('chatHistory');
        const listChat = data.result.data;
        console.log("listchat\n", listChat);
        listChat.map((chat) => {
            const divAssistant = document.createElement("div");
            divAssistant.className = "flex justify-start";
            divAssistant.innerHTML = `<div class="bg-gray-100 text-gray-800 p-3 rounded-lg max-w-xs">
                <p>${chat.responseOfAssistant}</p>
                <span class="text-xs text-gray-500 block mt-1">10:35 AM</span>
            </div>`;
            chatHistory.appendChild(divAssistant);
            const divUser = document.createElement("div");
            divUser.className = "flex justify-end";
            divUser.innerHTML = `<div class="bg-indigo-600 text-white p-3 rounded-lg max-w-xs">
                <p>${chat.message}</p>
                <span class="text-xs text-gray-200 block mt-1">10:32 AM</span>
            </div>`;
            chatHistory.appendChild(divUser);
        })
        pageChat++;
    })
    .catch((err) => {
        console.log("error when get list history chat: ", err);
        alert("error when get list history chat");
    })
    
}

function toggleChat() {
    const chatOverlay = document.getElementById('chatOverlay');
    chatOverlay.classList.toggle('hidden');
}

window.addEventListener("DOMContentLoaded", () => {
    console.log("token: ", localStorage.getItem("token"));
    const chatBtn = document.getElementById('iconChat');
    chatBtn.onclick = () => {
        toggleChat();
        historyChat();
        const submitChat = document.getElementById("submitChat");
        submitChat.onclick = () => {
            ask();
        }
    }
})