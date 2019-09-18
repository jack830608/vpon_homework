import React, { useState, useEffect } from 'react'
import './style.scss'
import webSocket from 'socket.io-client'

export default () => {
    const [ws, setWs] = useState(null)
    const [dir, setDir] = useState(false)
    useEffect(() => {
        setWs(webSocket())
    }, [])

    useEffect(() => {
        if (ws) {
            console.log('success connect to web-socket!')
            initWebSocket()
        }
    }, [ws])

    const initWebSocket = () => {
        ws.on('getMessageAll', (message) => {
            setDir(message)
        })
    }

    const sendMessage = (status) => {
        ws.emit('getMessageAll', status)

    }
    window.onorientationchange = (event) => {
        if (window.orientation === 0) {
            sendMessage(false)
        } else {
            sendMessage(true)
        }
    };

    return (
        <div className="book p3d" style={{ transform: dir ? 'rotateX(37.5deg)' : 'rotateX(60deg)' }}>
            <div className="back-cover p3d">
                <div className="page back flip" />
                <div className="page front p3d">
                    <div className="shadow" style={{ transform: dir ? 'translateZ(1px) skewX(-22.5deg)' : 'translateZ(1px) skewX(0deg)', opacity: 0.4 }} />
                    <div className="dino" style={{ transform: dir ? 'rotateX(-45deg)' : 'rotateX(0deg)' }} />
                </div>
            </div>
            <div className="front-cover p3d" style={{ transform: dir ? 'rotateY(-180deg)' : 'rotateY(0deg)' }}>
                <div className="page front flip p3d">
                    <p>非常感謝 Vpon 給我這個機會，在9/17面談完並了解工作內容以及內部氣氛後，非常希望能加入 Vpon 與公司一起成長，期望在為公司解決問題之餘，同時成為組織內重要的成員。</p>
                </div>
                <div className="page back" />
            </div>
        </div>
    )
}