const APIURL = 'https://api.github.com/users/';

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

async function getUser(user) {
    const resp = await fetch(APIURL + user);
    const respData = await resp.json(); //

    createUserCard(respData);

    getRepos(user);
} 

async function getRepos(username) {
    const resp = await fetch(APIURL + username + "/repos")
    const respData = await resp.json();

    addReposToCard(respData);
}



function createUserCard(user) {
    const cardHTML = `
        <div class="card">
            <div class="img-container">
                <img class="avatar" src="${user.avatar_url}" alt="${user.name}" />
            </div>
            <div class="user-info">
                <h2>${user.name}</h2>
                <p>${user.bio}</p>

                <ul class="info">
                    <li>${user.followers}<strong>Seguidores</strong></li>
                    <li>${user.following}<strong>Seguindo</strong></li>
                    <li>${user.public_repos}<strong>Repositórios</strong></li>
                </ul>

                <div id="repos"></div>
            </div>
        </div>
    `;

    main.innerHTML = cardHTML;
}

function addReposToCard(repos) {
    const reposEl = document.getElementById("repos");

    repos //chainning
        .sort((a, b) => b.stargazers_count - a.stargazers_count) //sort and get the most liked repositories
        .slice(0, 10)//take the first 10 starting from zero, and 10 is the amount you want
        .forEach((repo) => {
            const repoEl = document.createElement("a");
            repoEl.classList.add("repo");

            repoEl.href = repo.html_url;
            repoEl.target = "_blank";
            repoEl.innerText = repo.name;

            reposEl.appendChild(repoEl);
        });
}

form.addEventListener('submit', e => {
    e.preventDefault();

    const user = search.value;

    if (user) {
        getUser(user);

        search.value = "";
    }
});
