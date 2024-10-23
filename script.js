const BASE_URL = 'https://api.thecatapi.com/v1';
const API_KEY = 'live_PgnyY8wAin1yZXMrhSAGlHjivjNr5ZB2FDhaNfscT0VtsanOIBYTGTSu6DwuF2Cs';
const dropdown = document.querySelector("select");
const button = document.querySelector("#try-me");

const picDisplay = document.querySelector("#catpic");

let response = async function () {
    await axios.get(`${BASE_URL}/categories`, {
        headers: {
            "x-api-key": API_KEY
        }
    }).then(res => {
        console.log(res.data);
        res.data.forEach(element => {
            let option = document.createElement("option");
            option.value = element.id;
            option.text = element.name;
            dropdown.appendChild(option);
        });
    }).catch(err => console.log("Error fetching data: ", err));
}

button.addEventListener("click", async () => {
    const categoryID = dropdown[dropdown.selectedIndex].id;
    try {
        const res = await axios.get(`${BASE_URL}/images/search?category_ids=${categoryID}`, {
            headers: {
                "x-api-key": API_KEY
            }
        })
        console.log(res.data);
        const catPhoto = res.data[0].url

        picDisplay.innerHTML = `<img src="${catPhoto}">`
    } catch (error) {
        console.log(error);

    }


})


// Call the function to make the request
response();