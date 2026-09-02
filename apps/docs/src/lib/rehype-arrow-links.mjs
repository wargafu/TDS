import { visit } from 'unist-util-visit';

/**
 * Repère les liens dont le texte se termine par « → » (convention de CTA
 * « lire → », « ouvrir → »), retire la flèche littérale et ajoute la classe
 * `arrow-link` — la flèche est réintroduite en CSS (`::after`) pour pouvoir
 * l'animer au survol.
 */
export default function rehypeArrowLinks() {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (node.tagName !== 'a' || !node.children?.length) return;
      const last = node.children[node.children.length - 1];
      if (!last || last.type !== 'text') return;
      const trimmed = last.value.replace(/\s*→\s*$/, '');
      if (trimmed === last.value) return;

      last.value = trimmed.replace(/\s+$/, '');
      if (last.value === '') node.children.pop();

      const cls = node.properties.className;
      node.properties.className = Array.isArray(cls)
        ? [...cls, 'arrow-link']
        : cls
          ? [cls, 'arrow-link']
          : ['arrow-link'];
    });
  };
}
