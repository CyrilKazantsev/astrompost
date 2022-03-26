import React from "react";
import "./style.css";
// import cn from "classnames";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__wrapper">
          <div className="footer__col">
            <h1 className="footer__copyright">
              © "Astrom Post. Все права незащищены"
            </h1>
          </div>
          <div className="footer__col">
            <nav className="menu-bottom">
              <a href="/news" className="menu-bottom__item">
                Новости (пока не работает)
              </a>
              <a href="/feedback" className="menu-bottom__item">
                Отзывы (пока не рабоатет)
              </a>
            </nav>
          </div>
          <div className="footer__col">
            <nav className="menu-bottom">
              <a href="/feedback" className="menu-bottom__item">
                Обратная связь (пока не рабоатет)
              </a>
              <a href="/contacts" className="menu-bottom__item">
                Контакты (пока не рабоатет)
              </a>
            </nav>
          </div>
          <div className="footer__col">
            <div className="contacts">
              <p className="contacts__title">Мы не на связи</p>
              <a
                className="contacts__tel contacts__link"
                href="tel:89221413505"
              >
                +5 (053) 141-22-97
              </a>
              <a
                className="contacts__mail contacts__link"
                href="mailto:kir.kazancef@yandex.ru"
              >
                astrompost@help.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
