"use client"

import React from 'react'
import RSSFeedGrid from './RSSFeedGrid'
import Container from './Container'
import Header from './Header'
import Footer from './Footer'

const News = () => {
  return (
    <main className="w-full overflow-hidden">
      <Header />

      <Container>
    <RSSFeedGrid />
    </Container>

    <Footer />
  </main>
  )
}

export default News
