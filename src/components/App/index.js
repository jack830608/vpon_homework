import React, { useState, useEffect } from 'react'
import './style.scss'
import webSocket from 'socket.io-client'
import axios from 'axios'

export default () => {
    const [myIp, setMyIp] = useState()
    const [serverIp, setServerIp] = useState()
    const [ws, setWs] = useState(null)
    const [dir, setDir] = useState(false)
    useEffect(() => {
        axios.get('https://api.ipify.org/').then((res) => {
            setMyIp(res.data)
        })
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
            setDir(message.status)
            setServerIp(message.ip)
        })
    }

    const sendMessage = (message) => {
        ws.emit('getMessageAll', message)

    }
    window.onorientationchange = (event) => {
        if (window.orientation === 0) {
            sendMessage({ status: false, ip: myIp })
        } else {
            sendMessage({ status: true, ip: myIp })
        }
    };

    return (
        <div className="container" style={{ backgroundColor: dir && (serverIp === myIp) ? 'rgba(255, 255, 255, 0)' : 'rgba(0, 0, 50, 0.5)' }}>
            <img className="phone" src="/images/phone.png" />
            {dir && (serverIp === myIp) ? '' : <img className="rain" src="/images/rain.gif" />}
            <div className="book p3d" style={{ transform: dir && (serverIp === myIp) ? 'rotateX(32.5deg)' : 'rotateX(60deg)' }}>
                <div className="back-cover p3d">
                    <div className="page back flip" />
                    <div className="page front p3d">
                        <div className="shadow" style={{ transform: dir && (serverIp === myIp) ? 'translateZ(1px) skewX(-22.5deg)' : 'translateZ(1px) skewX(0deg)', opacity: 0.4 }} />
                        <div className="logo" style={{ transform: dir && (serverIp === myIp) ? 'rotateX(-45deg)' : 'rotateX(0deg)' }} />
                    </div>
                </div>
                <div className="front-cover p3d" style={{ transform: dir && (serverIp === myIp) ? 'rotateY(-180deg)' : 'rotateY(0deg)' }}>
                    <div className="page front flip p3d">
                        <p>非常感謝 Vpon 給我這個機會，在9/17面談完並了解工作內容以及公司內部氣氛後，非常希望能加入 Vpon 與公司及其他同事一起成長，期望在為公司解決問題之餘，同時成為組織內重要的成員。</p>
                        <p>歡迎隨時與我聯絡！</p>
                        <p className="signature">Jack Lin</p>
                    </div>
                    <div className="page back" />
                </div>
            </div>
        </div>
    )
}