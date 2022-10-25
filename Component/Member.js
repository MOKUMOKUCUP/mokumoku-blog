import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import styles from "../pages/index.module.css";
import { AiFillTwitterCircle } from "react-icons/ai";
import { IconContext } from "react-icons";
import delayScrollAnime from '../styles/style';
import $ from 'jquery'

const MemberList = ({ members, isAnimation }) => {
    const [memberList, setMemberList] = useState([]);
    const [scrollValue, setScrollValue] = useState(0)
    const [opacity, setOpacity] = useState({ opacity: '0' })

    useEffect(() => {
        const tempList = []
        members.map((member => {
            tempList.push(member.properties)
        }))
        setMemberList(tempList)

        if (!isAnimation) {
            setOpacity(state => ({ ...state, opacity: '1' }))
        }
    }, [])

    useEffect(() => {
        window.addEventListener('scroll', function () {
            if (isAnimation) {
                setScrollValue($(window).scrollTop())
            }
        });

        if (isAnimation) {
            delayScrollAnime('.delayShowMember', 'listAnimation', scrollValue)
        }
    }, [scrollValue])


    return (
        <>
            <h2 className={`${styles.heading}`}>Member</h2>
            <div className={`${styles.wrap} delayShowMember`}>
                {memberList.sort((a, b) => {
                    if (a.id.number < b.id.number) {
                        return -1;
                    }
                    if (a.id.number > b.id.number) {
                        return 1;
                    }
                }).map((member) => {
                    const imgUrl = member.image.files[0] ? member.image.files[0].file.url : ''
                    const twitterUrl = member.twitterID.rich_text[0].plain_text
                    return (
                        <div className={`${styles.list}`} style={opacity}>
                            <div className={`${styles.listImage}`}>
                                <Image
                                    src={`${imgUrl}`}
                                    width={100}
                                    height={100}
                                />
                            </div>
                            <p>ニックネーム</p>
                            <p className={`${styles.listItem}`}>{member.name.title[0].plain_text}</p>
                            <p>ドローン歴</p>
                            <p className={`${styles.listItem}`}>{member.LOD.rich_text[0].plain_text}</p>
                            <Link href={`https://twitter.com/${twitterUrl}`}>
                                <div style={{ textAlign: 'center' }}>
                                    <IconContext.Provider value={{ color: "#1E9BEF", className: `${styles.twitterIcon}` }}>
                                        <AiFillTwitterCircle width={40} height={40} />
                                    </IconContext.Provider>
                                </div>
                            </Link>
                        </div>
                    )
                })}
            </div>
            <div className={`${styles.posts} delayScroll`}>
            </div>
        </>
    )
}

export default MemberList



