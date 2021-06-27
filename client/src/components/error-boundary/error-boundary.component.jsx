import React from 'react'

import {
    ErrorImageContainer,
    ErrorImageOverlay,
    ErrorImageText
} from './error-boundary.styles';


class ErrorBoundary extends React.Component {
    constructor() {
        super();
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <ErrorImageOverlay>
                    <ErrorImageContainer imageUrl='https://i.imgur.com/U3vTGjX.png' />
                    <ErrorImageText>Something went wrong!</ErrorImageText>
                </ErrorImageOverlay>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;