import React from 'react'

import { ReactMic } from 'react-mic';

import Pizzicato from 'pizzicato';

class Record extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            record: false,
            sound: ''
        }
        this.startRecording = this.startRecording.bind(this)
        this.stopRecording = this.stopRecording.bind(this)
        this.playSound = this.playSound.bind(this)
    }

    startRecording() {
        // console.log(`This is`, this.state.record)
        this.setState({
            record: true
        });
        console.log("Start")
    }

    stopRecording() {
        this.setState({
            record: false
        });
        console.log("Stop")
    }

    onData(recordedBlob) {
        const newSound = new Pizzicato.Sound({
            source: 'wave',
            options: { path: [recordedBlob.blobURL] }
        })
        console.log(newSound)

    }

    onStop(recordedBlob) {

    }

    playSound() {
        this.state.sound.play()
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
                <button onClick={this.startRecording} type="button">Start</button>
                <button onClick={this.stopRecording} type="button">Stop</button>
                <button onClick={this.playSound} type="button">play sound</button>
            </div>
        );
    }
}

export default Record;