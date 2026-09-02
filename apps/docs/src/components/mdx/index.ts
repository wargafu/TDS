import Aside from './Aside.astro';
import Badge from './Badge.astro';
import Card from './Card.astro';
import CardGrid from './CardGrid.astro';
import Steps from './Steps.astro';
import Tabs from './Tabs.astro';
import TabItem from './TabItem.astro';

/** Composants injectés dans le rendu MDX (remplacent l'ancienne dépendance Starlight). */
export const mdxComponents = { Aside, Badge, Card, CardGrid, Steps, Tabs, TabItem };
