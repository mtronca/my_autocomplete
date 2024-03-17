const fetchData = async (value: string, limit = 20) => {
    const arrayLimit = limit;
  
    const url = `https://spott.p.rapidapi.com/places/autocomplete?q=${value}&type=CITY&country=US&skip=0&limit=${limit}`;
    const options = {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "spott.p.rapidapi.com",
        "x-rapidapi-key": "gXDfR45LI6msh7UbwzoT87tAuZcRp1K7YyijsnJTlAsVKxcjdv"
      }
    };
  
    return fetch(url, options)
    .then((response: any) => {
      return response.json();
    })
    .then(function(data) {
      const filteredArr = data?.map((item: Record<string, string>) => ({id: item.id, value: item.name})) || [];
      return filteredArr;
    })
    .catch(err => {
      console.error(err);
      return [];
    });
  }
  
  export default fetchData;
  