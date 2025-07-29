// js/home.js - Specific logic for the index.html page, including global functions

document.addEventListener('DOMContentLoaded', () => {
    const copyrightYearSpan = document.getElementById('copyright-year');
    if (copyrightYearSpan) {
        copyrightYearSpan.textContent = new Date().getFullYear();
    }

    // Dynamically set last modification date
    const lastModifiedSpan = document.getElementById('last-modified');
    if (lastModifiedSpan) {
        lastModifiedSpan.textContent = document.lastModified;
    }

    // Mobile Navigation Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // --- OpenWeatherMap API for Weather Data ---
    const WEATHER_API_KEY = '9f75919ceb4911138a4bcfe67b7a98f7';
    const CITY_NAME = 'Ile-fe';
    const LAT = 16.7666; // Latitude for Timbuktu
    const LON = 3.0026;  // Longitude for Timbuktu
    const UNITS = 'imperial'; // For Fahrenheit

    const currentTempSpan = document.getElementById('current-temp');
    const weatherDescriptionP = document.getElementById('weather-description');
    const weatherIconImg = document.getElementById('weather-icon');
    const forecastDay1TempP = document.getElementById('forecast-day1-temp');
    const forecastDay2TempP = document.getElementById('forecast-day2-temp');
    const forecastDay3TempP = document.getElementById('forecast-day3-temp');

    // Function to fetch current weather
    const fetchCurrentWeather = async () => {
         if (!WEATHER_API_KEY) {
            console.warn('OpenWeatherMap API Key not set.');
            weatherDescriptionP.textContent = 'API Key Missing!';
            return;
        }

        const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&units=${UNITS}&appid=${WEATHER_API_KEY}`;

        try {
            const response = await fetch(currentWeatherUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            currentTempSpan.textContent = Math.round(data.main.temp);
            weatherDescriptionP.textContent = data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1);
            weatherIconImg.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
            weatherIconImg.alt = data.weather[0].description;
        } catch (error) {
            console.error('Error fetching current weather:', error);
            weatherDescriptionP.textContent = 'Failed to load weather.';
            currentTempSpan.textContent = '--';
        }
    };

    // Function to fetch 3-day forecast
    const fetchWeatherForecast = async () => {
         if (!WEATHER_API_KEY) {
            console.warn('OpenWeatherMap API Key not set.');
            weatherDescriptionP.textContent = 'API Key Missing!';
            return;
        }

        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&units=${UNITS}&appid=${WEATHER_API_KEY}`;

        try {
            const response = await fetch(forecastUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();

            // Group forecast data by day
            const dailyForecasts = {};
            data.list.forEach(item => {
                const date = new Date(item.dt * 1000);
                const day = date.toDateString();
                if (!dailyForecasts[day]) {
                    dailyForecasts[day] = {
                        temps: [],
                        date: date
                    };
                }
                dailyForecasts[day].temps.push(item.main.temp);
            });

            // Get the next 3 unique days starting from tomorrow
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Reset time to compare dates only
            console.log('Daily Forecasts:', dailyForecasts);
            const forecastDaysArray = Object.values(dailyForecasts)
                .filter(dayData => dayData.date.getTime() > today.getTime()) // Filter out today's entries
                .sort((a, b) => a.date - b.date) // Sort by date
                .slice(0, 3); // Take the next 3 days

            if (forecastDaysArray.length > 0) {
                forecastDay1TempP.textContent = `${Math.round(Math.min(...forecastDaysArray[0].temps))}°F / ${Math.round(Math.max(...forecastDaysArray[0].temps))}°F`;
            } else {
                forecastDay1TempP.textContent = '--';
            }
            if (forecastDaysArray.length > 1) {
                forecastDay2TempP.textContent = `${Math.round(Math.min(...forecastDaysArray[1].temps))}°F / ${Math.round(Math.max(...forecastDaysArray[1].temps))}°F`;
            } else {
                forecastDay2TempP.textContent = '--';
            }
            if (forecastDaysArray.length > 2) {
                forecastDay3TempP.textContent = `${Math.round(Math.min(...forecastDaysArray[2].temps))}°F / ${Math.round(Math.max(...forecastDaysArray[2].temps))}°F`;
            } else {
                forecastDay3TempP.textContent = '--';
            }

        } catch (error) {
            console.error('Error fetching weather forecast:', error);
            forecastDay1TempP.textContent = 'Failed to load forecast.';
            forecastDay2TempP.textContent = '';
            forecastDay3TempP.textContent = '';
        }
    };

    // --- Business Spotlights ---
    const spotlightContainer = document.getElementById('spotlight-cards-container');

    // Fisher-Yates (Knuth) Shuffle algorithm
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Swap elements
        }
        return array;
    }

    const loadSpotlights = async () => {
        try {
            const response = await fetch('data/members.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            const members = data.members;

            // Filter for Gold (3) or Silver (2) members
            const eligibleMembers = members.filter(member =>
                member.membershipLevel === 2 || member.membershipLevel === 3
            );

            // Shuffle the eligible members
            const shuffledMembers = shuffleArray(eligibleMembers);

            // Select the first 2 or 3 members for spotlight (max 3)
            const spotlightsToShow = shuffledMembers.slice(0, Math.min(shuffledMembers.length, 3));

            spotlightContainer.innerHTML = ''; // Clear loading message

            if (spotlightsToShow.length === 0) {
                spotlightContainer.innerHTML = '<p>No eligible members for spotlight at this time.</p>';
                return;
            }

            spotlightsToShow.forEach(member => {
                const memberCard = document.createElement('div');
                memberCard.classList.add('business-card');

                let membershipLevelText = '';
                if (member.membershipLevel === 2) {
                    membershipLevelText = 'Silver Member';
                } else if (member.membershipLevel === 3) {
                    membershipLevelText = 'Gold Member';
                }

                memberCard.innerHTML = `
                    <img src="images/${member.image}" alt="${member.name} Logo" class="business-logo" onerror="this.onerror=null;this.src='https://placehold.co/100x100/2c3e50/ffffff?text=Logo'">
                    <h4>${member.name}</h4>
                    <p class="tag-line">${member.description || ''}</p>
                    <p>PHONE: ${member.phone}</p>
                    <p>ADDRESS: ${member.address}</p>
                    <p>URL: <a href="${member.website}" target="_blank">${member.website.replace(/(^\w+:|^)\/\//, '')}</a></p>
                    <p class="membership-level">${membershipLevelText}</p>
                `;
                spotlightContainer.appendChild(memberCard);
            });

        } catch (error) {
            console.error('Error loading business spotlights:', error);
            spotlightContainer.innerHTML = '<p>Error loading business spotlights. Please try again later.</p>';
        }
    };

    fetchCurrentWeather();
    fetchWeatherForecast();
    loadSpotlights();
});
