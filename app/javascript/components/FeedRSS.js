import React from "react"
import PropTypes from "prop-types"
import axios from 'axios'
import Articles from './Articles.js'
import Popup from './Popup.js'

class FeedRSS extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {
      redirect: false,
      feeds: this.props.feeds,
      popup: false
    };
  }
  
  handleDelete(feedId)
  {
    axios
      .delete("feeds/" + feedId)
      .then((res) => {
        this.setState({ redirect: true });
      });
  }
  
  toggleForm()
  {
    this.setState({popup: !this.state.popup});
  }

  render () {
    if (this.state.redirect == true)
    {
      this.setState({ redirect: false });
      window.location.reload();
    }

    return (
      <React.Fragment>
         {
            this.state.popup ? 
            <Popup closePopup={this.toggleForm.bind(this)}/> : 
            <div class="container">
              <button class="btn btn-primary pull-right" onClick={this.toggleForm.bind(this)}> ajouter</button>
            </div>
         }
        <div id="feeds" class="container">{ this.state.feeds.map((feed)=>{
            let link = "feeds/"+feed.id;
            return (
              <React.Fragment>
                <div id="containerDiv" >
                  <div class="row">
                    <div id="headDisplay" class="col-md-10" >
                      <div id="feedTitle" class="row">
                        <p style={{fontFamily: 'Montserrat'}}>{feed.title}</p>
                      </div>
                      <div class="row">
                        <a href={"feeds/"+ feed.id } class="btn btn-success pull-left">montrer</a>
                        <button id="delete" class="btn btn-danger pull-right" onClick={() => this.handleDelete(feed.id)}>X</button>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-10 feed" style={{ background: "#f3f3f3" }}>
                      <div class="row">
                        <Articles feed_id={feed.id}/>
                      </div>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            )  
        })} </div>
    </React.Fragment>);
  }
}

export default FeedRSS
