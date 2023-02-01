import React, { Component } from 'react'

export class NewsItem extends Component {

  render() {

    let { title, description, imageUrl, newsUrl, author, date,source } = this.props;
    return (
      <div className='my-3'>
        <div className="card"><span class="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{left:"80%", zIndex:"1"}}>{source}</span>
          <img src={imageUrl ? imageUrl : "https://media.istockphoto.com/id/1301656823/photo/daily-papers-with-news-on-the-computer.jpg?b=1&s=170667a&w=0&k=20&c=Y0krx8wEAxLd7-ObYRSzLIA8XaSpA7bkuiCYbjR-ZTA="} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-muted">By {author ? author : "unknown"} on {new Date(date).toGMTString()}</small></p>
            <a rel='noreferrer' href={newsUrl} target="_blank" className="btn btn-dark">Read more</a>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
