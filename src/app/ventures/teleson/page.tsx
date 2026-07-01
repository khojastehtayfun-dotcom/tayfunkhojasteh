'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import styles from './Teleson.module.css'

const STATS = [
  { num: '3Mio+', label: 'Vermittelte Kunden' },
  { num: '20+', label: 'Jahre Markterfahrung' },
  { num: '3.500+', label: 'Vertriebspartner' },
  { num: '10', label: 'Landesdirektionen' },
]

const BENEFITS = [
  {
    icon: '⚡',
    title: 'Produkt das jeder braucht',
    desc: 'Strom und Gas verbraucht jeder — täglich, ohne Ausnahme. Kein erklärungsbedürftiges Produkt, keine künstliche Nachfrage. Der Markt existiert bereits.'
  },
  {
    icon: '💰',
    title: 'Drei Einkommensströme',
    desc: 'Abschlussprovision pro Vertrag, Differenzprovision auf dein Team — und Folgeprovisionen solange dein Kunde bleibt. Passives Einkommen das wächst.'
  },
  {
    icon: '📱',
    title: 'TELESON-App & Partnerportal',
    desc: 'Tarifrechner, digitale Auftragserfassung, KI-Assistent "Teli", rSign für Fernabschlüsse — alles auf dem Smartphone. Kein Büro, kein Papier.'
  },
  {
    icon: '🎓',
    title: 'Kostenlose Ausbildung',
    desc: 'Video-Academy, persönliches 1-zu-1 Mentoring, wöchentliche Präsenztrainings und Zoom-Meetings. Du startest nicht allein — du startest mit System.'
  },
  {
    icon: '🏆',
    title: 'TELESON-Erfolgsweg',
    desc: '10 Karrierestufen vom Vertriebsassistenten bis zum Landesdirektor. Jede Stufe bringt höhere Provisionen. Erreichte Stufen bleiben — ohne monatliche Mindestanforderung.'
  },
  {
    icon: '🚀',
    title: 'Kein Startkapital nötig',
    desc: 'Kostenlose Registrierung, kein Lager, keine Investition, kein Risiko. Alles was du brauchst ist ein Smartphone und die Bereitschaft etwas aufzubauen.'
  },
]

const STEPS = [
  {
    num: '01',
    title: 'Unverbindlich melden',
    desc: 'Schreib mir kurz. Wir reden über das Konzept, deine Ziele und ob TELESON für dich passt. Kein Druck, keine Verpflichtung.'
  },
  {
    num: '02',
    title: 'Einarbeitung & Training',
    desc: 'Du bekommst Zugang zum Partnerportal und der Video-Academy. Dein persönlicher Mentor begleitet dich von Anfang an.'
  },
  {
    num: '03',
    title: 'Erste Aufträge generieren',
    desc: 'Mit der TELESON-App schließt du Verträge ortsunabhängig ab — auch remote per rSign. Erste Provisionen sind oft früh möglich.'
  },
  {
    num: '04',
    title: 'Team aufbauen & skalieren',
    desc: 'Jeder Auftrag deines Teams zählt für deinen Aufstieg. Differenz- und Folgeprovisionen schaffen dauerhaftes Einkommen.'
  },
]

export default function TelesonPage() {
  return (
    <main className={styles.page}>
      <Link href="/" className={styles.back}>← Zurück</Link>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <motion.span
            className={styles.badge}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Vertriebspartner gesucht
          </motion.span>

          <motion.h1
            className={styles.heroTitle}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
          >
            Bau dir<br />
            <span className={styles.green}>etwas auf.</span>
          </motion.h1>

          <motion.p
            className={styles.heroSub}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            TELESON ist seit über 20 Jahren Marktführer im deutschen
            Energiedirektvertrieb — über 3 Millionen vermittelte Kunden,
            3.500 Vertriebspartner, 10 Landesdirektionen bundesweit.
            Und die Mehrheit der Haushalte hat ihren Tarif noch nicht optimiert.
            Das ist dein Markt.
          </motion.p>

          <motion.div
            className={styles.heroCtas}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <a href="#kontakt" className={styles.ctaPrimary}>
              Jetzt Vertriebspartner werden ↗
            </a>
            <a href="#vorteile" className={styles.ctaOutline}>
              Mehr erfahren
            </a>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className={styles.statsBar}>
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            className={styles.statItem}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
            <span className={styles.statNum}>{s.num}</span>
            <span className={styles.statLabel}>{s.label}</span>
          </motion.div>
        ))}
      </section>

      {/* Über mich */}
      <section className={styles.about}>
        <div className={styles.aboutInner}>
          <div className={styles.aboutText}>
            <span className={styles.sectionEyebrow}>Wer ich bin</span>
            <h2 className={styles.sectionTitle}>
              Tayfun Khojasteh —<br />Vertriebspartner bei TELESON.
            </h2>
            <p className={styles.aboutDesc}>
              Ich habe im Energievertrieb angefangen bevor ich irgendetwas
              anderes hatte. Kein Netz, keine Connections, keine Sicherheit —
              nur die Überzeugung dass ein gutes System und konsequente Arbeit
              reichen um etwas aufzubauen. TELESON hat mir das bewiesen.
              Jetzt suche ich Menschen die dasselbe wollen.
            </p>
            <a href="#kontakt" className={styles.ctaSecondary}>
              Direkt schreiben ↗
            </a>
          </div>
          <div className={styles.aboutVisual}>
            <div className={styles.aboutImagePlaceholder}>
              <span>TK</span>
            </div>
          </div>
        </div>
      </section>

      {/* Market Opportunity */}
      <section className={styles.market}>
        <div className={styles.marketInner}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className={styles.sectionEyebrow} style={{ color: '#00a651' }}>
              Die Chance
            </span>
            <div className={styles.marketFlex}>
              <span className={styles.marketNum}>7,1 Mio.</span>
              <div>
                <h3 className={styles.marketTitle}>
                  Kunden wechselten 2024 ihren Energieanbieter —
                  ein neues Allzeithoch.
                </h3>
                <p className={styles.marketDesc}>
                  Wer den Grundversorger verlässt, spart im Schnitt mehrere
                  hundert Euro pro Jahr. 2024 sparten deutsche Haushalte
                  durch Wechsel insgesamt rund 2,2 Milliarden Euro.
                  Die Nachfrage nach qualifizierter Beratung ist größer denn je.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className={styles.benefits} id="vorteile">
        <div className={styles.benefitsHeader}>
          <span className={styles.sectionEyebrow}>Deine Vorteile</span>
          <h2 className={styles.sectionTitle}>Was TELESON dir bietet.</h2>
        </div>
        <div className={styles.benefitsGrid}>
          {BENEFITS.map((b, i) => (
            <motion.div
              key={b.title}
              className={styles.benefitCard}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <span className={styles.benefitIcon}>{b.icon}</span>
              <h3 className={styles.benefitTitle}>{b.title}</h3>
              <p className={styles.benefitDesc}>{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Erfolgsweg */}
      <section className={styles.karriere}>
        <div className={styles.karriereInner}>
          <span className={styles.sectionEyebrow}>Der TELESON-Erfolgsweg</span>
          <h2 className={styles.sectionTitle}>10 Stufen. Ein System.</h2>
          <p className={styles.karriereDesc}>
            Vom Vertriebsassistenten bis zum Landesdirektor — jede Stufe
            bringt höhere Provisionen. Erreichte Stufen bleiben erhalten,
            ohne monatliche Mindestanforderungen. Dein Teamaufbau beschleunigt
            jeden Schritt nach oben.
          </p>
          <div className={styles.stufenRow}>
            {['Vertriebsassistent', 'Fachberater', 'Gruppenleiter', 'Organisationsleiter', 'Verkaufsleiter', 'Bezirksleiter', 'Bezirksdirektor', 'Distriktdirektor', 'Regionaldirektor', 'Landesdirektor'].map((stufe, i) => (
              <div key={stufe} className={styles.stufe}>
                <span className={styles.stufeNum}>{String(i + 1).padStart(2, '0')}</span>
                <span className={styles.stufeName}>{stufe}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className={styles.process}>
        <div className={styles.processHeader}>
          <span className={styles.sectionEyebrow}>So geht's los</span>
          <h2 className={styles.sectionTitle}>4 Schritte. Fertig.</h2>
        </div>
        <div className={styles.processSteps}>
          {STEPS.map((s, i) => (
            <motion.div
              key={s.num}
              className={styles.processStep}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
            >
              <span className={styles.processNum}>{s.num}</span>
              <div>
                <h3 className={styles.processTitle}>{s.title}</h3>
                <p className={styles.processDesc}>{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className={styles.finalCta} id="kontakt">
        <motion.p
          className={styles.finalEyebrow}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Bereit?
        </motion.p>
        <motion.h2
          className={styles.finalTitle}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Eine Entscheidung.<br />Dein Aufbau beginnt jetzt.
        </motion.h2>
        <motion.p
          className={styles.finalSub}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Schreib mir direkt — kein Risiko, kein Startkapital, keine festen Zeiten.
          Nur ein kurzes Gespräch darüber ob es für dich passt.
        </motion.p>
        <motion.a
          href="mailto:info@tayfunkhojasteh.com"
          className={styles.ctaFinal}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Jetzt schreiben ↗
        </motion.a>
        <motion.p
          className={styles.finalNote}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          * Provisionen hängen von persönlichem Einsatz, Karrierestufe, Tarif und Kundenkategorie ab.
          Selbstständige Tätigkeit. Keine Einkommensgarantie.
        </motion.p>
      </section>
    </main>
  )
}