const messagesDiv = document.getElementById('messages');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');

sendBtn.addEventListener('click', async () => {
    const message = userInput.value.trim();
    if (!message) return;

    addMessage(message, 'user');
    userInput.value = '';

    try {
        const res = await fetch('http:/localhost;5000/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message })
        });
        const data = await res.json();
        addMessage(data.reply, 'bot');
    } catch (err) {
        addMessage("Error connecting to AI", 'bot');
        console.error(err);
    }
});

function addMessage(text, sender) {
    const div = document.createElement('div');
    div.className = `message ${sender}`;
   
    if(sender==="bot"){
        div.innerHTML=marked.parse(text);
    }
    else{
         div.textContent=text;
    }

    messagesDiv.appendChild(div);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}
