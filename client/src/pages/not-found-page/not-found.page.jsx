import React from 'react';
import { ImageOverlay, ImageContainer, ImageText } from './not-found.styles'

const NotFoundPage = () => (
    <ImageOverlay>
        <ImageContainer imageUrl='https://i.imgur.com/A040Lxr.png' />
        <ImageText>404 Not Found</ImageText>
    </ImageOverlay>
);

export default NotFoundPage;