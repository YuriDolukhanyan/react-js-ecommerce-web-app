const API_URL = 'https://fakestoreapi.com/';

const fetchProducts = async (searchTerm) => {
    return fetch(`${API_URL}${searchTerm}`, )
        .then(response => response.json())
        .then(data => data);
}

export { fetchProducts };
