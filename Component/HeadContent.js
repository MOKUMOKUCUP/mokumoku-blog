import React from 'react';
import Head from "next/head";

const HeadContent = ({ title }) => {
    return (
        <Head>
            <title>MOKUMOKU - {title}</title>
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width,initial-scale=1" />
            {/* TODO：description 記述 */}
            <meta name="description" content="MOKUMOKUのホームページです" />
            {/* TODO:Twitterカードに関する記述 */}
            {/* <meta property="og:url" content="ページのURL" />
            <meta property="og:title" content="ページのタイトル" />
            <meta property="og:type" content="ページのタイプ" />
            <meta property="og:description" content="記事の抜粋" />
            <meta property="og:image" content="画像のURL" />
            <meta name="twitter:card" content="カード種類" />
            <meta name="twitter:site" content="@Twitterユーザー名" />
            <meta property="og:site_name" content="サイト名" />
            <meta property="og:locale" content="ja_JP" /> */}
            <link rel="icon" href="/icon-192x192.png" />
            <link href="https://fonts.googleapis.com/css2?family=Mochiy+Pop+One&family=Noto+Sans+JP&display=swap" rel="stylesheet" />
        </Head>
    )
}

export default HeadContent