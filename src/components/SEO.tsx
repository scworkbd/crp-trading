import Head from "next/head"
import React from "react"

const SEO = () => {
  const _title = `CRP Trending`
  const _description = "Earn money online, doing simple websites"
  const _keywords = "CRP Trending"
  const _author = "CRP Trending"

  return (
    <Head>
      <title>{_title}</title>
      <meta name="title" content={_title} />
      <meta name="description" content={_description} />
      <meta name="author" content={_author} />
      <meta name="keywords" content={_keywords} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={_title} />
      <meta property="og:description" content={_description} />
      <meta property="og:image" content="/logo.png" />
      <meta property="og:image:secure_url" content="/logo.png" />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:alt" content="crp trending" />
    </Head>
  )
}

export default SEO
