const child_process = require('child_process')
const EventEmitter = require('events')

class Mpeg1Muxer extends EventEmitter {

  constructor(options) {
    super(options)
    
    this.url = options.url
    
    this.stream = child_process.spawn("ffmpeg", ["-rtsp_transport", "tcp", "-i", this.url, '-f', 'mpegts',  '-vcodec', 'mpeg1video', '-b:v', '500k', '-bf' , '0',  '-an', '-r', '60', '-'], {
      detached: false
    })
    
    this.inputStreamStarted = true
    this.stream.stdout.on('data', (data) => { return this.emit('mpeg1data', data) })
    this.stream.stderr.on('data', (data) => { return this.emit('ffmpegError', data) })
  }
}

module.exports = Mpeg1Muxer
