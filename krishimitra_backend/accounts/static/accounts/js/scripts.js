// Global Variables
let chatbotOpen = false;
let isTyping = false;

// Comprehensive Crop Database
const cropDatabase = {
    'rice': {
        soilTypes: ['clay', 'loamy', 'alluvial'],
        phRange: [5.5, 7.0],
        rainfall: [1000, 2500],
        temperature: [20, 35],
        season: ['kharif'],
        profitability: 'Medium',
        description: 'Staple food crop requiring flooded fields and high water availability',
        tips: 'Ensure proper water management and use high-yielding varieties',
        diseases: 'Watch for blast disease and brown planthopper'
    },
    'wheat': {
        soilTypes: ['loamy', 'clay', 'black'],
        phRange: [6.0, 7.5],
        rainfall: [300, 1000],
        temperature: [15, 25],
        season: ['rabi'],
        profitability: 'High',
        description: 'Major cereal crop with good drought tolerance and storage life',
        tips: 'Plant early for better yield, use balanced fertilization',
        diseases: 'Monitor for rust diseases and aphid infestations'
    },
    'cotton': {
        soilTypes: ['black', 'alluvial', 'red'],
        phRange: [6.0, 8.0],
        rainfall: [600, 1200],
        temperature: [20, 35],
        season: ['kharif'],
        profitability: 'High',
        description: 'Cash crop requiring warm weather and well-drained soil',
        tips: 'Use Bt varieties for pest control, ensure proper spacing',
        diseases: 'Beware of bollworm attacks and bacterial blight'
    },
    'sugarcane': {
        soilTypes: ['loamy', 'clay', 'alluvial'],
        phRange: [6.0, 7.5],
        rainfall: [1000, 1800],
        temperature: [20, 30],
        season: ['kharif', 'rabi'],
        profitability: 'Very High',
        description: 'Perennial cash crop with high water and nutrient requirements',
        tips: 'Maintain soil moisture, use drip irrigation if possible',
        diseases: 'Control red rot and smut diseases early'
    },
    'maize': {
        soilTypes: ['loamy', 'sandy', 'alluvial'],
        phRange: [5.8, 7.8],
        rainfall: [400, 800],
        temperature: [18, 27],
        season: ['kharif', 'rabi'],
        profitability: 'Medium',
        description: 'Versatile crop good for food, feed, and industrial use',
        tips: 'Use hybrid varieties, ensure proper plant population',
        diseases: 'Watch for stem borer and leaf blight'
    },
    'soybean': {
        soilTypes: ['black', 'red', 'alluvial'],
        phRange: [6.0, 7.2],
        rainfall: [450, 700],
        temperature: [20, 30],
        season: ['kharif'],
        profitability: 'High',
        description: 'Legume crop that fixes nitrogen and improves soil fertility',
        tips: 'Inoculate seeds with rhizobium, avoid waterlogging',
        diseases: 'Control rust and bacterial pustule'
    },
    'tomato': {
        soilTypes: ['loamy', 'sandy', 'red'],
        phRange: [6.0, 7.0],
        rainfall: [400, 750],
        temperature: [18, 29],
        season: ['rabi', 'zaid'],
        profitability: 'Very High',
        description: 'High-value vegetable crop with excellent market demand',
        tips: 'Use staking for support, maintain consistent irrigation',
        diseases: 'Prevent early blight and bacterial wilt'
    },
    'onion': {
        soilTypes: ['loamy', 'sandy', 'alluvial'],
        phRange: [6.0, 7.5],
        rainfall: [350, 650],
        temperature: [15, 25],
        season: ['rabi'],
        profitability: 'High',
        description: 'Bulb crop with good storage life and processing potential',
        tips: 'Use quality seedlings, ensure proper curing',
        diseases: 'Control purple blotch and thrips infestation'
    },
    'potato': {
        soilTypes: ['sandy', 'loamy', 'alluvial'],
        phRange: [5.0, 6.0],
        rainfall: [300, 600],
        temperature: [15, 20],
        season: ['rabi'],
        profitability: 'High',
        description: 'Tuber crop requiring cool weather and well-drained soil',
        tips: 'Use certified seed potatoes, hill up soil around plants',
        diseases: 'Prevent late blight and bacterial wilt'
    },
    'mustard': {
        soilTypes: ['loamy', 'clay', 'alluvial'],
        phRange: [6.0, 7.5],
        rainfall: [300, 400],
        temperature: [10, 25],
        season: ['rabi'],
        profitability: 'Medium',
        description: 'Oilseed crop that tolerates cool weather and light frost',
        tips: 'Sow at proper time, use balanced fertilization',
        diseases: 'Control alternaria blight and aphids'
    },
    'groundnut': {
        soilTypes: ['sandy', 'red', 'black'],
        phRange: [6.0, 7.0],
        rainfall: [500, 750],
        temperature: [20, 30],
        season: ['kharif', 'rabi'],
        profitability: 'High',
        description: 'Legume oilseed crop that fixes nitrogen in soil',
        tips: 'Ensure calcium availability, avoid overwatering',
        diseases: 'Control leaf spot and rust diseases'
    },
    'chickpea': {
        soilTypes: ['black', 'loamy', 'clay'],
        phRange: [6.0, 7.5],
        rainfall: [200, 400],
        temperature: [10, 25],
        season: ['rabi'],
        profitability: 'High',
        description: 'Protein-rich pulse crop with good drought tolerance',
        tips: 'Avoid excess irrigation, use rhizobium inoculation',
        diseases: 'Control wilt and blight diseases'
    }
};

// Market Price Database (Simulated Real-time Data)
const marketData = [
    { crop: 'Wheat', price: 2150, trend: 'up', change: 5, market: 'Delhi', updated: new Date() },
    { crop: 'Rice', price: 1890, trend: 'down', change: -2, market: 'Punjab', updated: new Date() },
    { crop: 'Cotton', price: 5200, trend: 'up', change: 8, market: 'Gujarat', updated: new Date() },
    { crop: 'Sugarcane', price: 340, trend: 'stable', change: 0, market: 'UP', updated: new Date() },
    { crop: 'Maize', price: 1750, trend: 'up', change: 3, market: 'Karnataka', updated: new Date() },
    { crop: 'Soybean', price: 4200, trend: 'up', change: 6, market: 'MP', updated: new Date() },
    { crop: 'Tomato', price: 2800, trend: 'down', change: -12, market: 'Maharashtra', updated: new Date() },
    { crop: 'Onion', price: 3500, trend: 'up', change: 15, market: 'Karnataka', updated: new Date() }
];

// Chatbot Responses Database
const chatbotResponses = {
    greetings: [
        "Hello! How can I assist you with your farming needs today? 🌾",
        "Hi there! I'm here to help with all your agricultural questions! 🚜",
        "Welcome! What farming challenges can I help you solve? 🌱"
    ],
    weather: [
        "Weather is crucial for farming! Our system provides real-time weather data including temperature, humidity, rainfall probability, and wind speed. Would you like me to explain how weather affects specific crops? 🌤",
        "Great question! Weather monitoring helps you make informed decisions about planting, irrigation, and harvesting. Check our weather section for up-to-date forecasts! ⛈"
    ],
    crops: [
        "I can recommend the best crops based on your soil type, climate, season, and budget. Try our AI recommendation tool above! 🌾",
        "Crop selection depends on many factors like soil pH, rainfall, temperature, and market demand. What specific information do you need? 🌱"
    ],
    soil: [
        "Soil health is fundamental! I can help you understand soil types, pH levels, and nutrient management. What's your soil type? 🌱",
        "Different crops thrive in different soil conditions. Clay, sandy, loamy - each has its advantages. Need specific soil advice? 🏔"
    ],
    market: [
        "Market prices fluctuate daily! Check our real-time market price section for current rates across different states. 📈",
        "Smart farmers track market trends! Our price analysis helps you choose profitable crops. Want to know about specific crop prices? 💰"
    ],
    pests: [
        "Pest management is crucial for good yields! Common issues include aphids, bollworms, and fungal diseases. What pest problems are you facing? 🐛",
        "Integrated Pest Management (IPM) is the best approach. Use biological controls, crop rotation, and targeted pesticides when necessary. 🛡"
    ],
    fertilizer: [
        "Balanced fertilization is key! Use soil testing to determine NPK requirements. Organic fertilizers improve soil health long-term. 🧪",
        "Different crops have different nutrient needs. Rice needs more nitrogen, while legumes need less. What crop are you growing? 🌾"
    ],
    irrigation: [
        "Water management is critical! Drip irrigation saves water and improves yields. Monitor soil moisture and avoid both drought stress and waterlogging. 💧",
        "Irrigation timing depends on crop growth stage and weather. Most crops need consistent moisture during flowering and grain filling. 🚿"
    ],
    default: [
        "I'm here to help with farming questions! Ask me about crops, weather, soil, pests, fertilizers, or market prices. 🤔",
        "That's an interesting question! Could you be more specific? I can help with crop recommendations, farming techniques, or market insights. 💭",
        "I'd love to help! Try asking about specific crops, soil problems, weather concerns, or farming techniques. 🎯"
    ]
};

// Initialize the website
document.addEventListener('DOMContentLoaded', function () {
    initializeAnimations();
    populateMarketData();
    updateWeatherData();
    animateCounters();

    // Set current date for weather
    updateWeather();
});

// Smooth scrolling function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Mobile menu toggle
function toggleMobileMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
}

// Header scroll effect
window.addEventListener('scroll', function () {
    const header = document.getElementById('header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Animation on scroll
function initializeAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// Counter animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-count'));
                const counter = entry.target;
                let current = 0;
                const increment = target / 100;

                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        counter.textContent = Math.ceil(current);
                        setTimeout(updateCounter, 20);
                    } else {
                        counter.textContent = target;
                    }
                };

                updateCounter();
                observer.unobserve(entry.target);
            }
        });
    });

    counters.forEach(counter => observer.observe(counter));
}

// Main crop recommendation function
async function getRecommendation() {
    // Get form values
    const location = document.getElementById('location').value;
    const season = document.getElementById('season').value;
    const soilType = document.getElementById('soilType').value;
    const soilPH = parseFloat(document.getElementById('soilPH').value);
    const rainfall = parseInt(document.getElementById('rainfall').value);
    const temperature = parseInt(document.getElementById('temperature').value);
    const farmSize = parseFloat(document.getElementById('farmSize').value);
    const budget = parseInt(document.getElementById('budget').value);

    // Validation
    if (!location || !season || !soilType || !soilPH || !rainfall || !temperature || !farmSize || !budget) {
        alert('⚠ Please fill in all fields to get accurate recommendations!');
        return;
    }

    if (soilPH < 0 || soilPH > 14) {
        alert('⚠ Soil pH should be between 0 and 14!');
        return;
    }

    // Show loading
    showLoading();

    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 2000));

    // AI recommendation logic
    const recommendations = [];

    for (const [cropName, cropData] of Object.entries(cropDatabase)) {
        let score = 0;
        let reasons = [];

        // Soil type compatibility (25 points)
        if (cropData.soilTypes.includes(soilType)) {
            score += 25;
            reasons.push('✅ Perfect soil match');
        } else {
            const soilCompatibility = calculateSoilCompatibility(soilType, cropData.soilTypes);
            if (soilCompatibility > 0.5) {
                score += 15;
                reasons.push('⚠ Acceptable soil type');
            } else {
                reasons.push('❌ Soil type not suitable');
            }
        }

        // pH range (20 points)
        if (soilPH >= cropData.phRange[0] && soilPH <= cropData.phRange[1]) {
            score += 20;
            reasons.push('✅ Optimal pH range');
        } else if (Math.abs(soilPH - ((cropData.phRange[0] + cropData.phRange[1]) / 2)) <= 1) {
            score += 10;
            reasons.push('⚠ pH needs minor adjustment');
        } else {
            reasons.push('❌ pH requires significant correction');
        }

        // Rainfall compatibility (20 points)
        if (rainfall >= cropData.rainfall[0] && rainfall <= cropData.rainfall[1]) {
            score += 20;
            reasons.push('✅ Perfect rainfall conditions');
        } else if (rainfall < cropData.rainfall[0]) {
            const deficit = (cropData.rainfall[0] - rainfall) / cropData.rainfall[0];
            if (deficit < 0.3) {
                score += 10;
                reasons.push('💧 Needs supplemental irrigation');
            } else {
                reasons.push('💧 High irrigation requirement');
            }
        } else {
            const excess = (rainfall - cropData.rainfall[1]) / cropData.rainfall[1];
            if (excess < 0.3) {
                score += 10;
                reasons.push('🌧 Good drainage needed');
            } else {
                reasons.push('🌧 Risk of waterlogging');
            }
        }

        // Temperature compatibility (20 points)
        if (temperature >= cropData.temperature[0] && temperature <= cropData.temperature[1]) {
            score += 20;
            reasons.push('✅ Ideal temperature range');
        } else if (Math.abs(temperature - ((cropData.temperature[0] + cropData.temperature[1]) / 2)) <= 5) {
            score += 10;
            reasons.push('🌡 Acceptable temperature');
        } else {
            reasons.push('🌡 Temperature stress likely');
        }

        // Season compatibility (15 points)
        if (cropData.season.includes(season)) {
            score += 15;
            reasons.push('✅ Perfect season');
        } else {
            reasons.push('❌ Wrong season for planting');
        }

        // Budget consideration (bonus points)
        const estimatedCost = calculateCropCost(cropName, farmSize);
        if (budget >= estimatedCost * 1.2) {
            score += 5;
            reasons.push('💰 Excellent budget fit');
        } else if (budget >= estimatedCost) {
            score += 2;
            reasons.push('💰 Adequate budget');
        } else {
            reasons.push('💰 Budget may be tight');
        }

        // Only recommend crops with decent scores
        if (score >= 50) {
            recommendations.push({
                name: cropName,
                score: score,
                profitability: cropData.profitability,
                description: cropData.description,
                tips: cropData.tips,
                diseases: cropData.diseases,
                reasons: reasons,
                estimatedCost: estimatedCost,
                estimatedYield: calculateYield(cropName, farmSize),
                roi: calculateROI(cropName, farmSize, budget)
            });
        }
    }

    // Sort by score
    recommendations.sort((a, b) => b.score - a.score);

    hideLoading();
    displayResults(recommendations, farmSize, budget, location);
}

// Helper function to calculate soil compatibility
function calculateSoilCompatibility(actualSoil, preferredSoils) {
    const soilMatrix = {
        'clay': ['loamy', 'alluvial'],
        'sandy': ['loamy', 'red'],
        'loamy': ['clay', 'sandy', 'alluvial'],
        'black': ['clay', 'red'],
        'red': ['sandy', 'black', 'laterite'],
        'alluvial': ['loamy', 'clay'],
        'laterite': ['red', 'sandy']
    };

    const compatible = soilMatrix[actualSoil] || [];
    return preferredSoils.some(soil => compatible.includes(soil)) ? 0.6 : 0;
}

// Helper function to calculate crop cost
function calculateCropCost(cropName, farmSize) {
    const baseCosts = {
        'rice': 25000,
        'wheat': 20000,
        'cotton': 35000,
        'sugarcane': 80000,
        'maize': 22000,
        'soybean': 28000,
        'tomato': 50000,
        'onion': 30000,
        'potato': 45000,
        'mustard': 18000,
        'groundnut': 25000,
        'chickpea': 20000
    };

    return (baseCosts[cropName] || 25000) * farmSize;
}

// Helper function to calculate yield
function calculateYield(cropName, farmSize) {
    const yieldPerHectare = {
        'rice': 35,
        'wheat': 30,
        'cotton': 15,
        'sugarcane': 700,
        'maize': 45,
        'soybean': 25,
        'tomato': 400,
        'onion': 250,
        'potato': 200,
        'mustard': 12,
        'groundnut': 20,
        'chickpea': 15
    };

    return Math.round((yieldPerHectare[cropName] || 25) * farmSize);
}

// Helper function to calculate ROI
function calculateROI(cropName, farmSize, budget) {
    const estimatedYield = calculateYield(cropName, farmSize);
    const marketPrice = getMarketPrice(cropName);
    const estimatedRevenue = estimatedYield * marketPrice;
    return Math.round(((estimatedRevenue - budget) / budget) * 100);
}

// Helper function to get market price
function getMarketPrice(cropName) {
    const prices = {
        'rice': 1890,
        'wheat': 2150,
        'cotton': 5200,
        'sugarcane': 340,
        'maize': 1750,
        'soybean': 4200,
        'tomato': 2800,
        'onion': 3500,
        'potato': 2200,
        'mustard': 4500,
        'groundnut': 5000,
        'chickpea': 4800
    };

    return prices[cropName] || 2500;
}

// Show loading animation
function showLoading() {
    document.getElementById('loading').style.display = 'block';
    document.getElementById('results').style.display = 'none';
}

// Hide loading animation
function hideLoading() {
    document.getElementById('loading').style.display = 'none';
}

// Display results function
function displayResults(recommendations, farmSize, budget, location) {
    const resultsDiv = document.getElementById('results');
    const cropResultsDiv = document.getElementById('cropResults');
    const additionalInfoDiv = document.getElementById('additionalInfo');

    if (recommendations.length === 0) {
        cropResultsDiv.innerHTML = `
                    <div class="crop-recommendation" style="background: linear-gradient(135deg, #f44336, #d32f2f);">
                        <h4>❌ No Suitable Crops Found</h4>
                        <p>Based on your current conditions, we couldn't find ideal crop matches. Consider:</p>
                        <div class="crop-reasons">
                            <div>🌱 Adjusting soil pH through lime or sulfur application</div>
                            <div>💧 Installing irrigation systems for water management</div>
                            <div>🗓 Waiting for the appropriate season</div>
                            <div>🧪 Conducting detailed soil testing</div>
                        </div>
                    </div>
                `;
    } else {
        let html = '';
        const topRecommendations = recommendations.slice(0, 3);

        topRecommendations.forEach((crop, index) => {
            const profitabilityColor = {
                'Very High': '#4CAF50',
                'High': '#8BC34A',
                'Medium': '#FF9800',
                'Low': '#F44336'
            };

            html += `
                        <div class="crop-recommendation">
                            <h4>${index + 1}. ${crop.name.toUpperCase()} 
                                <span style="font-size: 0.8em; opacity: 0.9;">(AI Score: ${crop.score}/100)</span>
                            </h4>
                            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin: 1rem 0;">
                                <div>
                                    <strong>🎯 Profitability:</strong> 
                                    <span style="color: ${profitabilityColor[crop.profitability]}; font-weight: bold;">
                                        ${crop.profitability}
                                    </span>
                                </div>
                                <div><strong>💰 Est. Cost:</strong> ₹${crop.estimatedCost.toLocaleString()}</div>
                                <div><strong>📊 Est. Yield:</strong> ${crop.estimatedYield} quintals</div>
                                <div><strong>📈 Expected ROI:</strong> ${crop.roi}%</div>
                            </div>
                            <p><strong>Description:</strong> ${crop.description}</p>
                            <p><strong>💡 Pro Tip:</strong> ${crop.tips}</p>
                            <p><strong>⚠ Disease Alert:</strong> ${crop.diseases}</p>
                            <div class="crop-reasons">
                                <strong>AI Analysis:</strong><br>
                                ${crop.reasons.join('<br>')}
                            </div>
                        </div>
                    `;
        });
        cropResultsDiv.innerHTML = html;
    }

    // Additional comprehensive information
    const bestCrop = recommendations[0];
    const totalInvestment = budget;
    const expectedRevenue = bestCrop ? (bestCrop.estimatedYield * getMarketPrice(bestCrop.name)) : 0;
    const profitMargin = expectedRevenue - totalInvestment;

    additionalInfoDiv.innerHTML = `
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; margin-top: 2rem;">
                    <div style="background: white; padding: 1.5rem; border-radius: 15px; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
                        <h4>📊 Financial Analysis</h4>
                        <div style="margin-top: 1rem;">
                            <p><strong>🏡 Farm Size:</strong> ${farmSize} hectares</p>
                            <p><strong>💰 Total Investment:</strong> ₹${totalInvestment.toLocaleString()}</p>
                            <p><strong>📈 Expected Revenue:</strong> ₹${expectedRevenue.toLocaleString()}</p>
                            <p><strong>💵 Estimated Profit:</strong> 
                                <span style="color: ${profitMargin > 0 ? '#4CAF50' : '#f44336'}; font-weight: bold;">
                                    ₹${profitMargin.toLocaleString()}
                                </span>
                            </p>
                            <p><strong>📊 Break-even:</strong> ${Math.ceil(totalInvestment / (expectedRevenue / (bestCrop?.estimatedYield || 1)))} quintals</p>
                        </div>
                    </div>

                    <div style="background: white; padding: 1.5rem; border-radius: 15px; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
                        <h4>🌱 Smart Farming Tips</h4>
                        <ul style="margin-top: 1rem; padding-left: 1.2rem;">
                            <li>🔄 <strong>Crop Rotation:</strong> Rotate crops to maintain soil health</li>
                            <li>🧪 <strong>Soil Testing:</strong> Test soil every 2-3 years</li>
                            <li>💧 <strong>Water Management:</strong> Use drip irrigation to save water</li>
                            <li>🌿 <strong>Organic Matter:</strong> Add compost to improve soil structure</li>
                            <li>🐛 <strong>IPM:</strong> Use Integrated Pest Management techniques</li>
                            <li>📱 <strong>Tech Adoption:</strong> Use farming apps for monitoring</li>
                        </ul>
                    </div>

                    <div style="background: white; padding: 1.5rem; border-radius: 15px; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
                        <h4>📅 Seasonal Calendar</h4>
                        <div style="margin-top: 1rem;">
                            <p><strong>🌱 Kharif Season:</strong> June-October<br>
                            <small>Rice, Cotton, Sugarcane, Maize, Soybean</small></p>
                            
                            <p><strong>🌾 Rabi Season:</strong> November-April<br>
                            <small>Wheat, Mustard, Chickpea, Potato, Onion</small></p>
                            
                            <p><strong>☀ Zaid Season:</strong> April-June<br>
                            <small>Tomato, Cucumber, Fodder crops</small></p>
                        </div>
                    </div>

                    <div style="background: white; padding: 1.5rem; border-radius: 15px; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
                        <h4>🎯 Success Factors</h4>
                        <div style="margin-top: 1rem;">
                            <div style="margin: 0.5rem 0;"><strong>Soil:</strong> ${getSuccessRating(recommendations[0]?.score >= 70 ? 'Good' : 'Needs Improvement')}</div>
                            <div style="margin: 0.5rem 0;"><strong>Climate:</strong> ${getSuccessRating('Suitable')}</div>
                            <div style="margin: 0.5rem 0;"><strong>Budget:</strong> ${getSuccessRating(budget > 30000 ? 'Adequate' : 'Limited')}</div>
                            <div style="margin: 0.5rem 0;"><strong>Season:</strong> ${getSuccessRating('Optimal')}</div>
                            <div style="margin: 0.5rem 0;"><strong>Market:</strong> ${getSuccessRating('Favorable')}</div>
                        </div>
                    </div>
                </div>

                <div style="background: linear-gradient(135deg, #e3f2fd, #bbdefb); padding: 2rem; border-radius: 15px; margin-top: 2rem; text-align: center;">
                    <h4>🤝 Need More Help?</h4>
                    <p>Our AI assistant is here 24/7! Click the chat button to get personalized advice, ask questions, or get real-time farming tips.</p>
                    <button onclick="toggleChatbot()" class="cta-button" style="margin-top: 1rem;">💬 Chat with AI Assistant</button>
                </div>
            `;

    resultsDiv.style.display = 'block';
    resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Helper function for success rating
function getSuccessRating(status) {
    const colors = {
        'Good': '🟢',
        'Suitable': '🟢',
        'Adequate': '🟡',
        'Optimal': '🟢',
        'Favorable': '🟢',
        'Needs Improvement': '🟡',
        'Limited': '🟠'
    };
    return `${colors[status] || '🟡'} ${status}`;
}

// Weather update function
function updateWeather() {
    const weatherData = generateRandomWeather();

    document.getElementById('temperature-val').textContent = `${weatherData.temperature}°C`;
    document.getElementById('humidity-val').textContent = `${weatherData.humidity}%`;
    document.getElementById('rainfall-val').textContent = `${weatherData.rainfall}%`;
    document.getElementById('wind-val').textContent = `${weatherData.windSpeed} km / h`;

    // Add some visual feedback
    const button = event?.target;
    if (button) {
        const originalText = button.innerHTML;
        button.innerHTML = '🔄 Updating...';
        button.disabled = true;

        setTimeout(() => {
            button.innerHTML = '✅ Updated!';
            setTimeout(() => {
                button.innerHTML = originalText;
                button.disabled = false;
            }, 1000);
        }, 1500);
    }
}

// Generate random weather data (simulating API call)
function generateRandomWeather() {
    return {
        temperature: Math.floor(Math.random() * 20) + 15, // 15-35°C
        humidity: Math.floor(Math.random() * 40) + 40,    // 40-80%
        rainfall: Math.floor(Math.random() * 80) + 10,    // 10-90%
        windSpeed: Math.floor(Math.random() * 25) + 5     // 5-30 km/h
    };
}

// Update weather data on load
function updateWeatherData() {
    updateWeather();
}

// Populate market data
function populateMarketData() {
    const tableBody = document.getElementById('priceTableBody');
    let html = '';

    marketData.forEach(item => {
        const trendIcon = {
            'up': '📈',
            'down': '📉',
            'stable': '➡'
        };

        const trendClass = {
            'up': 'trend-up',
            'down': 'trend-down',
            'stable': 'trend-stable'
        };

        const changeText = item.change > 0
            ? `+${item.change}%`
            : item.change < 0
                ? `${item.change}%`
                : 'No change';


        html += `
                    <tr>
                        <td><strong>${item.crop}</strong></td>
                        <td>₹${item.price.toLocaleString()}</td>
                        <td class="${trendClass[item.trend]}">
                            ${trendIcon[item.trend]} ${changeText}
                        </td>
                        <td>${item.market}</td>
                        <td>${item.updated.toLocaleDateString()}</td>
                    </tr>
                `;
    });

    tableBody.innerHTML = html;
}

// Update market prices with animation
function updateMarketPrices() {
    const button = event.target;
    const originalText = button.innerHTML;
    button.innerHTML = '🔄 Refreshing...';
    button.disabled = true;

    // Simulate price updates
    setTimeout(() => {
        marketData.forEach(item => {
            const change = (Math.random() - 0.5) * 0.1; // ±5% change
            item.price = Math.round(item.price * (1 + change));
            item.change = Math.round(change * 100);
            item.trend = change > 0.02 ? 'up' : change < -0.02 ? 'down' : 'stable';
            item.updated = new Date();
        });

        populateMarketData();

        button.innerHTML = 'Updated!';
        setTimeout(() => {
            button.innerHTML = originalText;
            button.disabled = false;
        }, 1000);
    }, 2000);
}

// Chatbot functionality
function toggleChatbot() {
    const chatWindow = document.getElementById('chatbotWindow');
    chatbotOpen = !chatbotOpen;

    if (chatbotOpen) {
        chatWindow.style.display = 'flex';
        document.getElementById('chatInput').focus();
    } else {
        chatWindow.style.display = 'none';
    }
}

function handleEnter(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
}

async function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();

    if (!message || isTyping) return;

    // Add user message
    addMessage(message, 'user');
    input.value = '';

    // Show typing indicator
    showTyping();

    // Generate bot response
    setTimeout(async () => {
        const response = await generateBotResponse(message);
        hideTyping();
        addMessage(response, 'bot');
    }, Math.random() * 2000 + 1000); // Random delay 1-3 seconds
}

function addMessage(message, sender) {
    const messagesContainer = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = message`${sender} ` - message;
    messageDiv.innerHTML = message;

    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function showTyping() {
    if (isTyping) return;
    isTyping = true;

    const messagesContainer = document.getElementById('chatMessages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'typing-indicator';
    typingDiv.id = 'typing-indicator';
    typingDiv.innerHTML = `
                <div class="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            `;

    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function hideTyping() {
    isTyping = false;
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

async function generateBotResponse(userMessage) {
    const message = userMessage.toLowerCase();

    // Simple keyword matching for responses
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
        return getRandomResponse(chatbotResponses.greetings);
    }

    if (message.includes('weather') || message.includes('climate') || message.includes('temperature') || message.includes('rain')) {
        return getRandomResponse(chatbotResponses.weather);
    }

    if (message.includes('crop') || message.includes('plant') || message.includes('grow') || message.includes('recommend')) {
        return getRandomResponse(chatbotResponses.crops);
    }

    if (message.includes('soil') || message.includes('ph') || message.includes('nutrient')) {
        return getRandomResponse(chatbotResponses.soil);
    }

    if (message.includes('price') || message.includes('market') || message.includes('sell') || message.includes('profit')) {
        return getRandomResponse(chatbotResponses.market);
    }

    if (message.includes('pest') || message.includes('disease') || message.includes('insect') || message.includes('bug')) {
        return getRandomResponse(chatbotResponses.pests);
    }

    if (message.includes('fertilizer') || message.includes('manure') || message.includes('nutrition') || message.includes('npk')) {
        return getRandomResponse(chatbotResponses.fertilizer);
    }

    if (message.includes('water') || message.includes('irrigation') || message.includes('drought')) {
        return getRandomResponse(chatbotResponses.irrigation);
    }

    // Specific crop questions
    if (message.includes('rice')) {
        return "🌾 Rice is perfect for clayey soils with high water availability. Best grown in Kharif season (June-Oct). Key tips: maintain 2-5cm water level, use high-yielding varieties, and watch for blast disease. Current market price: ₹1,890/quintal. Need specific rice farming advice?";
    }

    if (message.includes('wheat')) {
        return "🌾 Wheat thrives in loamy soils with moderate water needs. Plant in Rabi season (Nov-Apr). Pro tips: sow early for better yield, use balanced NPK fertilization. Watch for rust diseases. Current price: ₹2,150/quintal. Want wheat cultivation details?";
    }

    if (message.includes('cotton')) {
        return "🌱 Cotton loves black cotton soil and warm weather. Kharif crop needing 600-1200mm rainfall. Use Bt varieties for bollworm control. Ensure proper plant spacing. Current price: ₹5,200/quintal. Need cotton farming guidance?";
    }

    // Thank you responses
    if (message.includes('thank') || message.includes('thanks')) {
        return "You're very welcome!  I'm always here to help with your farming needs. Feel free to ask more questions anytime! 🌾";
    }

    // Default response with helpful suggestions
    return getRandomResponse(chatbotResponses.default);
}

function getRandomResponse(responseArray) {
    return responseArray[Math.floor(Math.random() * responseArray.length)];
}

// Initialize market data and weather on load
window.addEventListener('load', function () {
    populateMarketData();
    updateWeatherData();
});

 let communityOpen = false;
        let activeTab = 'community';

        // Sample community posts data
        const communityPosts = [
            {
                id: 1,
                user: "RameshF",
                avatar: "R",
                content: "Just harvested my wheat crop! Got 35 quintals per hectare this season. The AI recommendations really helped with the timing. 🌾",
                likes: 24,
                replies: 7,
                time: "2 hours ago"
            },
            {
                id: 2,
                user: "PriyaK",
                avatar: "P", 
                content: "Has anyone tried intercropping tomatoes with marigold? I'm seeing great results in pest control! 🍅🌼",
                likes: 18,
                replies: 12,
                time: "5 hours ago"
            },
            {
                id: 3,
                user: "SureshA",
                avatar: "S",
                content: "Cotton prices are looking good this month. Market analysis from the app was spot on! Thanks KrishiGrow! 📈",
                likes: 31,
                replies: 9,
                time: "1 day ago"
            },
            {
                id: 4,
                user: "MeeraS",
                avatar: "M",
                content: "Looking for advice on organic fertilizers for rice cultivation. What has worked best for you?",
                likes: 15,
                replies: 23,
                time: "2 days ago"
            }
        ];

        // Sample consultant data
        const consultants = [
            {
                id: 1,
                name: "Dr. Arvind Kumar",
                speciality: "Soil Health & Crop Nutrition",
                rating: "⭐⭐⭐⭐⭐",
                price: "₹500/hour",
                experience: "15+ years",
                available: true
            },
            {
                id: 2,
                name: "Prof. Sunita Sharma",
                speciality: "Pest Management & Organic Farming",
                rating: "⭐⭐⭐⭐⭐",
                price: "₹600/hour", 
                experience: "20+ years",
                available: true
            },
            {
                id: 3,
                name: "Rajesh Patil",
                speciality: "Market Analysis & Crop Planning",
                rating: "⭐⭐⭐⭐",
                price: "₹400/hour",
                experience: "12+ years",
                available: false
            },
            {
                id: 4,
                name: "Dr. Kavitha Reddy",
                speciality: "Water Management & Irrigation",
                rating: "⭐⭐⭐⭐⭐",
                price: "₹550/hour",
                experience: "18+ years", 
                available: true
            }
        ];

        // Toggle community panel
        function toggleCommunity() {
            const communityPanel = document.getElementById('communityPanel');
            communityOpen = !communityOpen;

            if (communityOpen) {
                communityPanel.style.display = 'flex';
                loadCommunityContent();
            } else {
                communityPanel.style.display = 'none';
            }
        }

        // Switch between tabs
        function switchTab(tab) {
            activeTab = tab;
            
            // Update tab buttons
            document.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            event.target.classList.add('active');
            
            // Show/hide content
            document.getElementById('communityTab').style.display = tab === 'community' ? 'block' : 'none';
            document.getElementById('consultancyTab').style.display = tab === 'consultancy' ? 'block' : 'none';
            
            if (tab === 'consultancy') {
                loadConsultancyContent();
            }
        }

        // Load community posts
        function loadCommunityContent() {
            const postsContainer = document.getElementById('communityPosts');
            let html = '';
            
            communityPosts.forEach(post => {
                html += `
                    <div class="post">
                        <div class="post-header">
                            <div class="user-avatar">${post.avatar}</div>
                            <div>
                                <div class="post-meta">
                                    <strong>${post.user}</strong> • ${post.time}
                                </div>
                            </div>
                        </div>
                        <div class="post-content">${post.content}</div>
                        <div class="post-actions">
                            <span onclick="likePost(${post.id})">👍 ${post.likes}</span>
                            <span onclick="replyToPost(${post.id})">💬 ${post.replies}</span>
                            <span onclick="sharePost(${post.id})">📤 Share</span>
                        </div>
                    </div>
                `;
            });
            
            postsContainer.innerHTML = html;
        }

        // Load consultancy options
        function loadConsultancyContent() {
            const consultancyContainer = document.getElementById('consultancyOptions');
            let html = '';
            
            consultants.forEach(consultant => {
                const statusColor = consultant.available ? '#4CAF50' : '#f44336';
                const statusText = consultant.available ? 'Available' : 'Busy';
                
                html += `
                    <div class="consultant-card">
                        <div class="consultant-header">
                            <div class="consultant-name">${consultant.name}</div>
                            <div class="consultant-price">${consultant.price}</div>
                        </div>
                        <div class="consultant-speciality">${consultant.speciality}</div>
                        <div style="display: flex; justify-content: space-between; align-items: center; margin: 0.5rem 0;">
                            <div>${consultant.rating} (${consultant.experience})</div>
                            <div style="color: ${statusColor}; font-weight: bold; font-size: 0.9rem;">${statusText}</div>
                        </div>
                        <button class="book-btn" onclick="bookConsultation(${consultant.id})" ${!consultant.available ? 'disabled style="opacity: 0.6; cursor: not-allowed;"' : ''}>
                            ${consultant.available ? '📅 Book Consultation' : '⏰ Join Waitlist'}
                        </button>
                    </div>
                `;
            });
            
            consultancyContainer.innerHTML = html;
        }

        // Create new post
        function createPost() {
            const postText = document.getElementById('postText').value.trim();
            if (!postText) {
                alert('Please write something to post!');
                return;
            }
            
            // Add new post to the beginning of the array
            const newPost = {
                id: Date.now(),
                user: "You",
                avatar: "Y",
                content: postText,
                likes: 0,
                replies: 0,
                time: "Just now"
            };
            
            communityPosts.unshift(newPost);
            document.getElementById('postText').value = '';
            loadCommunityContent();
            
            // Show success message
            showNotification('Post shared successfully! 🎉');
        }

        // Like post
        function likePost(postId) {
            const post = communityPosts.find(p => p.id === postId);
            if (post) {
                post.likes++;
                loadCommunityContent();
                showNotification('Post liked! 👍');
            }
        }

        // Reply to post
        function replyToPost(postId) {
            const reply = prompt('Write your reply:');
            if (reply && reply.trim()) {
                const post = communityPosts.find(p => p.id === postId);
                if (post) {
                    post.replies++;
                    loadCommunityContent();
                    showNotification('Reply posted! 💬');
                }
            }
        }

        // Share post
        function sharePost(postId) {
            showNotification('Post link copied to clipboard! 📤');
        }

        // Book consultation
        function bookConsultation(consultantId) {
            const consultant = consultants.find(c => c.id === consultantId);
            if (consultant) {
                if (consultant.available) {
                    // Simulate booking process
                    const confirmBooking = confirm(`Book consultation with ${consultant.name}?\n\nSpeciality: ${consultant.speciality}\nPrice: ${consultant.price}\n\nThis will redirect you to payment.`);
                    
                    if (confirmBooking) {
                        showNotification(`Consultation booked with ${consultant.name}! 📅\nYou'll receive a confirmation email shortly.`);
                        consultant.available = false;
                        loadConsultancyContent();
                    }
                } else {
                    showNotification(`Added to waitlist for ${consultant.name} ⏰\nWe'll notify you when they're available.`);
                }
            }
        }

        // Show notification
        function showNotification(message) {
            // Create temporary notification
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: linear-gradient(135deg, #4CAF50, #45a049);
                color: white;
                padding: 1rem;
                border-radius: 10px;
                box-shadow: 0 5px 15px rgba(0,0,0,0.3);
                z-index: 10000;
                animation: slideInRight 0.3s ease-out;
            `;
            notification.textContent = message;
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.remove();
            }, 3000);
        }

        // Initialize community when page loads
        document.addEventListener('DOMContentLoaded', function() {
            loadCommunityContent();
        });