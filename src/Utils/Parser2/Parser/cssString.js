


const cssString = `
.pricing-overview {
  position: relative;
  padding: 0px 30px;
  border-bottom: 1px none #e4ebf3;
}

.container {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  height: 218px;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-pack: start;
  -webkit-justify-content: flex-start;
  -ms-flex-pack: start;
  justify-content: flex-start;
}

.centered-heading {
  margin-bottom: 16px;
  text-align: center;
}

.pricing-description {
  max-width: 550px;
  margin-right: auto;
  margin-left: auto;
  text-align: center;
}

.pricing-grid {
  display: -ms-grid;
  display: grid;
  margin-top: 50px;
  grid-auto-columns: 1fr;
  grid-column-gap: 64px;
  grid-row-gap: 50px;
  -ms-grid-columns: 1fr 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr;
  -ms-grid-rows: auto;
  grid-template-rows: auto;
}

.pricing-card-three {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: start;
  -webkit-justify-content: flex-start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  text-align: center;
}

.pricing-image {
  width: 80px;
  height: 80px;
  margin-bottom: 16px;
  -o-object-fit: cover;
  object-fit: cover;
}

.pricing-card-text {
  margin-bottom: 20px;
}

.text-link-arrow {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: start;
  -webkit-justify-content: flex-start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  color: #1a1b1f;
  font-size: 14px;
  line-height: 20px;
  text-decoration: none;
}

.arrow-embed {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  margin-left: 2px;
}

.div-block {
  width: 400px;
  height: 100px;
}

.hero-subscribe-right {
  position: relative;
  padding: 80px 30px;
  border-bottom: 1px solid #e4ebf3;
  background-color: #f5f7fa;
}

.hero-wrapper {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}

.hero-split {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  max-width: 46%;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: start;
  -webkit-justify-content: flex-start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  -webkit-box-align: start;
  -webkit-align-items: flex-start;
  -ms-flex-align: start;
  align-items: flex-start;
}

.shadow-two {
  box-shadow: 0 4px 24px 0 rgba(150, 163, 181, 0.08);
}

.margin-bottom-24px {
  margin-bottom: 24px;
}

.hero-form {
  margin-bottom: 12px;
}

.hero-form-container {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: start;
  -webkit-justify-content: flex-start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  -webkit-box-align: stretch;
  -webkit-align-items: stretch;
  -ms-flex-align: stretch;
  align-items: stretch;
}

.hero-form-input {
  width: 240px;
  height: auto;
  margin-right: 9px;
  margin-bottom: 0px;
  padding: 5px 16px;
  border-style: solid;
  border-width: 1px;
  border-color: #d1d6db;
  -webkit-transition: all 200ms ease;
  transition: all 200ms ease;
  color: #1a1b1f;
  font-size: 14px;
  line-height: 20px;
}

.hero-form-input:hover {
  border-color: #76879d;
}

.hero-form-input:focus {
  border-color: #76879d;
}

.hero-form-input::-webkit-input-placeholder {
  color: rgba(26, 27, 31, 0.8);
}

.hero-form-input:-ms-input-placeholder {
  color: rgba(26, 27, 31, 0.8);
}

.hero-form-input::-ms-input-placeholder {
  color: rgba(26, 27, 31, 0.8);
}

.hero-form-input::placeholder {
  color: rgba(26, 27, 31, 0.8);
}

.button-primary {
  padding: 12px 25px;
  background-color: #1a1b1f;
  -webkit-transition: all 200ms ease;
  transition: all 200ms ease;
  color: #fff;
  font-size: 12px;
  line-height: 20px;
  letter-spacing: 2px;
  text-transform: uppercase;
}

.button-primary:hover {
  background-color: #32343a;
  color: #fff;
}

.button-primary:active {
  background-color: #43464d;
}

.logos-quote-divider {
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 50%;
  padding: 20px 0px 0px;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  grid-auto-columns: 1fr;
  grid-column-gap: 16px;
  grid-row-gap: 16px;
  -ms-grid-columns: 1fr 1fr;
  grid-template-columns: 1fr 1fr;
  -ms-grid-rows: auto;
  grid-template-rows: auto;
  border-bottom-style: solid;
  border-radius: 8px;
  background-color: #777373;
  box-shadow: 4px 6px 11px 2px rgba(0, 0, 0, 0.82);
  color: #d8a3a3;
}

.clients-wrapper-two {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 40%;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: stretch;
  -webkit-align-items: stretch;
  -ms-flex-align: stretch;
  align-items: stretch;
}

.clients-info-two {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-align: start;
  -webkit-align-items: flex-start;
  -ms-flex-align: start;
  align-items: flex-start;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
}

.clients-quote-two {
  width: 80%;
  font-size: 1rem;
  line-height: 16px;
  font-weight: 400;
}

.clients-divider {
  width: 90%;
  height: 1px;
  border: 1px solid #000;
  background-color: #e4ebf3;
}

.clients-info {
  display: -ms-grid;
  display: grid;
  margin-top: 8px;
  margin-bottom: 8px;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  grid-auto-columns: 1fr;
  grid-column-gap: 4px;
  grid-row-gap: 4px;
  -ms-grid-columns: 1fr 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr;
  -ms-grid-rows: auto;
  grid-template-rows: auto;
  font-size: 14px;
  line-height: 20px;
}

.clients-info-image {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 3.25rem;
  height: 3.25rem;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
  color: #a0a0a0;
  -o-object-fit: cover;
  object-fit: cover;
}

.clients-grid {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  justify-items: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
  grid-auto-flow: row;
  grid-auto-columns: 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 13px;
  -ms-grid-columns: 1fr 1fr;
  grid-template-columns: 1fr 1fr;
  -ms-grid-rows: auto;
  grid-template-rows: auto;
}

.body {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  background-color: #fff2f2;
  font-family: Montserrat, sans-serif;
  font-size: 16px;
}

.text-block {
  font-size: 24px;
}

.clients-info-two-copy {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  max-width: 350px;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-align: start;
  -webkit-align-items: flex-start;
  -ms-flex-align: start;
  align-items: flex-start;
}

.clients-quote-two-copy {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  margin-top: 10px;
  -webkit-box-pack: end;
  -webkit-justify-content: flex-end;
  -ms-flex-pack: end;
  justify-content: flex-end;
  font-size: 16px;
  line-height: 16px;
  font-weight: 400;
}

.div-block-2 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 3.5rem;
  height: 1.5rem;
  border-radius: 4px;
  background-color: #b58c8c;
  font-size: 16px;
  -o-object-fit: contain;
  object-fit: contain;
}

.clients-info-two-copy {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-align: start;
  -webkit-align-items: flex-start;
  -ms-flex-align: start;
  align-items: flex-start;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
}

.text-block-2 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  height: 100%;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-align-self: center;
  -ms-flex-item-align: center;
  align-self: center;
  -webkit-box-flex: 0;
  -webkit-flex: 0 auto;
  -ms-flex: 0 auto;
  flex: 0 auto;
  font-size: 1rem;
}

.text-block-3 {
  font-size: 1rem;
}

.clients-info-copy {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  margin-top: 8px;
  margin-bottom: 8px;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  grid-auto-columns: 1fr;
  -ms-grid-columns: 0.5fr 1fr;
  grid-template-columns: 0.5fr 1fr;
  -ms-grid-rows: auto;
  grid-template-rows: auto;
  font-size: 14px;
  line-height: 20px;
}

.text-block-4 {
  -o-object-fit: fill;
  object-fit: fill;
}

.div-block-3 {
  width: 100%;
  height: 20px;
  border-bottom-style: solid;
  border-bottom-color: #000;
  border-radius: 0px 0px 20px 20px;
  background-image: -webkit-gradient(linear, left bottom, left top, from(#000), color-stop(30%, rgba(27, 27, 27, 0.79)), color-stop(50%, rgba(31, 31, 31, 0.55)), color-stop(71%, rgba(36, 36, 36, 0.31)), to(hsla(0, 0%, 100%, 0)));
  background-image: linear-gradient(0deg, #000, rgba(27, 27, 27, 0.79) 30%, rgba(31, 31, 31, 0.55) 50%, rgba(36, 36, 36, 0.31) 71%, hsla(0, 0%, 100%, 0));
}

.div-block-4 {
  display: block;
  width: 100vw;
}

.div-block-5 {
  width: 20px;
  height: 40px;
  margin-right: auto;
  margin-left: auto;
}

@media screen and (max-width: 991px) {
  .container {
    max-width: 728px;
    padding-right: 21px;
  }

  .pricing-grid {
    grid-column-gap: 30px;
  }

  .hero-wrapper {
    margin-bottom: -40px;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-pack: start;
    -webkit-justify-content: flex-start;
    -ms-flex-pack: start;
    justify-content: flex-start;
    -webkit-box-align: start;
    -webkit-align-items: flex-start;
    -ms-flex-align: start;
    align-items: flex-start;
  }

  .hero-split {
    max-width: 100%;
    margin-bottom: 40px;
  }

  .clients-info-two {
    padding-top: 26px;
    padding-bottom: 13px;
    padding-left: 22px;
  }

  .clients-quote-two-copy {
    font-size: 28px;
    line-height: 36px;
  }

  .html-embed {
    margin-top: -10px;
    padding-bottom: 12px;
  }
}

@media screen and (max-width: 767px) {
  .pricing-overview {
    padding: 60px 15px;
  }

  .hero-subscribe-right {
    padding: 60px 15px;
  }

  .logos-quote-divider {
    padding: 60px 15px;
  }

  .clients-wrapper-two {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
  }

  .clients-info-two {
    max-width: none;
    margin-bottom: 40px;
  }

  .clients-grid {
    margin-top: 15px;
    grid-column-gap: 40px;
    -ms-grid-columns: 1fr 1fr 1fr;
    grid-template-columns: 1fr 1fr 1fr;
  }

  .clients-info-two-copy {
    max-width: none;
    margin-bottom: 40px;
  }

  .clients-info-two-copy {
    max-width: none;
    margin-bottom: 40px;
  }
}

@media screen and (max-width: 479px) {
  .container {
    max-width: none;
  }

  .centered-heading {
    margin-bottom: 24px;
  }

  .pricing-grid {
    -ms-grid-columns: 1fr;
    grid-template-columns: 1fr;
  }

  .hero-form {
    margin-bottom: 15px;
    -webkit-align-self: stretch;
    -ms-flex-item-align: stretch;
    -ms-grid-row-align: stretch;
    align-self: stretch;
  }

  .hero-form-container {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-align: start;
    -webkit-align-items: flex-start;
    -ms-flex-align: start;
    align-items: flex-start;
  }

  .hero-form-input {
    width: 100%;
    height: 48px;
    margin-bottom: 10px;
  }

  .clients-quote-two {
    line-height: 32px;
  }

  .clients-info {
    display: -ms-grid;
    display: grid;
    grid-auto-columns: 1fr;
    grid-column-gap: 4px;
    grid-row-gap: 4px;
    -ms-grid-columns: 1fr 1fr 1fr;
    grid-template-columns: 1fr 1fr 1fr;
    -ms-grid-rows: auto;
    grid-template-rows: auto;
  }

  .clients-info-image {
    margin-right: 16px;
  }

  .clients-grid {
    grid-column-gap: 20px;
    grid-row-gap: 40px;
    -ms-grid-columns: 1fr 1fr;
    grid-template-columns: 1fr 1fr;
  }

  .clients-quote-two-copy {
    font-size: 24px;
    line-height: 32px;
  }

  .clients-info-copy {
    display: -ms-grid;
    display: grid;
    grid-auto-columns: 1fr;
    grid-column-gap: 4px;
    grid-row-gap: 4px;
    -ms-grid-columns: 1fr 1fr 1fr;
    grid-template-columns: 1fr 1fr 1fr;
    -ms-grid-rows: auto;
    grid-template-rows: auto;
  }
}

#w-node-_2c308f7b-16b8-9565-a993-2ffc0db39123-12428136 {
  -ms-grid-row: span 1;
  grid-row-start: span 1;
  -ms-grid-row-span: 1;
  grid-row-end: span 1;
  -ms-grid-column: span 2;
  grid-column-start: span 2;
  -ms-grid-column-span: 2;
  grid-column-end: span 2;
}

#w-node-_20d92d7f-5731-85c9-9293-5d9593e38f38-12428136 {
  -ms-grid-column: span 1;
  grid-column-start: span 1;
  -ms-grid-column-span: 1;
  grid-column-end: span 1;
  -ms-grid-row: span 1;
  grid-row-start: span 1;
  -ms-grid-row-span: 1;
  grid-row-end: span 1;
}

#w-node-_9a8b71a9-ea52-9e89-0a0e-f6f69b684ea6-12428136 {
  -ms-grid-column: span 2;
  grid-column-start: span 2;
  -ms-grid-column-span: 2;
  grid-column-end: span 2;
  -ms-grid-row: span 1;
  grid-row-start: span 1;
  -ms-grid-row-span: 1;
  grid-row-end: span 1;
}
`

export default cssString;