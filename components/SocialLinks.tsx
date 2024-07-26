import Link from 'next/link'
import React from 'react'
import { Facebook01Icon, TwitterSquareIcon, InstagramIcon, CallingIcon } from 'hugeicons-react'


const SocialLinks = () => {
  return (
    <div className="flex flex-row gap-[1.5rem]">
      <Link href={""}><CallingIcon size={"35"}/></Link>
       <Link href={""}><Facebook01Icon size={"35"} className="text-blue-500 font-bold"/></Link>
       <Link href={""}><TwitterSquareIcon size={"35"} className="text-blue-400 font-bold"/></Link>
       <Link href={""}><InstagramIcon size={"35"} className="text-red-400 font-bold"/></Link>
    </div>
  )
}

export default SocialLinks
