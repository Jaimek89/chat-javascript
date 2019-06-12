$(function () {

    const socket = io()

    // obtaining DOM elements from the interface
    const $messageForm = $('#message-form')
    const $messageBox = $('#message')
    const $chat = $('#chat')

    // obtaining DOM elements from the nicknameForm
    const $nickForm = $('#nickForm')
    const $nickError = $('#nickError')
    const $nickname = $('#nickname')

    const $users = $('#usernames')

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
        socket.emit('send message', $messageBox.val())
        $messageBox.val('')
    })

    socket.on('new message', function (data) {
        $chat.append(data + '<br/>')
    })
})