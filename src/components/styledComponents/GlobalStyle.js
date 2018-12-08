import { createGlobalStyle } from 'styled-components'
import imgBg from '../../images/BG_EF.png'
export default createGlobalStyle`

* {
  box-sizing: border-box;
}

html {
  height: 100%; 
  color: var(--dark)
}

body {
  background-attachment: fixed;
  background-image: url(${imgBg});
  background-repeat: repeat;
  background-size: contain;
  bottom: 0;
  height: 100%; 
  left: 0;
  margin: 0;
  padding: 0;
  position: relative;
  right: 0;
  top: 0;
  z-index: -1;
}

h1{
 color: #f5f1f1;
  font-family: FestivoLettersNo1;
  font-size: 19px;
  letter-spacing: 0.05em;
  margin-bottom: 0;
  text-align: center;
}

a{
  color: var(--dark);
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
  --purple: #6A4287;
  --red: #FE6767;
  --green: #8BC53F;
  --orange: #E99A00;
  --yellow: #E99A00;
  --teal: #1A999A;
}

`
