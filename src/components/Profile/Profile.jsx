import React, { useEffect, useState } from 'react'
import classes from './Profile.module.css'

const Profile = () => {
    const [userInfo, setUserInfo] = useState({})
    const [userName, setUserName] = useState({})

    useEffect(() => {
        let controller = new AbortController()
        let dataFetch = async () => {
            let response = await fetch(`https://api.github.com/users/${userName}`)
            let data = await response.json()
            console.log(data)

            if (response.ok) {
                setUserInfo(data)
            }
        }
        try {
            dataFetch()
            controller.abort()
        } catch {
            setUserInfo({})
        }
    }, [userName])

    return (
        <div className={classes.body}>
            <div className={classes.container}>
                <div className={classes.search}>
                    <input onChange={(e) => setUserInfo(e.target.value)} type="text" />

                    <button type="submit" onClick={() => setUserName(userInfo)}>
                        Search
                    </button>
                </div>
                <div className={classes.main}>
                    <div className={classes.left}>
                        <img src={userInfo.avatar_url} alt="" />
                    </div>

                    <div className={classes.right}>
                        <span>
                            <h1>{userInfo.name}</h1>
                            <h4> Followers: {userInfo.followers}</h4>
                            <h4> Following : {userInfo.following}</h4>
                            <h4>Location: {userInfo.location}</h4>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
