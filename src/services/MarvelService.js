
class MarvelService {
    _apiBase = 'https://api.jikan.moe/v4/';

    getResource= async (url) => {
        let res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, received ${res.status}`);
        }
        return await res.json();
    }

     getAllCharacters = async () => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9`);
        return res.data
    }

    getCharacter = async (id) => { 
        const res = await this.getResource(`${this._apiBase}characters/${id}`);
        return this._transformCharacter(res.data);
    }

    _transformCharacter = (char) => { 
        return ({
            id: char.mal_id,
            name: char.name,
            description: char.about,
            thumbnail: char.images.jpg.image_url,
            homepage: char.url,
            wiki: char.url,
        })
    }
}


export default MarvelService;