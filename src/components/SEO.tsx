import Head from "next/head"
import React from "react"

const SEO = () => {
  const _title = `Tyler Online`
  const _description = "Tyle Online, Easy way to earn money online"
  const _keywords = "tyler online"
  const _author = "Tyler Online"

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
      <meta property="og:image:alt" content="tyler online" />
    </Head>
  )
}

export default SEO
