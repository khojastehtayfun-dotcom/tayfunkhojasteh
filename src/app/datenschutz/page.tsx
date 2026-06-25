import styles from '../impressum/legal.module.css'

export default function Datenschutz() {
  return (
    <main className={styles.legal}>
      <a href="/" className={styles.back}>← Zurück</a>
      <h1>Datenschutzerklärung</h1>

      <section>
        <h2>1. Verantwortlicher</h2>
        <p>
          Tayfun Khojasteh<br />
          {/* TODO: Adresse eintragen */}
          Musterstraße 1, 12345 Musterstadt<br />
          E-Mail: mail@tayfunkhojasteh.com
        </p>
      </section>

      <section>
        <h2>2. Erhebung von Daten</h2>
        <p>
          Diese Website erhebt beim Besuch automatisch technische Daten
          (IP-Adresse, Browser, Betriebssystem) die für den Betrieb
          erforderlich sind. Diese Daten werden nicht an Dritte weitergegeben.
        </p>
      </section>

      <section>
        <h2>3. Cookies</h2>
        <p>
          Diese Website verwendet Cookies um die Nutzererfahrung zu verbessern.
          Sie können der Verwendung von Cookies jederzeit widersprechen.
        </p>
      </section>

      <section>
        <h2>4. Kontaktformular</h2>
        <p>
          Daten die Sie über das Kontaktformular übermitteln werden
          ausschließlich zur Bearbeitung Ihrer Anfrage verwendet
          und nicht gespeichert oder weitergegeben.
        </p>
      </section>

      <section>
        <h2>5. Ihre Rechte</h2>
        <p>
          Sie haben das Recht auf Auskunft, Berichtigung, Löschung und
          Einschränkung der Verarbeitung Ihrer Daten. Wenden Sie sich
          dazu an: mail@tayfunkhojasteh.com
        </p>
      </section>
    </main>
  )
}
