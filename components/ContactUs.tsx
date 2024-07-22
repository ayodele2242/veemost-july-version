import React from 'react'
import ContactForm from './ContactForm'
import Footer from './Footer'
import Header from './Header'
import Container from './Container'



const ContactUs = () => {
  return (

    <main className="w-full overflow-hidden">
      <Header />
      <Container>
        <ContactForm />
      </Container>
      <Footer/>
      </main>
    
  )
}

export default ContactUs
