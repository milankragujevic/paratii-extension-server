let paratiiSend = (payload) => {
	window.postMessage({
		type: 'PARATII_COMM',
		payload: payload
	}, '*')
}

;(($) => {
  $('#paratiiStart').on('click', () => {
    console.log('Sending start ipfs msg')
    paratiiSend({
			action: 'start'
		})
    console.log('Sent message to start IPFS')
  })
  $('#paratiiSubmit').on('click', () => {
    var files = $('#paratiiFile')[0].files
    if(files.length != 1) {
      return alert('Please select one file!')
    }
    var file = files[0]
    console.log(file)
    var name = file.name
    var size = file.size
    var type = file.type
    if(type !== 'video/mp4') {
      return alert('Please select an MP4 video!')
    }
    if(size > 1024*1024*1024) {
      return alert('Files bigger than 1GiB are not supported!')
    }
    if(name.length > 128) {
      return alert('File name must be shorter than 128 characters!')
    }
    var reader = new FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      console.log('Onloadend fired for reader')
      var buf = Buffer(reader.result)
      console.log('Buffer is ', buf)
      console.log('Sending buffer ipfs msg')
      paratiiSend({
  			action: 'upload',
        buffer: buf
  		})
      console.log('Sent message to upload buffer to IPFS')
    }
  })
})(require('jquery'))
