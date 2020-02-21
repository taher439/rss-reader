import React from "react"
import PropTypes from "prop-types"
import axios from 'axios'

class Articles extends React.Component {

  constructor(props)
  {
    super(props);
    this.state = {
          articles: [],
          interval: 0
      };
  }

  updateFeed()
  {
    axios
      .put("feeds/"+ this.props.feed_id)
      .then(() => {
          axios
          .get('feeds/'+ this.props.feed_id + '/articles')
          .then(((res) => {
              this.setState({articles: res.data});
          }).bind(this));
        });
  }

  componentDidMount()
  {
    console.log(window.location.pathname);
    this.state.interval = setInterval((() => { 
          this.updateFeed();
        }).bind(this), 60000);


    axios
      .get('feeds/'+ this.props.feed_id + '/articles')
      .then(res => { this.setState({articles: res.data}) 
    });
  }


  componentWillUnmount()
  {
    clearInterval(this.state.interval);
  }

  alreadyRead(read)
  {
    if (read)
      return (<p style={{color: "black"}}>&#x2714;</p>);
    return (<p style={{color: "blue"}}>&#x2718;</p>);
  }

  clicked(articleId)
  {
    axios
    .put("feeds/"+ this.props.feed_id + '/articles/' + articleId)
    .then((res) => {
      this.setState({ redirect: true });
      window.location.reload();
    });
  }
  
  render () {
    return this.state.articles.length 
     ? (
        <div class="container article"> {this.state.articles.map((article)=>{
          return( <React.Fragment>
            <div class="row">
              <div class="row">
                <div class="col-md-4">
                  <a target="_blank" rel="noopener noreferrer" href={ article.link } onClick={()=>{this.clicked(article.id)}}><strong>{article.title}</strong></a>
                </div>
              </div>
              <div class="row">
                <div class="col-md-4">
                  <p>{article.body}</p>
                  <p>{article.updloaded}</p>
                </div>
                  <div onClick={()=> {this.clicked(article.id)}}>
                    {this.alreadyRead(article.read)}
                  </div>
              </div>
            </div>
          </React.Fragment>)
      })}</div>)
      :null
  }
}

export default Articles
