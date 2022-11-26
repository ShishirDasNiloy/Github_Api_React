import React, { useEffect, useState } from 'react'
import classes from './Profile.module.css'

const Profile = () => {
    const [userInfo, setUserInfo] = useState({})

    const userName = 'ShishirDasNiloy'

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
                    <input type="text" />
                </div>
                <div className={classes.main}>
                    <div className={classes.left}>
                        <img src={userInfo.avatar_url} alt="" />
                    </div>

                    <div className={classes.right}>
                        <span>
                            <h1>{userInfo.name}</h1>
                            <h2> Followers: {userInfo.followers}</h2>
                            <h2> Following : {userInfo.following}</h2>
                            <h2>Location: {userInfo.location}</h2>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
