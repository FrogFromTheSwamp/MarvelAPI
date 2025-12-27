import { Component } from 'react';

class ErrorBoundary extends Component { 
    state = {
        hasError: false
    }

    componentDidCatch(error, errorInfo) {
        this.setState({hasError: true});
        console.log(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <h2>Something went wrong</h2>
        }
        
        return this.props.children;
    }
}

export default ErrorBoundary;