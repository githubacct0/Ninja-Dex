import React from 'react';
import { Layout, Row, Col, Grid } from 'antd';
import Link from './Link';
import { helpUrls } from './HelpUrls';
import twitter from '../assets/twitter.svg';
import twitch from '../assets/twitch.svg';
import discord from '../assets/discord.svg';
import instagram from '../assets/instagram.svg';
import youtube from '../assets/youtube.svg';
const { Footer } = Layout;
const { useBreakpoint } = Grid;

const footerElements = [
  { description: 'Twitter', link: 'https://twitter.com/NinjaSolProto', img: twitter },
  { description: 'Twitch', link: 'http://www.twitch.tv/ninjasolproto', img: twitch },
  { description: 'Discord', link: 'https://discord.gg/9bsaFmfspx', img: discord },
  { description: 'Instagram', link: 'https://twitter.com/', img: instagram },
  { description: 'Youtube', link: 'https://www.youtube.com/channel/UCKXumggcr1nrQVB-KsS8vlQ', img: youtube },
];

export const CustomFooter = () => {
  const smallScreen = !useBreakpoint().lg;

  return (
    <Footer
      style={{
        minHeight: '45px',
        paddingBottom: 30,
        paddingTop: 30,
        background: '#242233',
        alignItems: 'center',
      }}
    >
      <Row 
        gutter={[16, 20]} 
        style={{
          alignItems: 'center',
          placeContent: 'center',
        }}
      >

        <Col 
          style={{
            alignItems: 'center',
            placeContent: 'center',
            textAlign: 'center'
          }} 
          flex="auto" >
            {  "© Ninja Protocol All rights reserved 2021"}
        </Col>
        <Col flex="auto">
          <Row 
            style={{
              alignItems: 'center',
              placeContent: 'center',
            }}
          >
          {footerElements.map((elem, index) => {
            return (
              <Col key={index + ''} style={{paddingLeft: '20px', paddingRight: '20px'}} >
                <Link external to={elem.link}>
                  {<img src={elem.img} />}
                </Link>
              </Col>
            );
          })}
          </Row>
        </Col>
      </Row>
    </Footer>
  );
};
