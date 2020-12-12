
export const url = "http://localhost:8080"

export const logInUser = async (user) => {
    const res = await fetch(url+"/login", {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    });


    console.log(JSON.stringify(res, null, 2));

    if (res.status === 404) return {status: 404, text: "User not found"};
    if (res.status === 400) return {status: 400, text: "Wrong password"};

    const body = await res.json();
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

export const createSession = async (session) => {
    const res = await fetch(url+"/create-session", {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(session),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (res.status === 500) return {status: 500, text: "Internal Server Error"};

    return await res.json();
}