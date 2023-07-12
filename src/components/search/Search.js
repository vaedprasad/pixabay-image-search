import React, { Component } from 'react'
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import axios from 'axios';
import Images from '../images/Images'

export default class Search extends Component {

  state = {
    searchText: '',
    imagesPerPage: 15,
    apiUrl: 'https://pixabay.com/api',
    apiKey: '38096275-d921d733ea654a2f05c0f85bc',
    images: []
  }

  onTextChange = e => {
    const val = e.target.value;
    this.setState({ [e.target.name]: val }, () => {
      if (val === '') {
        this.setState({ images: [] });
      } else {
        axios
          /**
           * API Key is set to the specified PixaBay API key located at 
           * https://pixabay.com/api/docs/
           * 
           * Set the query to the user input. The image type is a photo. Enable
           * Safe Search to True to allow safe images.
           * 
           * 
           * 
           */
          .get(
            `${this.state.apiUrl}/?key=${this.state.apiKey}&q=${this.state.searchText
            }&image_type=photo&per_page=${this.state.imagesPerPage}&safesearch=true`
          )
          .then(res => this.setState({ images: res.data.hits }))
          /**
           *  Catch any errors and log the error to the console.
           */
          .catch(err => console.log(err));
      }
    });
  };

  onImagesPerPageChange = (e, index, value) => this.setState({ imagesPerPage: value });


  render() {
    console.log(this.state.images)

    return (
      <div>
        <TextField
          name="searchText"
          color="#113471"
          value={this.state.searchText}
          onChange={this.onTextChange}
          floatingLabelText="Search for Images"
          fullWidth={true}
          defaultValue="Normal"
          variant="filled"
        />
        <br />
        <SelectField
          name="Images Per Page"
          floatingLabelText="Images Per Page"
          value={this.state.imagesPerPage}
          onChange={this.onImagesPerPageChange}
        >
          <MenuItem value={10} primaryText="10" />
          <MenuItem value={15} primaryText="25" />
          <MenuItem value={50} primaryText="50" />
        </SelectField>
        <br />
        {this.state.images.length > 0 ? (<Images images={this.state.images} />) : null}
      </div>
    )
  }
}
