import axios from 'axios';

const getNewImage = async (imgCode) => {
    try {
        const response = await axios.post('https://httpbin.org/post' ,{imgCode});
        console.log(response.data); // do something with the response data
        return response.data;
    } catch (error) {
        console.error(error);
        return "No Image";
    }
}


export {getNewImage};