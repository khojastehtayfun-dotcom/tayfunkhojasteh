import styles from './legal.module.css'

export default function Impressum() {
  return (
    <main className={styles.legal}>
      <a href="/" className={styles.back}>← Zurück</a>
      <h1>Impressum</h1>

      <section>
        <h2>Angaben gemäß § 5 TMG</h2>
        <p>
          Tayfun Khojasteh<br />
          {/* TODO: Adresse eintragen */}
          Musterstraße 1<br />
          12345 Musterstadt<br />
          Deutschland
        </p>
      </section>

      <section>
        <h2>Kontakt</h2>
        <p>
          {/* TODO: Telefon + E-Mail eintragen */}
          E-Mail: mail@tayfunkhojasteh.com
        </p>
      </section>

      <section>
        <h2>Haftungsausschluss</h2>
        <p>
          Die Inhalte dieser Website wurden mit größter Sorgfalt erstellt.
          Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte
          kann jedoch keine Gewähr übernommen werden.
        </p>
      </section>
    </main>
  )
}
