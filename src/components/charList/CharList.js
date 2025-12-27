import './charList.scss';
import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage  from '../errorMessage/ErrorMessage';

class CharList extends Component {
    state = {
        chars: [],
        loading: true
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.loadChar();
    }

    loadChar = () => {
        this.onCharLoading();
        this.marvelService.getAllCharacters()
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    onCharLoaded = (chars) => {
        this.setState({chars, loading: false})
    }

    onError = () => {
        this.setState({loading: false, error: true})
    }

    onCharLoading = () => {
        this.setState({loading: true, error: false});
    }

    render() {
        const { chars, loading, error } = this.state;

        const View = ({chars}) => {
            return(
                <div className="char__list">
                        <ul className="char__grid">
                            {chars.map((char) => {
                                return (
                                    <li className='char__item' key={char.mal_id} onClick={() => {this.props.onCharSelected(char.mal_id)}}>
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