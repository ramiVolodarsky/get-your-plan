const form = document.getElementById("chat-form");
const responseContainer = document.getElementById("response-container");
const loadingOverlay = document.querySelector('#loading-overlay');

form.addEventListener("submit", (event) => {
    loadingOverlay.classList.add('show');
    event.preventDefault();

    const age = document.getElementById("age").value;
    const sex = document.getElementById("sex").value;
    const weight = document.getElementById("weight").value;
    const height = document.getElementById("height").value;
    const goal = document.getElementById("goal").value;
    const activity_level = document.getElementById("activity-level").value;
    const frequency = document.getElementById("frequency").value;
    const duration = document.getElementById("duration").value;
    const limitation = document.getElementById("limitation").value;

    const data = {
        "age": age,
        "sex": sex,
        "weight": weight,
        "height": height,
        "goal": goal,
        "activity_level": activity_level,
        "frequency": frequency,
        "duration": duration,
        "limitation": limitation
    };

    fetch('https://5d1a-190-17-61-41.sa.ngrok.io/gym-plan', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.blob();
        })
        .then((blob) => {
            loadingOverlay.classList.remove("show");
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'output.pdf');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        })
        .catch((error) => {
            loadingOverlay.classList.remove("show");
            console.error(error);
            alert('Error generating PDF. Please try again later.');
        });



    // Clear form fields
    form.reset();
});
