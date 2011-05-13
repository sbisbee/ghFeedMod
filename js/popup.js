function refreshRepos()
{
  function onData(repos)
  {
    $('ul#repos').html(
      repos
        .sort(function(a, b) {
          if(a.name < b.name)
            return -1;

          return (a.name > b.name) ? 1 : 0; 
        })
        .map(function(repo) {
          var id = btoa(repo.name+repo.owner);
          return '<li><input type="checkbox" id="'+id+'"> <label for="'+id+'">'+repo.name+' ('+repo.owner+')</label></li>';
        })
        .join('')
    );
  }

  chrome.extension.sendRequest({ action: 'getRepositories' }, onData);
}

chrome.extension.sendRequest({ action: 'setUser', username: 'sbisbee' }, refreshRepos);
