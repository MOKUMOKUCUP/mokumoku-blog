import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer>
      <div className="address">
        <address>
          <span>© MOKUMOKU 2022- All Rights Reserved.</span>
        </address>
        <p>code is <Link href={'https://github.com/lovelovetrb/mokumoku-blog'}>here</Link></p>
        {/* <p>お問合せは
          <Link href={'https://www.google.com/'}>こちら</Link>
        </p> */}
      </div>
    </footer>
  )
}

export default Footer