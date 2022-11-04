import React, { useEffect, useState } from 'react'
import styles from "../pages/index.module.css";
import Link from 'next/link';
import delayScrollAnime from '../styles/style';
import { BrowserView, isBrowser, isMobile, isTablet, MobileView } from 'react-device-detect';


const Header = ({ isAnimation }) => {

    const [boxStyle, setBoxStyle] = useState({
        color: '#133D9F',
        fontSize: '2.5rem',
        cursor: 'pointer',
        display: 'flex',
        gap: '30px',
        letterSpacing: '20px',
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
            {isBrowser && !isTablet && (
                <>
                    <Link href="/">
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
                    </Link>
                    <h3>
                        MOKUMOKU CUP 実行委員会のホームページです
                    </h3>
                </>
            )}
            {isMobile && (
                <>
                    <Link href="/"><h1 style={boxStyle}>MOKUMOKU</h1></Link>
                    <p style={{ fontSize: '.8rem' }}>MOKUMOKU CUP 実行委員会のホームページです</p>
                </>
            )}
        </header >
    )
}

export default Header