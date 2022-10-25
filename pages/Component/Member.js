import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import styles from "../index.module.css";
import { AiFillTwitterCircle } from "react-icons/ai";
import { IconContext } from "react-icons";
import delayScrollAnime from '../../styles/style';

const MemberList = ({ members }) => {
    const [memberList, setMemberList] = useState([]);
    useEffect(() => {
        const tempList = []
        members.map((member => {
            tempList.push(member.properties)
        }))
        setMemberList(tempList)
        window.addEventListener('scroll', () => {
            delayScrollAnime('.delayShowMember', 'listAnimation')
        })
    }, [])

    console.log(memberList)

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
                        <div className={`${styles.list}`}>
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



