export type MiddleClassTrapReading = {
  title: string;
  author: string;
  introduction: readonly [string, string, string, string, string, string];
  href: string;
  linkLabel: string;
};

export const MIDDLE_CLASS_TRAP_READING: readonly MiddleClassTrapReading[] = [
  {
    title: 'Hurra, wir dürfen zahlen: Der Selbstbetrug der Mittelschicht',
    author: 'Ulrike Herrmann (2010, German)',
    introduction: [
      'This is the book that most directly inspired the quiz.',
      'Herrmann asks why many middle-income people see themselves as closer to the wealthy than their finances suggest.',
      'She examines taxes, status, inherited advantage and the tendency to direct frustration toward people lower down the income scale.',
      'Her examples are mainly drawn from Germany, so they should not be treated as universal rules.',
      'The book is deliberately argumentative and is best read as a thesis to examine, not as the final word on every policy.',
      'It is especially useful for understanding the quiz’s distinction between a household’s aspirations and its material interests.',
    ],
    href: 'https://www.piper.de/buecher/hurra-wir-duerfen-zahlen-isbn-978-3-492-60167-2-ebook',
    linkLabel: 'Buy from the publisher',
  },
  {
    title: 'Under Pressure: The Squeezed Middle Class',
    author: 'OECD (2019)',
    introduction: [
      'This report compares the position of middle-income households across OECD countries.',
      'It documents how housing, education, healthcare and other essential costs can rise faster than household incomes.',
      'It also shows that the middle class is not one uniform group and that pressures differ greatly between countries.',
      'The report helps readers test broad political claims against comparable data rather than a single national story.',
      'Because it is an institutional report, it is more descriptive and less polemical than the book that inspired the quiz.',
      'It is a strong starting point for checking whether middle-income security has actually improved or weakened over time.',
    ],
    href: 'https://www.oecd.org/en/publications/under-pressure-the-squeezed-middle-class_689afed1-en.html',
    linkLabel: 'Read or buy the report',
  },
  {
    title: 'A Broken Social Elevator?',
    author: 'OECD (2018)',
    introduction: [
      'This report studies how family background affects people’s chances of moving up or down the income ladder.',
      'It explains why social mobility is often slower than popular stories about individual effort suggest.',
      'The evidence covers many countries and separates short-term income changes from movement across generations.',
      'That distinction matters because a good salary today does not necessarily provide the security created by inherited wealth.',
      'The report does not claim that personal effort is irrelevant, but it shows how institutions and starting conditions shape outcomes.',
      'It helps readers evaluate whether policies widen opportunity or mainly protect advantages that already exist.',
    ],
    href: 'https://www.oecd.org/en/publications/broken-elevator-how-to-promote-social-mobility_9789264301085-en.html',
    linkLabel: 'Read or buy the report',
  },
  {
    title: 'The Submerged State',
    author: 'Suzanne Mettler (2011)',
    introduction: [
      'Mettler explains how people can benefit from government policy without recognising that help as public support.',
      'Her examples include tax advantages and programmes delivered through private institutions in the United States.',
      'These indirect arrangements can make government look absent even when it is providing valuable assistance.',
      'They can also hide who receives the largest benefits and make public debate less informed.',
      'The book is useful for understanding why visible benefits for poorer households may attract more attention than less visible benefits higher up.',
      'Its evidence is US-specific, but the question it raises—whether citizens can see the policies that support them—travels more widely.',
    ],
    href: 'https://press.uchicago.edu/ucp/books/book/chicago/S/bo12244559.html',
    linkLabel: 'Buy from the publisher',
  },
  {
    title: 'Affluence and Influence',
    author: 'Martin Gilens (2012)',
    introduction: [
      'Gilens studies whose preferences are reflected in policy decisions in the United States.',
      'He compares thousands of proposed policy changes with the views of lower-, middle- and higher-income citizens.',
      'The central finding is that policy outcomes were much more closely associated with the preferences of affluent Americans.',
      'That does not mean every wealthy person controls politics or that every unpopular decision is corrupt.',
      'It does show why unequal access and unequal responsiveness deserve careful measurement rather than assumption.',
      'The book gives readers a deeper evidence base for the quiz’s questions about ownership, influence and whose interests receive attention.',
    ],
    href: 'https://press.princeton.edu/books/paperback/9780691162423/affluence-and-influence',
    linkLabel: 'Buy from the publisher',
  },
] as const;
