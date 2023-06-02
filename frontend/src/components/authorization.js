const url = "https://car-rental-nnqy.onrender.com";
const client = "http://localhost:3000"


const authorization = async () => {
    try {
        const req = await fetch(`${url}/user/check`, {
            method: "GET",
            headers: {
                "authorization": sessionStorage.getItem("token")
            }
        });
        const res = await req.json();
        if (!res.ok) {
            return false;
        }
        return res.id;
    } catch (error) {
        console.error(error);
    }
};
export {
    authorization,
    url,
    client
}