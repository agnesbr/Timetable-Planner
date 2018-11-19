import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  font-family: DINWeb-Cond, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

  body::after {
  content: "";
  min-height: 100vh;
  background-image: url('../../images/BG_EF.png');
  background-repeat: repeat-y;
  background-attachment: fixed;
  opacity: 0.2;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  position: absolute;
  z-index: -1;   
}


@font-face {
  font-family: 'FestivoLettersNo1';
  src: url('../../webfonts/28F7B6_0_0.eot');
  src: url('../../webfonts/28F7B6_0_0.eot?#iefix') format('embedded-opentype'),
    url('../../webfonts/28F7B6_0_0.woff') format('woff'),
    url('../../webfonts/28F7B6_0_0.ttf') format('truetype');
}

@font-face {
  font-family: 'FestivoLettersNo18';
  src: url('webfonts/28F7B6_11_0.eot');
  src: url('webfonts/28F7B6_11_0.eot?#iefix') format('embedded-opentype'),
    url('webfonts/28F7B6_11_0.woff') format('woff'),
    url('webfonts/28F7B6_11_0.ttf') format('truetype');
}

/* first for IE 4–8 */
@font-face {
  font-family: DINWeb-Cond;
  src: url("../../webfonts/DINWeb-Cond.eot");
}

/* then for WOFF-capable browsers */
@font-face {
  font-family: DINWeb-Cond;
  src: url("../../webfonts/DINWeb-Cond.woff") format("woff");
}

/* first for IE 4–8 */
@font-face {
  font-family: DINWeb-CondBold;
  src: url("../../webfonts/webfonts/DINWeb-CondBold.eot");
}

/* then for WOFF-capable browsers */
@font-face {
  font-family: DINWeb-CondBold;
  src: url("../../webfonts/DINWeb-CondBold.woff") format("woff");
}


:root {
  --dark: #0B161F;
  --light: #E3E7DE;
  --purple: #a177c0;
  --red: #FE6767;
  --green: #8BC53F;
  --orange: #E99A00;
  --yellow: #E99A00;
  --teal: #0DA2A3;
}

`
