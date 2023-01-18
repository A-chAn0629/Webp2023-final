import { useEffect, useState } from "react";
import { fetchImages } from "./api";
import "/styles/style.css";
import nin_img from "/images/nintendo.png";
import ami_img from "/images/amiibo.png";

function Header() {
  return (
    <header className="hero is-info is-bold">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">Nintendo</h1>
        </div>
      </div>
    </header>
  );
}

function Image(props){
  return (
    <div className="card">
      <div className="card-image">
        <figure className="image">
          <img src={props.src} alt="chara"/>
        </figure>
      </div>
    </div>
  );
}

function Loading() {
  return <p>Loading...</p>;
}
  
function Gallery(props) {
  const{urls}=props;
  if (urls == null) {
    return <Loading />;
  }
  return (
      <div className="columns is-vcentered is-multiline">
      {urls.map((url) => {
          return (
            <div key={url} className="column is-3">
              <Image src={url.image} />
            </div>
          );
        })}
    </div>
  );
}
 
function Form(props) {
  function handleSubmit(event) {
    event.preventDefault();
    const { chara } = event.target.elements;
    props.onFormSubmit(chara.value);
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="field has-addons">
          <div className="control is-expanded">
            <div className="select is-fullwidth">
              <select name="chara" defaultValue="mario">
                <option value="mario">Mario</option>
                <option value="luigi">Luigi</option>
                <option value="peach">Peach</option>
                <option value="daisy">Daisy</option>
                <option value="link">Link</option>
                <option value="zelda">Zelda</option>
                <option value="inkling">Inkling</option>
                <option value="octoling">Octoling</option>
              </select>
            </div>
          </div>
          <div className="control">
            <button type="submit" className="button is-dark">
              Reload
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

function Main() {
  const [urls, setUrls] = useState(null);
  useEffect(() => {
    fetchImages("mario").then((urls) => {
      setUrls(urls);
    });
  }, []);
  
  function reloadImages(chara) {
    fetchImages(chara).then((urls) => {
       setUrls(urls);
    });
  }  
  return (
    <main>
      <section className="section">
        <div className="container">
          <Form onFormSubmit={reloadImages} />
        </div>
      </section>
      <section className="section">
        <div className="container">
          <Gallery urls={urls} />
        </div>
      </section>
      <section className="section">
        <div className="column is-vcentered is-multiline">
          <div className="tile is-parent">
            <article className="tile is-child box is-6">
              <div className="column">
                <div className="container">
                  <h1 className="title">Nintendo</h1>
                  <figure>
                    <a href="https://www.nintendo.co.jp/">
                      <p className="image_amiibo">
                        <img className="image_nintendo" src={nin_img} alt="nintendo" />
                      </p>
                    </a>
                  </figure>
                </div>
                <div className="image_body">
                  <p className="image_body_text">
                    ここからNintendoのページに移動
                  </p>
                </div>
              </div>
            </article>
            <article className="tile is-child box is-6">
              <div className="column ">
                <div className="container">
                  <h1 className="title">Amiibo</h1>
                  <figure>
                    <a href="https://www.nintendo.co.jp/hardware/amiibo/">
                      <p className="image_amiibo">
                        <img className="image_amiibo" src={ami_img} alt="amiibo" />
                      </p>
                    </a>
                  </figure>
                </div>
                <div className="image_body">
                  <p className="image_body_text">
                    ここからNintendoのAmiiboのページに移動
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="content has-text-centered">
      <p>Amiibo images are retrieved from AmiiboAPI</p>
        <p>
          <a href="https://www.amiiboapi.com/">Donate to AmiiboAPI</a>
        </p>
        <p>日本大学文理学部情報科学科 Webプログラミング最終課題 5421052 飯田愛結</p>
      </div>
    </footer>
  );
}

function App() {
  return (
    <div>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;