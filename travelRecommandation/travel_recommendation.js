let travelData = {};
document.addEventListener('DOMContentLoaded', function(){
    // const url = './travel_recommendation.json';
const url = './travelRecommandation/travel_recommendation.json';


 // This will store our fetched data

fetch(url)
.then(response => {
    // check if the response is Ok
    if (!response.ok) {
        throw new Error('Network response was not ok: ' + response.statusText);
    }
    // convert the response to JSON
    return response.json();
})
.then(data => {
    travelData = data; // Store the data for later use
    console.log(data);
    
    const searchTerm =localStorage.getItem('searchTerm');
    if(searchTerm){
        document.getElementById('searchInput').value=searchTerm;
        displaySearchResults(searchTerm);
        localStorage.removeItem('searchTerm');
    }
})
.catch(error => {
    console.error("There has been a problem with your fetch:", error);
});
})

// function to handle search
function handleSearch() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    
    localStorage.setItem('searchTerm',input);

    if(!window.location.pathname.includes('travel_recommendation.html')){
        window.location.href='/travelRecommandation/travel_recommendation.html';
    }else{
        displaySearchResults(input);
    }
}
function displaySearchResults(input){
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // Clear previous results

    let recommendations = [];

            // Determine which recommendations to show based on input
            if (input.includes('beach')) {
                recommendations = travelData.beaches;
            } else if (input.includes('temple')) {
                recommendations = travelData.temples;
            } else if (input.includes('country')) {
                recommendations = travelData.countries;
            } else {
                resultsDiv.innerHTML = '<p>Please search for "beach", "temple", or "country"</p>';
                return;
            }
    
   

      // Display recommendations
      if (recommendations.length > 0) {
        recommendations.forEach(item => {
            const recommendationElement = document.createElement('div');
            recommendationElement.className = 'recommendation';
            recommendationElement.innerHTML = `
                <img src="${item.imageUrl}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <button>visit</button>
            `;
            resultsDiv.appendChild(recommendationElement);
        });
    } else {
        resultsDiv.innerHTML = '<p>No results found. Try searching for "beach", "temple", or "country"</p>';
    }
}

// Add event listener to the search button

function clearResults() {
    localStorage.removeItem('searchTerm');
    document.getElementById('results').innerHTML = '';
    document.getElementById('searchInput').value = '';
}
//loading Page


// Add event listeners
document.getElementById('searchButton').addEventListener('click', handleSearch);
document.getElementById('resetButton').addEventListener('click', clearResults);

// Allow search on Enter key
document.getElementById('searchInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        handleSearch();
    }
});