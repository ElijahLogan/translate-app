import React from 'react'

import MicRecorder from 'mic-recorder-to-mp3'
import { ReactMic } from 'react-mic';

import Pizzicato from 'pizzicato';

class Record extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            record: false,
            sound: '',
            recorder: null
        }
        this.startRecording = this.startRecording.bind(this)
        this.stopRecording = this.stopRecording.bind(this)
        this.playSound = this.playSound.bind(this)
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
            .getMp3().then(([buffer, blob]) => {
                // do what ever you want with buffer and blob
                // Example: Create a mp3 file and play
                const file = new File(buffer, 'me-at-thevoice.mp3', {
                    type: blob.type,
                    lastModified: Date.now()
                });
                console.log('file downloaded')


                const player = new Audio(URL.createObjectURL(file));
                player.play();

            }).catch((e) => {
                alert('We could not retrieve your message');
                console.log(e);
            });
    }

    onData(recordedBlob) {
        const newSound = new Pizzicato.Sound({
            source: 'wave',
            options: { path: [recordedBlob.blobURL] }
        })


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
                <button onClick={this.startRecording} type="button">record</button>
                <button onClick={this.stopRecording} type="button">Stop and playback</button>
            </div>
        );
    }
}

export default Record;