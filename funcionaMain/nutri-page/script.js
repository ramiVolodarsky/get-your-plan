// Get the form element
const form = document.querySelector('form');
const responseContainer = document.getElementById("response-container");
const loadingOverlay = document.querySelector('#loading-overlay');

// Add an event listener for the submit event
form.addEventListener('submit', (event) => {
  loadingOverlay.classList.add('show');
  // Prevent the form from submitting
  event.preventDefault();

  // Get all the form values
  const name = document.querySelector('#name').value;
  const age = document.querySelector('#age').value;
  const gender = document.querySelector('#gender').value;
  const weight = document.querySelector('#weight').value;
  const height = document.querySelector('#height').value;
  const job = document.querySelector('#job').value;
  const exercise = document.querySelector('#exercise').value;
  const eatingHabits = document.querySelector('#eating-habits').value;
  const allergies = document.querySelector('#allergies').value;
  const healthGoals = document.querySelector('#health-goals').value;
  const familyHistory = document.querySelector('#family-history').value;
  const budget = document.querySelector('#budget').value;
  const medication = document.querySelector('#medication').value;
  const sleepApnea = document.querySelector('#sleep_apnea').value;
  const dietaryConcerns = document.querySelector('#dietary-concerns').value;
  const cravings = document.querySelector('#cravings').value;
  const dietaryPreferences = document.querySelector('#dietary-preferences').value;
  const schedule = document.querySelector('#schedule').value;
  const timeAvailability = document.querySelector('#time-availability').value;
  const mealPreferences = document.querySelector('#meal-preferences').value;

  const data = {
    "name": name,
    "age": age,
    "gender": gender,
    "weight": weight,
    "height": height,
    "job": job,
    "exercise": exercise,
    "eatingHabits": eatingHabits,
    "allergies": allergies,
    "healthGoals": healthGoals,
    "familyHistory": familyHistory,
    "budget": budget,
    "medication": medication,
    "sleepApnea": sleepApnea,
    "dietaryConcerns": dietaryConcerns,
    "cravings": cravings,
    "dietaryPreferences": dietaryPreferences,
    "schedule": schedule,
    "timeAvailability": timeAvailability,
    "mealPreferences": mealPreferences
  }

  // PEDIRLE A GPT 4 QUE CREE UN PROMPT NUEVO CONLA INFO DE ARRIBA, CUANDO LE DIGA ESO LE TENGO QUE AGREGAR LA INFO DEL HTML ASI TIENE MAS CONTEXTO.
  const message = `Hello, my name is ${name} and I'm interested in obtaining a nutritional plan to help me achieve my health goals. I'm a ${age}-year-old ${gender}, currently weighing ${weight} pounds and standing ${height} feet tall. I have a ${job} job and ${exercise === 'yes' ? 'do' : 'do not'} exercise regularly, but I'm looking to change that with the help of a personalized nutrition plan.

Regarding my current eating habits, I tend to ${eatingHabits === 'eat_out' ? 'eat out frequently' : 'cook at home'} and consume ${eatingHabits === 'lots_of_processed_foods' ? 'a lot of' : 'not a lot of'} processed foods. I also have ${allergies}, and try to avoid ${allergies === 'gluten' ? 'gluten' : 'other specific foods'} when possible. My health goals are to ${healthGoals}, improve my energy levels, and ${familyHistory === 'hypertension' ? 'reduce my risk of developing hypertension' : familyHistory === 'heart_disease' ? 'reduce my risk of developing heart disease' : 'reduce my risk of developing other health concerns'}.

I have a family history of ${familyHistory}, so I would like the plan to be ${familyHistory === 'hypertension' || familyHistory === 'heart_disease' ? 'low in sodium and saturated fats' : 'high in fiber and sources of lean protein'}. I prefer ${dietaryPreferences}, and recipes that are ${mealPreferences} and incorporate into my daily routine.

In addition, I would appreciate any guidance on ${dietaryConcerns} to ensure I make the most of my meals. I have a ${cravings} and tend to ${eatingHabits === 'eat_out' ? 'snack frequently' : 'eat three big meals a day'}, so any suggestions for healthy snacks or meal ideas would be great. I have a ${schedule} schedule and ${timeAvailability} time to prepare meals, so any suggestions for quick and easy meal ideas would be helpful.

Finally, I have a budget of $${budget} per week for food and supplements, so I would appreciate any advice on saving money while still eating healthily. I also want to mention that I'm currently taking medication for ${medication} and have ${sleepApnea} sleep apnea.

Could you provide me with a comprehensive nutritional plan that is tailored to my specific needs? Thank you in advance for your help!`;

  fetch("https://60ab-190-17-61-41.sa.ngrok.io/nutrition-plan", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.text())
    .then((data) => {
      loadingOverlay.classList.remove("show");
      console.log(data)
      responseContainer.innerHTML += `<p><strong>You:</strong> ${message}</p>
  <p><strong>Bot:</strong> ${data}</p>`;
    })
    .catch((error) => {
      loadingOverlay.classList.remove("show");
      responseContainer.innerHTML += `<p>An error occurred while sending the request.</p>`;
      console.error(error);
    });

  // Clear form fields
  form.reset();
});