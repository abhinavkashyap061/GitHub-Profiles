
// using github api
const apiUrl = "https://api.github.com/users/"

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

async function getUser(username){

    // fetching the user data with github api
    const resp = await fetch(apiUrl+username);

    // getting data in JSON format
    const respData = await resp.json();

    // now we have user data
    // creating the user card
    createUserCard(respData);

    getRepos(username);

}

async function getRepos(username){

    // fetching the user data with github api
    const resp = await fetch(apiUrl+username+'/repos');

    // getting data in JSON format
    const respData = await resp.json();

    addReposToCard(respData);

}


function createUserCard(user) {

    // creating the user card using DOM manipulation
    const card = document.createElement("div");
    // adding the card class which contain styles to the recently created user card
    card.classList.add("card");

    // adding more elements to the card
    const cardHTML = `
        <div class="card">
            <div>
            <img src="${user.avatar_url}" alt="${user.name}" class="avatar" />
            </div>
            
            <div class="user-info">

                <h2>${user.name}</h2>
                <p>${user.bio}</p>

                <ul>
                    <li>${user.followers}<strong>Followers</strong></li>
                    <li>${user.following}<strong>Following</strong></li>
                    <li>${user.public_repos}<strong>Repos</strong></li>
                </ul>

                <div id="repos">
                </div>
            </div>
        </div>
                
    `;

    main.innerHTML = cardHTML;
    
}

function addReposToCard(repos){

    const reposEl = document.getElementById("repos");

    repos
    .slice(0,20)
    // sort((a,b)=>a.stargazers_count - b.stargazers.count)
    .forEach(repo => {

        const repoEl = document.createElement("a");

        repoEl.classList.add("repo");

        repoEl.href = repo.html_url;
        repoEl.innerText = repo.name;
        repoEl.target = "_blank";

        reposEl.appendChild(repoEl);
        
    });
}

form.addEventListener('submit', e => {

    e.preventDefault();

    const user = search.value;

    if(user){

        getUser(user);

        // resets the value after submitting the request
        search.value = "";
    }
})
