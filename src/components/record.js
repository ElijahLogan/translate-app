import React from 'react'

import MicRecorder from 'mic-recorder-to-mp3'
import { ReactMic } from 'react-mic';
import fs from 'fs'


import Pizzicato from 'pizzicato';

class Record extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            record: false,
            sound: '',
            src: null,
            recorder: null
        }
        this.startRecording = this.startRecording.bind(this)
        this.stopRecording = this.stopRecording.bind(this)
        this.downloadBlob = this.downloadBlob.bind(this)


    }

    componentWillMount() {
        // New instance
        const recorder = new MicRecorder({
            bitRate: 128
        });

        this.setState({ recorder: recorder })
    }



    startRecording() {
        // console.log(`This is`, this.state.record)
        this.setState({
            record: true
        });

        this.state.recorder.start().then(() => {
            // something else
        }).catch((e) => {
            console.error(e);
        });
    }



    stopRecording() {
        this.setState({
            record: false
        });
        console.log(this.state.record)
        this.state.recorder
            .stop()
            .getMp3().then(async ([buffer, blob]) => {
                // do what ever you want with buffer and blob
                // Example: Create a mp3 file and play
                const file = new File(buffer, 'me-at-thevoice.mp3', {
                    type: blob.type,
                    lastModified: Date.now()
                });

                const player = new Audio(URL.createObjectURL(file));
                //getting src
                let audioSrc = player.src
                //passing to state
                this.setState({ src: audioSrc })
                player.play();

            }).catch((e) => {
                alert('We could not retrieve your message');
                console.log(e);
            });

        this.downloadBlob()
    }





    downloadBlob(urlObject) {

        // Create a new anchor element
        const a = document.createElement('a');

        // Set the href and download attributes for the anchor element
        // You can optionally set other attributes like `title`, etc
        // Especially, if the anchor element will be attached to the DOM
        a.href = this.state.src
        a.download = 'download';

        // Click handler that releases the object URL after the element has been clicked
        // This is required for one-off downloads of the blob content
        const clickHandler = () => {
            setTimeout(() => {
                a.removeEventListener('click', clickHandler);
            }, 150);
        };

        // Add the click event listener on the anchor element
        // Comment out this line if you don't want a one-off download of the blob content
        a.addEventListener('click', clickHandler, false);

        // Programmatically trigger a click on the anchor element
        // Useful if you want the download to happen automatically
        // Without attaching the anchor element to the DOM
        // Comment out this line if you don't want an automatic download of the blob content
        a.click();

        // Return the anchor element
        // Useful if you want a reference to the element
        // in order to attach it to the DOM or use it in some other way
        return a;
    }

    //not used
    onData(recordedBlob) {


    }
    //not used
    onStop(recordedBlob) {

    }





    render() {
        return (
            <div>
                <h1> record page</h1>
                <ReactMic
                    record={this.state.record}
                    className="sound-wave"
                    onStop={this.onStop}
                    onData={this.onData}
                    strokeColor="#000000"
                    backgroundColor="#FF4081" />
                <button onClick={this.startRecording} type="button">record</button>
                <button onClick={this.stopRecording} type="button">Stop and playback</button>
            </div>
        );
    }
}

export default Record;