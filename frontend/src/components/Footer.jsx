import React from 'react'
import { logo } from '../assets/asset';

export default function Footer() {
  return (
    <footer>
        <div id='footer-content'>
            <div>
                <div id='logo-footer'><img src={logo} alt="logo" /></div>
                <p>Our vision is to provide convenience and help increase your sales.</p>
                <p></p>
            </div>

            <div id='other-section'>
                <div id='about'>
                    <p className='heading-footer'>About</p>
                    <p>How it works</p>
                    <p>Featured</p>
                    <p>Patnership</p>
                    <p>Bussiness Relation</p>
                </div>
                <div id='Community'>
                    <p className='heading-footer'>Community</p>
                    <p>Events</p>
                    <p>Blog</p>
                    <p>Podcast</p>
                    <p>Invite a friend</p>
                </div>
                <div id='socials'>
                    <p className='heading-footer'>Socials</p>
                    <p>Discord</p>
                    <p>Instagram</p>
                    <p>Facebook</p>
                    <p>Twitter</p>
                </div>
            </div>
        </div>
            <hr />
        <div id='policy-section'>
            <div>©2022 MORENT. All rights reserved</div>
            <div>
                <div>Privacy & Policy</div>
                <div>Terms & Condition</div>
            </div>
        </div>
    </footer>
  )
}