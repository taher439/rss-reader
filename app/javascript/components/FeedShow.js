import React from "react"
import PropTypes from "prop-types"
import axios from 'axios'

class FeedShow extends React.Component 
{
    constructor(props)
    {
      super(props);
      this.state = {
        redirect: false,
        articles: [],
        interval: 0
      };
    }

    updateFeed()
    {
      axios
        .put(this.props.feed.id)
        .then(() => {
            axios
            .get(this.props.feed.id + '/articles')
            .then(((res) => {
                this.setState({articles: res.data});
            }).bind(this));
        });
    }

    componentDidMount()
    {
        this.state.interval = setInterval((() => { 
          this.updateFeed();
        }).bind(this), 60000);

         axios.get(this.props.feed.id + '/articles')
        .then(res => { this.setState({articles: res.data})});
    }
    
    componentWillUnmount()
    {
      clearInterval(this.state.interval);
    }

    alreadyRead(read)
    {
      if (read)
        return (<p style={{color: "black"}}>&#x2714;</p>);
      return (<p style={{color: "blue"}}>&#x2718;</p>)
    }

    clicked(articleId)
    {
      axios
      .put(this.props.feed.id + '/articles/' + articleId)
      .then((res) => {
        this.setState({ redirect: true });
        window.location.reload();
      });
    }

    render()
    {
        return (
          <React.Fragment>
          <div id="buttonDiv"><a href="/" class="btn btn-success backButton">Back</a></div>
          <div> { this.state.articles.map((article)=> {
            return (
                <div class="row">
                  <div class="row">
                    <div class="col-md-10">
                      <a target="_blank" rel="noopener noreferrer" href={ article.link } onClick={()=>{this.clicked(article.id)}}><strong>{article.title}</strong></a>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-10">
                      <p>{article.body}</p>
                    </div>
                      {this.alreadyRead(article.read)}
                  </div>
                </div>
          )})} </div>
          </React.Fragment>
      )
    }
}

export default FeedShow