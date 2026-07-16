import i18n from "i18next";
import { initReactI18next } from "react-i18next";

export type Lang = "pl";
export const LANGS: Lang[] = ["pl"];

const LEGAL_PL = `AxelReps to niezależny, prowadzony przez społeczność serwis informacyjny o chińskim rynku replik. NIE jesteśmy powiązani z żadnym marketplace'em, marką ani platformą logistyczną, w tym między innymi z LitBuy, Kakobuy, Superbuy, CSSBuy, Basetao, Sugargoo, Ponybuy, Hoobuy, Allchinabuy, Wegobuy, Weidian, Taobao, 1688 ani ich podmiotami powiązanymi.

Wszystkie nazwy produktów, marek, logotypy i znaki towarowe prezentowane na tej stronie pozostają własnością odpowiednich właścicieli i są używane wyłącznie w celach identyfikacyjnych oraz informacyjnych.

Linki do stron zewnętrznych, w tym przyciski produktów, mogą być linkami polecającymi. Możemy otrzymać niewielką prowizję bez dodatkowych kosztów dla Ciebie. Nie wpływa to na nasze wybory — produkty są dobierane niezależnie.

Ceny mają charakter orientacyjny i mogą się różnić między agentami, batchami oraz w czasie. Wysyłka, cło i opłaty importowe są po stronie kupującego. Korzystając z tej strony przyjmujesz do wiadomości, że zakup replik może być ograniczony w Twoim kraju i robisz to na własne ryzyko.

Nie hostujemy, nie sprzedajemy, nie sprawdzamy, nie pakujemy, nie wysyłamy i nie gwarantujemy żadnych produktów. Pomagamy jedynie je znaleźć, sprawdzić zdjęcia QC, przeczytać poradniki i śledzić paczki.`;

const resources = {
  pl: {
    translation: {
      nav: {
        home: "Start",
        products: "Produkty",
        tracking: "Śledzenie",
        qc: "QC",
        tutorials: "Poradniki",
        sellers: "Sprzedawcy",
        wtyczka: "Nasza wtyczka",
        register: "Oferta KakoBuy",
      },
      landing: {
        eyebrow: "AxelReps × KakoBuy · streetwear · hypebeast",
        title_1: "AXELREPS ×",
        title_2: "KAKOBUY",
        tagline: "Twój plug do rep game. Najszybsze zdjęcia QC, sprawdzone typy, tańsze haule.",
        find_qc: "QC",
        browse_products: "Produkty",
        tracking: "Śledzenie",
        latest_picks: "Najnowsze wybory",
        admin_login: "Logowanie do panelu admina",
      },
      settings: {
        title: "Ustawienia",
        currency: "Waluta (tylko produkty)",
        turn_off_promo: "Wyłącz popup promocyjny",
      },
      product: {
        buy: "Kup przez KakoBuy",
        price_warning_title: "Informacja o cenach",
        price_warning_body:
          "Niektóre ceny widoczne w zakładce produkty mogą się znacznie różnić od aktualnych cen oferowanych przez sprzedawców. Nie polegaj wyłącznie na cenach w arkuszu — rzeczywistą cenę zobaczysz po otwarciu produktu u agenta.",
      },
      tracking: {
        title: "Śledź paczkę",
        subtitle: "Wklej numer paczki — pobierzemy najnowsze aktualizacje.",
        placeholder: "Numer śledzenia",
        cta: "Śledź",
        help: "Sprawdź poradnik śledzenia",
      },
      qc: {
        eyebrow: "Wyszukiwarka zdjęć QC",
        title_1: "Najlepszy",
        title_2: "i najszybszy QC Finder",
        subtitle: "Wklej link do produktu z chińskiego agenta. Pobierzemy pasujące zdjęcia QC.",
        placeholder: "Wklej link (Taobao, Weidian, 1688, agent…)",
        cta: "Szukaj QC",
        empty: "Twoje zdjęcia QC pojawią się tutaj.",
        loading: "Pobieranie zdjęć QC…",
        no_results: "Nie znaleziono zdjęć QC dla tego linku.",
      },
      tutorials: { title: "Poradniki", prev: "Poprzedni krok", next: "Następny krok", step: "Krok" },
      sellers: { title: "Zaufani sprzedawcy", best_for: "Najlepsze dla", rating: "Ocena" },
      legal: { title: "Nota prawna", button: "Nota prawna", body: LEGAL_PL },
      credit: { button: "Coded by @osk1xx.x" },
      promo: {
        header: "Oferta specjalna",
        cta: "Odbierz ofertę KakoBuy →",
      },
      admin: {
        login: "Logowanie admina",
        pin: "PIN admina",
        sign_in: "Zaloguj",
        wrong: "Błędny PIN",
        logout: "Wyloguj",
      },
      common: {
        loading: "Ładowanie…",
        cancel: "Anuluj",
        save: "Zapisz",
        delete: "Usuń",
        edit: "Edytuj",
        add: "Dodaj",
        search: "Szukaj",
        remind_later: "Może później",
        close: "Zamknij",
        menu: "Menu",
      },
    },
  },
};

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    lng: "pl",
    fallbackLng: "pl",
    initImmediate: false,
    interpolation: { escapeValue: false },
    // returnObjects=false so t("landing") never renders "..,.." from a nested obj.
    returnObjects: false,
    react: {
      // Render synchronously — resources are baked in, avoid the transient
      // "landing.browse_products" flash while the tree suspends.
      useSuspense: false,
    },
  });
}

export default i18n;
