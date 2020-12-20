import React, {Component} from 'react';
import io from 'socket.io-client';
import Zlib from 'zlib';
import {SIMULAIR_API} from '../../config/app';

class SimulationImage extends Component{
    didSocketUpdate = false;
    constructor(props) {
        super(props);

       
        this.state = {
            show : true,
            label_img : 1001,
            dataID_img : 0,
            dataLength_img : 0,
            receivedLength_img : 0,
            dataByte_img : new Uint8Array(0),
            ReadyToGetFrame_img : true,
    
            label_aud : 2001,
            dataID_aud : 0,
            dataLength_aud : 0,
            receivedLength_aud : 0,
            dataByte_aud : new Uint8Array(100),
            ReadyToGetFrame_aud : true,
            SourceSampleRate : 44100,
            SourceChannels : 1,
            ABuffer : new Float32Array(0),
    
    
            /////////////////////
            userId : "",
            control_api_dns_address : "",
            control_api_ip_address : "",
            simulair_web_api : SIMULAIR_API.BASE_URL
            }
            
            
    }

    componentDidMount() {
        if(this.didSocketUpdate !== this.props.socketUpdate && this.props.socketUpdate === true){ //didSocketUpdate controls if the workshop has just called by the dashboard
            this.didSocketUpdate = true;
        }
    }

    renderImage = () => {
        console.log(this.props.socket)
        
        if(this.props.socket !== null) {
            
            this.props.socket.on('OnReceiveData',(data) => {
                var _byteData = new Uint8Array(data.DataByte);
                var _label = ByteToInt32(_byteData, 0);

                if (_label == this.state.label_img) {
                    var _dataID = ByteToInt32(_byteData, 4);
                    if (_dataID != this.state.dataID_img) this.setState({receivedLength_img : 0});
                    this.setState({dataID_img : _dataID})

                    this.setState({dataLength_img : ByteToInt32(_byteData, 8)});
                    //var _offset = ByteToInt32(_byteData, 12);
                    var _GZipMode = (_byteData[16] == 1) ? true : false;

                    if (this.state.receivedLength_img == 0) this.setState({dataByte_img : new Uint8Array(0)});
                    this.setState({receivedLength_img : this.state.receivedLength_img +_byteData.length - 17}); //BURAYA DİKKAT

                    //----------------add byte----------------
                    this.setState({dataByte_img : CombineInt8Array(this.state.dataByte_img, _byteData.slice(17, _byteData.length))});
                    //----------------add byte----------------

                    if (this.state.ReadyToGetFrame_img)
                    {
                        if (this.state.receivedLength_img == this.state.dataLength_img) ProcessImageData(this.state.dataByte_img, _GZipMode);
                    }
                }

                if (_label == this.state.label_aud)
                {
                    var _dataID = ByteToInt32(_byteData, 4);
                    if (_dataID != this.state.dataID_aud) this.setState({receivedLength_aud : 0});

                    this.setState({dataID_aud : _dataID});
                    this.setState({dataLength_aud : ByteToInt32(_byteData, 8)});
                    //var _offset = ByteToInt32(_byteData, 12);
                    var _GZipMode = (_byteData[16] == 1) ? true : false;

                    if (this.state.receivedLength_aud == 0) this.setState({dataByte_aud : new Uint8Array(0)});
                    this.setState({receivedLength_aud : this.state.receivedLength_aud +_byteData.length - 17});
                    //----------------add byte----------------
                    this.setState({dataByte_aud : CombineInt8Array(this.state.dataByte_aud, _byteData.slice(17, _byteData.length))});
                    //----------------add byte----------------
                    if (this.state.ReadyToGetFrame_aud)
                    {
                        if (this.state.receivedLength_aud == this.state.dataLength_aud) ProcessAudioData(this.state.dataByte_aud, _GZipMode);
                    }
                }
        });
        
            var startTime = 0;
            var audioCtx = new AudioContext();

           const ProcessAudioData = (_byte, _GZipMode) => {
            this.setState({ReadyToGetFrame_aud : false});
                var bytes = new Uint8Array(_byte);
                if(_GZipMode)
                {
                   var gunzip = new Zlib.Gunzip (bytes);
                   bytes = gunzip.decompress();
                }
                this.setState({SourceSampleRate : ByteToInt32(bytes, 0)});
                this.setState({SourceChannels : ByteToInt32(bytes, 4)});

                var BufferData = bytes.slice(8, bytes.length);
                var AudioFloat = new Float32Array(BufferData.buffer);

                if(AudioFloat.length > 0) StreamAudio(this.state.SourceChannels, AudioFloat.length, this.state.SourceSampleRate, AudioFloat);

                this.setState({ReadyToGetFrame_aud : true});
            }

             const StreamAudio = (NUM_CHANNELS, NUM_SAMPLES, SAMPLE_RATE, AUDIO_CHUNKS) => {

                var audioBuffer = audioCtx.createBuffer(NUM_CHANNELS, (NUM_SAMPLES / NUM_CHANNELS), SAMPLE_RATE);
                for (var channel = 0; channel < NUM_CHANNELS; channel++)
                {
                    // This gives us the actual ArrayBuffer that contains the data
                    var nowBuffering = audioBuffer.getChannelData(channel);
                    for (var i = 0; i < NUM_SAMPLES; i++)
                    {
                        var order = i * NUM_CHANNELS + channel;
                        nowBuffering[i] = AUDIO_CHUNKS[order];
                    }
                }

                var source = audioCtx.createBufferSource();
                source.buffer = audioBuffer;

                source.connect(audioCtx.destination);
                source.start(startTime);

                startTime += audioBuffer.duration;

            }


             const ProcessImageData = (_byte, _GZipMode) => {
                
                
                this.setState({ReadyToGetFrame_img : false});

                var binary = '';

                var bytes = new Uint8Array(_byte);
                if(_GZipMode)
                {
                    var gunzip = new Zlib.Gunzip (bytes);
                    bytes = gunzip.decompress();
                }

                //----conver byte[] to Base64 string----
                var len = bytes.byteLength;
                for (var i = 0; i < len; i++)
                {
                    binary += String.fromCharCode(bytes[i]);
                }
                //----conver byte[] to Base64 string----

                //----display image----
                var img = document.getElementById('DisplayImg');
                img.src = 'data:image/jpeg;base64,' + btoa(binary);
                //img.width = data.Width;
                //img.height = data.Height;
                //----display image----

                this.setState({ReadyToGetFrame_img : true});
            }


            function CombineInt8Array(a, b)
            {
                var c = new Int8Array(a.length + b.length);
                c.set(a);
                c.set(b, a.length);
                return c;
            }

        function CombineFloat32Array(a, b)
        {
            var c = new Float32Array(a.length + b.length);
            c.set(a);
            c.set(b, a.length);
            return c;
        }
        function ByteToInt32(_byte, _offset)
        {
            return (_byte[_offset] & 255) + ((_byte[_offset + 1] & 255) << 8) + ((_byte[_offset + 2] & 255) << 16) + ((_byte[_offset + 3] & 255) << 24);
            //return _byte[_offset] + _byte[_offset + 1] * 256 + _byte[_offset + 2] * 256 * 256 + _byte[_offset + 3] * 256 * 256 * 256;
        }
        }
    }


     render() {
         // If we change the socket connection or try to reconnect it will not work because we are only switching didFunctionBind variable once
        if(this.props.socket !== null && this.didSocketUpdate){
            this.renderImage();
            console.log("socket is receieved");
            console.log(this.props.socket);
            this.didSocketUpdate = false; //the socket has been updated by the workshop
        }
         /*
        if(this.props.socket !== null && this.didFunctionBind == false) {
           this.renderImage();
           this.didFunctionBind = true;
        }*/
        return(
            <div className="Imgrender">
                    <img id="DisplayImg" src=""/>
                    <button id="createCred">Create Vpn Credential</button>
                    </div>
        )
       
        
    }

}


export default SimulationImage;