//API => List of Groups (GET)
export async function getGroupList() {
    const url = "https://raw.githubusercontent.com/lowkarweng/chatUI/main/chatUI-app/src/data/groups/list.json";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(error.message);
    }
};

//API => Get User Details by user id (GET)
export async function getUser(id) {
    const url = "https://raw.githubusercontent.com/lowkarweng/chatUI/main/chatUI-app/src/data/user/" + id;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(error.message);
    }
};

//API => Get Chat by user id (GET)
export async function getChatByUser(id) {
    const url = "https://raw.githubusercontent.com/lowkarweng/chatUI/main/chatUI-app/src/data/chatByUserId/" + id;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(error.message);
    }
};

//API => Add New Chat (POST)
export async function sendMessage(from, to, message) {
    const url = "https://raw.githubusercontent.com/lowkarweng/chatUI/main/chatUI-app/src/data/chat/add";
    try {
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify({ from, to, message }),
            headers: {
                "Content-Type": "application/json",  // Specify that the body contains JSON
            },
            mode: "no-cors"
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(error.message);
    }
};