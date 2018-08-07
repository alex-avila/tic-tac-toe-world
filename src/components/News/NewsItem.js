import React from 'react'

import './NewsItem.css'

const NewsItem = ({ title, description, url, author }) => {
    return (
        <a href={url} className="news__item" target="_blank">
            <h3 className="news__title">{title}</h3>
            <p className="news__author">{author}</p>
            <p className="news__description">{description}</p>
        </a>
    )
}

export default NewsItem
