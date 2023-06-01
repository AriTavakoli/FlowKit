let txt = `
body {
  font-family: Arial, sans-serif;
  background-color: #f2f2f2;
}

/* responsive styles */
@media (max-width: 768px) {
  body {
    font-size: 14px;
  }
}
@media (min-width: 769px) {
  body {
    font-size: 16px;
  }

/* class selectors */
.text-center {
  text-align: center;
}

.text-bold {
  font-weight: bold;
}

.text-underline {
  text-decoration: underline;
}
@media screen and (max-width: 599px) {
  .bar {
    font-size: 14px;
  }
}


@media (min-width: 480px) {
  .small-class {
    font-size: 14px;
  }
}

@media (min-width: 768px) {
  .medium-class {
    font-size: 16px;
  }
}

@media (min-width: 1024px) {
  .large-class {
    font-size: 18px;
  }
}
.bg-color::hover {
  background-color: #ccc;
}
.my-class::before {
  content: '';
}
a::after {
  content: ' (link)';
}
h1::before {
  content: 'Chapter: ';
}

/* ID selector */
#header {
  height: 50px;
  background-color: #333;
  color: #fff;
}
h1::before {
  content: 'Chapter: ';
}

.my-class::before {
  content: '';
}

/* element selectors */
h1 {
  font-size: 32px;
}

p {
  line-height: 1.5;
}

/* pseudo classes */
a:hover {
  color: blue;
}

/* font styles */
em {
  font-style: italic;
}

strong {
  font-weight: bold;
}

/* box model properties */
.box {
  border: 1px solid black;
  padding: 10px;
  margin: 10px;
}

/* flexbox */
.flex-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.flex-item {
  flex: 1;
}

/* grid */
.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 10px;
}
body {
  background-color: #eaeef1;
  font-family: Roboto, sans-serif;
  color: #333;
  font-size: 14px;
  line-height: 20px;
}

a {
  color: #44565c;
  text-decoration: underline;
}

.body {
  color: #44565c;
}

.website-container {
  width: 100%;
  min-height: 100vh;
  padding: 30px;
  outline-color: #44565c;
  outline-offset: 0px;
  outline-style: solid;
  outline-width: 3px;
  font-family: Roboto, sans-serif;
  line-height: 120%;
}

.top-bar {
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  padding-right: 41px;
  padding-left: 46px;
  -webkit-box-pack: end;
  -webkit-justify-content: flex-end;
  -ms-flex-pack: end;
  justify-content: flex-end;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}

.app-link {
  margin-left: 12px;
}

.app-menu {
  width: 24px;
}

.profile-icon {
  width: 40px;
  padding-right: 41px;
  padding-left: 39px;
}

.search-area {
  display: inline-block;
  margin-top: -83px;
  margin-bottom: 14px;
  padding: 0px 31px 26px 16px;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: stretch;
  -webkit-align-items: stretch;
  -ms-flex-align: stretch;
  align-items: stretch;
  background-color: #6f6464;
  box-shadow: 5px 5px 11px 0 #000;
  opacity: 0.24;
  -webkit-filter: blur(4px);
  filter: blur(4px);
  -webkit-transition: text-indent 200ms ease;
  transition: text-indent 200ms ease;
  font-weight: 500;
  text-transform: capitalize;
  white-space: nowrap;
  mix-blend-mode: overlay;
  -o-object-fit: contain;
  object-fit: contain;
}

.spacing80 {
  height: 80px;
  margin-top: -67px;
  padding-top: 24px;
  padding-bottom: 4px;
  padding-left: 118px;
}

.brand-icon {
  display: block;
  width: 190px;
  margin-right: auto;
  margin-left: auto;
}

.spacing60 {
  display: block;
  height: 60px;
}

.search-box {
  overflow: hidden;
  width: 780px;
  max-width: 780px;
  margin-right: auto;
  margin-left: auto;
  padding: 0px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 10px 40px 0 rgba(68, 86, 92, 0.05);
}

.search-form-group {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  height: 100px;
  padding-right: 20px;
  padding-left: 20px;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}

.collection-list-group {
  display: block;
  width: 100%;
  padding: 20px 10px 10px;
  border-top: 1px solid rgba(68, 86, 92, 0.2);
}

.collection-list-group._2 {
  padding-top: 0px;
  border: 1px none #000;
}

.no-results-group {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 500px;
  padding: 20px 20px 18px;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}

.search-icon {
  position: relative;
}

.search-form {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  margin-bottom: 0px;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}

.submit-button {
  display: none;
}

.search {
  width: 680px;
  height: auto;
  margin-bottom: 0px;
  padding: 0px;
  border: 1px none #000;
  color: #44565c;
  font-size: 28px;
}

.search:focus {
  border-style: none;
}

.search::-webkit-input-placeholder {
  color: #aebbbe;
  font-weight: 400;
}

.search:-ms-input-placeholder {
  color: #aebbbe;
  font-weight: 400;
}

.search::-ms-input-placeholder {
  color: #aebbbe;
  font-weight: 400;
}

.search::placeholder {
  color: #aebbbe;
  font-weight: 400;
}

.search.jetboost-list-search-input-x4q9 {
  height: 70px;
}

.small-text {
  color: #646e70;
}

.small-text.cc-name {
  margin-left: 10px;
}

.left-information {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  font-size: 20px;
}

.custom-browse-button {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  height: 50px;
  padding: 18px;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  border-radius: 10px;
  background-color: #eff1f2;
  -webkit-transition: background-color 300ms ease;
  transition: background-color 300ms ease;
  color: #44565c;
  text-decoration: none;
}

.custom-browse-button:hover {
  background-color: #d8dbdd;
}

.no-result-icon {
  margin-right: 15px;
}

.arrow-icon {
  margin-left: 10px;
}

.footer {
  position: fixed;
  left: 0%;
  top: auto;
  right: 0%;
  bottom: 0%;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  padding: 30px;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  background-color: #e0e6eb;
  font-size: 16px;
}

.footer-right {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: end;
  -webkit-justify-content: flex-end;
  -ms-flex-pack: end;
  justify-content: flex-end;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}

.footer-logo {
  margin-left: 10px;
}

.empty-state {
  display: none;
}

.book-item {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  overflow: hidden;
  margin-top: 5px;
  margin-right: 10px;
  margin-bottom: 5px;
  padding: 20px 10px;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  border-radius: 10px;
  -webkit-transition: background-color 300ms ease;
  transition: background-color 300ms ease;
  color: #44565c;
  text-decoration: none;
}

.book-item:hover {
  background-color: #eff1f2;
}

.book-item._2 {
  width: 500px;
  -webkit-box-pack: start;
  -webkit-justify-content: flex-start;
  -ms-flex-pack: start;
  justify-content: flex-start;
}

.book-information {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}

.book-cta {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 106px;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  color: #aaadaf;
}

.category-name {
  margin-right: 20px;
  padding: 8px 12px;
  border-radius: 5px;
  color: #fff;
  font-size: 12px;
  line-height: 1;
}

.book-name {
  font-size: 18px;
  line-height: 1;
}

.books-list {
  margin-top: 20px;
  margin-bottom: 10px;
}

.collection-list-wrapper {
  display: block;
}

.dropdown {
  margin-right: auto;
  margin-left: 0px;
}

.dropdown-list {
  background-color: #eaeef1;
}

.dropdown-list.w--open {
  padding: 0px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 20px 80px 0 rgba(100, 110, 112, 0.16);
}

.dropdown-toggle {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  font-size: 16px;
}

.dropdown-toggle.w--open {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  border-radius: 10px;
  background-color: #e0e6eb;
  font-size: 16px;
}

.hint {
  position: absolute;
  left: 117px;
  top: 56px;
  right: auto;
  bottom: auto;
  width: 140px;
}

.no-results-container {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 300px;
  height: 100px;
  padding: 16px;
  -webkit-justify-content: space-around;
  -ms-flex-pack: distribute;
  justify-content: space-around;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  border-radius: 12px;
  background-color: #d5d5d5;
}

.no-results-text {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
}

.text-block-2 {
  font-size: 20px;
}

@media screen and (max-width: 991px) {
  .search-box {
    width: auto;
  }

  .search {
    width: auto;
  }
}

@media screen and (max-width: 767px) {
  .website-container {
    padding-bottom: 140px;
  }

  .no-results-group {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    text-align: center;
  }

  .left-information {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
  }

  .custom-browse-button {
    margin-top: 30px;
  }

  .no-result-icon {
    margin-right: 0px;
    margin-bottom: 20px;
  }

  .footer {
    position: relative;
    height: 120px;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
  }

  .book-item {
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    -ms-flex-pack: justify;
    justify-content: space-between;
  }

  .book-item._2 {
    width: 240px;
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

  .book-cta {
    width: auto;
  }

  .category-name._2 {
    margin-bottom: 15px;
  }

  .book-name {
    line-height: 130%;
  }

  .cta-name {
    display: none;
  }

  .image {
    width: 20px;
    height: 20px;
    min-height: 20px;
    min-width: 20px;
  }
}

@media screen and (max-width: 479px) {
  .website-container {
    min-height: auto;
    padding-right: 20px;
    padding-bottom: 160px;
    padding-left: 20px;
  }

  .search-area {
    width: 100%;
  }

  .brand-icon {
    width: 150px;
  }

  .search-box {
    width: 100%;
  }

  .search-icon {
    left: 0px;
    width: 30px;
  }

  .search {
    font-size: 20px;
  }

  .left-information {
    line-height: 140%;
  }

  .footer {
    height: auto;
  }

  .footer-left {
    margin-bottom: 17px;
  }

  .book-item {
    margin-top: 0px;
    padding-top: 24px;
    -webkit-box-align: start;
    -webkit-align-items: flex-start;
    -ms-flex-align: start;
    align-items: flex-start;
    border-bottom: 1px solid rgba(224, 230, 235, 0.5);
    border-radius: 0px;
  }

  .book-information {
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

  .book-cta {
    display: none;
  }

  .category-name {
    margin-bottom: 10px;
  }

  .image-2 {
    display: none;
  }

  .text-block {
    line-height: 150%;
    text-align: center;
  }
}



/* animations */
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.fade {
  animation: fade-in 1s ease-in-out;
}
`

export default txt