let searchBtn = document.getElementById("searchBtn");
let latestRepos = document.getElementById("latest-repos");
let repoH2 = document.getElementById("repoH2");
let repoInfo = document.getElementById("repoinfo");

searchBtn.addEventListener("click", search);

// search();

function search() {
    let seacrhinput = floatingTextarea.value
    // let seacrhinput = "choyeon00"
    fetchUserData(seacrhinput)
    console.log("검색하기 " + seacrhinput)
    let number = document.querySelector(".number");
    let userinfo = document.querySelector(".user-info");
    number.style.opacity = 1;
    userinfo.style.opacity = 1;

    async function fetchUserData() {
        try {
            const fetchData = await fetch(`https://api.github.com/users/${seacrhinput}`);
            const jsonFetchData = await fetchData.json();
            const fetchDataRepos = await fetch(`https://api.github.com/users/${seacrhinput}/repos`);
            const jsonfetchDataRepos = await fetchDataRepos.json();
            console.log(jsonFetchData);
            console.log(jsonfetchDataRepos);

            document.getElementById("user-picture").innerHTML = `
            <img src="${jsonFetchData.avatar_url}"/>
            `
            document.getElementById("user-link").innerHTML =`
            <a target=_blank href="${jsonFetchData.html_url}">View Profile</a>
            `
            document.getElementById("publicRepos").innerHTML =`
            Public Repos: ${jsonFetchData.public_repos}
            `
            document.getElementById("publicGists").innerHTML =`
            Public Gists: ${jsonFetchData.public_gists}
            `
            document.getElementById("followers").innerHTML =`
            Followers: ${jsonFetchData.followers}
            `
            document.getElementById("following").innerHTML =`
            Following: ${jsonFetchData.following}
            `
            document.getElementById("company").innerHTML =`
            Company: ${jsonFetchData.company}
            `
            document.getElementById("website").innerHTML =`
            Website: ${jsonFetchData.blog}
            `
            document.getElementById("location").innerHTML =`
            Location: ${jsonFetchData.location}
            `
            document.getElementById("since").innerHTML =`
            Member Since: ${jsonFetchData.created_at}
            `;

            function DataRepos() {
                latestRepos.innerHTML = `<h2 id="repoH2">Latest Repos</h2>`;
                for (i = 0; i < jsonfetchDataRepos.length; i++) {

                    let repoName = document.createElement("span");
                    repoName.id = "reponame";
                    repoName.innerHTML = `<a target=_blank href="${jsonfetchDataRepos[i].html_url}">${jsonfetchDataRepos[i].name}</a>`;
                    latestRepos.appendChild(repoName);

                    let repoStars = document.createElement("div");
                    repoStars.innerHTML = `Stars: ${jsonfetchDataRepos[i].stargazers_count}`;
                    repoStars.id = "repoStars";
                    repoName.appendChild(repoStars);
                    let repoWatchers = document.createElement("div");
                    repoWatchers.innerHTML = `Watchers: ${jsonfetchDataRepos[i].watchers_count}`;
                    repoWatchers.id = "repoWatchers";
                    repoName.appendChild(repoWatchers);
                    let repoForks = document.createElement("div");
                    repoForks.innerHTML = `Forks: ${jsonfetchDataRepos[i].forks_count}`;
                    repoForks.id = "repoForks";
                    repoName.appendChild(repoForks);
                }
                
            };

            DataRepos();

        } catch (error) {
            console.error(error);
        }
    };
};

