// ✏️ Edit everything on the site from this one file.

export const profile = {
  name: 'Kib',
  handle: 'vskib', // shown as yourname@portfolio in the prompts (lowercase, no spaces)
  host: 'portfolio',
  title: '3rd-Year IT Student',
  headline:
    "Welcome to my portfolio! I'm Kib a 3rd year IT student from Naga College Foundation.",
  github: 'https://github.com/your-username',
  linkedin: 'https://linkedin.com/in/your-username',
  // Extra neofetch rows (add, remove, or rename freely)
  specs: [
    { label: 'Shell', value: 'zsh' },
    { label: 'Editor', value: 'VS Code' },
    { label: 'Languages', value: 'html, css, javascript, reactjs, nodejs, postgresql' },
    { label: 'Location', value: 'Camarines Sur' },
  ],
}

export const mascot = {
  name: 'Kibie',
  // penguin | cat | robot | ghost | blob | custom
  defaultTemplate: 'custom',
  // To use your own artwork: put it in client/public (e.g. mascot.png),
  // set customSrc: '/mascot.png', and a "Custom" option appears in the picker.
  customSrc: '',
  greetings: [
    "Hi! Welcome to my human's portfolio!",
    'Psst... check out the projects below!',
    'Want to work together? Say hello!',
    'I help debug. Mostly by watching.',
  ],
}

export const skills = [
  { category: 'Frontend', items: ['React','HTML/CSS', 'JavaScript'] },
  { category: 'Backend & Database', items: ['Node.js', 'PostgreSQL', 'Supabase'] },
  { category: 'Tools & Concepts', items: ['Git', 'Linux', 'OOP'] },
]

export const projects = [
  // {
  //   name: '[Project Name One]',
  //   description: '[Brief description of what it does and your role.]',
  //   stack: ['React', 'Node.js', 'PostgreSQL'],
  //   github: 'https://github.com/your-username/project-one',
  //   live: 'https://example.com',
  // },
  // {
  //   name: '[Project Name Two]',
  //   description: '[Brief description of what it does and your role.]',
  //   stack: ['Python', 'Flask', 'SQLite'],
  //   github: 'https://github.com/your-username/project-two',
  //   live: '',
  // },
  // {
  //   name: '[Project Name Three]',
  //   description: '[Brief description of what it does and your role.]',
  //   stack: ['Java', 'JavaFX'],
  //   github: 'https://github.com/your-username/project-three',
  //   live: '',
  // },
  // {
  //   name: '[Project Name Four]',
  //   description: '[Brief description of what it does and your role.]',
  //   stack: ['Next.js', 'Supabase', 'Tailwind'],
  //   github: 'https://github.com/your-username/project-four',
  //   live: 'https://example.com',
  // },
]