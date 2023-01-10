if (request.type === "highlight") {
    const text = request.text;
    const xhr = new XMLHttpRequest();
    xhr.open("POST", API_URL, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", `Bearer ${OPENAI_API_KEY}`);

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                chrome.runtime.sendMessage({
                    type: "result",
                    text: response.choices[0].text
                });
            } else {
                console.error("Error sending highlighted text to OpenAI API", xhr.statusText);
            }
        }
    };

    const additionalInfo = "Summarise";
    const prompt = selectedText + " " + additionalInfo;
    const stopWords = ["is", "the", "a", "an"];
    const filteredText = selectedText.split(" ").filter(word => !stopWords.includes(word)).join(" ");

    xhr.send(JSON.stringify({
        prompt: text,
        temperature: 0.5,
        max_tokens: 1024
    }));
};
