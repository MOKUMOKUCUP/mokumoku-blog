import Link from 'next/link'

const Footer = () => {
  return (
    <footer>
      <div className="address">
        <address>
          <span>© MOKUMOKU 2022- All Rights Reserved.</span>
        </address>
        <p>お問合せは
          <Link href={'mailto:trombonelover8888@gmail.com'}>こちらまで</Link>
        </p>
        <p>code is <Link href={'https://github.com/lovelovetrb/mokumoku-blog'}>here</Link> and created by <Link href={'https://twitter.com/lovelovetrb'}>Mizuki</Link> </p>
      </div>
    </footer>
  )
}

export default Footer