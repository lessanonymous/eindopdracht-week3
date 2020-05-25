const getData = async () => {
    const endpoint = 'https://wincacademydatabase.firebaseio.com/Lesley/Tasks.json';
    try {
        const response = await fetch(endpoint);
        const data = await response.json();
        if (data) {
            return Object.keys(data).map(key => ({
                id: key,
                description: data[key].description,
                done: data[key].done
            }));
        }
    } catch (error) {
        console.log(error);
    }
};
const postData = async data => {
    const endpoint = 'https://wincacademydatabase.firebaseio.com/Lesley/Tasks.json';
    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return await response.json();
    } catch (error) {
        console.log(error);
    }
};
const deleteData = async id => {
    const endpoint = `https://wincacademydatabase.firebaseio.com/Lesley/Tasks/${id}.json`;
    try {
        const response = await fetch(endpoint, {
            method: 'DELETE'
        });
        return await response.json();
    } catch (error) {
        console.log(error);
    }
};
const putData = async (id, data) => {
    const endpoint = `https://wincacademydatabase.firebaseio.com/Lesley/Tasks/${id}.json`;
    try {
        const response = await fetch(endpoint, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return await response.json();
    } catch (error) {
        console.log(error);
    }
};