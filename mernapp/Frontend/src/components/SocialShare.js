// src/components/SocialShare.js
import React from 'react';
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton, FacebookIcon, TwitterIcon, WhatsappIcon } from 'react-share';

const SocialShare = ({ url, title }) => (
  <div>
    <FacebookShareButton url={url} quote={title}>
      <FacebookIcon size={32} round={true} />
    </FacebookShareButton>
    <TwitterShareButton url={url} title={title}>
      <TwitterIcon size={32} round={true} />
    </TwitterShareButton>
    <WhatsappShareButton url={url} title={title}>
      <WhatsappIcon size={32} round={true} />
    </WhatsappShareButton>
  </div>
);

export default SocialShare;
