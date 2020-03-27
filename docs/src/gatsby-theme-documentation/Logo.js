import React from 'react';
import {  useColorMode } from 'theme-ui'

export const Logo = () => {
  const [colorMode] = useColorMode();

  const logoUrl = () => {
    if (colorMode === 'dark') {
        return <a href="#"><img style={{width: '50%'}} src="logo-dark.png" /></a>;
    } else {
        return <a href="#"><img style={{width: '50%'}} src="https://github.com/newrelic/nr1-catalog/blob/master/docs/docs/images/logo.png?raw=true" /></a>
    }
  }

  return (
    logoUrl()
  )
}
