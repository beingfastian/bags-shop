import NextImage from 'next/image';
import React from 'react';

interface Props {
  className?: string;
}

function Image({}: Props) {
  return <NextImage width={0} height={0} src={''} alt="" />;
}

export default Image;
