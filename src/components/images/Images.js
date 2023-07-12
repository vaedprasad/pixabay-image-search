import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { GridList, GridTile } from 'material-ui';
import IconButton from 'material-ui/IconButton';
import ZoomIn from 'material-ui/svg-icons/action/zoom-in'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

export default class Images extends Component {
  state = {
    open: false,
    currentImg: '',
    currentAuthor: '',
    currentTags: ''

  };

  handleOpen = (img, user, tags) => {
    this.setState({ open: true, currentImg: img, currentAuthor: user, currentTags: tags });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    let imageListContent;
    const images = this.props.images;

    if (images) {
      imageListContent = (
        <GridList cols={3}>
          {images.map(img => (
            <GridTile
              title={
                <span>
                  <font color="#e1e1e1">Tags: <strong>{img.tags}</strong></font>
                </span>
              }
              color="red"
              key={img.id}
              subtitle={
                <span>
                  <font color="#e1e1e1">by <em>{img.user}</em></font>
                </span>
              }
              actionIcon={
                <IconButton onClick={() => this.handleOpen(img.largeImageURL, img.user, img.tags)}>
                  <ZoomIn color="#e1e1e1" />
                </IconButton>
              }
            >
              <img src={img.largeImageURL} alt="" />
            </GridTile>
          ))}
        </GridList>
      );
    } else {
      imageListContent = null;
    }

    const actions = [
      <FlatButton label="Close" primary={true} onClick={this.handleClose} />
    ];

    return (
      <div>
        {imageListContent}
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <img src={this.state.currentImg} alt="" style={{ width: '100%' }} />
          <span><h3>
            Author: <strong><font color="#666a73"><a href={`https://pixabay.com/users/${this.state.currentAuthor}`}> {this.state.currentAuthor} </a></font></strong>
          </h3>
          </span>
          <br />
          <span>
            Tags: <strong>{this.state.currentTags}</strong>
          </span>
        </Dialog>
      </div>
    );
  }
}

Images.propTypes = {
  images: PropTypes.array.isRequired
}