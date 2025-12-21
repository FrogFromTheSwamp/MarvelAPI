import './charList.scss';
import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import abyss from '../../resources/img/abyss.jpg';

class CharList extends Component {
    state = {
        chars: []
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.loadChar();
    }

    loadChar = () => {
        this.marvelService.getAllCharacters()
            .then(this.onCharLoaded)
    }

    onCharLoaded = (chars) => {
        this.setState({chars})
    }

    render() {
        return (
            <div className="char__list">
                <ul className="char__grid">
                    {this.state.chars.map((char) => {
                        return (
                            <li className='char__item' key={char.mal_id}>
                                <img src={char.images.jpg.image_url} alt={char.name} />
                                <div className="char__name">{char.name}</div>
                            </li>
                        )
                    })}
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
    )
    }
    
}

export default CharList;