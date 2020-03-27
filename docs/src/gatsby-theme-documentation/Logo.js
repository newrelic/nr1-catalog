import React from 'react';
import {  useColorMode } from 'theme-ui'
import logoDark from '../../docs/images/logo-dark.png';
import logoNormal from '../../docs/images/logo.png';

export const Logo = () => {
  const [colorMode] = useColorMode();

  const logoUrl = () => {
    if (colorMode === 'dark') {
        return <a href="#"><img style={{width: '50%'}} src={logoDark}/></a>;
    } else {
        return <a href="#"><img style={{width: '50%'}} src={logoNormal} /></a>
    }
  }

  return (
    logoUrl()
  )
}
