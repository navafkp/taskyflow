import React from 'react'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { v4 } from "uuid"
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ZvideoRoom = () => {
    const userData = useSelector(state => state.userData)
    const navigate = useNavigate()
    const { roomID } = useParams()

    const meetingUI = async (element) => {
        if (userData) {
            const appID = process.env.APPID;
            const serverSecret = process.env.SERVER_SECRET;
            const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
                appID,
                serverSecret,
                roomID,
                v4(),
                userData?.name,
            );

            try {
                const zp = ZegoUIKitPrebuilt.create(kitToken);
                zp.joinRoom({
                    container: element,
                    sharedLinks: [
                        {
                            'name': 'Copy Link',
                            'url': `http://localhost:3000/room/${roomID}`,
                        }
                    ],
                    scenario: {
                        mode: ZegoUIKitPrebuilt.VideoConference,
                    },
                    onLeaveRoom: (user) => {
                        navigate('/meeting')
                    },
                })

            } catch (error) {
                console.error('Error joining room:', error);
            }
        }
    }

    return (
        <>
            <div ref={meetingUI}></div>
        </>
    )
}

export default ZvideoRoom