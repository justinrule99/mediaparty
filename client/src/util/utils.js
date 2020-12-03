
const url = "http://localhost:8080"

export const logInUser = async (user) => {
    const res = await fetch(url+"/login", {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (res.status === 500) return "ERROR";
    const body = await res.json();
    console.log(body);
    return body;
}

export const createUser = async (user) => {

    const res = await fetch(url+"/create-user", {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    console.log(await res.json());
    return res;
}