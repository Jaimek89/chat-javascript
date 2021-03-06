$(function () {

    // socket.io client side connection
    const socket = io()

    // obtaining DOM elements from the Chat Interface
    const $messageForm = $('#message-form')
    const $messageBox = $('#message')
    const $chat = $('#chat')

    // obtaining DOM elements from the NicknameForm Interface
    const $nickForm = $('#nickForm')
    const $nickError = $('#nickError')
    const $nickname = $('#nickname')

    // obtaining the usernames container DOM
    const $users = $('#usernames')

    // showing login container or chat container, error in case the user is already logged
    $nickForm.submit(e => {
        e.preventDefault()
        socket.emit('new user', $nickname.val(), data => {
            if (data) {
                $('#nickWrap').hide()
                $('#contentWrap').show()
            } else {
                $nickError.html(`
                    <div class="alert alert-danger mt-2">
                        That username is logged already.
                    </div>
                `)
            }
            $nickname.val('')
        })
    })
    
    // events

    $messageForm.submit( e => {
        e.preventDefault()
        socket.emit('send message', $messageBox.val(), data => {
            $chat.append(`<p class="error">${data}</p>`)
        })
        $messageBox.val('')
    })

    socket.on('new message', data => {
        $chat.append(`<p><b>${data.nick}</b>: ${data.msg}</p>`)
    })

    socket.on('usernames', data => {
        let html = ''
        for (let i = 0; i < data.length; i++) {
            html += `<p><i class="fas fa-user"></i> ${data[i]}</p>`
        }
        $users.html(html)
    })

    socket.on('whisper', data => {
        $chat.append(`<p class="whisper"><b>${data.nick}:</b> ${data.msg}</p>`)
    })

    socket.on('load old msgs', msgs => {
        for (let i = 0; i < msgs.length; i++) {
            displayMsg(msgs[i])
        }
    })

    function displayMsg(data) {
        $chat.append(`<p class="whisper"><b>${data.nick}:</b> ${data.msg}</p>`)
    }
})