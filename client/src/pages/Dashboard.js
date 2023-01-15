import TinderCard from 'react-tinder-card'
import {useEffect, useState} from 'react'
import ChatContainer from '../components/ChatContainer'
import {useCookies} from 'react-cookie'
import axios from 'axios'

const Dashboard = () => {
    const [user, setUser] = useState(null)
    const [gamerTypedUsers, setGamerTypedUsers] = useState(null)
    const [lastDirection, setLastDirection] = useState()
    const [cookies, setCookie, removeCookie] = useCookies(['user'])

    const userId = cookies.UserId


    const getUser = async () => {
        try {
            const response = await axios.get('http://localhost:8000/user', {
                params: {userId}
            })
            setUser(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    const getGamerTypedUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8000/gamer-typed-users', {
                params: {gamer: user?.gamer_interest}
            })
            setGamerTypedUsers(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getUser()

    }, [])

    useEffect(() => {
        if (user) {
            getGamerTypedUsers()
        }
    }, [user])

    const updateMatches = async (matchedUserId) => {
        try {
            await axios.put('http://localhost:8000/addmatch', {
                userId,
                matchedUserId
            })
            getUser()
        } catch (err) {
            console.log(err)
        }
    }


    const swiped = (direction, swipedUserId) => {
        if (direction === 'right') {
            updateMatches(swipedUserId)
        }
        setLastDirection(direction)
    }

    const outOfFrame = (name) => {
        console.log(name + ' left the screen!')
    }

    const matchedUserIds = user?.matches.map(({user_id}) => user_id).concat(userId)

    const filteredGamerTypedUsers = gamerTypedUsers?.filter(gamerTypedUsers => !matchedUserIds.includes(gamerTypedUsers.user_id))


    console.log('filteredGamerTypedUsers ', filteredGamerTypedUsers)
    return (
        <>
            {user &&
            <div className="dashboard">
                <ChatContainer user={user}/>
                <div className="swipe-container">
                    <div className="card-container">

                        {filteredGamerTypedUsers?.map((gamerTypedUsers) =>
                            <TinderCard
                                className="swipe"
                                key={gamerTypedUsers.user_id}
                                onSwipe={(dir) => swiped(dir, gamerTypedUsers.user_id)}
                                onCardLeftScreen={() => outOfFrame(gamerTypedUsers.first_name)}>
                                <div
                                    style={{backgroundImage: "url(" + gamerTypedUsers.url + ")"}}
                                    className="card">
                                    <h3>{gamerTypedUsers.first_name}</h3>
                                </div>
                            </TinderCard>
                        )}
                        <div className="swipe-info">
                            {lastDirection ? <p>You swiped {lastDirection}</p> : <p/>}
                        </div>
                    </div>
                </div>
            </div>}
        </>
    )
}
export default Dashboard
