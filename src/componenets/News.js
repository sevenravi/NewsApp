import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props) => {

  const [articles, setArticles] = useState([])
  const [loading, setloading] = useState(false)
  const [page, setpage] = useState(1)
  const [totalResults, settotalResults] = useState(0)
 

  // articles = [
  //   // {
  //   //   "source": { "id": "espn-cric-info", "name": "ESPN Cric Info" },
  //   //   "author": null,
  //   //   "title": "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
  //   //   "description": "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
  //   //   "url": "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
  //   //   "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
  //   //   "publishedAt": "2020-04-27T11:41:47Z",
  //   //   "content": "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]"
  //   // },
  //   // {
  //   //   "source": { "id": "espn-cric-info", "name": "ESPN Cric Info" },
  //   //   "author": null,
  //   //   "title": "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
  //   //   "description": "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
  //   //   "url": "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
  //   //   "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
  //   //   "publishedAt": "2020-03-30T15:26:05Z",
  //   //   "content": "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]"
  //   // }
  // ]


  const Capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const updateNews = async () => {
    props.setProgress(10);
    const URL = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=e8c52c2859cb4dc4945168eb0e22ed81&page=${page}&pagesize=${props.pageSize}`

    setloading(false)
    props.setProgress(30);
    let data = await fetch(URL)
    let parsedData = await data.json()
    props.setProgress(60);
    setArticles(parsedData.articles)
    settotalResults(parsedData.totalResults)
    setloading(false)
    props.setProgress(100);

  }

  useEffect(() => {
     document.title = `${Capitalize(props.category)} - My Times`
    updateNews()
  }, [])

  // async componentDidMount() {
  // let URL = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=e8c52c2859cb4dc4945168eb0e22ed81&page=1&pagesize=${props.pageSize}`
  // this.setState({loading:true})
  // let data =await fetch(URL)
  // let parsedData = await data.json()
  // // console.log(parsedData)
  // this.setState({
  //   articles: parsedData.articles,
  //   totalResults: parsedData.totalResults,
  //   loading: false
  // })
  // }

  // handlePrevclick = async () => {
  //   // let URL = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=e8c52c2859cb4dc4945168eb0e22ed81&page=${this.state.page-1}&pagesize=${props.pageSize}`
  //   // this.setState({loading:true})
  //   // let data =await fetch(URL)
  //   // let parsedData = await data.json()
  //   // console.log(parsedData)
  //   this.setState({
  //     // articles: parsedData.articles,
  //     page: this.state.page - 1,
  //     // loading: false
  //   })
  //   this.updateNews()

  // }

  // handleNextclick = async () => {
  //   // let URL = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=e8c52c2859cb4dc4945168eb0e22ed81&page=${this.state.page +1}&pagesize=${props.pageSize}`
  //   // this.setState({loading:true})
  //   // let data =await fetch(URL)
  //   // let parsedData = await data.json()
  //   // console.log(parsedData)
  //   this.setState({
  //     // articles: parsedData.articles,
  //     page: this.state.page + 1,
  //     // loading: false
  //   })
  //   this.updateNews()
  // }

  const fetchMoreData = async () => {


    const URL = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=e8c52c2859cb4dc4945168eb0e22ed81&page=${page + 1}&pagesize=${props.pageSize}`
    setpage(page + 1)
    let data = await fetch(URL)
    let parsedData = await data.json()
    setArticles(articles.concat(parsedData.articles))
    settotalResults(parsedData.totalResults)
  };


  return (

    <>
      <h2 className='text-center' style={{margin:'30px 0px',marginTop:"90px"}}>Top {Capitalize(props.category)} Headlines:</h2>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row" >
            {articles.map((element, index) => {
              console.log(totalResults,articles.length)
              return <div className="col-md-4" key={index}>
                
                <NewsItem key={index} title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""}
                  imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
              </div>


            })}
          </div>
        </div>
      </InfiniteScroll>
      {/* <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevclick}>&larr;Previous</button>
          <button disabled={this.state.page >= Math.ceil(this.state.totalResults / props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextclick}>Next&rarr;</button>
        </div> */}
    </>

  )

}

News.defaultProps = {
  country: 'in',
  pageSize: 6,
  category: 'general'

}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}

export default News
