/**
 * English copy of the project mock screens.
 *
 * The screens in `project-art.ts` are written in Italian. `mockToEnglish` swaps every text
 * node (and placeholder/title/aria-label/alt) found in `en`, and rewrites Italian number
 * formats (1.842 € → €1,842, 4,8% → 4.8%). Markup and styles stay untouched, so the
 * English screen keeps the exact layout of the Italian one.
 */
const en: Record<string, string> = {
  // ------------------------------------------------------------- shared
  'Cerca…': 'Search…',
  Oggi: 'Today',
  ieri: 'yesterday',
  lun: 'Mon',
  Ticket: 'Tickets',
  'Nuova chat': 'New chat',
  Calendario: 'Calendar',
  Contratti: 'Contracts',
  Clienti: 'Customers',
  Ordini: 'Orders',
  Rete: 'Network',
  Panoramica: 'Overview',
  Bozza: 'Draft',

  // ------------------------------------------------------------- cedolino
  Cedolini: 'Payslips',
  Previsione: 'Forecast',
  Anno: 'Year',
  Presenze: 'Attendance',
  'Prossimo cedolino · Dicembre': 'Next payslip · December',
  Tipico: 'Typical',
  Atteso: 'Expected',
  'Arriva il 27': 'Arrives on the 27th',
  'Ultimo cedolino · Novembre': 'Last payslip · November',
  Netto: 'Net',
  'Cosa cambia': 'What changed',
  '+86 € straordinari': '+€86 overtime',
  '−32 € tasse': '−€32 tax',
  'Netto medio': 'Average net',
  'Ore lavorate': 'Hours worked',
  'Ferie residue': 'Leave left',
  '12 gg': '12 days',
  'TFR maturato': 'Severance pay',
  'Netto e trattenute · ultimi 12 mesi': 'Net and deductions · last 12 months',
  Trattenute: 'Deductions',
  'Ultimo · Novembre': 'Last · November',
  'Netto per mese': 'Net per month',
  // Month initials: G(ennaio), G(iugno) → J; L(uglio) → J.
  G: 'J',
  L: 'J',

  // ------------------------------------------------------------- heimdall
  // Pipeline, Commit, Deploy, Build and Review are already English and stay as they are.
  'Pull request': 'Pull requests',
  Tag: 'Tags',
  Promemoria: 'Reminders',
  Statistiche: 'Statistics',
  Monitoraggio: 'Monitoring',
  Costi: 'Costs',
  Impostazioni: 'Settings',
  'PANORAMICA · OGGI': 'OVERVIEW · TODAY',
  'in ordine': 'all green',
  ', 3 pull request': ', 3 pull requests',
  'aspettano review': 'waiting for review',
  Settimana: 'Week',
  'Aggiorna ora': 'Refresh now',
  'Ultime 24 ore': 'Last 24 hours',
  eventi: 'events',
  'Build riuscite': 'Successful builds',
  'PR aperte': 'Open PRs',
  '3,4 h': '3.4 h',
  'Login con SSO': 'SSO login',
  'Widget costi': 'Costs widget',
  Approvata: 'Approved',
  'Filtri board': 'Board filters',
  fallita: 'failed',
  'Rilascio di venerdì': 'Friday release',
  'Review con il team': 'Team review',
  'Aggiornare i tag': 'Update the tags',
  'Nuova vista della board': 'New board view',
  'Filtri salvati per i tag': 'Saved tag filters',
  'Promemoria ricorrenti': 'Recurring reminders',

  // ------------------------------------------------------------- hermes-chat
  'Nuovo gruppo': 'New group',
  Conversazioni: 'Conversations',
  Menzioni: 'Mentions',
  Gruppi: 'Groups',
  'Cerca persone o messaggi': 'Search people or messages',
  Tutte: 'All',
  'Non lette': 'Unread',
  'Ti ho girato il ticket #T-204': 'I passed you ticket #T-204',
  'Ok per domani alle 10': 'OK for tomorrow at 10',
  'Team rete': 'Network team',
  'Marco: rilascio confermato': 'Marco: release confirmed',
  'Grazie mille!': 'Thanks a lot!',
  'Il ticket sul login è stato riaperto, riesci a guardarlo oggi?':
    'The login ticket was reopened, can you look at it today?',
  'Lo prendo io,': 'I’ll take it,',
  '. Ti aggiorno a fine giornata.': '. I’ll update you by the end of the day.',
  'Perfetto, grazie!': 'Perfect, thanks!',
  'Luca sta scrivendo': 'Luca is typing',
  'Scrivi un messaggio…': 'Write a message…',

  // ------------------------------------------------------------- ide-lite
  'Apri file…': 'Open file…',
  ESPLORA: 'EXPLORER',
  '// apre un file e ne restituisce il testo': '// opens a file and returns its text',
  '"avvio non riuscito"': '"failed to start"',
  salva: 'save',
  annulla: 'cancel',
  'feat: pannello git': 'feat: git panel',
  'fix: scroll tab': 'fix: tab scroll',
  'feat: grafo rami': 'feat: branch graph',
  '● 2 modifiche': '● 2 changes',

  // ------------------------------------------------------------- metis
  Distributori: 'Distributors',
  Catalogo: 'Catalog',
  Carriera: 'Career',
  Commissioni: 'Commissions',
  'Ufficio virtuale': 'Virtual office',
  'Ciao, Mattia': 'Hi, Mattia',
  'Ecco come sta andando la tua rete': 'Here’s how your network is doing',
  Personalizza: 'Customize',
  'La mia posizione': 'My position',
  'Livello 3': 'Level 3',
  '64% verso il livello 4': '64% to level 4',
  'Riepilogo rete': 'Network summary',
  'Nuovi iscritti': 'New sign-ups',
  'Ordini rete': 'Network orders',
  'Saldo wallet': 'Wallet balance',
  Preleva: 'Withdraw',
  Movimenti: 'Transactions',
  'La tua rete': 'Your network',
  'Call con il team': 'Team call',
  'Consegna ordini': 'Order delivery',
  'Formazione nuovi': 'Newcomer training',
  'Ciao, bentornato': 'Hi, welcome back',
  'Provvigioni del mese': 'Commissions this month',
  'rispetto al mese scorso': 'vs last month',
  'Distributori attivi': 'Active distributors',
  'Ordini del mese': 'Orders this month',
  'Livello carriera': 'Career level',
  'Ultimi ordini': 'Latest orders',

  // ------------------------------------------------------------- prometheus
  'Cerca conversazioni…': 'Search conversations…',
  'Piano di oggi': 'Today’s plan',
  '3 priorità per stamattina': '3 priorities for this morning',
  'Riepilogo settimana': 'Weekly summary',
  'Contratti +8% sulla scorsa': 'Contracts +8% on last week',
  'Ticket in scadenza': 'Tickets due soon',
  '2 ticket scadono domani': '2 tickets due tomorrow',
  'Obiettivi del mese': 'Monthly goals',
  'Sei al 72% dell’obiettivo': 'You’re at 72% of the goal',
  'Bozza comunicazione': 'Draft announcement',
  'Ecco una prima versione…': 'Here’s a first draft…',
  Critico: 'Critical',
  '3 ticket scadono oggi': '3 tickets due today',
  Attenzione: 'Warning',
  'Obiettivo vendite al 72%': 'Sales goal at 72%',
  Positivo: 'Positive',
  'Contratti +8% in settimana': 'Contracts +8% this week',
  'Da cosa parto?': 'Where do I start?',
  'Partirei dai 3 ticket critici: due riguardano lo stesso punto vendita, conviene gestirli insieme.':
    'I’d start with the 3 critical tickets: two are about the same store, so it’s worth handling them together.',
  'Apri i ticket critici': 'Open the critical tickets',
  'Prepara un riepilogo': 'Prepare a summary',
  'Mostra gli obiettivi': 'Show the goals',
  'Scrivi a Prometheus…': 'Message Prometheus…',
  'Le risposte sono generate dall’AI e possono contenere errori.':
    'Answers are generated by AI and may contain mistakes.',
  'STRUMENTI ATTIVI': 'ACTIVE TOOLS',
  Obiettivi: 'Goals',
  Report: 'Reports',
  'Cosa devo fare oggi?': 'What should I do today?',
  'Richiamare due clienti': 'Call back two customers',
  Alta: 'High',
  'Chiudere i ticket aperti': 'Close the open tickets',
  Media: 'Medium',
  'Rivedere gli obiettivi': 'Review the goals',
  Bassa: 'Low',
  'Bozza email': 'Draft email',
  'Chiedi a Prometheus…': 'Ask Prometheus…',

  // ------------------------------------------------------------- taglieroteca
  'gestione del locale': 'venue management',
  Prenotazioni: 'Bookings',
  Eventi: 'Events',
  Menù: 'Menu',
  Paghe: 'Payroll',
  Personale: 'Staff',
  Magazzino: 'Inventory',
  Fornitori: 'Suppliers',
  'Lunedì · servizio serale': 'Monday · evening service',
  'Buongiorno,': 'Good morning,',
  'Nuova prenotazione': 'New booking',
  'Nuovo evento': 'New event',
  Coperti: 'Covers',
  'Oggi al locale': 'Today at the venue',
  'Luca · sala': 'Luca · floor',
  'Anna · cucina': 'Anna · kitchen',
  'Marco · banco': 'Marco · counter',
  'Tavolo 4 · 6 persone': 'Table 4 · 6 guests',
  'Compleanno · 18 persone': 'Birthday · 18 guests',
  'Live acustico': 'Acoustic live set',
  'Da sistemare': 'To sort out',
  'Ordinare il pane': 'Order the bread',
  'Confermare la band': 'Confirm the band',
  'Turni di sabato': 'Saturday shifts',
  'Fattura fornitore': 'Supplier invoice',
  'Confermare il tavolo delle 20:30': 'Confirm the 20:30 table',
  'Ordine dei vini': 'Wine order',

  // ------------------------------------------------------------- theia-ui
  Componenti: 'Components',
  Temi: 'Themes',
  Documentazione: 'Docs',
  'Demo live': 'Live demo',
  'Libreria Angular · componenti standalone': 'Angular library · standalone components',
  'Componenti accessibili e temi pronti per tutte le web app dell’ecosistema.':
    'Accessible components and ready themes for every app in the ecosystem.',
  Inizia: 'Get started',
  componenti: 'components',
  temi: 'themes',
  schemi: 'schematics',
  'Demo · Dashboard ordini': 'Demo · Orders dashboard',
  Conversione: 'Conversion',
  'Libreria Angular · standalone': 'Angular library · standalone',

  // ------------------------------------------------------------- themis
  Comunicazioni: 'Announcements',
  Richieste: 'Requests',
  'Punti vendita': 'Stores',
  Formazione: 'Training',
  Gare: 'Contests',
  'Buongiorno, Mattia': 'Good morning, Mattia',
  IT: 'EN',
  'Questo mese ▾': 'This month ▾',
  Negozio: 'Store',
  '↑ 12% sul mese scorso': '↑ 12% on last month',
  Attive: 'Active',
  'In corso': 'In progress',
  Pratiche: 'Applications',
  'Andamento della rete': 'Network performance',
  Fatturato: 'Revenue',
  'Punti attivi': 'Active stores',
  'su 140 in rete': 'of 140 total',
  'Hai 3 richieste da gestire oggi': 'You have 3 requests to handle today',
  'Ultime comunicazioni': 'Latest announcements',
  'Nuovo listino': 'New price list',
  'Corso di aggiornamento': 'Refresher course',
  'Obiettivi di novembre': 'November goals',
  Profilo: 'Profile',
};

const decode = (value: string): string =>
  value
    .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, '\'')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');

const encode = (value: string): string =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Italian number formats in strings with no words: 1.842 € → €1,842, 4,8% → 4.8%. */
const numbers = (text: string): string =>
  text
    .replace(/(\d)\.(\d{3})/g, '$1\u0000$2')
    .replace(/(\d),(\d)/g, '$1.$2')
    .replace(/\u0000/g, ',')
    .replace(/^([+−-]?)([\d.,]+)\s?€$/, '$1€$2');

const translate = (raw: string): string => {
  const core = raw.trim();
  if (!core) return raw;
  const key = decode(core).replace(/\s+/g, ' ');
  const match = en[key];
  let value: string;
  if (match !== undefined) value = encode(match);
  else if (!/\p{L}{2,}/u.test(key)) value = numbers(core);
  else return raw;
  const start = raw.indexOf(core);
  return raw.slice(0, start) + value + raw.slice(start + core.length);
};

/** English version of a mock screen; `<style>` blocks are left as they are. */
export const mockToEnglish = (html: string): string =>
  html
    .split(/(<style[\s\S]*?<\/style>)/)
    .map((part) =>
      part.startsWith('<style')
        ? part
        : part
            .replace(/>([^<>]+)</g, (_, text: string) => `>${translate(text)}<`)
            .replace(
              /\b(placeholder|title|aria-label|alt)="([^"]*)"/g,
              (_, name: string, value: string) => `${name}="${translate(value)}"`,
            ),
    )
    .join('');
