import './charList.scss';
import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage  from '../errorMessage/ErrorMessage';

class CharList extends Component {
    state = {
        chars: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 3,
        charEnded: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.onRequest();
    }

    loadChar = () => {
        this.onCharLoading();
        this.marvelService.getAllCharacters()
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    onRequest = (offset) => {
        this.onCharListLoading();
        this.marvelService.getAllCharacters(offset)
            .then(this.onCharListLoaded)
            .catch(this.onError);
    }

    onCharListLoading = () => {
        this.setState({
            newItemLoading: true
        })
    }

    onCharListLoaded = (newCharList) => {
        let newOffset = this.state.offset;
        let ended = false;
        if (newOffset === 15) {
            ended = true
        }
        this.setState(({ chars }) => ({
            chars: [...chars, ...newCharList.slice(newOffset - 3, newOffset )],
            loading: false,
            newItemLoading: false,
            offset: newOffset + 3,
            charEnded: ended
        }))
    }

    onError = () => {
        this.setState({loading: false, error: true})
    }

    render() {
        const { chars, loading, error, newItemLoading, offset, charEnded } = this.state;

        const View = ({chars}) => {
            return(
                <div className="char__list">
                        <ul className="char__grid">
                            {chars.map((char, index) => {
                                return (
                                    <li className='char__item' key={index} onClick={() => {this.props.onCharSelected(char.mal_id)}}>
                                        <img src={char.images.jpg.image_url} alt={char.name} />
                                        <div className="char__name">{char.name}</div>
                                    </li>
                                )
                            })}
                        </ul>
                        <button className="button button__main button__long"
                            disabled={newItemLoading}
                            onClick={() => this.onRequest(offset)}
                            style={{'display': charEnded ? 'none' : 'block' }}
                            >
                            <div className="inner">load more</div>
                        </button>
                    </div>
            )
        }
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <View chars={chars} /> : null;
        return (
            <div>
                {spinner}
                {errorMessage}
                {content}
            </div>
    )
    }
    
}


export default CharList;