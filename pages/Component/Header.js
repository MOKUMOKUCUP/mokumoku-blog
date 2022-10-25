import React, { useEffect, useState } from 'react'
import styles from "../index.module.css";
import Link from 'next/link';
import delayScrollAnime from '../../styles/style';
import { BrowserView, isBrowser, isMobile, MobileView } from 'react-device-detect';


const Header = ({ isAnimation }) => {

    const [boxStyle, setBoxStyle] = useState({
        color: '#133D9F',
        fontSize: '3rem',
        cursor: 'pointer',
        display: 'flex',
        gap: '30px',
        justifyContent: 'center'
    })

    if (isAnimation === undefined) {
        isAnimation = true
    }

    useEffect(() => {
        if (isAnimation && isBrowser) {
            delayScrollAnime('.popUp', 'titleAnimation')
        } if (isMobile) {
            setBoxStyle(state => ({ ...state, fontSize: '2.5rem' }))
        } else {
            setBoxStyle(state => ({ ...state, fontSize: '4rem' }))
        }
    }, [])

    return (
        <header className={styles.header}>
            <Link href="/">
                <BrowserView>
                    <div className={`popUp`} style={boxStyle}>
                        <span className='box'>M</span>
                        <span className='box'>O</span>
                        <span className='box'>K</span>
                        <span className='box'>U</span>
                        <span className='box'>M</span>
                        <span className='box'>O</span>
                        <span className='box'>K</span>
                        <span className='box'>U</span>
                    </div>
                    <h3>
                        MOKUMOKU CUP 実行委員会のホームページです
                    </h3>
                </BrowserView>
            </Link>
            <Link href="/">
                <MobileView>
                    <h1 style={boxStyle}>MOKUMOKU</h1>
                    <p style={{ fontSize: '.8rem' }}>MOKUMOKU CUP 実行委員会のホームページです</p>
                </MobileView>
            </Link>
        </header >
    )
}

export default Header