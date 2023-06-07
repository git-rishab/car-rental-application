// const url = "https://car-rental-nnqy.onrender.com";
const url = "https://hungry-bandanna-newt.cyclic.app";
const client = "https://drive-away.netlify.app"


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