

export default async value => {
    return await fetch(`https://restcountries.eu/rest/v2/name/${value}`, { mode: "cors" })
        .then(response => response.json())
}