const API_KEY = "AIzaSyCk-WKv-G7HDyySZDfssYm3Ug7mNDgUVMc";

async function sendMessage() {
    let input = document.getElementById("userInput");
    let chatBox = document.getElementById("chatBox");

    let userText = input.value;
    if (!userText) return;

    chatBox.innerHTML += `<div class="user"><b>You:</b> ${userText}</div>`;

    input.value = "";

    // AI request
    const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            {
                                text: `You are a Java expert tutor. 
                                Explain everything in Java programming simply with examples.
                                User question: ${userText}`
                            }
                        ]
                    }
                ]
            })
        }
    );

    const data = await response.json();

    let aiReply = data.candidates?.[0]?.content?.parts?.[0]?.text 
                  || "Error getting response";

    chatBox.innerHTML += `<div class="bot"><b>JavaBot:</b> ${aiReply}</div>`;

    chatBox.scrollTop = chatBox.scrollHeight;
}