import axios from 'axios';

const retrieveSignedUrl = async (url) => {
    try {
        const response = await axios.get(url);
        console.log(response.data); // do something with the response data
        return response.data?.url;
    } catch (error) {
        console.error(error);
        return "Invalid url";
    }
}

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

export { getNewImage, retrieveSignedUrl };