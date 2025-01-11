//API => List of Groups (GET)
export async function getGroupList() {
    const url = "http://18.143.79.95/api/chatSystem/groups/list";
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
    const url = "http://18.143.79.95/api/chatSystem/user/" + id;
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
    const url = "http://18.143.79.95/api/chatSystem/chatByUserId/" + id;
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