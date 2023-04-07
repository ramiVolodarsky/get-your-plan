const form = document.querySelector('#chat-form');
const responseContainer = document.getElementById("response-container");
const loadingOverlay = document.querySelector('#loading-overlay');

form.addEventListener('submit', (event) => {

    event.preventDefault();
    // Get all the input elements
    const name = document.querySelector('#name').value;
    const age = document.querySelector('#age').value;
    const gender = document.querySelector('#gender').value;
    const education = document.querySelector('#education').value;
    const workExperience = document.querySelector('#work_experience').value;
    const location = document.querySelector('#location').value;
    const financialGoals = document.querySelector('#financial_goals').value;
    const careerGoals = document.querySelector('#career_goals').value;
    const skillsStrengths = document.querySelector('#skills_strengths').value;
    const preferredIndustries = document.querySelector('#preferred_industries').value;
    const timeframe = document.querySelector('#timeframe').value;
    const educationTraining = document.querySelector('#education_training').value;
    const educationBackground = document.querySelector('#education').value;
    const major = document.querySelector('#major').value;
    const interestshobbies = document.querySelector('#interests_hobbies').value;
    const workEnvironment = document.querySelector('#work-environment').value;
    const jobResponsibilities = document.querySelector('#job-responsibilities').value;
    const languageSkills = document.querySelector('#language-skills').value;
    const personalityTraits = document.querySelector('#personality-traits').value;
    const desiredSalary = document.querySelector('#desired-salary').value;
    const preferredIndustry = document.querySelector('#preferred-industry').value;
    const challenges = document.querySelector('#challenges').value;
    const employmentStatus = document.querySelector('#employment-status').value;
    const educationAvailability = document.querySelector('#education-availability').value;
    const educationCommitment = document.querySelector('#education-commitment').value;
    // Get all the checked interests checkboxes
    const interests = [];
    const checkboxes = document.querySelectorAll('input[name="interests[]"]:checked');
    checkboxes.forEach((checkbox) => {
        interests.push(checkbox.value);
    });
    // Get the preferred work environment radio button value
    let preferredEnvironment;
    const preferredEnvironmentRadios = document.querySelectorAll('input[name="preferred_environment"]');
    preferredEnvironmentRadios.forEach((radio) => {
        if (radio.checked) {
            preferredEnvironment = radio.value;
        }
    });

    const data = {
        "name": name,
        "age": age,
        "gender": gender,
        "education": education,
        "workExperience": workExperience,
        "location": location,
        "financialGoals": financialGoals,
        "careerGoals": careerGoals,
        "skillsStrengths": skillsStrengths,
        "preferredIndustries": preferredIndustries,
        "timeframe": timeframe,
        "educationTraining": educationTraining,
        "educationBackground": educationBackground,
        "major": major,
        "interestshobbies": interestshobbies,
        "workEnvironment": workEnvironment,
        "jobResponsibilities": jobResponsibilities,
        "languageSkills": languageSkills,
        "personalityTraits": personalityTraits,
        "desiredSalary": desiredSalary,
        "preferredIndustry": preferredIndustry,
        "challenges": challenges,
        "employmentStatus": employmentStatus,
        "educationAvailability": educationAvailability,
        "educationCommitment": educationCommitment,
        "interests": interests,
        "preferredEnvironment": preferredEnvironment
    };

    console.log(data)

    fetch('https://5d1a-190-17-61-41.sa.ngrok.io/career-path', {
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
    // form.reset();



});