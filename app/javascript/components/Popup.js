import React from "react"
import PropTypes from "prop-types"

class Popup extends React.Component {
  render () {
    return (
      <React.Fragment>
      <div id="slide" class="container">
        <div class="row" id="formRow">
         <form id="feedForm" class="container" id="new_feed" action="/feeds" accept-charset="UTF-8" method="post">
            <div class="form-group">  
                <input name="utf8" type="hidden" value="&#x2713;" />
                <div class="row">
                  <div class="col-sm-10"> 
                    <input class="form-control" name="feed[title]" id="feed_title" placeholder="titre"/>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-10">
                    <input class="form-control" name="feed[website]" id="website" placeholder="URL du site"></input>
                  </div>
                  <div class="col-md-1">
                    <input id="formButton" class="btn btn-primary" onSubmit={this.props.closePopup} type="submit" name="commit" value="créer" data-disable-with="créer" />
                  </div>
                </div>
            </div>
          </form>
        </div>
      </div>
      </React.Fragment>
    );
  }
}

export default Popup
