import React from 'react'

const NewsItem = (props) => {
  let { title, description, imageUrl, newsUrl, author, date, source } = props;
  return (
    <div className='my-3'>
      <div className="card">
        <div style={
          {
            display: 'flex',
            justifyContent: 'flex-end',
            position: 'absolute',
            right: '0'
          }

        }>

          <span className="badge rounded-pill bg-danger">{source}</span>

        </div>

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

export default NewsItem
