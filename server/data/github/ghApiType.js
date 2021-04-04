class RepoData {
    constructor(repo){
        this.name = repo.name;
        this.description = repo.description;
        this.star = repo.stargazers_count;
        this.fork = repo.forks;
        this.link = repo.html_url;
        this.image = repo.owner.avatar_url;
    }
}

module.exports = {
    RepoData
}