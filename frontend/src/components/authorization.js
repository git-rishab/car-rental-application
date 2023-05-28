const url = "http://localhost:5000";
const client = ""


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
        // Handle error here
        console.error(error);
    }
};
export {
    authorization,
    url,
    client
}