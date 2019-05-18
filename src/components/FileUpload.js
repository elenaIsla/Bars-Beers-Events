import React, { Component } from 'react';
import firebase from 'firebase';

class FileUpload extends Component {
    state = {
        uploadValue: 0,
        picture: ""
    }
    
        onUpload = (event) => {
            const file = event.target.files[0];
            const storageRef = firebase.storage().ref(`/photos/${file.name}`);
            const task = storageRef.put(file);
    
            task.on('state_changed', 
                (snapshot) => {
                    let percentage = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    this.setState({
                        uploadValue: percentage
                    })
                }, error => {
                    console.log(error.message);
                }, 
                () => {
                    task.snapshot.ref.getDownloadURL().then((newUrl) => {
                        this.props.onUploadUrl(newUrl);
                        this.setState({
                            uploadValue: 100,
                            picture: newUrl
                        })
                    })   
                })
        }

    render () {
    
        return (
            <div>
                <progress value={this.state.uploadValue} max="100"></progress>
                <br/>
                <input type="file" onChange = {this.onUpload}/>
                <br/>
                <img width="200" src={this.state.picture} alt=""/> 
            </div>
        )
    }

}

export default FileUpload;